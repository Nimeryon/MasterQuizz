import React from "react";
// Query
import { useQuery } from "@apollo/client";
import CategoriesQuery from "../querys/CategorieQuery";
// Material-ui
import { CircularProgress, Container, Grid, makeStyles } from "@material-ui/core";
// Components
import Categorie from "./Categorie";

const useStyles = makeStyles({
    center: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
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
    }
});

const Categories = () => {
    const classes = useStyles();
    const { data, loading, error } = useQuery(CategoriesQuery, { fetchPolicy: "no-cache" });

    if (loading) return <CircularProgress className={classes.center} />;
    if (error) console.log(error);
    const { categories } = data;

    return <Container maxWidth="md">
        <Grid container spacing={1}>
            {categories.map(categorie => <Categorie classes={classes} categorie={categorie} />)}
        </Grid>
    </Container>
};

export default Categories;