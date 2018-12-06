import React from 'react';
import {Panel, Checkbox} from 'react-bootstrap';

class SearchFacet extends React.Component {
    render() {
        return (
            <Panel>
                <Panel.Heading>
                    <Panel.Title componentClass="h3">Content Type</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <ul className="list-unstyled">
                        <li>
                            <Checkbox>Article</Checkbox>
                        </li>
                        <li>
                            <Checkbox>Employee</Checkbox>
                        </li>
                    </ul>
                </Panel.Body>
            </Panel>
        );
    }
}

export default SearchFacet;