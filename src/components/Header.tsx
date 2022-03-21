import { createStyles, IconButton, makeStyles, Theme, Toolbar, Typography, AppBar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import BtnMetamask from './BtnMetamask/BtnMetamask';

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
      textTransform: 'uppercase'
    },
  }),
);

function Header(): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Survey Crypto
          </Typography>
          <BtnMetamask/>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default  Header;