import React, {Component} from "react";
import {Typeahead} from "react-bootstrap-typeahead";

export class AuthorPicker extends Component {
    constructor () {
        super();
        this.state = {
        };

    }

    componentDidMount() {
        $("input[name='" + this.props.name +"']").val(this.props.selected);
    }

    render() {
        return (
            <div>
                <Typeahead
                    labelKey="name"
                    allowNew
                    newSelectionPrefix="New Author: "
                    defaultSelected={this.props.selected}
                    multiple={true}
                    options={this.props.options}
                    placeholder={this.props.placeholder}
                    onChange={(e)=>{
                        $("input[name='" + this.props.name + "']").val(_.map(e, e=>e._id));
                    }}
                />
                <input type="hidden" className="form-control " name={this.props.name} />
                <span id="help-text" className="help-block" />
                <span id="error-text" className="help-block" />
            </div>
        );
    }
}
