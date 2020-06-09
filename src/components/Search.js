import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useState } from "react";
import { useSelector } from "react-redux";
import { fade } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {useDispatch} from 'react-redux'

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    flexGrow: 1,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    paddingLeft: 5,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "22ch",
      "&:focus": {
        width: "50ch",
      },
      color: 'white'
    }
},

  popupIndicator: {
    display: "none",
  },
  clearIndicator: {
    display: "none",
  },
  searchInput: {
    paddingLeft: 30,
  }
  }));

export default function Search() {
    const dispatch = useDispatch()
  const classes = useStyles();
  const [inputValue, setInputValue] = React.useState("");
  const [value, setValue] = React.useState(null);
  const [blur, setBlur] = useState(true);
  const data = useSelector((state) => state.setData);
  



  const defaultProps = {
    options: data,
    getOptionLabel: (option) => option.title,
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      dispatch({
          type: "SEARCH_INPUT_VALUE",
          value: data.filter((el)=> el.title.includes(inputValue))
      })
   
  }

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>

      <form onSubmit={handleSubmit}>
        <Autocomplete
          open={!blur && !value ? true : false}
          {...defaultProps}
          onBlur={() => setBlur(true)}
          id="add-genre"
          name="genre"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          className={classes.autoComplete}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setBlur(false);
            setInputValue(newInputValue);
          }}
          classes={{
            // root: classes.inputRoot,
            input: classes.inputInput,
            popupIndicator: classes.popupIndicator,
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Wyszukaj..."
              className={classes.searchInput}
              InputProps={{ ...params.InputProps, disableUnderline: true }}
            />
          )}
        ></Autocomplete>
      </form>
    </div>
  );
}
