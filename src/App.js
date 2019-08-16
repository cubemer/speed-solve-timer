import React from 'react';
import './App.css';

class Timer extends React.Component {
  state = {
    offset: null,
    clock: 0,
    interval: null,
    solves: [],
    buttonStarts: true
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

  ssButtonClickedHandler = () => {
    if (!this.state.interval) {
      this.setState({
        buttonStarts: false,
        offset: new Date(),
        interval: setInterval(this.update, 100)
      })
    }
    if (this.state.interval) {
      clearInterval(this.state.interval)
      this.setState({
        buttonStarts: true,
        interval: null
      })
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
    let solveHistory = this.toPTag(this.state.solves);
    let ssButton = <button onClick={this.ssButtonClickedHandler}>start</button>
    if (!this.state.buttonStarts) {
      ssButton = <button onClick={this.ssButtonClickedHandler}>stop</button>
    }
    return(
      <div className='timer'>
        <div className='clock'>
          <p>{this.state.clock / 1000}</p>
          {ssButton}
          <button onClick={this.clearClockHandler}>add & clear</button>
        </div>
        <div className='display'>
          <div className='solve-history'>
            <p>previous solves:</p>
            {solveHistory}
          </div>
          <div className='solve-stats'>
            <p>{this.state.solves.length === 0 ? 'average time: (not yet available)' : `average time: ${(this.getAverage(this.state.solves) / 1000).toFixed(2)}s`}</p>
            <p>{this.state.solves.length === 0 ? 'fastest time: (not yet available)' : `fastest time: ${(this.min(this.state.solves) / 1000).toFixed(2)}s`}</p>
          </div>
        </div>
      </div>
    )
  }
}

class App extends React.Component {
  
  render() {
    return (
      <div className="App">
        {/* <header className="header">
          <p>
            time your speedy cube solves.
          </p>
        </header> */}
        <Timer/>
      </div>
    );
  }
}

export default App;
