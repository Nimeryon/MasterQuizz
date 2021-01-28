import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
// Components
import Quizz from "./Quizz";
import Categories from "./Categories";

const CategorieRoute = () => {
    const { path } = useRouteMatch();

    return <Switch>
        <Route path={path} exact component={() => <Categories />} />
        <Route path={`${path}/:categorie`} component={() => <h4>Hmmmm</h4>} />
    </Switch>
};

export default CategorieRoute;