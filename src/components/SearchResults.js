import React from 'react';
import {Panel} from 'react-bootstrap';

class SearchResults extends React.Component {
    render() {
        return (
            <div>
                <Panel>
                    <Panel.Body>
                        <h4>
                            <a href="#">Result Title</a>
                        </h4>
                        <p>Maecenas auctor massa a felis tempus, nec efficitur purus malesuada. In in est ac sem aliquam consectetur quis sed dolor. Donec a congue enim. Donec venenatis diam ligula, a faucibus neque porta et. Aliquam vel feugiat lorem. Nulla facilisi. Ut luctus purus ut urna fringilla tincidunt. Praesent porttitor, ipsum sit amet fringilla ornare, eros purus egestas felis, in fermentum neque libero id ipsum.</p>
                    </Panel.Body>
                </Panel>
            </div>
        );
    }
}

export default SearchResults;