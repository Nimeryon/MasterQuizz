import React, { Component } from "react";
// Material-ui
import { Paper, Grid, Button, Typography, Divider, Box, Container } from '@material-ui/core';
import { PersonRounded, LockRounded } from "@material-ui/icons";
// Components
import InputForm from "./InputForm";

class Login extends Component {
    render() {
        return <Container maxWidth="sm">
            <Paper elevation={1} style={{ margin: 8 }}>
                <form>
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <Typography variant="h4">Connexion</Typography>
                    </Box>
                    <Grid container spacing={1}>
                        <InputForm icon={<PersonRounded style={{ margin: 8 }} />} width={12} emptyText={"Pseudo"} auto={"username"} />
                        <InputForm icon={<LockRounded style={{ margin: 8 }} />} type={"password"} width={12} emptyText={"Password"} auto={"current-password"} />
                    </Grid>
                    <Divider style={{ margin: 8 }} />
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <Button style={{ margin: 8 }} variant="outlined" color="primary">Go</Button>
                    </Box>
                </form>
            </Paper >
        </Container>
    }
}

export default Login;