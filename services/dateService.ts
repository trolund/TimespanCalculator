import moment from "moment";
import { TimeItem } from "./timeSaver";

export type Time = {
    hours: number;
    mins: number;
}

const formatDate = (d: number) => {
    const data = new Date(d);
    return `${data.getHours() < 10 ? "0" + data.getHours() : data.getHours()}:${data.getMinutes() < 10 ? "0" + data.getMinutes() : data.getMinutes()}`
}

const getAmountOfTime = (a: Date, b: Date): moment.Duration => {
    var time = Number(b) - Number(a);
    return moment.duration(time);
}

const getTime = (duration: moment.Duration) => {

    var seconds = duration.seconds();
    var minutes = duration.minutes();
    var hours = duration.hours();
    var days = duration.days();

    return { hours: hours, mins: minutes } as Time
}

const validateTime = (times: [number, number]): boolean => {
    const [hours, mins] = times
    return hours >= 0 && mins >= 0
}

const validateTimeSpan = (a: Date, b: Date) => {
    const { hours, mins } = getTime(getAmountOfTime(a, b))
    if (validateTime([hours, mins])) {
        return true
    }
    return false
}


const getAmountOfTimeString = (a: Date, b: Date) => {
    const { hours, mins } = getTime(getAmountOfTime(a, b))
    if (validateTime([hours, mins])) {
        return `${hours < 10 ? "0" + hours : hours}:${mins < 10 ? "0" + mins : mins}`
    }

    return 'Invalid input'
}

const dateToString = (d: Date): string => timeString(moment.duration(d.getTime()).hours(), moment.duration(d.getTime()).minutes())

const timeString = (hours: number, mins: number) => {
    return `${hours < 10 ? "0" + hours : hours}:${mins < 10 ? "0" + mins : mins}`
}

const parseDate = (d: any) => new Date(Date.parse(d))

const today = (times: TimeItem[]): Time => {

    const res = times.reduce(((acc, t) => {
        return acc + (moment.duration(new Date(t.endTime).getTime()).asSeconds() - moment.duration(new Date(t.startTime).getTime()).asSeconds())
    }), 0)

    let secs = res;
    var minutes = Math.floor(secs / 60);
    secs = secs % 60;
    var hours = Math.floor(minutes / 60)
    minutes = minutes % 60;

    return { hours: hours, mins: minutes }
}

export { formatDate, getAmountOfTime, getAmountOfTimeString, timeString, parseDate, validateTime, today, getTime, validateTimeSpan }