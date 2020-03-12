import React from  'react'
import {NavLink} from 'react-router-dom'

function MainNav(){
    return(
        <nav className="main-nav">
            <ul>
                <li>
                    <NavLink to="/squids">Squids</NavLink>
                </li>
                <li>
                    <NavLink to="/voodoo">VooDoo</NavLink>
                </li>
                <li>
                    <NavLink to="/mars">Mars</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default MainNav