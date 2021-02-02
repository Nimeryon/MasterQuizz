import React, { Component } from "react";
// Material-ui
import { Paper, Grid, Button, Typography, CircularProgress, Divider, Box, Container, Slider, MenuItem, TextField, makeStyles } from '@material-ui/core';
import InputForm from "./InputForm";
// Query / Mutation
import { useQuery, useMutation } from "@apollo/client";
import CategorieQuery from "../querys/CategorieQuery";
import CreateQuestionMutation from "../mutations/CreateQuestionMutation";

const useStyles = makeStyles({
    m: {
        margin: 8
    },
    mxl: {
        marginTop: 16,
        marginBottom: 16
    },
    m_left: {
        margin: 8,
        marginLeft: 0
    },
    p: {
        padding: 16,
        margin: 8
    },
    center: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    }
});

const marks = [
    {
        value: 2,
        label: '2'
    },
    {
        value: 3,
        label: '3'
    },
    {
        value: 4,
        label: '4'
    }
]

class CreateQuestionComponent extends Component {
    state = {
        nbr: 2,
        answers: new Array(4),
        answersError: new Array(4),
        title: "",
        titleError: false,
        correct: "",
        correctError: false,
        categorie: "",
        categorieError: false
    };

    createAnswers() {
        let answers = [];
        for (let i = 0; i < this.state.nbr; i++) {
            answers.push(<InputForm onChange={((e) => {
                let answersBase = this.state.answers;
                answersBase[i] = e.target.value;
                this.setState({ answers: answersBase });
            }).bind(this)} error={this.state.answersError[i]} helper={"Aucune réponse"} key={i} minWidth={12} width={6} emptyText={"Answer"} />);
        }
        return answers;
    }

    handleChange(e) {
        this.setState({ correct: e.target.value });
    }

    handleChangeCategorie(e) {
        this.setState({ categorie: e.target.value });
    }

    handleError() {
        let answers = true;
        let answersError = new Array(4);
        for (let i = 0; i < this.state.nbr; i++) {
            let error = this.state.answers[i] == null || this.state.answers[i] == "";
            answersError[i] = error;
            answers = answers && error;
        }

        this.setState({
            titleError: this.state.title == "",
            correctError: this.state.categorie == "",
            categorieError: this.state.correct == "",
            answersError: answersError
        });

        return !(answers && this.state.title == "" && this.state.categorie == "" && this.state.correct == "");
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.handleError()) {
            let answers = [];
            for (let i = 0; i < this.state.nbr; i++) {
                answers.push(this.state.answers[i].toLowerCase());
            }

            let data = {
                title: this.state.title.toLowerCase(),
                categorie: this.state.categorie.toLowerCase(),
                answers: answers,
                correct: this.state.correct.toLowerCase()
            }
            this.props.onSubmit(data);
        }
    }

    render() {
        const { classes } = this.props;
        return <Container maxWidth="sm">
            <Paper elevation={1} className={classes.p}>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <Typography variant="h4">Question</Typography>
                    </Box>
                    <Box width="100%" display="flex">
                        <InputForm error={this.state.titleError} helper={"Aucun titre"} onChange={(e) => { this.setState({ title: e.target.value }); }} width={12} emptyText={"Titre"} />
                    </Box>
                    <Paper elevation={3} style={{ padding: 16 }} className={classes.mxl}>
                        <Typography id="number-question-slider" gutterBottom>Nombre de réponses</Typography>
                        <Slider
                            aria-labelledby="number-question-slider"
                            defaultValue={2}
                            min={2}
                            max={4}
                            valueLabelDisplay="auto"
                            marks={marks}
                            onChangeCommitted={(_, value) => {
                                this.setState({ nbr: value });
                            }}
                        />
                        <Grid container spacing={1}>
                            {this.createAnswers()}
                        </Grid>
                    </Paper>
                    <TextField
                        id="select-correct-answer"
                        error={this.state.correctError}
                        select
                        fullWidth
                        label="Réponse correct"
                        value={this.state.correct}
                        onChange={this.handleChange.bind(this)}
                        helperText={this.state.categorieError ? "Aucune réponse sélectionné" : "Choisissez la réponse correct"}
                    >
                        {this.state.answers.map((answer) => (
                            < MenuItem key={`${answer}-${Math.random()}`} value={answer}>
                                {answer}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Divider className={classes.m} />
                    <TextField
                        id="select-categorie"
                        error={this.state.categorieError}
                        select
                        fullWidth
                        label="Catégorie"
                        value={this.state.categorie}
                        onChange={this.handleChangeCategorie.bind(this)}
                        helperText={this.state.categorieError ? "Aucune catégorie sélectionné" : "Choisissez la catégorie de la question"}
                    >
                        {this.props.categories.map((categorie) => (
                            < MenuItem key={`${categorie.title}-${Math.random()}`} value={categorie.id}>
                                {Word(categorie.title)}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Divider className={classes.m} />
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <Button type="submit" className={classes.m} variant="outlined" color="primary">Créer</Button>
                    </Box>
                </form >
            </Paper >
        </Container >
    }
}

const CreateQuestion = () => {
    const classes = useStyles();
    const { data, loading, error } = useQuery(CategorieQuery, { fetchPolicy: "no-cache" });
    const [createQuestion] = useMutation(CreateQuestionMutation);

    if (loading) return <CircularProgress className={classes.center} />;
    if (error) console.log(error);
    const { categories } = data;

    const handleMutation = (data) => {
        createQuestion({ variables: { title: data.title, categories: [data.categorie], answers: data.answers, correct: data.correct } });
        if (alert("Votre question à été ajouté.")) {
            window.location = "/";
        }
    }

    return <CreateQuestionComponent onSubmit={handleMutation} classes={classes} categories={categories} />
}

export default CreateQuestion;