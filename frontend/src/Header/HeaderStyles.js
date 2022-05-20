import { makeStyles } from "@material-ui/core";
import { blueGrey, blue } from "@material-ui/core/colors";


export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#efefef",
    
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  
  toolbar: theme.mixins.toolbar,

  navButton: {
    width: "100%",
    textTransform: "capitalize",
  },

  //wrapper
  wrapper: {
    height: "100%",
    overflowWrap: "anywhere",
    background: "#cfd8dc",
    padding: theme.spacing(2, 2, 0, 2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2, 2),
    },
  },
}));
