'use strict';

const React = require('react');
const Actions = require('./actions');
const PropTypes = require('prop-types');
const ClassNames = require('classnames');
const Tile = require('./tile.jsx');
const Moment = require('moment');
const DatePicker = require('react-datepicker').default;

require('react-datepicker/dist/react-datepicker.css');


const propTypes = {
    level: PropTypes.string,
    live: PropTypes.bool,
    dateFrom: PropTypes.object,
    onToggleLive: PropTypes.func,
    query: PropTypes.object,
    history: PropTypes.object
};


class Tiles extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            level: props.level,
            live: props.live,
            history: props.history,
            query: props.query
        };
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            level: nextProps.level,
            live: nextProps.live,
            history: nextProps.history,
            query: nextProps.query
        });
    }

    activeCard(level) {

        // If it's the same level, ignore it
        if ((this.state.level === level) || (typeof level === 'undefined')) {
            return;
        }

  

            const query = this.state.query;
            query.level = level;

            Actions.changeSearchQuery(query, this.state.history);
    
        Actions.setLevel(level);
    }

    handleDateChange(date) {

        Actions.changeDateFrom(date);
    }

    handleClickOutside() {

        if (typeof this.props.dateFrom !== 'undefined') {

            let query = {};

            // We need to turn off 'live' mode first
            if (this.state.live) {

                Actions.setLiveMode(false);

                query = {
                    dateFrom: this.props.dateFrom.utc().format(),
                    level: this.state.level
                };
            }
            else {

                // Just update the time
                query = this.state.query;
                query.dateFrom = this.props.dateFrom.utc().format();
            }

            // Update the search query string
            Actions.changeSearchQuery(query, this.state.history);

        }
    }


    render() {
 

        return (
            <div className="cards">
                <div className="level">

                    <Tile onClick={this.activeCard.bind(this)}
                        name="casual"
                        id="c1"
                        display={true}
                        active={this.props.level}
                    />
                    <Tile onClick={this.activeCard.bind(this)}
                        name="medium"
                        id="c2"
                        display={true}
                        active={this.props.level}
                    />
                    <Tile onClick={this.activeCard.bind(this)}
                        name="hard"
                        id="c3"
                        display={true}
                        active={this.props.level}
                    />
                  
                </div>
            </div>
        );
    }
}

Tiles.propTypes = propTypes;


module.exports = Tiles;
