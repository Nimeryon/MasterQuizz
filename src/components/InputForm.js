import React, { Component } from "react";
import { Input, Grid, Box } from '@material-ui/core';

class InputForm extends Component {
    render() {
        return <Grid item xs={this.props.width}>
            <Box display="flex" width="100%">
                {this.props.icon}
                <Input type={this.props.type || "text"} fullWidth={true} placeholder={this.props.emptyText} autoComplete={this.props.auto || false}></Input>
            </Box>
        </Grid >
    }
}

export default InputForm;