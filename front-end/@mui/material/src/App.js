import React, { useContext } from 'react'
import { UserContext } from './Context/userContext'
import FacebookCircularProgress from './Component/Loading/Loading';
import Home from './Component/Main/Wrapper';
import { Route, Routes } from 'react-router-dom';
import SignUp from './Component/Auth/SignUp';
import SignIn from './Component/Auth/SignIn';
import LandingPage from "./Component/LandingPage/LandingPage.jsx";
import Char from './Component/Chart/Char.js';
import Example from './Component/Chart/TestChar.js';
import Watchlist from './Component/Watchlist/WarchList.js';



const App = () => {
  const value = useContext(UserContext);
  return (
    <Routes>
      <Route path='/' element={
        <Home>
          <LandingPage /> 
        </Home>
      } />
      <Route path='/watchlist' element={<Home>
        <Watchlist />
      </Home>} />
      <Route path='/signup' element={<Home>
        <SignUp />
      </Home>} />
      <Route path='/signin' element={<Home><SignIn /></Home>} />
    </Routes>
  )
}

export default App
