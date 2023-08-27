import { Button } from '@mui/material';
import { useQuestionData } from './hooks/useQuestionData';
import { useQuestionsStore } from './store/question';

export const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionData();
  const reset = useQuestionsStore((state) => state.reset);
  return (
    <footer style={{ marginTop: '16px' }}>
      <strong>{`✅${correct} Corrects -`}</strong>
      <strong>{`❌${incorrect} Incorrects -`}</strong>
      <strong>{`❓${unanswered} Unanswered`}</strong>
      <div style={{ marginTop: '16px' }}>
        <Button
          disabled={unanswered > 0}
          variant='contained'
          onClick={() => reset()}
        >
          Resetear Juego
        </Button>
      </div>
    </footer>
  );
};
