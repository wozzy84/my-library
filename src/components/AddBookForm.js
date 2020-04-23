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
import { useDispatch } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function AddBookForm(props) {
  const useStyles = makeStyles(theme => ({
    appBar: {
      position: "relative"
    },
    layout: {
      width: "auto",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: "auto",
        marginRight: "auto"
      }
    },
    paper: {
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        padding: theme.spacing(3)
      }
    },
    stepper: {
      padding: theme.spacing(3, 0, 5)
    },
    buttons: {
      display: "flex",
      justifyContent: "flex-end"
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1)
    },

    formControl: {
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    close: {
      marginTop: -15,
      marginRight: -15
    },
    autoComplete: {
      marginTop: theme.spacing(-2)
    }
  }));

  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const base = ["Biografia", "Biznes", "Ekonomia",  "Marketing", "Dla dzieci", "Dla młodzieży", "Fantasy", "Historia", "Horror",  "Informatyka", "Komiks", "Kryminał", "Sensacja", "Thriller", "Kuchnia", "Reportaź", "Literatura obyczajowa", "Literatura piękna obca", "Literatura pięka polska", "Nauka języków", "Nauki ścisłe", "Nauki społeczne i humanistyczne", "Podręczniki", "Poezja", "Dramat", "Poradniki", "Prawo", "Religie", "Rozwój osobisty", "Science fiction", "Sport", "Sztuka", "Turystyka", "Zdrowie"];
  const genres = base.sort()
  const defaultProps = {
    options: genres,
    getOptionLabel: option => option
  };

  const handleClick = () => {
    dispatch({
      type: "OPEN_ADD_MODAL",
      open: false
    });
  };

  return (
    <Formik
      initialValues={{
        title: "",
        author: "",
        publisher: "",
        date: new Date(),
        owner: "",
        library: "",
        genre: "",
        format: ""
      }}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        if (values.format === "ebook") {
          const payload = { ...values, library: "ebook" };
          db.collection("books")
            .add({
              title: payload.title,
              author: payload.author,
              publisher: payload.publisher,
              date: payload.date,
              owner: payload.owner,
              library: payload.library,
              format: payload.format
            })
            .then(function() {
              console.log("Document successfully written!");
              resetForm();
              setSubmitting(false);
              setSuccess(true);
            })
            .catch(function(error) {
              console.error("Error writing document: ", error);
              setSubmitting(false);
              setFailed(true);
            });
        } else {
          db.collection("books")
            .add({
              title: values.title,
              author: values.author,
              publisher: values.publisher,
              date: values.date,
              owner: values.owner,
              genre: values.genre,
              library: values.library,
              format: values.format
            })
            .then(function() {
              console.log("Document successfully written!");
              resetForm();
              setSubmitting(false);
              setSuccess(true);
            })
            .catch(function(error) {
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
          is: format => format !== "ebook",
          then: Yup.string().required("To pole jest wymagane")
        }),
        format: Yup.string().required("To pole jest wymagane")
      })}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue
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
                      onBlur={handleBlur}
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
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      fullWidth
                      views={["year"]}
                      label="Rok wydania"
                      value={values.date}
                      onChange={value => setFieldValue("date", value)}
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
                      helperText={errors.owner && touched.owner && errors.owner}
                      error={errors.owner && touched.owner}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl className={classes.formControl} fullWidth>
                      <Autocomplete
                        {...defaultProps}
                        id="controlled-demo"
                        name="genre"
                        className={classes.autoComplete}
                        value={values.genre}
                        onChange={(event, newValue) => {
                          setFieldValue("genre", newValue);
                        }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label="controlled"
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
                      required
                      className={classes.formControl}
                      fullWidth
                    >
                      <InputLabel id="format-label">Format</InputLabel>
                      <Select
                        value={values.format}
                        onChange={e => {
                          handleChange(e);
                          console.log((values.library = ""));
                        }}
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
                        <MenuItem value={"book"}>książka</MenuItem>
                        <MenuItem value={"journal"}>czasopismo</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    {values.format !== "ebook" && (
                      <FormControl
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
