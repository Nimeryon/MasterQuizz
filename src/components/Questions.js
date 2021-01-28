import React, { Component } from "react";
// Material UI
import { Container, withStyles } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
// Components
import Result from "./Result";
import Question from "./Question";

const styles = (theme) => ({
    red: {
        color: red[500]
    },
    green: {
        color: green[500]
    },
    m: {
        margin: 8
    },
    p: {
        padding: 8
    }
});

class Questions extends Component {
    state = {
        question: 0,
        transition: false,
        correct: true,
        score: 0,
        end: false
    };

    handleClick(answer) {
        if (!this.state.transition) {
            if (answer == this.props.questions[this.state.question].correct) {
                this.addScore();
                this.setState({ correct: true });
            }
            else {
                this.setState({ correct: false });
            }
            this.setState({ transition: true });

            setTimeout(() => {
                if (this.state.question + 1 > this.props.questions.length - 1) {
                    this.setState({ end: true });
                }
                else {
                    this.setState({ question: this.state.question + 1 });
                }
                this.setState({ transition: false });
            }, 1000);
        }
    }

    addScore() {
        this.state.score++;
    }

    render() {
        const { classes } = this.props;
        return <Container maxWidth="md">{
            this.state.end == false
                ? <Question handleClick={this.handleClick.bind(this)} classes={classes} state={this.state} question={this.props.questions[this.state.question]} />
                : <Result result={this.state.score} totalCount={this.props.questions.length} />
        }</Container>
    }
}

export default withStyles(styles, { withTheme: true })(Questions);