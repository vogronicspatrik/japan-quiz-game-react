import { Button, Card, CardContent, Typography } from '@mui/material';
import React,{useEffect, useState} from 'react';
import { AnswerObject } from '../Quiz';

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestion: number;
};



const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestion,
}) => {

  // const [timeRemaining, setTimeRemaining] = useState(10);
  // const [questionOver, setQuestionOver] = useState(false);
  // const [count, setCount] = useState(10);

  //   useEffect(() => {
  //     if (count === 0) {
  //       // callback(null as React.MouseEvent<HTMLButtonElement, MouseEvent>);
  //       return;
  //     }

  //     const timer = setInterval(() => {
  //       setCount(count - 1);
  //     }, 1000);

  //     return () => clearInterval(timer);
  //   }, [count]);

    // useEffect(() => {
    //   if (!questionOver) {
    //     const timer = setInterval(() => {
    //       setTimeRemaining(prevTime => {
    //         const newTime = prevTime - 1;
    //         console.log(questionOver);
    //         console.log(timeRemaining);
    //         if (newTime === 0) {
    //           clearInterval(timer);
    //           setQuestionOver(true);
    //         }
    //         return newTime;
    //       });
    //     }, 1000);

    //     return () => clearInterval(timer);
    //   }
    // }, [questionOver]);




  return (
    <Card>
      <CardContent>
        <Typography sx={{textAlign:"center"}} variant="h6" color="text.secondary">
          Question: {questionNr} / {totalQuestion}
        </Typography>
        <Typography sx={{textAlign:"center"}} variant="body1" dangerouslySetInnerHTML={{ __html: question }} />
        <div>
          {answers.map((answer) => (
            <Button
              key={answer}
              variant={
                userAnswer?.answer === answer
                  ? 'contained'
                  : userAnswer?.correctAnswer === answer
                  ? 'outlined'
                  : 'text'
              }
              disabled={userAnswer ? true : false}
              onClick={callback}
              value={answer}
              sx={{
                marginTop: '10px',
                borderRadius: '10px',
                borderColor: userAnswer?.correctAnswer === answer ? '#4caf50' : undefined,
                backgroundColor: userAnswer?.answer === answer ? '#ffeb3b' : undefined,
                '&:hover': {
                  backgroundColor: userAnswer?.answer === answer ? '#ffeb3b' : '#f5f5f5',
                },
              }}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
