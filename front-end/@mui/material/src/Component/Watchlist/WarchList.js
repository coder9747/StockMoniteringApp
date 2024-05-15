import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button, Grid } from '@mui/material';
import { Navigate } from 'react-router-dom';
let url = 'http://localhost:4500'

const WarchList = () => {
    const [watchListData, setWatchListData] = useState([]);
    const [symbol, setSymbol] = useState();
    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch(`${url}/api/v1/wishlist/get-user-watchlist`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
        }).then(val => val.json())
            .then((val) => {
                console.log(val);
            })
    }, []);
    const handleClick = () => {
        try {
            if (symbol) {
                    fetch(`${url}`)
            }
            else
            {
                console.log("Symbol Is Required");
            }

        } catch (error) {
            console.log(error.message);
        }
    }
    if (!localStorage.getItem("token")) {
        return <Navigate to={'/signin'} />
    }
    return (
        <div>
            <Typography variant='h5' style={{ 'textAlign': 'center', margin: "20px" }}>WatchList</Typography>
            <Grid container spacing={2} style={{ padding: '20px' }}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Enter item"
                        variant="outlined"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Button onClick={handleClick} variant="contained" color="primary">
                        Add
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default WarchList
