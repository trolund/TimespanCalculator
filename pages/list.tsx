import { Avatar, List as ListContainer, Button, Container, ListItem, ListItemAvatar, ListItemText, Paper } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { getItems, removeItem, reset, TimeItem } from "../services/timeSaver";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { Delete } from '@material-ui/icons';
import { formatDate, getAmountOfTime, getTime } from "../services/dateService";
import { SumOfDay } from "../components/sumOfDay";
import BottomModal from "../components/bottomModal";


const List = () => {
    const [data, setdata] = useState<TimeItem[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [item, setItem] = useState<TimeItem | null>(null);
    const [index, setIndex] = useState<number | null>(null);

    useEffect(() => {
        getData()
    }, []);

    const getData = () => {
        getItems().then(d => {
            if (Array.isArray(d)) {
                setdata(d)
            }
        })
    }

    const handleItemClick = () => {
        setIndex(index)
        setItem(item)
        setOpenModal(true)
    }

    const timeString = (a: Date, b: Date) => {
        const t = getTime(getAmountOfTime(a, b))
        return `${formatDate(a.getTime())} - ${formatDate(b.getTime())} | ${t.hours}:${t.mins}`
    }

    return (
        <>
            <Container maxWidth="sm" className="container">
                {SumOfDay({ times: data })}
                <ListContainer>
                    {data.map((item, index) =>
                        <ListItem key={index}>
                            <ListItemAvatar>
                                <Avatar onClick={handleItemClick}>
                                    <AccessTimeIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText onClick={handleItemClick} primary={item.name} secondary={timeString(new Date(item?.startTime), new Date(item?.endTime))} />
                            <Delete onClick={() => removeItem(index).then(() => getData())} />
                        </ListItem>
                    )}
                </ListContainer>
                <Button className="button buttom-button" color="primary" variant="contained" onClick={() => {
                    reset().then(() => getData())
                }}>
                    Reset
            </Button>
            </Container>
            <BottomModal isOpen={openModal} setOpen={setOpenModal} item={item} index={index} refresh={getData} />
        </>
    );
}

export default List;