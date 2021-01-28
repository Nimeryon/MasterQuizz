import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Components
import Quizz from "./Quizz";
import CreateQuestion from "./CreateQuestion";
import CreateRoute from "./CreateRoute";
import CategorieRoute from "./CategorieRoute";
import Navigation from "./Navigation";
import Login from "./Login";
import Register from "./Register";
// Material UI
import { ThemeProvider, makeStyles } from "@material-ui/styles";
import { Divider, CssBaseline, createMuiTheme, IconButton, SwipeableDrawer, Box, Link, Typography } from "@material-ui/core";
import { cyan } from "@material-ui/core/colors";
import { Brightness2Rounded, Brightness4Rounded, CloseRounded } from "@material-ui/icons";

const dark = createMuiTheme({
  palette: {
    type: "dark",
    primary: cyan
  }
});

const light = createMuiTheme({
  palette: {
    type: "light",
    primary: cyan
  }
});

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between"
  }
});

const App = () => {
  const classes = useStyles();

  const [openMenu, toggleOpenMenu] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    toggleOpenMenu(open);
  };

  const [theme, setTheme] = useState(false);
  const icon = !theme ? <Brightness4Rounded /> : <Brightness2Rounded />;
  const appliedTheme = createMuiTheme(theme ? light : dark);

  return <ThemeProvider theme={appliedTheme}>
    <Router>
      <CssBaseline />
      <Navigation classes={classes} icon={icon} toggleOpenMenu={toggleOpenMenu} setTheme={setTheme} theme={theme} />
      <SwipeableDrawer anchor="left" open={openMenu} onClose={toggleDrawer(false)}>
        <Box width="100%" display="flex" alignContent="center" justifyContent="center">
          <IconButton
            color="inherit"
            onClick={() => toggleOpenMenu(false)}>
            <CloseRounded />
          </IconButton>
        </Box>
        <Divider style={{ margin: 8 }} />
        <Typography style={{ margin: 8 }} variant="h6">
          <Link color="inherit" href="/categories">Catégories</Link>
        </Typography>
        <Typography style={{ margin: 8 }} variant="h6">
          <Link color="inherit" href="/create">Ajouter une question</Link>
        </Typography>
      </SwipeableDrawer>
      <Switch>
        <Route path="/" exact component={() => <Quizz />} />
        <Route path="/categories" exact component={() => <CategorieRoute />} />
        <Route path="/create" exact component={() => <CreateQuestion />} />
        <Route path="/login" exact component={() => <Login />} />
        <Route path="/register" exact component={() => <Register />} />
      </Switch>
    </Router>
  </ThemeProvider >;
};

export default App;