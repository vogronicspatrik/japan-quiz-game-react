import React, {useState} from 'react';
import { fetchQuizQuestions } from './SampleData';
// Components
import QuestionCard from './components/QuestionCard';
import { QuestionState } from './SampleData';
//styles


import QuestionService from './services/question-service';

import { makeStyles } from '@mui/styles';
import { Typography, Button, createTheme, ThemeProvider, Container, MenuItem, Select } from '@mui/material';
import BGImage from './background.jpg';


const theme = createTheme({
  spacing: 8,
  typography: {
    fontFamily: 'Shojumaru',
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${BGImage})`,
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: theme.spacing(0, 2),
    boxSizing: 'border-box',
    //fontFamily: 'Shojumaru, sans-serif',
    color: '#fff',
  },
  heading: {
    fontSize: '3rem',
    fontWeight: 400,
    textAlign: 'center',
    backgroundImage: 'linear-gradient(180deg, #fff, #87f1ff)',
    backgroundSize: '100%',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    MozBackgroundClip: 'text',
    MozTextFillColor: 'transparent',
    filter: 'drop-shadow(2px 2px #0085a3)',
    // margin: theme.spacing(4, 0),
  },
  score: {
    fontSize: '2rem',
    // margin: theme.spacing(0, 0, 2),
  },
  button: {
    cursor: 'pointer',
    background: 'linear-gradient(180deg, #fff, #ffcc91)',
    border: '2px solid #d38558',
    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.25)',
    height: 40,
    // margin: theme.spacing(2, 0),
    // padding: theme.spacing(0, 4),
    maxWidth: 200,
    '&:hover': {
      backgroundColor: '#ffcc91',
    },
  },
}));



const TOTAL_QUESTION = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const QuizPage = () => {

  const [loading, setLoading] = useState(false);
  const[questions, setQuestions] = useState<QuestionState[]>([]);
  const[number, setNumber] = useState(0);
  const[userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const[score, setScore] = useState(0);
  const[gameOver, setGameOver] = useState(true);
  const[difficulty, setDifficulty] = useState("easy");

  const questionService = new QuestionService();

  const classes = useStyles();

  const startQuiz = async () =>{
      setLoading(true);
      setGameOver(false);

      const newQuestions = await questionService.getProperQuestions(difficulty);

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

  const handleLanguageChange = (e: any) => {
    setDifficulty(e.target.value);
    console.log(e.target.value);
    // i18n.changeLanguage(e.target.value);
};


  return (
    <ThemeProvider theme={theme}>
    <div className={classes.root}>
    <Typography variant="h1" className={classes.heading}>
      QUIZ
    </Typography>
    {gameOver || userAnswers.length === TOTAL_QUESTION ? (
      <Container sx={{display:"flex",flexDirection:"column", maxWidth:"200px", textAlign:"center", width:"300px"}}>
        <Select
          labelId="diff-select-label"
          id="diff-select"
          value={difficulty}
          onChange={handleLanguageChange}
          sx={{ backgroundColor: "#333", color: "#fff", marginRight: 2, width:"200px" }}
          >
          <MenuItem value="easy">Könnyű</MenuItem>
          <MenuItem value="medium">Közepes</MenuItem>
          <MenuItem value="hard">Nehéz</MenuItem>
        </Select>
        <Button variant="contained" color="primary" className={classes.button} onClick={startQuiz}>
          Start
        </Button>
      </Container>
    ) : null}

    {!gameOver && <Typography variant="h2" className={classes.score}>Score: {score}</Typography>}

    {loading && <Typography>Loading Questions ...</Typography>}

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
      <Button variant="contained" color="primary" className={classes.button} onClick={nextQuestion}>
        Next Question
      </Button>
    ) : null}
  </div>
  </ThemeProvider>
  );
};

export default QuizPage;
