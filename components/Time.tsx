import React, { useEffect, useState } from 'react'
import { Button, Container, Grid, Input, TextField, Typography } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import { KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { addItem } from '../services/timeSaver';
import { formatDate, getAmountOfTimeString } from '../services/dateService';

enum TimeType {
    START,
    END
}

export function Time() {
    const [now, onChange] = useState(Date.now);
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setendDate] = React.useState(new Date());
    const [name, setName] = useState<string>("");

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
            <Button className="button" color="primary" variant="contained" onClick={() => {
                addItem({ name: name, startTime: startDate, endTime: endDate })
            }}>
                Save
                    </Button>
        </>
    );
}