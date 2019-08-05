import React from 'react';
import './App.css';

class Timer extends React.Component {
  state = {
    startTime: null,
    now: null
  }

  componentDidMount() {
    this.setState({
      startTime: new Date().getTime().toString()
    })
  }

  componentDidUpdate() {
    const currentDate = new Date().getTime()
    this.setState(prevState => {
      if (prevState.now !== currentDate) {
        return {
          now: currentDate
        }
      }
    })
  }


  render() {
    return(
      <div>
        <p>
          you started at: {this.state.startTime}
        </p>
        <p>
          it is now: {this.state.now}
        </p>
        <p>
          it has been: {this.state.now - this.state.startTime} time units
        </p>
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
