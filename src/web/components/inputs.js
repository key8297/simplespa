import React, {Component} from 'react';

export class TextInput extends Component {
    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.id}>{this.props.caption}</label>
                <input type="text" className="form-control" {...this.props} />
            </div>
        );
    }
}
