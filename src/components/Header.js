import React from 'react'
import {Link} from 'react-router-dom'
import DropdownSimple from './DropdownSimple'
import { Button } from 'semantic-ui-react'

class Header extends React.Component{

    constructor(props) {
        super(props)

        this.state = {
            sessionUser:{}
        }
    }



    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to={"/"} className=" navbar-brand" href="#">BigBrother.</Link>

                <div className="collapse navbar-collapse d-flex flex-row-reverse bd-highlight" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <DropdownSimple/>


                        </li>

                        <li className="ml-3 p-1 nav-item">

                        <Button.Group>
                            <Button positive>Sign In</Button>
                            <Button.Or />
                            <Button positive>Register</Button>
                        </Button.Group></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Header;