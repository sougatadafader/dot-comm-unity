import React from 'react'
import { BrowserRouter as Router, Route, Switch,Redirect} from "react-router-dom";
import Home from './Home'

class DotCommunityEntry extends React.Component {

    state = {
        loaded: true
    };


    render() {
        if (!this.state.loaded) {
            return null;
        }
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" render={props => <Home/>}/>
                        <Redirect to="/"/>
                    </Switch>
                </div>
            </Router>
        )
    }

}

export default DotCommunityEntry;