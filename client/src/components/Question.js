import React, { Component } from "react";
// Material UI
import { Divider, Paper, Box, Typography, Grid } from "@material-ui/core";
// Components
import AnswerButton from "./AnswerButton";

class Question extends Component {
    render() {
        return <Paper elevation={1} style={{ margin: 8 }}>
            <Box style={{ padding: 8 }} display="flex" flexDirection="column" justifyContent="space-around" flexWrap="wrap">
                <Typography variant="h4">{this.props.question.title}</Typography>
                <Divider style={{ margin: 8 }} />
                <Grid container spacing={1}>
                    {this.props.question.answers.map(answer => <AnswerButton key={`${this.props.question.id}-${answer}`} parentId={this.props.question.id} answer={answer} correct={this.props.question.correct} />)}
                </Grid>
            </Box>
        </Paper >;
    }
}

export default Question;