import React, { Component } from "react";
// Material-ui
import { Paper, Grid, Button, Typography, Divider, Box, Container } from '@material-ui/core';
import { PersonRounded, LockRounded, EmailRounded } from "@material-ui/icons";
// Components
import InputForm from "./InputForm";

class Register extends Component {
    render() {
        return <Container maxWidth="sm">
            <Paper elevation={1} style={{ margin: 8 }}>
                <form>
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <Typography variant="h4">Inscription</Typography>
                    </Box>
                    <Grid container spacing={1}>
                        <Box width="100%" display="flex">
                            <InputForm icon={<PersonRounded style={{ margin: 8 }} />} width={6} emptyText={"Prenom"} auto={"given-name"} />
                            <InputForm icon={<PersonRounded style={{ margin: 8 }} />} width={6} emptyText={"nom"} auto={"family-name"} />
                        </Box>
                        <Grid container spacing={1}>
                            <InputForm icon={<PersonRounded style={{ margin: 8 }} />} width={12} emptyText={"Pseudo"} auto={"username"} />
                            <InputForm icon={<EmailRounded style={{ margin: 8 }} />} width={12} type={"email"} emptyText={"Email"} auto={"email"} />
                            <InputForm icon={<LockRounded style={{ margin: 8 }} />} width={12} type={"password"} emptyText={"Password"} auto={"current-password"} />
                            <InputForm icon={<LockRounded style={{ margin: 8 }} />} width={12} type={"password"} emptyText={"Password Confirmation"} auto={"new-password"} />
                        </Grid>
                    </Grid>
                    <Divider style={{ margin: 8 }} />
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <Button style={{ margin: 8 }} variant="outlined" color="primary">S'inscire</Button>
                    </Box>
                </form >
            </Paper >
        </Container>
    }
}

export default Register;