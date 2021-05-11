import { Avatar, List as ListContainer, Button, Container, ListItem, ListItemAvatar, ListItemText, Paper } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { getItems, removeItem, reset, TimeItem } from "../services/timeSaver";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { Delete } from '@material-ui/icons';
import { formatDate } from "../services/dateService";
import { SumOfDay } from "../components/sumOfDay";


const List = () => {
    const [data, setdata] = useState<TimeItem[]>([]);

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

    const timeString = (a: any, b: any) => {
        return `${formatDate(a)} - ${formatDate(b)}`
    }

    return (
        <>
            {SumOfDay({ times: data })}
            <Container maxWidth="sm" className="container">
                <ListContainer>

                    {data.map((item, index) =>
                        <ListItem key={index}>
                            <ListItemAvatar>
                                <Avatar>
                                    <AccessTimeIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={item.name} secondary={timeString(item.startTime, item.endTime)} />
                            <Delete onClick={() => removeItem(index).then(() => getData())} />
                        </ListItem>
                    )}
                </ListContainer>
                <Button className="button" color="primary" variant="contained" onClick={() => {
                    reset().then(() => getData())
                }}>
                    Reset
            </Button>
            </Container>
        </>
    );
}

export default List;