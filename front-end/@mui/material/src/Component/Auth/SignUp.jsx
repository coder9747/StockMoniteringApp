import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { UserContext } from '../../Context/userContext';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


let url = "http://localhost:4500/api/v1";



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const { setLoading } = React.useContext(UserContext);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = React.useState({
    email: "",
    password: "",
    passwordConfirm:"",
  });



  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, passwordConfirm } = userInfo;
    if (email && password && passwordConfirm) {
      setLoading(true);
      try {
        const response = await fetch(`${url}/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        });
        const data = await response.json();
        if (data) {
          alert(data.message);
          if (data.succes) {
            setLoading(false);
            navigate("/signin");
          }
        }
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    }
    else {
      alert("all fields required");
    }

  }
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setUserInfo((pre) => {
      return { ...pre, [name]: value }
    })
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              value={userInfo.email}
              onChange={handleChange}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={handleChange}
              value={userInfo.password}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={handleChange}
              value={userInfo.passwordConfirm}
              name="passwordConfirm"
              label="Password Confirm"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to={'/signin'} variant="body2">
                  {"All Ready Have An Account SignIn"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}