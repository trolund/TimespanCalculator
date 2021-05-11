import { Grow } from '@material-ui/core';
import { timeStamp } from 'console';
import React, { useEffect, useState } from 'react'
import { getAmountOfTime, parseDate, Time, timeString, today } from '../services/dateService';
import { TimeItem } from '../services/timeSaver';

interface SumOfDayProps {
    times: TimeItem[];
}

export function SumOfDay({ times }: SumOfDayProps) {
    const [sum, setSum] = useState<Time>({ hours: 0, mins: 0 });
    const [show, setShow] = useState(false);

    useEffect(() => {
        setSum(today(times));
    }, [times]);

    useEffect(() => {
        setShow(true)
    }, []);

    return (
        <Grow in={show}>
            <div className="sum-div">
                <h1 className="clock">{timeString(sum.hours, sum.mins)}</h1>
            </div>
        </Grow>
    );
}