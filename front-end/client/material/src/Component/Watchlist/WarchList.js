import React, { useContext, useEffect, useState } from 'react';
import { Typography, TextField, Button, Grid } from '@mui/material';
import { Link, Navigate, json } from 'react-router-dom';
import { UserContext } from '../../Context/userContext';
import OutlinedCard from '../Card/SmallCard';
let url = 'https://stockmoniteringapp.onrender.com'

const WarchList = () => {
    const [watchListData, setWatchListData] = useState([]);
    const [symbol, setSymbol] = useState();
    const { setLoading } = useContext(UserContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`${url}/api/v1/wishlist/get-user-watchlist`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${token}`
                    },
                });
                const data = await response.json();
                if (data.succes) {
                    setWatchListData(data.payload);
                }

            } catch (error) {
                console.log(error.message);
            }
        }
        fetchData();

    }, []);
    const handleClick = async () => {
        try {
            if (symbol) {
                setLoading(true);
                try {
                    const response = await fetch(`${url}/api/v1/wishlist/add-user-watchlist`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "authorization": `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify({ symbol }),
                    });
                    const data = await response.json()
                    if (data.succes) {
                        alert(data.message);
                    }
                } catch (error) {
                    console.log(error.message);
                }

                setLoading(false);
            }
            else {
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
            <Link to={'/'} style={{textAlign:"center"}}>Home</Link>
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

                <Grid marginTop={'20px'} display={'flex'} justifyContent={'center'} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {
                        watchListData && watchListData.map((item,idx) => {
                            return <Grid key={idx} item><OutlinedCard  id={item._id} added={true} symbol={item.symbols} /></Grid>
                        }
                        )
                    }
                </Grid>
            </Grid>
        </div >
    )
}

export default React.memo(WarchList);
