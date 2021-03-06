import React, { useState, useEffect } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import GetAppIcon from "@material-ui/icons/GetApp";

import { CSVLink, CSVDownload } from "react-csv";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(2),
  },

  smallIcon: {
    maxWidth: "35px",
    maxHeight: "35px",
    minWidth: "35px",
    minHeight: "35px",
    margin: theme.spacing(1),
    marginLeft: theme.spacing(1.3),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const LItem = {
  textDecoration: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "rgba(0, 0, 0, 0.87)",
};

export default function FloatingActionButton(props) {
  const classes = useStyles();
  const openDrawer = useSelector((state) => state.drawerOpen);

  const dispatch = useDispatch();
  const handleOpenAddModal = () => {
    dispatch({
      type: "OPEN_ADD_MODAL",
      open: true,
    });
    dispatch({
      type: "CLEAR_STORAGE",
      clear: false,
    });
    dispatch({
      type: "OPEN_ANY_MODAL",
      open: true,
    });
  };

  return (
    <div>
      {openDrawer ? (
        <Fab
          variant="extended"
          color="primary"
          aria-label="add"
          onClick={handleOpenAddModal}
          className={classes.margin}
        >
          <AddIcon className={classes.extendedIcon} />
          Dodaj
        </Fab>
      ) : (
        <Fab
          color="primary"
          aria-label="add"
          className={classes.smallIcon}
          onClick={handleOpenAddModal}
        >
          <AddIcon />
        </Fab>
      )}
    </div>
  );
}

export const CsvGenerate = () => {
  const updateTable = useSelector((state) => state.updateTable);
  const json = useSelector((state) => state.setData);
  const [getCsv, setGetCsv] = useState();

  useEffect(() => {
    if (json.length) {
      console.log("HOO", json);
      let r = [];
      json.forEach((doc) => {
        r = [
          ...r,
          {
            ...doc,
            created: doc.created.toDate().toLocaleString(),
            date: doc.date.toDate().toLocaleString(),
          },
        ];
      });
      var fields = Object.keys(r[0]);
      var replacer = function (key, value) {
        return value === null ? "" : value;
      };
      var csv = r.map(function (row) {
        return fields
          .map(function (fieldName) {
            return JSON.stringify(row[fieldName], replacer);
          })
          .join(",");
      });

      csv.unshift(fields.join(",")); // add header column
      csv = csv.join("\r\n");
      setGetCsv(csv);
    }
  }, [updateTable, json]);

  return (
    <>
      <ListItem button>
        <CSVLink
          data={typeof getCsv === "string" ? getCsv : "[{key: value}]"}
          style={LItem}
        >
          <ListItemIcon>
            <GetAppIcon />
          </ListItemIcon>
          <ListItemText primary="Pobierz .csv" />
        </CSVLink>
      </ListItem>
    </>
  );
};

export const mainListItems = (
  <div>
    <FloatingActionButton />
    <CsvGenerate></CsvGenerate>
    {/* <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItem> */}
  </div>
);

export const secondaryListItems = (
  <div>
    {/* <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem> */}
  </div>
);
