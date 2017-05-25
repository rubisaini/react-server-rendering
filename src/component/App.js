/**
 * Created by intelligrape on 3/5/17.
 */


import React from 'react';
import {Route, Link} from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
class App extends React.Component {
    constructor() {
        super();
        this.state = {
          number: '9654173324'
        };
        setTimeout(()=> {
            this.setState({
                number:'9759031028'
            });
        }, 4000)
    }
    render() {
        return (
            <div>
                <Link  to="/home">Home</Link> >>
                <Link  to="/about">About Us</Link> >>
                <Link  to="/contact">Contact Us</Link>
                <Route path="/home" component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="/contact" component={(props) => (<Contact {...props} number={this.state.number}/>)}/>
            </div>
        );
    }
}

export default App;