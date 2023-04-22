import React, { ChangeEvent, Component } from 'react'
import styles from "./type.module.scss"
//Define interface variables
interface State {
  typeTest: string
  words: Array<string>
  enteredText: string
  correctCount: number
  started: boolean
  startTime: Date | null
  wordsPerMinute: number | null
}
//Assign values to variables
class TypingSpeed extends Component {
  state: State = {
    typeTest : 'Hello welcome to ArcadeMania',
    words: [],
    enteredText: '',
    correctCount: 0,
    started: false,
    startTime: null,
    wordsPerMinute: null
  } 

  componentDidMount() {
    this.setState({words: this.state.typeTest.split(' ')})
  }
//Calculate typing speed per minute
  wordsPerMinute = (charsTyped: number, millis: number): number =>
    Math.floor((charsTyped / 5) / (millis / 60000))

  checkFinished = (): void => {
    if (!this.state.words.length) {
      if (this.state.startTime) {
        const timeMillis: number = new Date().getTime() - this.state.startTime.getTime()
        const wpm = this.wordsPerMinute(this.state.typeTest.length, timeMillis)
        this.setState({wordsPerMinute: wpm})
      }
    }
  }

  onWordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!this.state.started) {
      this.setState({started: true, startTime: new Date()})  
    }

    console.log(e.currentTarget.value)
    const enteredText = e.currentTarget.value.trim()
    this.setState({enteredText})
    if (enteredText === this.state.words[0]) {
      console.log('Right')
      this.setState({correctCount: this.state.correctCount + 1})
      this.setState({enteredText: ''})
      this.setState({words: this.state.words.slice(1)},
                    (): void => this.checkFinished())
    }
  }

//Display heading and body
  render() {
    return (
      <div className={styles.App}>
        <h1 className={styles['heading']}>{this.state.wordsPerMinute ? `${this.state.wordsPerMinute} WPM`
                                       : 'Test Your Typing Speed, Scrub!'}</h1>
        <h1 className={styles['score']}>{this.state.correctCount}</h1>
        <h3 className={styles['sub_heading']}>Type the following:</h3>
        <h6>{this.state.words.map(word => word === this.state.words[0] ? 
              <em className={styles['current-word']}>{word} </em> : word + ' ')}</h6>
        <input className={styles['entryfield']} value={this.state.enteredText} 
               onChange={this.onWordChange}/>
      </div>
    )
  }
}

export default TypingSpeed
