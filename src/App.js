import React, { Component } from 'react';
import {connect} from 'react-redux'

import {API_CALL_REQUEST} from './Constants'
import './App.css'

const ImageList= function(props){
 console.log(props)
 
  return(
    <div style={{borderTop:"30px"}}>
      {
        !props.status ?  (props.photos.map((image,index)=>(
            <img src={image.previewURL} key={image.id} width="200" height="200" border="2px white" alt={image.tags}/>
          ))):(
            <div className="loader"></div>
          )
      }
    </div>
  )
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      searchInput:""
    }
  }

  handleChange =(e)=>{
    this.setState({
      searchInput:e.target.value
    }, ()=>{
      this.props.dispatch({type: API_CALL_REQUEST, searchInput: this.state.searchInput})
    })
  }
  
  render() {
    return (
      <div >
        <input type="text" className="app" placeholder="Search" value={this.state.searchInput} onChange={this.handleChange} />
        <br/>
        <ImageList photos={this.props.images} status={this.props.fetching} />
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
      fetching: state.fetching,
      images: state.images,
      error: state.error
  }
}

export default connect(mapStateToProps)(App);
