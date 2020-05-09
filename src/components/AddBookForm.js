import React, { useEffect } from "react";
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
import { db } from "../config";
import { useDispatch, useSelector } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddFile from "./AddFIle";
import { categories } from "../assets/categories";
import { firebaseStorage } from "../config";
import { intialInfo } from "../reducers";
import FormHelperText from "@material-ui/core/FormHelperText";
import { useSnackbar } from "notistack";

export default function AddBookForm(props) {
  const useStyles = makeStyles((theme) => ({
    layout: {
      width: "auto",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
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
  const downloadLink = useSelector((state) => state.downloadLink);
  const reference = useSelector((state) => state.reference);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const genres = categories.sort();
  const loggedUser = useSelector((state) => state.userReducer.email);
  const [newDate, setNewDate] = useState(new Date())
  const [clickSubmit, setClickSubmit] = useState(false)


  useEffect(()=>{
    setNewDate(new Date())
    console.log("nOWA DATA", newDate)
  },[clickSubmit])

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
    dispatch({
      type: "OPEN_ANY_MODAL",
      open: false,
    });
  };


  
  return (
    <Formik
      initialValues={{
        ...intialInfo,
        download: downloadLink,
        reference: reference,
      }}
      onSubmit={(values, {isSubmitting, resetForm, setSubmitting }) => {
        setSubmitting(true)
        if (values.format === "ebook") {
          db.collection("books")
            .add({
              ...values,
              library: "ebook",
              download: downloadLink,
              reference: reference,
              created: new Date(),
              createdBy: loggedUser,
            })
            .then(function () {
              enqueueSnackbar("Ksiązka została dodana do bazy!", {
                variant: "success",
              });
              resetForm();
              setSuccess(true);
              dispatch({
                type: "TABLE_UPDATED",
              });
              dispatch({
                type: "SET_REFERENCE",
                reference: null,
              });
            })

            .catch(function (error) {
              console.error("Error writing document: ", error);
              setFailed(true);
              enqueueSnackbar("Wystąpił błąd przy dodawaniu ksiązki", {
                variant: "error",
              });
            });
        } else {
          db.collection("books")
            .add({ ...values, created: new Date(), createdBy: loggedUser })
            .then(function () {
              enqueueSnackbar("Ksiązka została dodana do bazy!", {
                variant: "success",
              });
              resetForm();
              setSuccess(true);
              dispatch({
                type: "TABLE_UPDATED",
              });
            })

            .catch(function (error) {
              console.error("Error writing document: ", error);
              setFailed(true);
              enqueueSnackbar("Wystąpił błąd przy dodawaniu ksiązki", {
                variant: "error",
              });
            });
        }
     
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().required("To pole jest wymagane"),
        author: Yup.string().required("To pole jest wymagane"),
        owner: Yup.string().required("To pole jest wymagane"),
        genre: Yup.string().nullable().required("To pole jest wymagane"),
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
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        } = props;

        return (
          <form className={classes.layout} onSubmit={handleSubmit}>
            <Paper className={classes.paper}>
              <React.Fragment>
                <Grid container>
                  <Grid item xs={9}>
                    <Typography variant="h6" gutterBottom>
                      Dodaj książkę
                    </Typography>
                  </Grid>
                  <Grid item xs={3} align="right">
                    <IconButton onClick={handleClick} className={classes.close}>
                      <CancelIcon></CancelIcon>
                    </IconButton>
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
                              errors.genre && touched.genre && errors.genre
                            }
                            error={errors.genre && touched.genre}
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
                      error={errors.format && touched.format}
                    >
                      <InputLabel id="format-label">Format</InputLabel>
                      <Select
                        value={values.format}
                        onChange={handleChange}
                        labelId="format-label"
                        name="format"
                        className={classes.selectEmpty}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="">
                          <em>Brak</em>
                        </MenuItem>
                        <MenuItem value={"ebook"}>ebook</MenuItem>
                        <MenuItem value={"książka"}>książka</MenuItem>
                        <MenuItem value={"czasopismo"}>czasopismo</MenuItem>
                      </Select>
                      <FormHelperText error>
                        {errors.format && touched.format && errors.format}
                      </FormHelperText>
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
                        error={errors.library && touched.library}
                      >
                        <InputLabel id="library-label">Biblioteka</InputLabel>
                        <Select
                          value={values.library}
                          onChange={handleChange}
                          labelId="library-label"
                          name="library"
                          className={classes.selectEmpty}
                          inputProps={{ "aria-label": "Without label" }}
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
                        <FormHelperText error>
                          {errors.library && touched.library && errors.library}
                        </FormHelperText>
                      </FormControl>
                    )}
                  </Grid>
                  {values.format === "ebook" && <AddFile />}
                </Grid>
                <div className={classes.buttons}>
                  <Button
                    type="submit"
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}

                  >
                    Dodaj
                  </Button>
                </div>
              </React.Fragment>
            </Paper>
          </form>
        );
      }}
    </Formik>
  );
}
