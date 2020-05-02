import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import CancelIcon from "@material-ui/icons/Cancel";
import { IconButton } from "@material-ui/core";
import EditBookInfo from "./EditBookInfo";
import InfoNavigation from "./InfoNavigation";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  root: {
    overflowY: "auto",
    display: "flex",
    flexWrap: "wrap",
    outline: "none",
    maxHeight: "100vh",
    "& > *": {
      // margin: theme.spacing(1),
      // width: theme.spacing(100),
      // height: theme.spacing(100)
    }
  }
}));

export default function InfoModal() {
  const classes = useStyles();
  const openInfoModal = useSelector(state => state.openInfoModal);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openInfoModal.open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={openInfoModal.open}>
          <div className={classes.root}>
            <Paper elevation={3}>
              <InfoNavigation />
            </Paper>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
