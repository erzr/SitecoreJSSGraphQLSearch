import React from 'react';
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { FormGroup, InputGroup, Button, FormControl } from 'react-bootstrap';

import { changeEnteredSearchText, performSearch, changeQueryText, updatePageOffset } from '../actions';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);

        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputKeypress = this.handleInputKeypress.bind(this);
    }

    componentDidMount() {
        if (!this.props.enteredSearchText && this.props.query)
        {
            this.props.changeEnteredSearchText(this.props.query);
        }
      }

    handleSearch() {
        this.props.updatePageOffset(0);
        this.props.changeQueryText(this.props.enteredSearchText);
        this.props.performSearch();
    }

    handleSearchClick() {
        this.handleSearch();
    }

    handleInputChange(e) {
        this.props.changeEnteredSearchText(e.target.value);
    }

    handleInputKeypress(e) {
        if (e.which === 13) {
            this.handleSearch();
        }
    }

    render() {
        return (
            <FormGroup>
                <InputGroup>
                    <FormControl type="text" bsSize="large" 
                        value={this.props.enteredSearchText} 
                        onChange={this.handleInputChange}
                        onKeyPress={this.handleInputKeypress} />
                    <InputGroup.Button>
                        <Button bsStyle="success" bsSize="large" onClick={this.handleSearchClick}>Search</Button>
                    </InputGroup.Button>
                </InputGroup>
            </FormGroup>
        );
    }
}

SearchBar.propTypes = {
    changeEnteredSearchText: PropTypes.func.isRequired,
    enteredSearchText: PropTypes.string.isRequired,
    changeQueryText: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    enteredSearchText: state.enteredSearchText,
    query: state.query
});

const mapDispatchToProps = (dispatch) => ({
    changeEnteredSearchText: text => dispatch(changeEnteredSearchText(text)),
    performSearch: () => dispatch(performSearch()),
    changeQueryText: text => dispatch(changeQueryText(text)),
    updatePageOffset: offset => dispatch(updatePageOffset(offset))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBar);