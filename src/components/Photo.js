import React from 'react'

function Photo({toggleOverlay, setOverlay, data}){

    const handleClick = (e) =>{
        toggleOverlay();
        setOverlay(data.fullUrl)
    }

    return(
        <li>
            <img onClick={handleClick} src={data.thumbUrl} alt={data.desc} />
        </li>
    )
}

export default Photo