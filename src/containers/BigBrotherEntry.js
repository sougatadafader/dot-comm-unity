import React from 'react'
import { BrowserRouter as Router, Route, Switch,Redirect} from "react-router-dom";
import Home from './Home';
import UserService from "../services/UserService";
import Register from "../containers/Register/Register";
import SignIn from "../containers/SignIn/SignIn";
import CampaignSingle from '../containers/CampaignSingle/CampaignSingle';

class BigBrotherEntry extends React.Component {

    state = {
        loaded: true,
        sessionUser:null
    };

    componentDidMount(){
        UserService.findUserInSession().then(
            user => this.setState({
                sessionUser:user,
                loaded:true
            })
        )
    }

    render() {
        if (!this.state.loaded) {
            return null;
        }
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/signIn" component={SignIn} />
                        <Route exact path="/campaign" component={CampaignSingle} />
                        <Route exact path="/" render={props => <Home/>}/>
                        <Redirect to="/"/>
                    </Switch>
                </div>
            </Router>
        )
    }

}

export default BigBrotherEntry;