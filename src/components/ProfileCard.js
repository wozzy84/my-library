import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import clsx from "clsx";
import { auth } from "../config";
import { useSelector, useDispatch } from "react-redux";
import OutsideClickHandler from "react-outside-click-handler";

const useStyles = makeStyles(theme => ({
  root: {
    width: 225,
    position: "absolute",
    top: 50,
    right: 10,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500]
  },
  center: {
    margin: "auto",
    marginBottom: 15
  }
}));

export default function OutlinedCard(props) {
  const classes = useStyles();
  const loggedUser = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const handleClick = () => {
    auth
      .signOut()
      .then(() => {
        dispatch({
          type: "LOGGED_USER",
          user: {}
        });
      })
      .catch(error => console.log(error));
  };
  const avatarLetter = loggedUser.email[0].toUpperCase();

  return (
    <>
      <OutsideClickHandler
        onOutsideClick={() => {
          if (props.profileWasClicked) {
            props.closeProfileCard(true);
          }
        }}
      >
        {props.profileWasClicked && (
          <Card className={classes.root} variant="elevation">
            <CardContent>
              <Avatar className={clsx(classes.orange, classes.center)}>
                {avatarLetter}
              </Avatar>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Jesteś zalogowany jako:
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {loggedUser.email}
              </Typography>
              <Typography variant="body2" component="p">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                className={classes.pos}
                size="medium"
                variant="outlined"
                color="primary"
                onClick={handleClick}
              >
                Wyloguj
              </Button>
            </CardActions>
          </Card>
        )}
      </OutsideClickHandler>
    </>
  );
}
