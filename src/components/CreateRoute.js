import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
// Components
import CreateQuestion from "./CreateQuestion";

const CreateRoute = () => {
    const { path } = useRouteMatch();

    return <Switch>
        <Route path={`${path}/question`} exact component={() => <CreateQuestion />} />
        <Route path={`${path}/categorie`} exact component={() => <Quizz />} />
    </Switch>
};

export default CreateRoute;