import { makeStyles } from "@material-ui/core";
import { blueGrey, blue } from "@material-ui/core/colors";


export const useStyles = makeStyles((theme) => ({

  title: {
    flexGrow: 1,
  },

  wrapper: {
    height: "100%",
    overflowWrap: "anywhere",
    background: "#cfd8dc",
    padding: theme.spacing(2, 2, 0, 2),
  },

  uploadDialogBox: {
    minHeight: "40vh",
    minWidth: "30vw",
  },

}));
