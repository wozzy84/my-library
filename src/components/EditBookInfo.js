import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from "@material-ui/icons/Cancel";
import { Formik } from "formik";
import { DatePicker } from "@material-ui/pickers";
import * as Yup from "yup";
import { IconButton } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { db } from "../config";
import { useDispatch, useSelector } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddFile from "./AddFIle";
import { firebaseStorage } from "../config";
import SaveIcon from "@material-ui/icons/Save";
import Fab from "@material-ui/core/Fab";
import { categories } from "../assets/categories";

export default function EditBookInfo(props) {
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
        padding: theme.spacing(3),
      },
    },
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
    buttons: {
      display: "flex",
      justifyContent: "flex-end",
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },

    formControl: {
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    close: {
      marginTop: -15,
      marginRight: -15,
    },
    autoComplete: {
      marginTop: theme.spacing(-2),
    },
  }));

  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.openInfoModal.data[0]);
  const downloadLink = useSelector((state) => state.downloadLink);
  const reference = useSelector((state) => state.reference);
  const classes = useStyles();

  const genres = categories.sort();

  const defaultProps = {
    options: genres,
    getOptionLabel: (option) => option,
  };

  const handleClick = () => {
    dispatch({
      type: "OPEN_ADD_MODAL",
      open: false,
    });
    if (!success) {
      firebaseStorage.ref(reference).delete();
      dispatch({
        type: "CLEAR_STORAGE",
        clear: true,
      });
    }
  };

  return (
    <Formik
      initialValues={{
        title: data.title,
        author: data.author,
        publisher: data.publisher,
        date:
          typeof data.date.toDate === "function"
            ? data.date.toDate()
            : data.date,
        owner: data.owner,
        library: data.library,
        genre: data.genre,
        format: data.format,
        download: data.download,
      }}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        if (values.format === "ebook") {
          const payload = { ...values, library: "ebook" };
          db.collection("books")
            .doc(data.id)
            .set({
              title: payload.title,
              author: payload.author,
              publisher: payload.publisher,
              date: payload.date,
              owner: payload.owner,
              library: payload.library,
              format: payload.format,
              download: downloadLink,
            })
            .then(function () {
              console.log("Document successfully written!");
              resetForm();
              setSubmitting(false);
              setSuccess(true);
              dispatch({
                type: "TABLE_UPDATED",
              });
              dispatch({
                type: "SET_REFERENCE",
                reference: null,
              })
              dispatch({
                type: "IS_EDITING",
                edit: false
              })
            })
            .catch(function (error) {
              console.error("Error writing document: ", error);
              setSubmitting(false);
              setFailed(true);
            });
        } else {
          db.collection("books")
            .doc(data.id)
            .set({
              title: values.title,
              author: values.author,
              publisher: values.publisher,
              date: values.date,
              owner: values.owner,
              genre: values.genre,
              library: values.library,
              format: values.format,
              download: "",
            })
            .then(function () {
              console.log("Document successfully written!");
              resetForm();
              setSubmitting(false);
              setSuccess(true);
              dispatch({
                type: "TABLE_UPDATED",
              });
              dispatch({
                type: "IS_EDITING",
                edit: false
              })
            })

            .catch(function (error) {
              console.error("Error writing document: ", error);
              setSubmitting(false);
              setFailed(true);
            });
          setSubmitting(false);
        }
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().required("To pole jest wymagane"),
        author: Yup.string().required("To pole jest wymagane"),
        owner: Yup.string().required("To pole jest wymagane"),
        genre: Yup.string().required("To pole jest wymagane"),
        library: Yup.string().when("format", {
          is: (format) => format !== "ebook",
          then: Yup.string().required("To pole jest wymagane"),
        }),
        format: Yup.string().required("To pole jest wymagane"),
      })}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        } = props;

        return (
          <form className={classes.layout} onSubmit={handleSubmit}>
            <Paper elevation={0} className={classes.paper}>
              <React.Fragment>
                <Grid container>
                  <Grid item xs={9}>
                    <Typography variant="h6" gutterBottom>
                      Edytuj książkę
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="title"
                      value={values.title}
                      onChange={handleChange}
                      id="add-title"
                      name="title"
                      label="Tutuł"
                      onBlur={(e) => {
                        handleBlur(e);
                        setSuccess(false);
                      }}
                      fullWidth
                      helperText={errors.title && touched.title && errors.title}
                      error={errors.title && touched.title}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={values.author}
                      onChange={handleChange}
                      id="add-author"
                      name="author"
                      label="Autor"
                      fullWidth
                      onBlur={(e) => {
                        handleBlur(e);
                        setSuccess(false);
                      }}
                      helperText={
                        errors.author && touched.author && errors.author
                      }
                      error={errors.author && touched.author}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={values.publisher}
                      onChange={handleChange}
                      id="add-owner"
                      name="publisher"
                      label="Wydawnictwo"
                      onBlur={(e) => {
                        handleBlur(e);
                        setSuccess(false);
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      fullWidth
                      views={["year"]}
                      label="Rok wydania"
                      value={values.date}
                      onBlur={(e) => {
                        handleBlur(e);
                        setSuccess(false);
                      }}
                      onChange={(value) => setFieldValue("date", value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={values.owner}
                      onChange={handleChange}
                      id="add-owner"
                      name="owner"
                      label="Właściciel"
                      fullWidth
                      onBlur={(e) => {
                        handleBlur(e);
                        setSuccess(false);
                      }}
                      helperText={errors.owner && touched.owner && errors.owner}
                      error={errors.owner && touched.owner}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      className={classes.formControl}
                      required
                      fullWidth
                    >
                      <Autocomplete
                        onBlur={(e) => {
                          handleBlur(e);
                          setSuccess(false);
                        }}
                        {...defaultProps}
                        id="add-genre"
                        name="genre"
                        className={classes.autoComplete}
                        value={values.genre}
                        onChange={(event, newValue) => {
                          setFieldValue("genre", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Kategoria"
                            margin="normal"
                            helperText={
                              errors.owner && touched.owner && errors.owner
                            }
                            error={errors.owner && touched.owner}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl
                      onBlur={(e) => {
                        handleBlur(e);
                        setSuccess(false);
                      }}
                      required
                      className={classes.formControl}
                      fullWidth
                    >
                      <InputLabel id="format-label">Format</InputLabel>
                      <Select
                        value={values.format}
                        onChange={handleChange}
                        labelId="format-label"
                        name="format"
                        className={classes.selectEmpty}
                        inputProps={{ "aria-label": "Without label" }}
                        helperText={
                          errors.format && touched.format && errors.format
                        }
                        error={errors.format && touched.format}
                      >
                        <MenuItem value="">
                          <em>Brak</em>
                        </MenuItem>
                        <MenuItem value={"ebook"}>ebook</MenuItem>
                        <MenuItem value={"książka"}>książka</MenuItem>
                        <MenuItem value={"czasopismo"}>czasopismo</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    {values.format !== "ebook" && (
                      <FormControl
                        onBlur={(e) => {
                          handleBlur(e);
                          setSuccess(false);
                        }}
                        required
                        className={classes.formControl}
                        fullWidth
                        disabled={values.format === "ebook" ? true : false}
                      >
                        <InputLabel id="library-label">Biblioteka</InputLabel>
                        <Select
                          value={values.library}
                          onChange={handleChange}
                          labelId="library-label"
                          name="library"
                          className={classes.selectEmpty}
                          inputProps={{ "aria-label": "Without label" }}
                          helperText={
                            errors.library && touched.library && errors.library
                          }
                          error={errors.library && touched.library}
                        >
                          <MenuItem value="">
                            <em>Brak</em>
                          </MenuItem>
                          <MenuItem value={"Popiełuszki"}>Popiełuszki</MenuItem>
                          <MenuItem value={"Koźmiana"}>Koźmiana</MenuItem>
                          <MenuItem value={"Promyka"}>Promyka</MenuItem>
                          <MenuItem value={"Zagórze"}>Zagórze</MenuItem>
                          <MenuItem value={"Rawa"}>Rawa</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  </Grid>
                  {values.format === "ebook" && <AddFile />}

                  <Grid item xs={12} sm={12}>
                    {success && (
                      <Alert severity="success">
                        Udało Ci się dodać książkę do bazy
                      </Alert>
                    )}
                    {failed && (
                      <Alert severity="error">
                        Wystąpił błąd podczas dodawania książki do bazy
                      </Alert>
                    )}
                  </Grid>
                </Grid>
                <div className={classes.buttons}>
                  <Fab
                    className={classes.actionBtn}
                    color="primary"
                    aria-label="edit"
                    type="submit"
                  >
                    <SaveIcon />
                  </Fab>
                </div>
              </React.Fragment>
            </Paper>
          </form>
        );
      }}
    </Formik>
  );
}