import React from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import Moment from 'react-moment'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 250,
    maxHeight: 500,
    marginRight: 12,
    [theme.breakpoints.down('xs')]: {
      margin: "0 20px",
    },
  },
  button: {
    width: '100%',
    fontWeight: 700
  },
  price: {
    fontSize: 17,
    fontWeight: 600,
    marginBottom: 10
  },
  date: {
    fontSize: 14,
    fontWeight: 600
  }
}));

export default function BiddingCard(props) {
  const classes = useStyles();
  const history = useHistory()

  const navigate = (id) => {
    history.push(`/bid/${id}`)
  }

  return props.data.ItemPictures.length > 0 && (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="200"
          image={require("../../assets/images/" + props.data.ItemPictures[0].path)}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom component="h1" variant="h6" style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
            {props.data.name}
          </Typography>
          <Typography style={{ marginTop: -7 }} gutterBottom color="textSecondary" component="h3" variant="p">
            {props.data.User.fullname}
          </Typography>
          <Typography className={classes.price}>
            Rp. {props.data.current_price.toLocaleString()}
          </Typography>
          <Typography color="secondary" className={classes.date}>
            Ends <Moment from={new Date()}>{props.data.end_date}</Moment>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button className={classes.button} color="secondary" variant="contained" onClick={() => navigate(props.data.id)}>
          View
        </Button>        
      </CardActions>
    </Card>
  )
}
