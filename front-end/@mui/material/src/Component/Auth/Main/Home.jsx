import React, { Fragment, useContext } from 'react'
import { UserContext } from '../../../Context/userContext'
import FacebookCircularProgress from '../../Loading/Loading';

const Home = ({ children }) => {
    const { isLoading } = useContext(UserContext);
    return (
        <Fragment>
            {isLoading && <div>
                {isLoading && <div className='loading-box'>
                    <FacebookCircularProgress />
                </div>}
            </div>}
            {!isLoading && children}
        </Fragment>
    )
}

export default Home
