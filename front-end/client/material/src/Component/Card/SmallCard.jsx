import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { UserContext } from '../../Context/userContext';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


let url = 'https://stockmoniteringapp.onrender.com';

export default function OutlinedCard({ symbol, added, id }) {
    const [data, setData] = React.useState({
        formatedChange: '+1%',
        openingPrice: '167',
        closingPrice: '168'
    });
    const { setLoading } = React.useContext(UserContext);
    const handleAddToWatchList = async () => {
        if (localStorage.getItem("token")) {
            try {
                setLoading(true);
                const token = localStorage.getItem("token")
                const response = await fetch(`${url}/api/v1/wishlist/add-user-watchlist`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        "symbol": symbol,
                    })
                });
                const data = await response.json();
                alert(data.message);
            } catch (error) {
                console.log(error.message);
            }
            setLoading(false);
        }
        else {
            alert('Please Login First');
        }
    }
    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${url}/api/v1/wishlist/remove-user-watchlist`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ id }),
            });
            const data = await response.json();
            if (data.succes) {
                alert('Delted Succesful');
            }

        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }
    useEffect(() => {
        console.log(symbol);
        const fetchData = async () => {
            try {
                const response = await fetch(`${url}//api/v1/stock/get-change?symbol=${symbol}`);
                const data = await response.json();
                if (data.succes) {
                    setData(data.data);
                }
            } catch (error) {
                console.log('hey');
            }
        }
    }, [symbol])

    return (
        <Link to={`/stock-data?symbol=${symbol}`}>
            <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined" symbol>
                    <React.Fragment>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {symbol}
                            </Typography>
                            <Typography variant="h5" component="div">
                                Open {data.openingPrice}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Close {data.closingPrice}
                            </Typography>
                            <Typography variant="h6">
                                change <Typography style={{ color: `${data.formatedChange.startsWith('+') ? 'green' : 'red'}` }} variant='p' >{data.formatedChange}</Typography>
                            </Typography>
                            {!added && <Button onClick={handleAddToWatchList}>Add To WatchList</Button>
                            }
                            {added && <Button style={{ color: "red" }} onClick={handleDelete}>Delete</Button>
                            }
                        </CardContent>
                    </React.Fragment>
                </Card>
            </Box>
        </Link>
    );
}
