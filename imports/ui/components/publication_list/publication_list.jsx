import React, {Component} from "react";
import {Panel} from "react-bootstrap";

export class PublicationList extends Component {
    constructor() {
        super();

    }

    componentWillMount() {

    }

    componentWillUnmount() {

    }

    componentDidMount() {


        Meteor.defer(function () {
            globalOnRendered();
        });
    }


    render() {
        return (
            <div className={"well well-sm"}>
                {
                    (this.props.publications && this.props.publications.length>0)?this.props.publications.map((obj)=>(
                        <Panel defaultExpanded={false} key={obj._id}>
                            <Panel.Heading>
                                <Panel.Title>{obj.title}</Panel.Title>
                                <Panel.Toggle componentClass="a">Read More</Panel.Toggle>
                            </Panel.Heading>
                            <Panel.Collapse>
                                <Panel.Body>
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life
                                    accusamus terry richardson ad squid. Nihil anim keffiyeh
                                    helvetica, craft beer labore wes anderson cred nesciunt sapiente
                                    ea proident.
                                </Panel.Body>
                            </Panel.Collapse>
                        </Panel>
                    )): "No Results"
                }

            </div>
        );
    }
}
