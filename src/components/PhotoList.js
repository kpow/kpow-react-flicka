import React from 'react'
import Photo from './Photo'
import NotFound from './NotFound'
import Loading from './Loading'

function PhotoList({query, data, search, loading, setOverlay, toggleOverlay}) {

  if(data.length<1){
    search(query)
  }

  const photoDisplay = (data) =>{ 
    if(!loading){
        if(data.length > 0){ 
          return data.map( (image)=><Photo 
                                      data={image} 
                                      key={image.id} 
                                      setOverlay={setOverlay}
                                      toggleOverlay={toggleOverlay}
                                    />) 
        }else{
          return <NotFound />
        }
    } 
  }

  const photoHeader = (query) =>{
    if(query && !loading){
      return <strong style={{fontSize:'18px'}}>Results for: {query}</strong>
    }else if(loading){
      return <Loading />
    } 
  }

  return(
    <div className="photo-container">
      {photoHeader(query)}
      <ul>
        {photoDisplay(data)}
      </ul>
    </div>
  )

}

export default PhotoList