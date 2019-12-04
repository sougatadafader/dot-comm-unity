import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import DropdownSimple from './DropdownSimple'
import {Button, Menu, Input,Popup, Dropdown} from 'semantic-ui-react'
import UserService from "../services/UserService";
import SearchComponent from './SearchComponent'
class Header extends React.Component{

    constructor(props) {
        super(props)
        this.createCampaign = this.createCampaign.bind(this);
        this.state = {
            sessionUser:{},
            currentHour:''
        }
    }

    componentWillMount() {
        let today = new Date()
        let curHr = today.getHours()

        if (curHr < 12) {
            this.setState({currentHour:'Good Morning!'})
        } else if (curHr < 18) {
            this.setState({currentHour:'Good Afternoon!'})
        } else {
            this.setState({currentHour:'Good Evening!'})
        }
    }

    componentDidMount=()=>
    {
        UserService.findUserInSession().then(
            user => this.setState({
                sessionUser: user
            },()=>{
                console.log("session",this.state.sessionUser)
            })
        )}

    handleLogout=()=>
        UserService.logout().then(()=>{
            this.setState({
                sessionUser:{}
            },()=>{
                window.location.reload()
            })
        })
    createCampaign=()=>{
        let path = `/campaign/create`;
        this.props.history.push(path);
    }

    render(){
        let username = this.state.sessionUser.username;
        let role = this.state.sessionUser.userRole;
        return(
	   <header className="bg-light main-header">
            <nav className="navbar navbar-expand-lg navbar-light header-pos-center">
                <Link to={"/"} className=" navbar-brand" href="#">Big Bro</Link>
                <SearchComponent/>
                {(role ==='admin') ?
                    < Link to={"/admin"} className="nav-link bg-secondary rounded text-light ml-3" href="#">Admin Panel</Link>
                    :null}
                <div className="collapse navbar-collapse d-flex flex-row-reverse bd-highlight" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            {/*<DropdownSimple/>*/}
                        </li>
                        <li>
                            {username?
                            <Popup content='Create a campaign'
                                   trigger={<button className="ui circular icon button"
                                            onClick={this.createCampaign}
                                   >
                                <i aria-hidden="true" className="plus green  icon"></i></button>}/>:null}

                        </li>
                        <li className="ml-3 mr-4 p-1 nav-item">
                            {username?
                                <Dropdown text={username.charAt(0).toUpperCase()+ username.slice(1)} simple item >
                                    <Dropdown.Menu style={{ left: 'auto', right: 0 }}>
                                        <Dropdown.Header icon="paper plane outline" content={this.state.currentHour} />
                                        <Dropdown.Divider />
                                        <Dropdown.Item><Link to={`/user/${this.state.sessionUser.id}/view`}>Account Settings</Link></Dropdown.Item>
                                        <Dropdown.Item><Link to={`/campaigns/manage`}>Manage Campaigns</Link></Dropdown.Item>
                                        <Dropdown.Item>Donation History</Dropdown.Item>
                                        <Dropdown.Item onClick={this.handleLogout}>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>:
                        <Button.Group>
                            <Link to={"/signIn"}><Button positive>Sign In</Button></Link>
                            <Button.Or />
                            <Link to={"/register"}><Button positive >Register</Button></Link>
                        </Button.Group>}</li>

                    </ul>
                </div>
            </nav>
           </header>
        )
    }
}

export default withRouter(Header);