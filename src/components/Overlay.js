import React from 'react'

function Overlay({overlayActive, toggleOverlay, overlayImage}){
    const itemClass = `overlay ${overlayActive ? "active" : ""}`
    return(
        <div className={itemClass} onClick={()=>{toggleOverlay()}}>
            <img src={ overlayImage } />
        </div>
    )
}

export default Overlay