import React, { useEffect, useState } from 'react'
import { getAmountOfTime, parseDate, timeString } from '../services/dateService';
import { TimeItem } from '../services/timeSaver';

interface SumOfDayProps {
    times: TimeItem[];
}

type Time = {
    hours: number;
    mins: number;
}

export function SumOfDay({ times }: SumOfDayProps) {
    const [sum, setSum] = useState<Time>({ hours: 0, mins: 0 });

    useEffect(() => {
        today(times);
    }, [times]);

    const today = (times: TimeItem[]) => {
        const now = new Date(Date.now())
        const list = times.filter(i => {
            const s: string = String(i.startTime);
            const date: Date = new Date(Date.parse(s))

            return date.getMonth() === now.getMonth() && date.getDay() === now.getDay() && date.getFullYear() === now.getFullYear()
        })

        const res = list.reduce((accumulator: Time, currentValue: TimeItem) => {
            const [newhours, newmins] = getAmountOfTime(parseDate(currentValue.startTime), parseDate(currentValue.endTime))
            const { hours, mins } = accumulator;

            return { hours: newhours + hours, mins: newmins + mins }
        }, { hours: 0, mins: 0 });

        setSum(res)
    }

    return (
        <div>
            <p className="clock">Sum of the day</p>
            <h1 className="clock">{timeString(sum.hours, sum.mins)}</h1>
        </ div>
    );
}