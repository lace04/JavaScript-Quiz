// import { IconButton, Stack } from '@mui/material'
import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { useQuestionsStore } from './store/question';

import { type Question as QuestionType } from './types';
import { Footer } from './Footer';

const getBackgroundColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info;
  if (userSelectedAnswer == null) return 'transparent';
  if (index !== correctAnswer && index !== userSelectedAnswer)
    return 'transparent';
  if (index === correctAnswer) return '#4caf50';
  if (index === userSelectedAnswer) return '#f44336';
  return 'transparent';
};

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer);

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex);
  };

  return (
    <Card
      variant='outlined'
      sx={{
        bgcolor: '#222',
        p: 2,
        textAlign: 'left',
        marginTop: 4,
        maxWidth: '100%',
      }}
    >
      <Typography variant='h5'>{info.question}</Typography>

      <SyntaxHighlighter language='javascript' style={dracula}>
        {info.code}
      </SyntaxHighlighter>

      <List sx={{ bgcolor: '#333' }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              onClick={createHandleClick(index)}
              sx={{
                backgroundColor: getBackgroundColor(info, index),
              }}
            >
              <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export const Game = () => {
  const questions = useQuestionsStore((state) => state.questions);
  const currentQuestion = useQuestionsStore(
    (state) => state.currentQuestionIndex
  );
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion);
  const goPrevQuestion = useQuestionsStore((state) => state.goPrevQuestion);

  const questionInfo = questions[currentQuestion];

  return (
    <>
      <Stack
        direction='row'
        gap={2}
        alignItems='center'
        justifyContent='center'
      >
        <IconButton onClick={goPrevQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>
        {currentQuestion + 1} / {questions.length}
        <IconButton
          onClick={goNextQuestion}
          disabled={currentQuestion > questions.length - 1}
        >
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  );
};
