import React, {useState, useEffect} from 'react'
import {BrowserRouter} from 'react-router-dom'

import Header from './components/Header'
import Body from './components/Body'

import {UserManager} from './managers/userManager'
import UserContext from './context/userContext'


const App = () => {
    let [user, setUser] = useState({})

    useEffect(() => {
        (async () => {
            let usr = await UserManager.getMe()

            if (!usr.err) {
                setUser(usr.res)
            } else {
                setUser(null)
            }
        })()

    }, [])

    return (
        <BrowserRouter>
            <UserContext.Provider value={[user, setUser]}>
                <Header/>
                <Body/>
            </UserContext.Provider>
        </BrowserRouter>
    )
}

export default App;
