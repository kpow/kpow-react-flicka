import React from 'react'

function Overlay(props){
    const itemClass = `overlay ${props.overlayActive ? "active" : ""}`
    return(
        <div className={itemClass} onClick={()=>{props.toggleOverlay()}}>
            <img src={ props.overlayImage } />
        </div>
    )
}

export default Overlay