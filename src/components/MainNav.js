import React from  'react'
import {NavLink} from 'react-router-dom'

function MainNav(){
    return(
        <nav className="main-nav">
            <ul>
                <li>
                    <NavLink to="/search/squid">Squid</NavLink>
                </li>
                <li>
                    <NavLink to="/search/voodoo">VooDoo</NavLink>
                </li>
                <li>
                    <NavLink to="/search/mars">Mars</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default MainNav

/*

*/