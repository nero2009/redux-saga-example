import React from 'react';


//Presentational Component that generates the List of Images 
export const ImageList= function(props){
 
    return(
      <div style={{borderTop:"30px"}}>
        {
         props.error ? <div>please try again</div> :(
          !props.status ?  (props.photos.map((image,index)=>(
              <img src={image.previewURL} key={image.id} width="200" height="200" border="2px white" alt={image.tags}/>
            ))):(
              <div className="loader"></div>
            ))
        }
      </div>
    )
  }