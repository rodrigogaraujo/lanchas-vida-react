import React from "react";
import { Switch } from "react-router-dom";

import Route from "./Route";

import SignIn from "../pages/Signin";
import SignUp from "../pages/Signup";
import Suport from "../pages/Suport";
import Politicy from "../pages/Politicy";
import Forgot from "../pages/Forgot";
import Dashboard from "../pages/Dashboard";
import Unavailable from "../pages/Unavailable";
import CreateItem from "../pages/Item/CreateItem";
import Item from "../pages/Item";

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/suport" component={Suport} />
            <Route path="/politicy" component={Politicy} />
            <Route path="/forgot" component={Forgot} />
            <Route path="/dashboard" exact component={Dashboard} isPrivate />
            <Route path="/dashboard/item" exact component={Item} isPrivate />
            <Route path="/dashboard/unavailable" exact component={Unavailable} isPrivate />
            <Route path="/dashboard/item/edit/:id" component={CreateItem} isPrivate />
            <Route path="/dashboard/item/createItem" component={CreateItem} isPrivate />
        </Switch>
    );
};

export default Routes;
