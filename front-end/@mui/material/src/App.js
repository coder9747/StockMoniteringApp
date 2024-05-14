import React, { useContext } from 'react'
import { UserContext } from './Context/userContext'
import FacebookCircularProgress from './Component/Loading/Loading';
import Home from './Component/Auth/Main/Home';
import { Route, Routes } from 'react-router-dom';
import SignUp from './Component/Auth/SignUp';
import SignIn from './Component/Auth/SignIn';


const App = () => {
  const value = useContext(UserContext);
  return (
    <Routes>
        <Route path='/signup' element={<Home><SignUp /></Home>} />
        <Route path='/signin' element={<Home><SignIn /></Home>} />
    </Routes>
  )
}

export default App
