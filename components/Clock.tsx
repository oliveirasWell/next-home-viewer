/* eslint-disable */

import { Component } from 'react'

export class Clock extends Component<{}, { time: string }> {
  // @ts-ignore
  constructor(props) {
    // @ts-ignore
    super(props)

    //This declared the state of time at the very beginning
    this.state = {
      time: new Date().toLocaleTimeString(),
    }
  }

  //This happens when the component mount and the setInterval function get called with a call back function updateClock()
  componentDidMount() {
    // @ts-ignore
    this.intervalID = setInterval(() => this.updateClock(), 1000)
  }

  //This section clears setInterval by calling intervalID so as to optimise memory
  componentWillUnmount() {
    // @ts-ignore
    clearInterval(this.intervalID)
  }

  //This function set the state of the time to a new time
  updateClock() {
    this.setState({
      time: new Date().toLocaleTimeString(),
    })
  }

  // @ts-ignore
  render() {
    return (
      <div className="Time">
        <p> {this.state.time}</p>
      </div>
    )
  }
}
