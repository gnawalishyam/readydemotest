import React from 'react'

import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
import 'audio-react-recorder/dist/index.css'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      recordState: null,
      audioData: null,

    }
  }

  start = () => {
    this.setState({
      recordState: RecordState.START
    })
  }





  pause = () => {
    this.setState({
      recordState: RecordState.PAUSE
    })
  }

  stop = () => {
    this.setState({
      recordState: RecordState.STOP
    })
  }

  onStop = (data) => {
    this.setState({
      audioData: data
    })
    console.log('onStop: audio data', data)
  }



  render() {
    const { recordState } = this.state

    const Page= ()=>{
      return (
        <div className="App">
          All tasks finished
        </div>)
    }    
    return (
      <div>
        <Page/>
      </div>
    )
  }
}

export default App
