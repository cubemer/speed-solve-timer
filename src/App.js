import React from 'react';
import './App.css';

class Timer extends React.Component {
  state = {
    offset: null,
    clock: 0,
    interval: null,
    solves: [],
  }
  
  update = () => {
    this.setState(prevState => {
      const now = new Date()
      const d = now - prevState.offset

      return({
        offset: now,
        clock: prevState.clock + d
      })
      
    })
  }

  startClockHandler = () => {
    if (!this.state.interval) {
      this.setState({
        offset: new Date(),
        interval: setInterval(this.update, 100)
      })
    }
  }

  stopClockHandler = () => {
    if (this.state.interval) {
      clearInterval(this.state.interval)
      this.setState({interval: null})
    }
  }

  clearClockHandler = () => {
    this.setState(prevState => {
      return {
        offset: new Date(),
        clock: 0,
        solves: [...prevState.solves, prevState.clock]
      }
    })
  }

  getAverage = (arr) => (
    arr.reduce((acc, c) => acc + c) / arr.length
  )

  min = (arr) => {
    let minVal = arr[0];
    arr.forEach(val => {
      if (val <= minVal) {
        minVal = val
      }
    });
    return minVal
  }
  
  toPTag = (arr) => {
    let pTagArray = []
    arr.forEach((val, i) => {
      pTagArray.push(<p key={i}>{val / 1000}</p>)
    });
    return pTagArray;
  }

  render() {
    let solveHistory = this.toPTag(this.state.solves)
    return(
      <div>
        <p>{this.state.clock / 1000}</p>
        <button onClick={this.startClockHandler}>start</button>
        <button onClick={this.stopClockHandler}>stop</button>
        <button onClick={this.clearClockHandler}>clear</button>
        <p>{this.state.solves.length === 0 ? 'get your solve on brother' : `average time: ${(this.getAverage(this.state.solves) / 1000).toFixed(2)}s`}</p>
        <p>{this.state.solves.length === 0 ? null : `your fastest solve is: ${(this.min(this.state.solves) / 1000).toFixed(2)}s`}</p>
        <div>
          {solveHistory}
        </div>
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
