import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { db } from "../config";
import { useSelector, useDispatch } from "react-redux";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import { intialInfo } from "../reducers";
import Link from "@material-ui/core/Link";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import { firebaseStorage } from "../config";

export default function DisplayBookInfo(props) {
  const useStyles = makeStyles((theme) => ({
    appBar: {
      position: "relative",
    },
    layout: {
      width: "auto",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(500 + theme.spacing(2) * 2)]: {
        width: 500,
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
    paper: {
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        padding: theme.spacing(1),
      },
      second: {
        fontSize: 6,
      },
    },
    toolbar: {
      width: "100%",
      justifyContent: "flex-end",
    },
    actionBtn: {
      margin: 5,
    },
    actionBtnContainer: {
      marginRight: -40,
      marginTop: 10,
      marginBottom: -10,
    },
    download: {
      marginTop: 15,
      width: 80,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  }));

  const classes = useStyles();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.openInfoModal.data);
  const handleDelete = () => {
    db.collection("books")
      .doc(data.id)
      .delete()
      .then(function () {
        console.log("file deleted");
        dispatch({
          type: "TABLE_UPDATED",
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    dispatch({
      type: "OPEN_INFO_MODAL",
      payload: {
        open: false,
        data: intialInfo,
      },
    });
    if (data.reference && data.reference.length) {
      firebaseStorage
        .ref(data.reference)
        .delete()
        .then(function () {
          "file deleted";
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleEdit = () => {
    dispatch({
      type: "IS_EDITING",
      edit: true,
    });
  };

  return (
    <div className={classes.layout}>
      <Paper elevation={0} className={classes.paper}>
        <React.Fragment>
          <Grid container>
            <Grid item xs={9}>
              <Typography variant="h6" gutterBottom>
                Informacje o książce:
              </Typography>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography>{data.title}</Typography>
                <Typography variant="subtitle2">
                  <Box color="text.secondary">Tytuł</Box>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>{data.author}</Typography>
                <Typography variant="subtitle2">
                  <Box color="text.secondary">Autor</Box>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>{data.publisher}</Typography>
                <Typography variant="subtitle2">
                  <Box color="text.secondary">Wydawnictwo</Box>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>
                  {typeof data.date.toDate == "function"
                    ? data.date.toDate().getFullYear().toString()
                    : null}
                </Typography>
                <Typography variant="subtitle2">
                  <Box color="text.secondary">Data Wydania</Box>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>{data.owner}</Typography>
                <Typography variant="subtitle2">
                  <Box color="text.secondary">Właściciel</Box>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>{data.genre}</Typography>
                <Typography variant="subtitle2">
                  <Box color="text.secondary">Kategoria</Box>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>{data.format}</Typography>
                <Typography variant="subtitle2">
                  <Box color="text.secondary">Format</Box>
                </Typography>
              </Grid>
              {data.format !== "ebook" && (
                <Grid item xs={12} sm={6}>
                  <Typography>{data.library}</Typography>
                  <Typography variant="subtitle2">
                    <Box color="text.secondary">Biblioteka</Box>
                  </Typography>
                </Grid>
              )}
              {data.format === "ebook" && data.download !== "" && (
                <Grid item xs={12} sm={6}>
                  <Link href={data.download} className={classes.download}>
                    {" "}
                    <CloudDownloadIcon />
                    Pobierz
                  </Link>
                </Grid>
              )}
            </Grid>
          </Grid>
        </React.Fragment>
        <Toolbar variant="regular" className={classes.toolbar}>
          <Box className={classes.actionBtnContainer}>
            <Fab
              className={classes.actionBtn}
              color="primary"
              aria-label="edit"
              onClick={handleEdit}
            >
              <EditIcon />
            </Fab>
            <Fab
              className={classes.actionBtn}
              color="secondary"
              aria-label="delete"
              onClick={handleDelete}
            >
              <DeleteForeverIcon />
            </Fab>
          </Box>
        </Toolbar>
      </Paper>
    </div>
  );
}
