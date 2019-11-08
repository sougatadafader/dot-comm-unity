import React, {Component} from 'react'
import Header from '../components/Header'
import WithScrollbar from "../components/CarouselWithoutScrollbar";
import "../assets/style.css";
import "../../node_modules/react-multi-carousel/lib/styles.css";
export default class extends Component {
    render() {
        return(
            <div>
            <Header/>
                <WithScrollbar/>
                <div>Hello from Home</div>
            </div>
        )
    }
}