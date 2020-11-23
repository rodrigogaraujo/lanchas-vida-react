import React from "react";
import { Switch } from "react-router-dom";

import Route from "./Route";

import SignIn from "../pages/Signin";
import SignUp from "../pages/Signup";
import Forgot from "../pages/Forgot";
import Dashboard from "../pages/Dashboard";

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/forgot" component={Forgot} />
            <Route path="/dashboard" component={Dashboard} isPrivate />
        </Switch>
    );
};

export default Routes;
