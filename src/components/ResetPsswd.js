import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "./Copyright";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { auth } from "../config";
import { useSnackbar } from "notistack";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ResetPsswd() {
  const classes = useStyles();
 
  const { enqueueSnackbar } = useSnackbar();


  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Resetuj hasło
          </Typography>
          
            <React.Fragment>
              <Formik
                initialValues={{ email: "" }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  setSubmitting(true);
                  auth
                    .sendPasswordResetEmail(values.email)
                    .then(() => {
                      console.log("sukces");
                      enqueueSnackbar("Sukces! Na podany adres email wysłano link do zmimany hasła", {
                        variant: "success",
                      });
                      resetForm();
                    })

                    .catch((error) => {
                      enqueueSnackbar("Błąd. Podano niewłaściwy adres email", {
                        variant: "error",
                      });
                      console.log(error);
                      setSubmitting(false)
                      resetForm()
                    });
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email("niepoprawny format email")
                    .required("To pole jest wymagane"),
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
                  } = props;

                  return (
                    <form className={classes.form} onSubmit={handleSubmit}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Adres email"
                        name="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.email && touched.email && errors.email
                        }
                        error={errors.email && touched.email}
                        autoFocus
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={isSubmitting}
                      >
                        Wyślij
                      </Button>
                    </form>
                  );
                }}
              </Formik>
            </React.Fragment>
          
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </React.Fragment>
  );
}
