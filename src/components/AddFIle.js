import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useState } from "react";
import { firebaseStorage } from "../config";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  input: {
    display: "none"
  },
  LinearProgress: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

export default function AddFile() {
  const classes = useStyles();
  const [currentFile, setCurrentFile] = useState(null);
  const [progressValue, setProgressValue] = useState(0);
  const [downloadLink, setDownloadLink] = useState("");

  const handleInputChange = e => {
    setCurrentFile(e.target.files[0]);

    const storageRef = firebaseStorage.ref(
      "images_pw/" + e.target.files[0].name
    );
    const uploadTask = storageRef.put(e.target.files[0]);

    uploadTask.on(
      "state_changed",
      function progress(snapshot) {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgressValue(percentage);
      },
      function(error) {
        console.log(error);
      },
      function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(link) {
          console.log(link);
        });
      }
    );
  };

  return (
    <>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6">Dodaj plik</Typography>
      </Grid>
      <Grid xs={12}>
        <div className={classes.root}>
          <input
            accept="/*"
            className={classes.input}
            id="contained-button-file"
            type="file"
            onChange={handleInputChange}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" component="span">
              Załaduj
            </Button>
          </label>
        </div>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography color="primary">
          {currentFile ? currentFile.name : null}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <div className={classes.LinearProgress}>
          <LinearProgress variant="determinate" value={progressValue} />
        </div>
      </Grid>
    </>
  );
}
