import React, { Component } from "react";
import { Input, Grid } from '@material-ui/core';

class InputForm extends Component {
    render() {
        return <Grid item xs={this.props.width}>
            <Input fullWidth={true} placeholder={this.props.emptyText}></Input>
        </Grid>
    }
}

export default InputForm;