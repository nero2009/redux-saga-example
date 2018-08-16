import React, { Component } from 'react';
import {connect} from 'react-redux'
import {ImageList} from './ImageList'
import {API_CALL_REQUEST} from './Constants'
import './App.css'

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
      //an action of type API_CALL_REQUEST and a payload of searchInput is dispatched when an input is entered
      this.props.dispatch({type: API_CALL_REQUEST, searchInput: this.state.searchInput})
    })
  }
  
  render() {
    return (
      <div >
        <input type="text" className="app" style={{borderRadius:"7px", lineHeight:"40px"}} placeholder="Search" value={this.state.searchInput} onChange={this.handleChange} />
        <br/>
        <ImageList photos={this.props.images} status={this.props.fetching} error={this.props.error}/>
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
