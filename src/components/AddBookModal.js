import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography"
import { useSelector, useDispatch } from "react-redux";
import AddBookForm from "./AddBookForm";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

  },
  root: {
    overflowY: "auto",
    display: "flex",
    flexWrap: "wrap",
    outline:"none",
    maxHeight: "100vh",
    "& > *": {
      // margin: theme.spacing(1),
      // width: theme.spacing(100),
      // height: theme.spacing(100)
    }
  }
}));

export default function AddBookModal() {
  const classes = useStyles();
  const openAddModal = useSelector(state => state.openAddModal);


  return (
    <div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openAddModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
     
      >
        <Fade in={openAddModal}>
          <div className={classes.root}>
            <Paper elevation={3} >
        <AddBookForm/>

            </Paper>   
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
