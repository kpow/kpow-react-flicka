import React from 'react'

function Photo(props){
    return(
        <li>
            <img src={props.data.thumbUrl} alt={props.data.desc} />
        </li>
    )
}

export default Photo