import { createStyles, makeStyles, Theme, Toolbar, Typography, AppBar } from '@material-ui/core';
import BtnMetamask from './BtnMetamask/BtnMetamask';
import Balance from './Balance/Balance';
import { useNavigate } from 'react-router-dom';
import Cooldown from './Cooldown/Cooldown';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textTransform: 'uppercase',
      cursor: 'pointer'
    },
  }),
);

function Header(): JSX.Element {
  const classes = useStyles();
  const navigate = useNavigate();

  function goHome() {
    navigate("/");
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title} onClick={goHome}>
            Survey Crypto
          </Typography>
          <Balance/>
          <BtnMetamask/>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default  Header;