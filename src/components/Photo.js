import React from 'react'

function Photo(props){
    return(
        <li>
            <img src={props.data.thumbUrl} alt="" />
        </li>
    )
}

export default Photo