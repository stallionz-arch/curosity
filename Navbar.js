import React from "react"
import GoogleSignIn from "../components/GoogleSignIn"
import logo from "../images/logodf.png"
import { Link } from "gatsby"
import FacebookSignIn from "./FacebookSignIn"
import { navigate } from "gatsby"
import Rules from "../components/Rules"
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  withStyles,
  Button,
  Hidden,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@material-ui/core"
import {
  Menu,
  Home,
  Inbox,
  Mail,
  ChevronLeft,
  ChevronRight,
  Facebook,
  YoutubeSearchedFor,
  YouTube,
} from "@material-ui/icons"
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify"
import DashboardIcon from "@material-ui/icons/Dashboard"
import Logout from "./Logout"
import Dashboard from "../pages/dashboard"
import GoogleLogin from "react-google-login"
import store from "../store/index"

const drawerWidth = 240

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  BackdropProps: {
    background: "transparent",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    float: "right",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 2,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#000000",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: -1,
  },
  drawerPaper: {
    width: drawerWidth,
    background: "black",
    color: "white",
    opacity: 0.75,
    zIndex: -1,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
})

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profileImage: "",
      name: "",
      isOpen: false,
    }
    this.setProfile = this.setProfile.bind(this)
    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.closeNavbar = this.closeNavbar.bind(this)
  }

  componentDidMount() {
    this.setProfile()
  }

  setProfile() {
    if (localStorage.email) {
      this.setState({
        profileImage: localStorage.image,
        name: localStorage.name,
      })
    }
  }

  toggleNavbar() {
    this.setState({
      isOpen: !this.state.isOpen,
      
    })
  }

  closeNavbar() {
    if(this.state.collapsed !== true){
      this.toggleNavbar();
    }
  }

  render() {
    const { classes } = this.props

    return (
      <React.Fragment>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={e => this.toggleNavbar()}
            >
              <Menu />
            </IconButton>

            <img
              src={logo}
              height={40}
              className="d-inline-block align-top"
              alt="Logo"
            />
            <div className={classes.grow} />
            <Hidden smDown >
              <Link to="/" style={{ color: "white" }}>
                <Button color="inherit">Home</Button>
              </Link>
              <Button
                color="inherit"
                onClick={e => store.dispatch({ type: "OPEN" })}
              >
                Rules
              </Button>
              <Link to="/leaderboard/" style={{ color: "white" }}>
                <Button color="inherit">LeaderBoard</Button>
              </Link>
            </Hidden>
            <Logout />
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          className={classes.drawer}
          variant="temporary"
          anchor="left"
          open={this.state.isOpen}
          onClose={e => this.setState({ isOpen: false })}
          onOpen={e => this.setState({ isOpen: true })}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.toggleNavbar}>
              <ChevronLeft style={{ color: "white" }} />
            </IconButton>
          </div>
          <Divider />
          <List>
            <Link to="/" onClick={e => this.closeNavbar()}>
              <ListItem button key="Home">
                <ListItemIcon>
                  <Home style={{ color: "white" }} />
                </ListItemIcon>

                <ListItemText primary="Home" style={{ color: "white" }} />
              </ListItem>
            </Link>
            <ListItem button key="Rules">
              <ListItemIcon>
                <FormatAlignJustifyIcon style={{ color: "white" }} />
              </ListItemIcon>

              <ListItemText
                primary="Rules"
                style={{ color: "white" }}
                onClick={e => store.dispatch({ type: "OPEN" })}
              />
            </ListItem>
            <Link to="/leaderboard/"  onClick={e => this.closeNavbar()} >
              <ListItem button key="Leaderboard">
                <ListItemIcon>
                  <DashboardIcon style={{ color: "white" }} />
                </ListItemIcon>

                <ListItemText
                  primary="Leaderboard"
                  style={{ color: "white" }}
                />
              </ListItem>
            </Link>
          </List>
        </SwipeableDrawer>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(NavBar)
