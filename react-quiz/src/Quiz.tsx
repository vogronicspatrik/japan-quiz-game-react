import React, { useEffect, useState } from 'react';
// Components
import QuestionCard from './components/QuestionCard';
import { QuestionState } from './SampleData';
//styles


import { Button, Container, createTheme, MenuItem, Select, ThemeProvider, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import BGImage from './gorin.jpg';
import QuestionService from './services/question-service';
import UserService from './services/user-service';


const theme = createTheme({
  palette: {
    primary: {
      main: "#695104",
    },
    secondary: {
      main: "#695104",
    },
    background:{
      default:'#695104'
    }
  },
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
    //background: 'black',
    border: '2px solid #d38558',
    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.25)',
    height: 40,
    color:"secondary",
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
  const[number, setNumber] = useState(1);
  const[userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const[score, setScore] = useState(0);
  const[gameOver, setGameOver] = useState(true);
  const[difficulty, setDifficulty] = useState("easy");
  const[isLastQ, setIsLastQ] = useState(false);
  const questionService = new QuestionService();
  const userService = new UserService();
  const classes = useStyles();

  const [count, setCount] = useState(10);

  useEffect(() => {
    if (count === 0) {
      console.log("lol")
      checkAnswer();
      return;
    }

    const timer = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [count]);


  const startQuiz = async () =>{
      setLoading(true);
      setGameOver(false);

      const newQuestions = await questionService.getProperQuestions(difficulty);

      setQuestions(newQuestions);
      
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setIsLastQ(false);
      setLoading(false);
  }

  const checkAnswer = (e?: React.MouseEvent<HTMLButtonElement>) =>{

    if(!gameOver && e != null){
      //Users answer
      let answer = "";
      if(e != null){
        answer = e.currentTarget.value;
      }else{
        answer = questions[number].correct_answer;
      }
      //check answer against correct value
      const correct = questions[number].correct_answer === answer;

      if(e != null){
      // Add score if anwsertr is correct, we get point if we dont run out of time
      if(correct) setScore(prev => prev+1);
      }

      //save answer in the array
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers(prev => [...prev, answerObject]);
      if(number === TOTAL_QUESTION-1){
        setIsLastQ(true);
      }
    }

  }

  const calculatePoints = () => {
    let newPoints = score;
    if(difficulty === "medium"){
      newPoints = newPoints*1.2;
    }
    else if(difficulty === "hard"){
      newPoints = newPoints*1.5;
    }
    return newPoints;
  } 

  const nextQuestion = () => {
    //move on to the next if not the last one
    const nextQuestion = number + 1;

    if(nextQuestion === TOTAL_QUESTION){
      //console.log(score);
      userService.setPointsAndDailyQuizDone(calculatePoints());
      setGameOver(true);
    }
    else{
      setNumber(nextQuestion);
      setCount(10);
    }
  }

  const handleDiffChange = (e: any) => {
    setDifficulty(e.target.value);
};

  return (
    <ThemeProvider theme={theme}>
    <div className={classes.root}>
    <Typography variant="h1" className={classes.heading}>
      QUIZ
    </Typography>
    {/* || userAnswers.length === TOTAL_QUESTION */}
    {gameOver ? (
      <Container sx={{display:"flex",flexDirection:"column", textAlign:"center", width:"300px"}}>
        <Select
          labelId="diff-select-label"
          id="diff-select"
          value={difficulty}
          onChange={handleDiffChange}
          sx={{ backgroundColor: "#695104", color: "white", marginRight: 2, width:"200px" }}
          >
          <MenuItem value="easy">Könnyű</MenuItem>
          <MenuItem value="medium">Közepes</MenuItem>
          <MenuItem value="hard">Nehéz</MenuItem>
        </Select>
        <Button variant="contained" className={classes.button} onClick={startQuiz}>
          Start
        </Button>
      </Container>
    ) : null}

    {!gameOver && <Typography variant="h2" className={classes.score}>Score: {score}</Typography>}

    {loading && <Typography>Loading Questions ...</Typography>}

    {!loading && !gameOver && (
      <div>
        <Typography variant="h5">
            Time remaining: {count}s
        </Typography>
        <QuestionCard
          questionNr={number + 1}
          totalQuestion={TOTAL_QUESTION}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      </div>
    )}

    {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTION && !isLastQ? (
      <Button variant="contained" className={classes.button} onClick={nextQuestion}>
        Next Question
      </Button>
    ) : null}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTION && isLastQ ? (
      <Button variant="contained" className={classes.button} onClick={nextQuestion}>
        End Quiz
      </Button>
    ) : null}
  </div>
  </ThemeProvider>
  );
};

export default QuizPage;
