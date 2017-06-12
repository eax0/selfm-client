import React from 'react'
import classnames from 'classnames'

export default class TodoItem extends React.Component {
    onRemoveClick(e) {
        e.stopPropagation();

        this.props.item.remove();
    }

    render() {
        const {toggle, index, caption, completed, editable, setEditable} = this.props.item;
        const {dragHandle} = this.props;

        const classNames = classnames('todo', {
            ['todo--completed']: completed,
            ['todo--editable']: editable,
        });

        const id = 'todoitem-' + index;

        return <div className={classNames}>
            {dragHandle ? this.props.dragHandle(<div className="todo__drag">:::</div>) : ''}
            <div className="todo__body" onClick={toggle}>
                <input className="todo__checkbox"
                       id={id} type="checkbox" checked={completed} readOnly={true}/>
                { editable ?
                    <input type="text" className='todo__caption todo__caption--editable' autoFocus={true} value={caption}/> :
                    <span htmlFor={id} className='todo__caption'>{caption}</span>
                }
            </div>
            <div className="todo__controls">
                <i className="todo__edit-icon icon icon--edit" onClick={setEditable}></i>
                <i className="todo__close-icon icon icon--close" onClick={this.onRemoveClick.bind(this)}></i>
            </div>
        </div>
    }
}

