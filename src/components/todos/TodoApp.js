import React from 'react'
import {connect} from 'react-redux'
import * as Actions from '../../actions/todos'
import TodoList from './TodoList'
import {ENTER_KEY} from 'src/constants/common'

import './style.scss'

class TodoApp extends React.Component {
    componentDidMount() {
        const {loadTodos} = this.props;

        loadTodos();
    }

    onKeyDown(e) {
        if (e.keyCode !== ENTER_KEY) {
            return;
        }

        e.preventDefault();

        const val = this.input.value;

        if (val) {
            this.props.addTodo({caption: val});
            this.input.value = '';
        }
    }

    render() {
        //const { todos, dispatch } = this.props
        //const actions = bindActionCreators(TodosActionsCreators, dispatch)

        return <div className="todoapp">
            <div className="todoapp__header">
                <input
                    ref={elem => this.input = elem}
                    type="text"
                    className="todoapp__input"
                    placeholder="Task"
                    autoFocus={true}
                    onKeyDown={this.onKeyDown.bind(this)}/>
            </div>

            <TodoList {...this.props}></TodoList>

            <div className="todoapp__footer"></div>
        </div>;
    }
}

function mapStateToProps(state) {
    return {
        todos: state.todos
    };
}

export default connect(mapStateToProps, {
    addTodo: Actions.add,
    removeTodo: Actions.remove,
    updateTodo: Actions.update,
    loadTodos: Actions.load,
})(TodoApp)