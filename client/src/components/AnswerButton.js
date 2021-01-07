import React, { Component } from "react";
import { Button, Grid, Typography } from '@material-ui/core';

class AnswerButton extends Component {

    render() {
        return <Grid item xs={6}>
            <Button fullWidth variant="outlined" color={this.props.answer === this.props.correct ? "primary" : "default"}>
                <Typography variant="h6">{this.props.answer}</Typography>
            </Button>
        </Grid>
    }
}

export default AnswerButton;