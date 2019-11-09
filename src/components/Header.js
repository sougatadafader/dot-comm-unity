import React from 'react'
import {Link} from 'react-router-dom'
import DropdownSimple from './DropdownSimple'
import {Button, Menu, Input, Dropdown} from 'semantic-ui-react'
import UserService from "../services/UserService";
import SearchComponent from './SearchComponent'
class Header extends React.Component{

    constructor(props) {
        super(props)

        this.state = {
            sessionUser:{}
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
    render(){
        let username = this.state.sessionUser.username;
        let role = this.state.sessionUser.userRole;
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to={"/"} className=" navbar-brand" href="#">BigBrother.</Link>
                <SearchComponent/>
                <div className="collapse navbar-collapse d-flex flex-row-reverse bd-highlight" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            {/*<DropdownSimple/>*/}
                        </li>
                        <li className="ml-3 mr-4 p-1 nav-item">
                            {username?
                                <Dropdown text={username.charAt(0).toUpperCase()+ username.slice(1)} simple item >
                                    <Dropdown.Menu style={{ left: 'auto', right: 0 }}>
                                        <Dropdown.Header icon="paper plane outline" content="Good Afternoon!" />
                                        <Dropdown.Divider />
                                        <Dropdown.Item>Account Settings</Dropdown.Item>
                                        <Dropdown.Item>Manage Campaigns</Dropdown.Item>
                                        <Dropdown.Item>Donation History</Dropdown.Item>
                                        <Dropdown.Item>Logout</Dropdown.Item>
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
        )
    }
}

export default Header;