import React, { Component } from "react";
// Material UI
import { Paper, Box, Typography } from "@material-ui/core";

class Result extends Component {
    render() {
        return <Paper elevation={1} style={{ margin: 8 }}>
            <Box style={{ padding: 8 }} display="flex" flexDirection="column" justifyContent="space-around" flexWrap="wrap">
                <Typography variant="h4">Vous avez éffectué un score de {this.props.result}/{this.props.totalCount}</Typography>
            </Box>
        </Paper >;
    }
}

export default Result;