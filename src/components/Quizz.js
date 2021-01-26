import React from "react";
// Query
import { useQuery } from "@apollo/client";
import QuestionsQuery from "../querys/QuestionQuery";
// Components
import Questions from "./Questions";

const Quizz = () => {
    const { data, loading, error } = useQuery(QuestionsQuery, { fetchPolicy: "no-cache" });

    if (loading) return "Loading...";
    if (error) console.log(error);
    const { questions } = data;

    return <Questions questions={questions} />
};

export default Quizz;