import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import { KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

enum TimeType {
    START,
    END
}

export function Time() {
    const [now, onChange] = useState(Date.now);

    const [startDate, setStartDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [endDate, setendDate] = React.useState(new Date('2014-08-18T21:11:54'));

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

    const formatDate = (d: number) => {
        const data = new Date(d);
        return `${data.getHours() < 10 ? "0" + data.getHours() : data.getHours()}:${data.getMinutes() < 10 ? "0" + data.getMinutes() : data.getMinutes()}:${data.getSeconds() < 10 ? "0" + data.getSeconds() : data.getSeconds()}`
    }

    const getAmountOfTime = (a: Date, b: Date) => {
        let diff = b.getTime() - a.getTime();

        var hours = Math.floor(diff / (1000 * 60 * 60));
        diff -= hours * (1000 * 60 * 60);

        var mins = Math.floor(diff / (1000 * 60));
        diff -= mins * (1000 * 60);

        return `${hours < 10 ? "0" + hours : hours}:${mins < 10 ? "0" + mins : mins}`
    }

    return (
        <div style={{ margin: "1rem" }}>
            <h1 style={{ margin: "auto", textAlign: "center" }}>{formatDate(now)}</h1>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
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
                        margin="normal"
                        id="time-picker"
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
            <h1 style={{ margin: "auto", textAlign: "center" }}>{getAmountOfTime(startDate, endDate)}</h1>
        </ div>
    );
}