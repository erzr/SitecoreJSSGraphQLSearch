import React from 'react';
import PropTypes from 'prop-types'
import {Panel} from 'react-bootstrap';

class SearchResultItem extends React.Component {

    render() {
        return (
            <Panel>
                <Panel.Body>
                    <h4>
                        <a href={this.props.item.url}>{this.props.item.name}</a>
                    </h4>
                    <p>{this.props.item.selftext}</p>
                </Panel.Body>
            </Panel>
        )
    }

}

SearchResultItem.proptypes = {
    item: PropTypes.object.isRequired
};

export default SearchResultItem;