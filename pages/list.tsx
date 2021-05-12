import { Avatar, List as ListContainer, Button, Container, ListItem, ListItemAvatar, ListItemText, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
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
    const [confirmModal, setConfirmModal] = useState<boolean>(false);

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

    const handleItemClick = (ti: TimeItem, i: number) => {
        setIndex(i)
        setItem(ti)
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
                                <Avatar onClick={() => handleItemClick(item, index)}>
                                    <AccessTimeIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText onClick={() => handleItemClick(item, index)} primary={item.name} secondary={timeString(new Date(item?.startTime), new Date(item?.endTime))} />
                            <Delete onClick={() => removeItem(index).then(() => getData())} />
                        </ListItem>
                    )}
                </ListContainer>
                <Button className="button buttom-button" color="primary" variant="contained" onClick={() => {
                    setConfirmModal(true)
                }}>
                    Reset
            </Button>
            </Container>
            {item && <BottomModal isOpen={openModal} setOpen={setOpenModal} item={item} index={index} refresh={getData} />}
            <Dialog
                open={confirmModal}
                keepMounted
                onClose={() => setConfirmModal(false)}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Delete all?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Sure you want to delete all times recorded?
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmModal(false)} color="primary">
                        Disagree
          </Button>
                    <Button onClick={() => {
                        reset().then(() => getData())
                        setConfirmModal(false)
                    }} color="primary">
                        Agree
          </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default List;