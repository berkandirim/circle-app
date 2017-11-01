import axios from 'axios';
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      diameter: '',
      error: '',
      message: {},
      loading: false
    };
    this.setValue = this.setValue.bind(this);
    this.drawCircle = this.drawCircle.bind(this);
    this.getPost = this.getPost.bind(this);
  }
  
  setValue(e) {
    this.setState({error: ''});
    this.setState({value: e.target.value});
  }
  
  drawCircle() {
    this.setState({message: {}});
    if (this.state.value <= 100
      && this.state.value > 0
      && Number.isInteger(parseFloat(this.state.value))
    ) {
      this.setState({diameter: this.state.value});
    } else {
      this.setState({error: 'You did not enter an integer between 0 and 100!'})
    }
  }
  
  getPost() {
    const postId = this.state.diameter;
    this.setState({loading: true});
    axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`).then((res) => {
      this.setState({message: res.data});
      this.setState({loading: false});
    })
  }
  
  render() {
    return (
      <div className="App">
        <h1 className="title">CIRCLE APP</h1>
        <p>Please enter an integer between 0 and 100</p>
        <input className="form-item" type="text" value={this.state.value} onChange={this.setValue} /><br/>
        <button className="form-item" onClick={this.drawCircle}>OK</button>
        <p className="error">{this.state.error}</p>
        <div>
          <svg onClick={this.getPost} width="120" height="120" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle id="circle" r={this.state.diameter / 2} cx="60" cy="60"></circle>
          </svg>
        </div>
        <div>
          {this.state.loading &&
            <div className="loader">Loading...</div>
          }
          <h2>{this.state.message.title}</h2>
          <p>{this.state.message.body}</p>
        </div>
      </div>
    );
  }
}

export default App;
