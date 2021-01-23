import React, { Component, } from "react";
// Material UI
import { Divider, Paper, Box, Typography, Grid, Button } from "@material-ui/core";
// Components
import Question from "./Question";
import Result from "./Result";

class Questions extends Component {
    state = {
        question: 0,
        score: 0,
        end: false
    };

    handleClick(answer) {
        if (answer == this.props.questions[this.state.question].correct) {
            this.addScore();
        }
        if (this.state.question + 1 > this.props.questions.length - 1) {
            this.setState({ end: true });
        }
        else {
            this.setState({ question: this.state.question + 1 });
        }
    }

    addScore() {
        this.state.score++;
    }

    render() {
        return <React.Fragment>{
            this.state.end == false
                ? <Paper key={`${this.props.questions[this.state.question].id}-question-item`} elevation={1} style={{ margin: 8 }}>
                    <Box style={{ padding: 8 }} display="flex" flexDirection="column" justifyContent="space-around" flexWrap="wrap">
                        <Typography variant="h4">{this.props.questions[this.state.question].title}</Typography>
                        <Divider style={{ margin: 8 }} />
                        <Grid container spacing={1}>{this.props.questions[this.state.question].answers.map(answer =>
                            <Grid key={`${this.props.questions[this.state.question].id}-${answer}`} item xs={6}>
                                <Button fullWidth variant="outlined" color="default" onClick={() => {
                                    this.handleClick(answer)
                                }}>
                                    <Typography variant="h6">{answer}</Typography>
                                </Button>
                            </Grid>)}
                        </Grid>
                    </Box>
                </Paper >
                : <Result result={this.state.score} totalCount={this.props.questions.length} />
        }</React.Fragment>
    }
}

export default Questions;