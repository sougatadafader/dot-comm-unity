import React, {Component} from 'react'
import Header from '../components/Header'
import WithScrollbar from "../components/CarouselWithoutScrollbar";
import "../assets/style.css";
import "../../node_modules/react-multi-carousel/lib/styles.css";
import { Message } from 'semantic-ui-react'

export default class extends Component {


    render() {
        return(
            <div>
                <Header/>
                <div className="container">
                    <Message compact className="ml-4 bg-danger text-white" content='Top Campaigns' />
                    <WithScrollbar/>
                </div>
            </div>
        )
    }
}