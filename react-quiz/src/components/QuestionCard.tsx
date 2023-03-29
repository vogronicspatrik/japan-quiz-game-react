import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
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
