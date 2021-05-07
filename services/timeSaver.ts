import localforage from "localforage"

export type TimeItem = {
    name: string;
    startTime: Date;
    endTime: Date;
    duration?: number;
}

const key = "timeSaver"

const isServer = () => typeof window === undefined

const addItem = async (item: TimeItem) => {
    const list = await getItems()
    if (Array.isArray(list)) {
        localforage.setItem(key, JSON.stringify([...list, item]));
    } else {
        localforage.setItem(key, JSON.stringify([item]));
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

const reset = async () => {
    localforage.setItem(key, JSON.stringify([]));
}



export { addItem, getItems, reset }