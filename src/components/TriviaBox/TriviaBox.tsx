import './TriviaBox.scss'
import {
  Button,
  Card, CardActionArea,
  CardActions,
  CardContent, CardMedia,
  createStyles,
  makeStyles,
  Theme, Typography
} from '@material-ui/core';
import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    media: {
      height: 140,
    },
  }),
);

interface Props {
  id: number;
  name: string;
  image: string;
  description?: string;
}

export default function TriviaBox({id, name, image, description}: Props) {
  const classes = useStyles();
  const navigate = useNavigate();
  function play() {
    navigate("/quiz/1");
  }
  return (
    <Fragment>
      <Card>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={`/assets/images/${image}`}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className="cActions">
          <Button size="small" color="primary" variant="contained" onClick={play}>Play</Button>
        </CardActions>
      </Card>
    </Fragment>
  )
}