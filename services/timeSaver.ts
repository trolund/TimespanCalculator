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

function removeArrayItem<T>(arr: Array<T>, index: number): Array<T> {
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

const reset = async () => {
    localforage.setItem(key, JSON.stringify([]))
}



export { addItem, getItems, reset, removeItem }