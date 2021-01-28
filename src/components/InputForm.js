import React, { Component } from "react";
import { TextField, OutlinedInput, InputLabel, Grid, Box } from '@material-ui/core';

class InputForm extends Component {
    render() {
        return <Grid item xs={this.props.minWidth || this.props.width} sm={this.props.width}>
            <Box display="flex" width="100%">
                {this.props.icon}
                <TextField error={this.props.error} helperText={this.props.error ? this.props.helper : ""} onChange={this.props.onChange} type={this.props.type || "text"} label={this.props.emptyText} fullWidth={true} autoComplete={this.props.auto || false}></TextField>
            </Box>
        </Grid >
    }
}

export default InputForm;