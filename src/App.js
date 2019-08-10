import React from 'react';
import './App.css';

class Timer extends React.Component {
  state = {
    offset: null,
    clock: 0,
    interval: null
  }

  componentDidMount() {
    this.setState({
      offset: new Date()
    })
  }

  componentDidUpdate() {
    console.log(this.state.offset);
  }
  
  updateClockHandler = () => {
    this.setState(prevState => {
      const now = new Date()
      const d = now - prevState.offset

      return({
        offset: now,
        clock: prevState.clock + d
      })
      
    })
  }

  clearClockHandler = () => {
    this.setState({
      offset: new Date(),
      clock: 0,
      interval: null
    })
  }


  render() {
    return(
      <div>
        <p>{this.state.clock / 1000}</p>
        <button onClick={this.updateClockHandler}>start</button>
        <button onClick={this.clearClockHandler}>clear</button>
      </div>
    )
  }
}

class App extends React.Component {
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            time your speedy cube solves.
          </p>
        </header>
        <Timer/>
      </div>
    );
  }
}

export default App;
