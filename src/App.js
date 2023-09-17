import React, { Fragment } from 'react'

import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
import 'audio-react-recorder/dist/index.css'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      recordState: null,
      visibility:false,
      audioData: null,
      counter: 0,
      letter: "A",
      pages: ["A","B","C"],
      btnText: "Next",
      btnClass:"btn btn-lg btn-primary",
      recordings:[]
    }

    for(let item of this.state.pages)
      this.state.recordings.push({label:item,value:null,blob:null})   

  }

  start = () => {
    this.state.recordState = RecordState.START
    this.setState(this.state)
  }



  // const [state, setState] = this.useState({
  //   counter: 0,
  //   letter: "A",
  //   pages: ["A","B","C"],
  //   btnText: "Next",
  //   btnClass:"btn btn-lg btn-primary"
  // });

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

  showApp=()=>{
    this.state.visibility = true
    this.setState(this.state)
    this.start()
  }

  onStop2 = (data) => {
    let record = this.state.recordings.find(x=>x.label===this.state.letter)
    if(record)
      record.blob = data
    //this.state.recordings.find(x=>x.label===this.state.letter).blob = data
    this.setState(this.state)
    console.log('onStop: audio data', data)
    this.next()
  }

  onStop = (data) => {
    this.setState({
      audioData: data
    })

    console.log('onStop: audio data', data)
  }

  next = () => {
    let newCount = this.state.counter + 1;
    if (this.state.counter < this.state.pages.length) {
      this.state.recordState = RecordState.STOP      
      this.start()
      this.state.recordings.find(x=>x.label==this.state.letter).value = "recording done"+this.state.letter
      let newLetter = this.state.pages[newCount]
      const state = this.state
      this.state.counter = newCount
      this.state.letter = newLetter
      if (newCount === this.state.pages.length - 1) {
        this.state.btnText = "Finish"
      }        
    }
    if(this.state.counter===this.state.pages.length){
      this.stop()
      this.state.btnClass = "d-none"
    }
    this.setState(this.state)
  }


  render() {

    const { recordState } = this.state

    const Recordings = () =>{
      const products = this.state.recordings;

      const list = [] 
      this.state.recordings.map((v,k)=>{
        console.log(v)
        list.push(<li key={k}>{v.value} 
                <audio

          controls
          src={v.blob ? v.blob.url : null}
        ></audio>

        </li>)
      })
      
    
      return (
        <div>
          {list}
        </div>
      )
    }

    const Page= ()=>{
      return (
        <div className="App">
          {/* <input
            type="button"
            className={this.state.btnClass}
            name="test"
            value={this.state.btnText}
            onClick={this.next}
          /> */}

           <button id='stop' onClick={this.stop}
                       type="button"
                       className={this.state.btnClass}
                       //name="test"
                       //value={this.state.btnText}
                       //onClick={this.next}
           >
          {this.state.btnText}
        </button>       
  
          {this.state.counter < this.state.pages.length ? <div style={{display:'block'}}>{this.state.letter}</div>:''}
        
          {this.state.counter===this.state.pages.length && <Recordings/>}
        
        
        </div>)
    }    
    return (
      <div>
          
        {this.state.visibility?<Page/>:''}
        {!this.state.visibility?<button onClick={this.showApp}>Start</button>:''}
        <div style={{display:'none'}}>

        <AudioReactRecorder
          state={recordState}
          onStop={this.onStop2}
          backgroundColor='rgb(255,255,255)'
        />
        </div>
        {/* <audio
          id='audio'
          controls
          src={this.state.audioData ? this.state.audioData.url : null}
        ></audio>
        <button id='record' onClick={this.start}>
          Start
        </button>
        <button id='pause' onClick={this.pause}>
          Pause
        </button> */}
        {/* <button id='stop' onClick={this.stop}>
          Stop
        </button> */}
      </div>
    )
  }
}

export default App
