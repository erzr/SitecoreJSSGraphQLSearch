import React from 'react';
import { FormGroup, InputGroup, Button, FormControl } from 'react-bootstrap';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);

    }

    handleSearchClick() {
        console.log('click');
    }

    render() {
        return (
            <FormGroup>
                <InputGroup>
                    <FormControl type="text" bsSize="large" />
                    <InputGroup.Button>
                        <Button bsStyle="success" bsSize="large" onClick={this.handleSearchClick}>Search</Button>
                    </InputGroup.Button>
                </InputGroup>
            </FormGroup>
        );
    }

}

export default SearchBar;