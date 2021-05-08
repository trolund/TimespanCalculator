import React, { useEffect, useState } from 'react'
import { Button, Container, Grid, Input, TextField, Typography } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import { KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { addItem } from '../services/timeSaver';
import { formatDate, getAmountOfTimeString } from '../services/dateService';
import { Done, HighlightOff, Save } from '@material-ui/icons';

enum TimeType {
    START,
    END
}


enum Op {
    OK,
    FAIL
}


export function Time() {
    const [now, onChange] = useState(Date.now);
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setendDate] = React.useState(new Date());
    const [name, setName] = useState<string>("");
    const [status, setStatus] = useState<Op | null>(null);

    const handleDateChange = (type: TimeType, date: Date) => {
        if (type === TimeType.START) {
            setStartDate(date)
        } else {
            setendDate(date)
        }
    };

    useEffect(() => {
        const interval = setInterval(
            () => onChange(Date.now),
            1000
        );

        return () => {
            clearInterval(interval);
        }
    }, []);

    const afterSave = (type: Op) => {
        setStatus(type)
        const interval = setInterval(
            () => {
                setStatus(null)
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