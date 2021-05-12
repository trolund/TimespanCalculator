import localforage from "localforage"
import moment from "moment"

export type TimeItem = {
    name: string;
    startTime: Date;
    endTime: Date;
    duration?: number;
}

const key = "timeSaver"

const addItem = async (item: TimeItem) => {
    const list = await getItems()
    item.endTime = moment(item.endTime).set({ seconds: 0, milliseconds: 0 }).toDate()
    item.startTime = moment(item.startTime).set({ seconds: 0, milliseconds: 0 }).toDate()
    if (Array.isArray(list)) {
        localforage.setItem(key, JSON.stringify([...list, item]))
    } else {
        localforage.setItem(key, JSON.stringify([item]))
    }
}

const getItems = async () => {
    const json: string = await localforage.getItem(key)
    const data: TimeItem[] = JSON.parse(json)
    if (Array.isArray(data)) {
        return data;
    }
    return []
}

const removeItem = async (index: number) => {
    const list = await getItems()
    const updatedList = removeArrayItem(list, index)
    reset();
    localforage.setItem(key, JSON.stringify(updatedList))
}

const updateItem = async (index: number, item: TimeItem) => {
    const list = await getItems()
    item.endTime = moment(item.endTime).set({ seconds: 0, milliseconds: 0 }).toDate()
    item.startTime = moment(item.startTime).set({ seconds: 0, milliseconds: 0 }).toDate()
    list[index] = item
    reset();
    localforage.setItem(key, JSON.stringify(list))
}

function removeArrayItem<T>(arr: Array<T>, index: number): Array<T> {
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

const reset = async () => {
    localforage.setItem(key, JSON.stringify([]))
}

const getMaxDate = async () => {
    const list = await getItems();
    if (list.length > 0) {
        const max = list.reduce((a, b) => new Date(a.endTime).getTime() > new Date(b.endTime).getTime() ? a : b);
        return new Date(max.endTime);
    }
    return new Date();
}



export { addItem, getItems, reset, removeItem, getMaxDate, updateItem }