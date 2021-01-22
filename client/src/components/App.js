import React, { useState } from "react";
import { useQuery } from "@apollo/client";
// Components
import Question from "./Question"
// Material UI
import { ThemeProvider, makeStyles } from "@material-ui/styles";
import { Container, Divider, CssBaseline, createMuiTheme, IconButton, AppBar, Toolbar, SwipeableDrawer } from "@material-ui/core";
import { cyan } from "@material-ui/core/colors";
import { Brightness2Rounded, Brightness4Rounded, MenuRounded, CloseRounded } from "@material-ui/icons";
// Querys
import QuestionsQuery from "../querys/QuestionQuery";

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

  const { data, loading, error } = useQuery(QuestionsQuery);

  if (loading) return null;
  if (error) console.log(error);
  const { questions } = data;

  return <ThemeProvider theme={appliedTheme}>
    <CssBaseline />
    <AppBar position="static">
      <Toolbar className={classes.root}>
        <IconButton
          color="inherit"
          onClick={() => toggleOpenMenu(true)}>
          <MenuRounded />
        </IconButton>
        <IconButton
          color="inherit"
          onClick={() => setTheme(!theme)}
        >
          {icon}
        </IconButton>
      </Toolbar>
    </AppBar>
    <SwipeableDrawer anchor="left" open={openMenu} onClose={toggleDrawer(false)}>
      <IconButton
        color="inherit"
        onClick={() => toggleOpenMenu(false)}>
        <CloseRounded />
      </IconButton>
      <Divider style={{ margin: 8 }} />
    </SwipeableDrawer>
    <Container maxWidth="md">{questions.map(question => <Question key={`${question.id}-question-item`} question={question} />)}</Container>
  </ThemeProvider >;
};

export default App;