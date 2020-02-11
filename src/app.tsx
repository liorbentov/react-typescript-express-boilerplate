import React from 'react'
import { hot } from 'react-hot-loader/root'

import Fetch from './fetch'

const App = () => {
    return (
        <div>
            <h1>Hello Boilerplate</h1>
            <h4>This is nonsense</h4>
            <Fetch />
        </div>
    )
}

export default hot(App)
