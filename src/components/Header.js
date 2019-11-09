import React from 'react'
import {Link} from 'react-router-dom'
import DropdownSimple from './DropdownSimple'
import { Button } from 'semantic-ui-react'
import UserService from "../services/UserService";

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

                <div className="collapse navbar-collapse d-flex flex-row-reverse bd-highlight" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <DropdownSimple/>
                        </li>
                        <li className="ml-3 p-1 nav-item">
                            {username?<div>{username.charAt(0).toUpperCase()+ username.slice(1)}</div>:
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