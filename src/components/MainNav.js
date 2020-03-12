import React from  'react'
import {NavLink} from 'react-router-dom'

function TagList({data}){
    const tags = data.map((item,index)=>(
                <li key={`list-${index}`}>
                    <NavLink key={`nav-${index}`} to={`/${item}`}>
                        {item}
                    </NavLink>
                </li>))
    return tags
}

function MainNav({data}){
    return(
        <nav className="main-nav">
            <ul>
                <TagList data={data} />
            </ul>
        </nav>
    )
}

export default MainNav