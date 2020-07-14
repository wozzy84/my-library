import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 100,
  },
}));

const Spinner = () => {
  const classes = useStyles();

  return (
    <>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography variant="h4">Loading ...</Typography>
          <CircularProgress />
        </div>
      </Container>
    </>
  );
};

export default Spinner;
