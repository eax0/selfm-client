import React from 'react'
import TextArea from 'react-textarea-autosize'
import TaskList from './TaskList'
import {ENTER_KEY} from 'src/utils/common'

import './project.scss'

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {caption: props.caption, notes: props.notes, children: props.children};
    }

    componentWillReceiveProps(nextProps) {
        this.setState({caption: nextProps.caption, notes: nextProps.notes || '', children: nextProps.children});
    }

    updateProject(e) {
        if (this.props.caption !== this.state.caption || this.props.notes !== this.state.notes) {
            this.props.update(this.props.id, {
                caption: this.state.caption,
                notes: this.state.notes,
            })
        }
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onKeyDown(e) {
        if (e.keyCode !== ENTER_KEY) {
            return;
        }

        e.preventDefault();
        e.target.blur();
    }

    render() {
        return <div className="project">
            <div className="project__row project__row--caption">
                <input type="checkbox" defaultChecked={true} className="project__checkbox"/>

                <input
                    name="caption"
                    placeholder="Название"
                    onKeyDown={this.onKeyDown.bind(this)}
                    onBlur={this.updateProject.bind(this)}
                    onChange={this.handleChange.bind(this)}
                    type="text"
                    className="project__name"
                    value={this.state.caption}/>
            </div>

            <div className="project__row">
                <TextArea
                    name="notes"
                    placeholder="Заметки"
                    onChange={this.handleChange.bind(this)}
                    onBlur={this.updateProject.bind(this)}
                    className="project__notes"
                    value={this.state.notes}/>
            </div>

            <div className="project__row">
                <TaskList {...this.props} tasks={this.state.children}/>
            </div>
        </div>
    }
}