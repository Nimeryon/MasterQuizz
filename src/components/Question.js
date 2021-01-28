import React, { Component } from "react";
// Material UI
import { Divider, Paper, Box, Typography, Grid, Button } from "@material-ui/core";

class Question extends Component {
    render() {
        const { classes } = this.props;
        return <Paper key={`${this.props.question.id}-question-item`} elevation={1} className={classes.m}>
            <Box style={{ padding: 8 }} display="flex" flexDirection="column" justifyContent="space-around" flexWrap="wrap">
                <Typography variant="h4">{Word(this.props.question.title)}</Typography>
                <Divider className={classes.m} />
                <Grid container spacing={1}>{this.props.question.answers.map(answer =>
                    <Grid key={`${this.props.question.id}-${answer}`} item xs={12} sm={6}>
                        <Button fullWidth variant="outlined" className={this.props.state.transition ? answer == this.props.question.correct ? classes.green : classes.red : ""} color={this.props.state.transition ? "inherit" : "default"} onClick={() => {
                            this.props.handleClick(answer)
                        }}>
                            <Typography variant="h6">{Word(answer)}</Typography>
                        </Button>
                    </Grid>
                )}
                </Grid>
            </Box>
        </Paper >
    }
}

export default Question;