import { Button, Grid, Paper, Slide, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import moment from 'moment';
import { TimeType } from '../services/types';
import { getAmountOfTimeString, validateTimeSpan } from '../services/dateService';
import { TimeItem, updateItem } from '../services/timeSaver';

interface BottomModalProps {
    setOpen: (b: boolean) => void;
    isOpen: boolean;
    item: TimeItem;
    index: number;
    refresh: () => void;
}

const BottomModal: React.FC<BottomModalProps> = ({ setOpen, isOpen, item, index, refresh }) => {
    const [name, setName] = useState<string>(item?.name);
    const [startTime, setStartTime] = useState<Date>(new Date(item?.startTime));
    const [endTime, setEndTime] = useState<Date>(new Date(item?.endTime));

    useEffect(() => {
        console.log(item);
        setName(item?.name)
        setStartTime(new Date(item?.startTime))
        setEndTime(new Date(item?.endTime))
    }, [item, index]);


    const handleDateChange = (type: TimeType, date: Date) => {
        const input = moment(date).set({ seconds: 0 }).toDate()
        if (type === TimeType.START) {
            setStartTime(input)
        } else {
            setEndTime(input)
        }
    };

    return <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit><div className="bottom-modal">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <KeyboardTimePicker
                    color="primary"
                    margin="normal"
                    id="time-picker-start"
                    label="Start time"
                    format="HH:mm"
                    ampm={false}
                    value={startTime}
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
                    value={endTime}
                    onChange={(d, s) => handleDateChange(TimeType.END, d)}
                    KeyboardButtonProps={{
                        'aria-label': 'end time',
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
        <h1 className="clock">{getAmountOfTimeString(startTime, endTime)}</h1>
        <TextField className="input" label="Description" value={name} onChange={(e) => setName(e.target.value)} id="standard-basic" />
        <Grid container justify="center" spacing={2} className="buttons">
            <Grid item>
                <Button className="buttom-button" onClick={() => setOpen(false)}>Cancel</Button>
            </Grid>
            <Grid item>
                <Button className="buttom-button" onClick={() => {
                    if (validateTimeSpan(startTime, endTime)) {
                        updateItem(index, { name: name, startTime: startTime, endTime: endTime } as TimeItem).then(() => refresh())
                        setOpen(false)
                    }
                }}>Ok</Button>
            </Grid>
        </Grid>
    </div></Slide>;
}

export default BottomModal;