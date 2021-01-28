import React, { Component } from "react";
// Material UI
import { Paper, Typography, Grid, Box, Link } from "@material-ui/core";

class Categorie extends Component {
    render() {
        const { classes } = this.props;
        return <Grid key={`${this.props.categorie.id}-categorie`} item md={12} >
            <Link href={`/categories/${this.props.categorie.title}`} color="inherit">
                <Paper elevation={1} className={classes.p}>
                    <Box display="flex" justifyContent="center">
                        <Typography variant="h4">{Word(this.props.categorie.title)}</Typography>
                    </Box>
                </Paper >
            </Link>
        </Grid>
    }
}

export default Categorie;