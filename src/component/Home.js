/**
 * Created by intelligrape on 22/5/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateUser} from '../actions/user.action'
class Home extends Component {

    componentDidMount() {
        this.props.dispatch(updateUser());
    }
    render() {
        return (<div>Home
        User length: {this.props.users.length}
        </div>)
    }
}

const mapStateToProps = (state) => state;

const HomeContainer = connect(mapStateToProps)(Home);
export default HomeContainer;