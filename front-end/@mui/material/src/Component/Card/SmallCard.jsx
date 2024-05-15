import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { UserContext } from '../../Context/userContext';


let url = 'http://localhost:4500';

export default function OutlinedCard({ symbol }) {
    const {setLoading} = React.useContext(UserContext);
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

    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined" symbol>
                <React.Fragment>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {symbol}
                        </Typography>
                        <Typography variant="h5" component="div">
                            Open 167
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Close 178
                        </Typography>
                        <Typography variant="h6">
                            change <Typography style={{ color: "green" }} variant='p' >+0.45</Typography>
                        </Typography>
                        <Button onClick={handleAddToWatchList}>Add To WatchList</Button>
                    </CardContent>
                    
                </React.Fragment>
            </Card>
        </Box>
    );
}
