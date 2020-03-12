import React from 'react'
import Photo from './Photo'
import NotFound from './NotFound'
import Loading from './Loading'

function PhotoList({query, data, search, loading}) {

  if(data.length<1){
    search(query)
  }

  const photoDisplay = (data) =>{ 
    if(!loading){
        if(data.length > 0){ 
          return data.map((image)=><Photo data={image} key={image.id}/>) 
        }else{
          return <NotFound />
        }
    } 
  }

  const photoHeader = (query) =>{
    if(query && !loading){
      return <h3 style={{fontSize:'24px'}}>Results for: {query}</h3>
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