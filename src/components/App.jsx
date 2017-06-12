import React from 'react'
import MainPage from 'mainpage'
import TodoApp from 'todos/TodoApp'
import {HashRouter, Route, Switch} from 'react-router-dom';

import 'styles/common.scss'

export default class extends React.Component {
    render() {
        return <HashRouter>
            <Switch>
                <Route exact path="/" component={MainPage} />
                <Route path="/todos" component={TodoApp} />
            </Switch>
        </HashRouter>;
    }
}