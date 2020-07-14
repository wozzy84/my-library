import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
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
import {Link} from 'react-router-dom'

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

export default function SignIn() {
  const classes = useStyles();
  const [isSubmitionCompleted, setSubmitionCompleted] = useState(false);


  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Zaloguj się
          </Typography>
          {!isSubmitionCompleted && (
            <React.Fragment>
              <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  setSubmitting(true);
                  auth
                    .signInWithEmailAndPassword(values.email, values.password)
                    .then((cred) => {
                      console.log(cred.user.email);
                      setSubmitionCompleted(true);
                      resetForm();
                    })
                    .catch(function (error) {
                      console.error(error.code, error.message);
                    });
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email("niepoprawny format email")
                    .required("To pole jest wymagane"),
                  password: Yup.string().required("To pole jest wymagane"),
                  // .min(6, "Hasło powinno mieć min. 6 znaków")
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
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Hasło"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.password && touched.password && errors.password
                        }
                        error={errors.password && touched.password}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            value="remember"
                            color="primary"
                            onChange={(e) => console.log(e.currentTarget.value)}
                          />
                        }
                        label="Zapamiętaj mnie"
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={isSubmitting}
                      >
                        Zaloguj
                      </Button>
                      <Grid container>
                        <Grid item xs>
                          <Link to="/reset" variant="body2" >
                            Zapomniałeś hasła?
                          </Link>
                        </Grid>
                      </Grid>
                    </form>
                  );
                }}
              </Formik>
            </React.Fragment>
          )}
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </React.Fragment>
  );
}
