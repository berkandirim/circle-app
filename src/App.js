import axios from 'axios';
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      diameter: '',
      error: false,
      message: {},
      loading: false,
      textClass: ''
    };
    this.setValue = this.setValue.bind(this);
    this.drawCircle = this.drawCircle.bind(this);
    this.triggerDraw = this.triggerDraw.bind(this);
    this.getPost = this.getPost.bind(this);
  }
  
  setValue(e) {
    this.setState({
      error: false,
      value: e.target.value,
      diameter: '',
      message: {}
    });
  }
  
  drawCircle() {
    this.setState({
      message: {},
      textClass: ''
    });
    if (this.state.value <= 100
      && this.state.value > 0
      && Number.isInteger(parseFloat(this.state.value))
    ) {
      this.setState({diameter: this.state.value});
    } else {
      this.setState({error: 'You did not enter an integer between 0 and 100!'})
    }
  }
  
  triggerDraw(e) {
    if (e.which === 13) this.drawCircle()
  }
  
  getPost() {
    const postId = this.state.diameter;
    this.setState({loading: true});
    axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`).then((res) => {
      this.setState({
        textClass: 'text',
        message: res.data,
        loading: false
      });
      window.scroll({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    })
  }
  
  render() {
    return (
      <div className="app">
        <h1 className="title">CIRCLE APP</h1>
        <p>Please enter an integer between 0 and 100</p>
        <input
          className="form-item"
          type="text" value={this.state.value}
          onChange={this.setValue}
          onKeyPress={this.triggerDraw} />
        <button className="form-item" onClick={this.drawCircle}>OK</button>
        <p className="error">{this.state.error}</p>
        {!this.state.error &&
          <div className="circle-container">
            <div className="circle">
              <svg onClick={this.getPost}
                   version="1.1"
                   xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 500 500"
                   preserveAspectRatio="xMinYMin meet">
                <circle className="circle" r={this.state.diameter / 2 + '%'} cx="50%" cy="50%"></circle>
              </svg>
            </div>
          </div>
        }
          {this.state.loading &&
            <div className="loader">Loading...</div>
          }
          <div className={this.state.textClass}>
            <h2>{this.state.message.title}</h2>
            <p>{this.state.message.body}</p>
          </div>
      </div>
    );
  }
}

export default App;
