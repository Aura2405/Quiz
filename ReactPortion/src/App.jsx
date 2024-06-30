import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {

  useEffect(() => {
    fetchquestions()
  }, [])

  const [seconds, setSeconds] = useState(0);

  const CountdownTimer = (initialSeconds) => {
    setSeconds(initialSeconds)
  }
    
  useEffect(() => {

    if( seconds <= 0 && quizRunning){
      endGame()
    }
      
    const timer = setInterval(() => {
    setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);
      
      
    return () => clearInterval(timer);
    }, [seconds]);
    
    

  const [questions, setQuestions] = useState([])
  const [renderSite, setRenderSite] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [quizRunning, setQuizRunning] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState()

  const fetchquestions = () =>{
    axios.get('http://127.0.0.1:8000/quiz/questions/')
    .then(response => {
      setQuestions(response.data)
      setRenderSite(true)
    })
  }

  const startGame = () =>{
    setQuizScore(0)
    setQuizRunning(true)
    selectRandomQues()
    CountdownTimer(10)
  }

  const endGame = () => {
    setQuizRunning(false)
  }

  const selectRandomQues = () => {
    // if(questionsLeft.length < 1){ 
    //   console.log(questions)
    //   let tempArr = questions.slice(0)
    //   console.log(tempArr)
    //   setQuestionsLeft(tempArr)
    //   console.log(questionsLeft)
    // }
    // No idea why this isn't working


    var index = Math.floor(Math.random() * questions.length)
    setSelectedQuestion(questions[index])

  
  }

  function checkAnswer(e){
    if(e.target.id == selectedQuestion.correctIndex){
      console.log('This was the correct answer')
      setQuizScore(quizScore + 1)
      selectRandomQues()
      setSeconds(10)
    }
    else{
      console.log('This was no the correct answer')
      setQuizScore(0)
      selectRandomQues()
    }
  }



  const quizInterface = () => {
    return(
      <>
      <div>
        <div className="Question">
          Question of the day is : {selectedQuestion.question}
        </div>
        <button id={1} onClick={checkAnswer}>
          Option 1 : {selectedQuestion.option1}
        </button> <button id={2} onClick={checkAnswer}>
          Option 2 : {selectedQuestion.option2}
        </button> <button id={3} onClick={checkAnswer}>
          Option 3 : {selectedQuestion.option3}
        </button> <button id={4} onClick={checkAnswer}>
          Option 4 : {selectedQuestion.option4}
        </button>
      </div>
      <div>
        Score : { quizScore } Timer : { seconds }
        <button onClick={endGame}>Exit Quiz</button>
      </div>
      </>
    )
  }

  if(renderSite){
  return (
    <>

      {quizRunning ? quizInterface() : (
      <button onClick={startGame}>
        Start Game
      </button>)
      }
      <div> Previous Score : { quizScore }</div>
    </>
  )
  }
  else{
    return(
      <>
        LOADING.... Waiting to fetch data from backend
      </>
    )
  }
}

export default App
