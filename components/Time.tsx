import React, { useEffect, useState } from 'react'
import { Button, Container, Grid, Input, TextField, Typography } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import { KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { addItem, getMaxDate } from '../services/timeSaver';
import { formatDate, getAmountOfTimeString } from '../services/dateService';
import { Done, HighlightOff, Save } from '@material-ui/icons';
import moment from 'moment';
import { Op, TimeType } from '../services/types';

export function Time() {
    const [now, onChange] = useState(Date.now);
    const [startDate, setStartDate] = React.useState(moment(new Date()).set({ seconds: 0, milliseconds: 0 }).toDate());
    const [endDate, setEndDate] = React.useState(moment(new Date()).set({ seconds: 0, milliseconds: 0 }).toDate());
    const [name, setName] = useState<string>("");
    const [status, setStatus] = useState<Op | null>(null);

    const handleDateChange = (type: TimeType, date: Date) => {
        const input = moment(date).set({ seconds: 0 }).toDate()

        if (type === TimeType.START) {
            setStartDate(input)
        } else {
            setEndDate(input)
        }
    };

    useEffect(() => {
        const interval = setInterval(
            () => onChange(Date.now),
            1000
        );

        return () => {
            clearInterval(interval)
        }
    }, []);

    useEffect(() => {
        let isSubscribed = true
        updateDates(isSubscribed)
        return () => { isSubscribed = false }
    }, []);

    const updateDates = async (isSubscribed: boolean) => {
        const d = await getMaxDate()
        if (d !== null && isSubscribed) {
            const end = moment(moment(d).set({ seconds: 0, milliseconds: 0 }).toDate()).add(15, 'minutes').toDate()

            setEndDate(moment(end).set({ seconds: 0, milliseconds: 0 }).toDate())
            setStartDate(moment(d).set({ seconds: 0, milliseconds: 0 }).toDate())
        }
    }

    const afterSave = (type: Op) => {
        setStatus(type)
        const interval = setInterval(
            () => {
                setStatus(null)
                updateDates(true)
                clearInterval(interval);
            },
            1000
        );
    }

    const ButtonText = (type: Op | null) => {
        switch (type) {
            case Op.OK:
                return "Saved"
            case Op.FAIL:
                return "Failed"
            case null:
                return "Save"
        }
    }

    const getIcon = (type: Op | null) => {
        switch (type) {
            case Op.OK:
                return <Done />
            case Op.FAIL:
                return <HighlightOff />
            case null:
                return <Save />
        }
    }

    return (
        <>
            <h1 className="clock">{formatDate(now)}</h1>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardTimePicker
                        color="primary"
                        margin="normal"
                        id="time-picker-start"
                        label="Start time"
                        format="HH:mm"
                        ampm={false}
                        value={startDate}
                        onChange={(d, s) => handleDateChange(TimeType.START, d)}
                        KeyboardButtonProps={{
                            'aria-label': 'start time',
                        }}
                    />
                    <KeyboardTimePicker
                        color="primary"
                        margin="normal"
                        id="time-picker-end"
                        format="HH:mm"
                        ampm={false}
                        label="End time"
                        value={endDate}
                        onChange={(d, s) => handleDateChange(TimeType.END, d)}
                        KeyboardButtonProps={{
                            'aria-label': 'end time',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
            <h1 className="clock">{getAmountOfTimeString(startDate, endDate)}</h1>
            <TextField className="input" label="Description" value={name} onChange={(e) => setName(e.target.value)} id="standard-basic" />
            <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={getIcon(status)} disabled={status !== null} className="button" onClick={() => {
                    addItem({ name: name, startTime: startDate, endTime: endDate })
                        .then(() => afterSave(Op.OK))
                        .catch(() => afterSave(Op.FAIL))
                }}>
                {ButtonText(status)}
            </Button>
        </>
    );
}