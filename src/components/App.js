import React, { useState } from "react";
// Components
import Quizz from "./Quizz";
import Navigation from "./Navigation";
// Material UI
import { ThemeProvider, makeStyles } from "@material-ui/styles";
import { Container, Divider, CssBaseline, createMuiTheme, IconButton, SwipeableDrawer } from "@material-ui/core";
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
    <CssBaseline />
    <Navigation classes={classes} icon={icon} toggleOpenMenu={toggleOpenMenu} setTheme={setTheme} theme={theme} />
    <SwipeableDrawer anchor="left" open={openMenu} onClose={toggleDrawer(false)}>
      <IconButton
        color="inherit"
        onClick={() => toggleOpenMenu(false)}>
        <CloseRounded />
      </IconButton>
      <Divider style={{ margin: 8 }} />
    </SwipeableDrawer>
    <Container maxWidth="md">
      <Quizz />
    </Container>
  </ThemeProvider >;
};

export default App;