import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Info from "@material-ui/icons/Info";
import Star from "@material-ui/icons/Star";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import HelpIcon from "@material-ui/icons/Help";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import EditBookInfo from "./EditBookInfo";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { IconButton } from "@material-ui/core";
import { flexbox } from "@material-ui/system";
import DisplayBookInfo from "./DisplayBookInfo";
import { useDispatch } from "react-redux";
import {intialInfo} from '../reducers'
import Grid from '@material-ui/core/Grid'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    "aria-controls": `scrollable-prevent-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  panel: {
    padding: 0

  }
}));

export default function InfoNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch({
      type: "OPEN_INFO_MODAL",
      payload: {
        open: false,
        data: intialInfo
      }
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Grid container>
          <Grid item>
          <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="off"
          aria-label="scrollable prevent tabs example"
  
        >
          <Tab icon={<Info />} aria-label="phone" {...a11yProps(0)} />
          <Tab icon={<Star />} aria-label="favorite" {...a11yProps(1)} />
          </Tabs>
          </Grid>
        </Grid>
          <Grid item style={{ position: "absolute", right: "0" }}>
            <IconButton style={{ marginRight: 5 }} onClick={handleClick}>
              <CancelOutlinedIcon
                style={{ color: "white" }}
              ></CancelOutlinedIcon>
            </IconButton>
          </Grid>
      </AppBar>
      <TabPanel value={value} index={0} className = {classes.panel}>
        <DisplayBookInfo />
      </TabPanel>
      <TabPanel value={value} index={1}>
 
      </TabPanel>
    </div>
  );
}
