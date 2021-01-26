import React from "react";
// Query
import { useQuery } from "@apollo/client";
import QuestionsQuery from "../querys/QuestionQuery";
// Material-ui
import { CircularProgress, makeStyles } from "@material-ui/core";
// Components
import Questions from "./Questions";

const useStyles = makeStyles({
    center: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    }
});

const Quizz = () => {
    const classes = useStyles();
    const { data, loading, error } = useQuery(QuestionsQuery, { fetchPolicy: "no-cache" });

    if (loading) return <CircularProgress className={classes.center} />;
    if (error) console.log(error);
    const { questions } = data;

    return <Questions questions={questions} />
};

export default Quizz;