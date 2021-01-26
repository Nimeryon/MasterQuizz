import React, { Component } from "react";
// Material-ui
import { Paper, Grid, Button, Typography, Divider, Box, Container, withStyles } from '@material-ui/core';
import { PersonRounded, LockRounded } from "@material-ui/icons";
// Components
import InputForm from "./InputForm";

const styles = (theme) => ({
    m: {
        margin: 8
    },
    mxl: {
        marginTop: 16,
        marginBottom: 16
    },
    m_left: {
        margin: 8,
        marginLeft: 0
    },
    p: {
        padding: 16,
        margin: 8
    }
});

class Login extends Component {
    render() {
        const { classes } = this.props;
        return <Container maxWidth="sm">
            <Paper elevation={1} className={classes.p} >
                <form>
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <Typography variant="h4">Connexion</Typography>
                    </Box>
                    <Grid container spacing={1}>
                        <InputForm icon={<PersonRounded className={classes.m_left} />} width={12} emptyText={"Pseudo"} auto={"username"} />
                        <InputForm icon={<LockRounded className={classes.m_left} />} type={"password"} width={12} emptyText={"Password"} auto={"current-password"} />
                    </Grid>
                    <Divider className={classes.mxl} />
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <Button variant="outlined" color="primary">Go</Button>
                    </Box>
                </form>
            </Paper >
        </Container>
    }
}

export default withStyles(styles, { withTheme: true })(Login);