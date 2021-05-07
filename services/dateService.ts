const formatDate = (d: number) => {
    const data = new Date(d);
    return `${data.getHours() < 10 ? "0" + data.getHours() : data.getHours()}:${data.getMinutes() < 10 ? "0" + data.getMinutes() : data.getMinutes()}:${data.getSeconds() < 10 ? "0" + data.getSeconds() : data.getSeconds()}`
}

const getAmountOfTime = (a: Date, b: Date): [number, number] => {
    let diff = b.getTime() - a.getTime();

    var hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);

    var mins = Math.floor(diff / (1000 * 60));
    diff -= mins * (1000 * 60);

    return [hours, mins];
}

const getAmountOfTimeString = (a: Date, b: Date) => {
    const [hours, mins] = getAmountOfTime(a, b)
    return `${hours < 10 ? "0" + hours : hours}:${mins < 10 ? "0" + mins : mins}`
}

const timeString = (hours: number, mins: number) => {
    return `${hours < 10 ? "0" + hours : hours}:${mins < 10 ? "0" + mins : mins}`
}

const parseDate = (d: any) => new Date(Date.parse(d))

export { formatDate, getAmountOfTime, getAmountOfTimeString, timeString, parseDate }