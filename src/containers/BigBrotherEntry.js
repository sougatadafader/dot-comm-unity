import React from 'react'
import { BrowserRouter as Router, Route, Switch,Redirect} from "react-router-dom";
import Home from './Home';
import UserService from "../services/UserService";
import Register from "../containers/Register/Register";
import SignIn from "../containers/SignIn/SignIn";
import CampaignSingle from '../containers/CampaignSingle/CampaignSingle';
import DependentCreate from '../containers/DependentCreate/DependentCreate';
import DependentEdit from '../containers/DependentEdit/DependentEdit';
import CampaignCreate from '../containers/CampaignCreate/CampaignCreate';
import CampaignEdit from '../containers/CampaignEdit/CampaignEdit';
import Loading from '../components/Loading';
import UserProfile from '../containers/UserProfile/UserProfile';
import ManageCampaigns from '../containers/ManageCampaigns/ManageCampaigns';
import DonationHistory from '../containers/DonationHistory/DonationHistory';
import Admin from "./AdminPanel/Admin";

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
                        <Route exact path="/admin" component={Admin} />
                        <Route path="/campaign/:campaignId/view" render={props => <CampaignSingle {...props} />} />
                        <Route exact path="/dependent/create" component={DependentCreate} />
                        <Route exact path="/campaign/create" component={CampaignCreate} />
                        <Route exact path="/campaigns/manage" component={ManageCampaigns} />
                        <Route exact path="/donations/history" component={DonationHistory} />
                        <Route path="/campaign/:campaignId/edit" render={props => <CampaignEdit {...props} />} />
                        <Route exact path="/loading" component={Loading} />
                        <Route path="/dependent/:depId/edit" render={props => <DependentEdit {...props} />} />
                        <Route path="/user/:userId/view" render={props => <UserProfile {...props} /> } />
                        <Route exact path="/" render={props => <Home/>}/>
                        <Redirect to="/"/>
                    </Switch>
                </div>
            </Router>
        )
    }

}

export default BigBrotherEntry;