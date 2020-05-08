import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useState, useEffect } from "react";
import { firebaseStorage } from "../config";
import { useDispatch, useSelector } from "react-redux";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import { IconButton } from "@material-ui/core";
import {  useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  LinearProgress: {
    width: "80%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  deleteButton: {
    marginLeft: -10,
  },
  progressField: {
    postion: "relative",
  },
  addedFiles: {
    margin: theme.spacing(1),
    justifyContent: "center",
    alignItems: "center",
  },
  fileName: {
    fontSize: 14,
    maxWidth: 300,
  },
}));

export default function AddFile() {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [currentFile, setCurrentFile] = useState(null);
  const [progressValue, setProgressValue] = useState(0);
  const dispatch = useDispatch();
  const [completed, setCompleted] = useState(false);
  const [task, setTask] = useState(null);
  const reference = useSelector((state) => state.reference);
  const clearStorage = useSelector((state) => state.clearStorage);
  const closeAnyModal = useSelector((state) => state.openAnyModal);

  const handleDelete = () => {
    task.cancel();
    if (firebaseStorage.ref(reference)) {
      firebaseStorage.ref(reference).delete();
    }
    setCurrentFile(null);
    setProgressValue(0)
  };

  const handleInputChange = (e) => {
    if (e.target.files) {
      setCurrentFile(e.target.files[0]);
      dispatch({
        type: "SET_REFERENCE",
        reference: "images_pw/" + e.target.files[0].name,
      });
    }
  };

  useEffect(() => {
    if (currentFile) {
      let storageRef = firebaseStorage.ref("images_pw/" + currentFile.name);
      let uploadTask = storageRef.put(currentFile);

      uploadTask.on(
        "state_changed",
        function progress(snapshot) {
          let percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgressValue(percentage);
          setTask(snapshot.task);
        },
        function (error) {
          console.log(error);
        },

        function () {
          uploadTask.snapshot.ref.getDownloadURL().then(function (link) {
            dispatch({
              type: "DOWNLOAD_LINK",
              link: link,
            });
          });
          setCompleted(true);
          enqueueSnackbar("Plik został dodany do bazy", { variant: "success" });
          if (clearStorage) {
            firebaseStorage.ref(reference).delete();
          }
        }
      );
    }
  }, [currentFile]);

  useEffect(() => {
    if (!closeAnyModal && progressValue > 0 && progressValue < 100) {
      
      task.cancel();
      enqueueSnackbar("Przerwano wczytywanie pliku do bazy", {
        variant: "error",
      });
    }
  }, [closeAnyModal]);

  return (
    <>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6">Dodaj plik</Typography>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.root}>
          <input
            accept="/.epub, .mobi"
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

      {currentFile && (
        <Grid
          container
          spacing={2}
          className={classes.addedFiles}
          wrap="nowrap"
        >
          <Grid item xs={12} sm={6} noWrap>
            <Typography className={classes.fileName} noWrap>
              {currentFile ? currentFile.name : null}
            </Typography>
          </Grid>
          <Grid item xs={9} sm={5}>
            <LinearProgress variant="determinate" value={progressValue} />
          </Grid>
          <Grid item xs={3} sm={1}>
            <IconButton
              className={classes.deleteButton}
              onClick={handleDelete}
              color="secondary"
            >
              <DeleteForeverOutlinedIcon />
            </IconButton>
          </Grid>
        </Grid>
      )}
    </>
  );
}
