import React, { Component } from "react";
// Material UI
import { Divider, Paper, Box, Typography, Grid, Button } from "@material-ui/core";

class Question extends Component {
    clickHandler(answer) {
        if (answer == this.props.question.correct) {
            this.props.addScore();
        }
        this.props.onClick();
    }

    render() {
        console.log(this.props);
        return <Paper elevation={1} style={{ margin: 8 }}>
            <Box style={{ padding: 8 }} display="flex" flexDirection="column" justifyContent="space-around" flexWrap="wrap">
                <Typography variant="h4">{this.props.question.title}</Typography>
                <Divider style={{ margin: 8 }} />
                <Grid container spacing={1}>{this.props.question.answers.map(answer =>
                    <Grid key={`${this.props.question.id}-${answer}`} item xs={6}>
                        <Button fullWidth variant="outlined" color="default" onClick={this.props.onClick()}>
                            <Typography variant="h6">{answer}</Typography>
                        </Button>
                    </Grid>)}
                </Grid>
            </Box>
        </Paper >;
    }
}

export default Question;