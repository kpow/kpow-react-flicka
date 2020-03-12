import React from 'react'
import Photo from './Photo'
import NotFound from './NotFound'

function PhotoList({query, data}) {

  return(
    <div className="photo-container">
      { query && 
        <h3 style={{fontSize:'24px'}}>Results for: {query}</h3>
      }
      <ul>

        { data.length > 0 
          ? data.map((image)=><Photo data={image} key={image.id}/>) 
          : <NotFound />
        }
      
      </ul>
    </div>
  )

}

export default PhotoList