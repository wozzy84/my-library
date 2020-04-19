import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import {useState} from 'react'
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';


import { DatePicker } from "@material-ui/pickers";


export default function AddBookForm() {



  const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      // marginTop: theme.spacing(3),
      // marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        // marginTop: theme.spacing(6),
        // marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
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

    
  }));
  
  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState(new Date());


  return (
    <main className={classes.layout}>
    <Paper className={classes.paper}>
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
      Dodaj książkę 
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} >
          <TextField
            required
            id="add-title"
            name="add-title"
            label="Tutuł"
            fullWidth

          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="add-author"
            name="add-author"
            label="Autor"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} >
          <TextField
            id="add-owner"
            name="add-publisher"
            label="Wydawnictwo"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <DatePicker
        fullWidth
        views={["year"]}
        label="Rok wydania"
        value={selectedDate}
        onChange={handleDateChange}
      />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="add-owner"
            name="add-owner"
            label="Właściciel"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <FormControl className={classes.formControl} fullWidth> 
        <Select
       
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Popiełuszki</MenuItem>
          <MenuItem value={20}>Koźmiana</MenuItem>
          <MenuItem value={30}>Promyka</MenuItem>
          <MenuItem value={30}>Zagórze</MenuItem>
          <MenuItem value={30}>Rawa</MenuItem>
        </Select>
        <FormHelperText>Biblioteka</FormHelperText>
      </FormControl>
          
          
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="billing postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="billing country"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
      <div className={classes.buttons}>
                  
                    <Button  className={classes.button}>
                      Back
                    </Button>
                  
                  <Button
                    variant="contained"
                    color="primary"
                 
                    className={classes.button}
                  >
                   
                  </Button>
                  <input type="file"/>
                </div>
    </React.Fragment>
    </Paper>
    </main>
  );
}