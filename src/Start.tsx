import { Button } from '@mui/material';
import { useQuestionsStore } from './store/question';

const Limit_questions = 7;

export const Start = () => {
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions);

  const handleClick = () => {
    fetchQuestions(Limit_questions);
  };

  return (
    <Button onClick={handleClick} variant='contained' style={{marginTop: '32px'}}>
      ¡Empezar!
    </Button>
  );
};
