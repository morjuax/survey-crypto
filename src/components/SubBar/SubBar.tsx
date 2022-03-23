import './SubBar.scss';
import { Grid } from '@material-ui/core';
import Cooldown from '../Cooldown/Cooldown';

interface Props {
  title: string;
}

export default function SubBar({title}: Props) {
  return (
    <Grid container spacing={3} className="subBar">
      <Grid item xs={6} className="boxTitle"><h4>{title}</h4></Grid>
      <Grid item xs={6} className="boxRight"><Cooldown/></Grid>
    </Grid>
  );
}