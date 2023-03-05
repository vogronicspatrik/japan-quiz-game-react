import React, {useState} from 'react';
import { fetchQuizQuestions } from './SampleData';
// Components
import QuestionCard from './components/QuestionCard';
import { QuestionState } from './SampleData';
//styles
import { GlobalStyle, Wrapper } from './App.styles';

const TOTAL_QUESTION = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const App = () => {

  const [loading, setLoading] = useState(false);
  const[questions, setQuestions] = useState<QuestionState[]>([]);
  const[number, setNumber] = useState(0);
  const[userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const[score, setScore] = useState(0);
  const[gameOver, setGameOver] = useState(true);

  console.log(questions);

  const startQuiz = async () =>{
      setLoading(true);
      setGameOver(false);

      const newQuestions = fetchQuizQuestions();

      setQuestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) =>{

    if(!gameOver){
      //Users answer
      const answer = e.currentTarget.value;
      //check answer against correct value
      const correct = questions[number].correct_answer === answer;
      // Add score if anwsertr is correct
      if(correct) setScore(prev => prev+1);
      //save answer in the array
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers(prev => [...prev, answerObject]);
    }

  }

  const nextQuestion = () => {
    //move on to the next if not the last one
    const nextQuestion = number + 1;

    if(nextQuestion === TOTAL_QUESTION){
      setGameOver(true);
    }
    else{
      setNumber(nextQuestion);
    }

  }


  return (
    <>
    <GlobalStyle/>
    <Wrapper>
      <h1>QUIZ</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTION ? (
      <button className='start' onClick={startQuiz}>Start</button>
      ) : null}

      {!gameOver ? <p className='score'>Score: {score}</p> : null}

      {loading && <p>Loading Questions ...</p>}

      {!loading && !gameOver && (
      <QuestionCard
        questionNr={number + 1}
        totalQuestion={TOTAL_QUESTION}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      />
      )}

      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTION - 1 ? (
        <button className='next' onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
    </Wrapper>
    </>
  );
}

export default App;
