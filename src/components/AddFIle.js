import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useState } from "react";
import { firebaseStorage } from "../config";
import { useDispatch, useSelector } from "react-redux";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import { IconButton } from "@material-ui/core";


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
    width: "80%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  },
  deleteButton: {
    marginLeft: -10
  },
  progressField: {
    postion: "relative"
  },
  addedFiles: {
    margin: theme.spacing(1),
    justifyContent: "center",
    alignItems: "center"
  },
  fileName: {
    
    fontSize: 14 

  }
}));

export default function AddFile() {
  const classes = useStyles();
  const [currentFile, setCurrentFile] = useState(null);
  const [progressValue, setProgressValue] = useState(0);
  const dispatch = useDispatch();
  const [completed, setCompleted] = useState(false);

  const reference = useSelector(state => state.reference)
  const clearStorage = useSelector(state=> state.clearStorage)

  const handleDelete = () => {
    firebaseStorage.ref(reference).delete()
    setCurrentFile(null)

  };

  const handleInputChange = e => {
    setCurrentFile(e.target.files[0]);
    dispatch({
     type: "SET_REFERENCE",
     reference:"images_pw/" + e.target.files[0].name  
    });
    const storageRef = firebaseStorage.ref("images_pw/" + e.target.files[0].name);
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
          dispatch({
            type: "DOWNLOAD_LINK",
            link: link
          });
        });
        setCompleted(true)
        if(clearStorage) {
          firebaseStorage.ref(reference).delete()
        }

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
      {currentFile &&
             <Grid container xs={12} spacing={2} className={classes.addedFiles}>
        <Grid item xs={12} sm={6} wrap="nowrap">
          <Typography className={classes.fileName} noWrap>{currentFile ? currentFile.name : null}</Typography>
        </Grid>
        <Grid item xs={9} sm={5}>
          <LinearProgress variant="determinate" value={progressValue} />
        </Grid>

        <Grid item xs={3} sm={1}>
          <IconButton className={classes.deleteButton} onClick={handleDelete} disabled={completed?false:true}>
            <DeleteForeverOutlinedIcon />
          </IconButton>
        </Grid>
      </Grid> 
      }

    </>
  );
}
