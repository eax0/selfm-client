import React from 'react'
import TodoItem from './TodoItem'
import DraggableList from 'react-draggable-list'

export default class TodoList extends React.Component {
    _onListChange(newTodos: Array<Object>) {
        this.props.updateTodos(newTodos);
    }

    render() {
        const {todos} = this.props;

        const todoDataList = todos.map((todo, index) => {
            return {
                index,
                completed: todo.completed,
                caption: todo.caption,
                editable: todo.editable,
                setEditable: this.props.updateTodo.bind(null, todo.id, {editable: !todo.editable}, false),
                toggle: this.props.updateTodo.bind(null, todo.id, {completed: !todo.completed}),
                remove: this.props.removeTodo.bind(null, todo.id),
            };

            return <TodoItem
                key={index}
                item={item}
                ></TodoItem>;
        });

        return <div className="todoapp__list" ref={cont => this.container=cont}>
            <DraggableList
                itemKey="index"
                padding={0}
                template={TodoItem}
                list={todoDataList}
                onMoveEnd={newList => this._onListChange(newList)}
                container={() => this.container}
                />
        </div>;
    }
}