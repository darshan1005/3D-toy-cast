import { IconButton, Snackbar } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';

interface snackbarProps {
  open: boolean;
  close: () => void;
  message: string;
}

const SnacKBar = ({ open, close, message }: snackbarProps) => {

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => close()}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        action={action}
        message={message}
      />
    </>
  )
}

export default SnacKBar