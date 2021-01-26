import React, { Component } from "react";
// Material-ui
import { Paper, Grid, Button, Typography, Divider, Box, Container, withStyles } from '@material-ui/core';
import { PersonRounded, LockRounded, EmailRounded } from "@material-ui/icons";
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

class Register extends Component {
    render() {
        const { classes } = this.props;
        return <Container maxWidth="sm">
            <Paper elevation={1} className={classes.p}>
                <form>
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <Typography variant="h4">Inscription</Typography>
                    </Box>
                    <Grid container spacing={1}>
                        <Box width="100%" display="flex">
                            <InputForm icon={<PersonRounded className={classes.m_left} />} width={6} emptyText={"Prenom"} auto={"given-name"} />
                            <InputForm icon={<PersonRounded className={classes.m_left} />} width={6} emptyText={"nom"} auto={"family-name"} />
                        </Box>
                        <Grid container spacing={1}>
                            <InputForm icon={<PersonRounded className={classes.m_left} />} width={12} emptyText={"Pseudo"} auto={"username"} />
                            <InputForm icon={<EmailRounded className={classes.m_left} />} width={12} type={"email"} emptyText={"Email"} auto={"email"} />
                            <InputForm icon={<LockRounded className={classes.m_left} />} width={12} type={"password"} emptyText={"Password"} auto={"current-password"} />
                            <InputForm icon={<LockRounded className={classes.m_left} />} width={12} type={"password"} emptyText={"Password Confirmation"} auto={"new-password"} />
                        </Grid>
                    </Grid>
                    <Divider className={classes.mxl} />
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <Button variant="outlined" color="primary">S'inscire</Button>
                    </Box>
                </form >
            </Paper >
        </Container>
    }
}

export default withStyles(styles, { withTheme: true })(Register);