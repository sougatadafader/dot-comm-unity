import React, {Component} from 'react'
import Header from '../components/Header'
import WithScrollbar from "../components/CarouselWithoutScrollbar";
import "../assets/style.css";
import "../../node_modules/react-multi-carousel/lib/styles.css";
import { Message } from 'semantic-ui-react';
import RequestService from '../services/RequestService';

export default class extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            loading:true,
            campaigns:[]
        }
    }

    componentDidMount()
    {
        this.loadData();
    }

    async loadData()
    {
        let urlEnd = 'api/campaigns';
        let campaigns = await RequestService.getRequest(urlEnd);
        this.setState({
            loading:false,
            campaigns:campaigns
        });
    }

    render() {

        if(this.state.loading)
        {
            return(
                <div />
            );
        }

        return(
            <div>
                <Header/>
                <div className="container">
                    <div className="top-campaign-container">
                        <h3 className="top-campaign-title"></h3>
                        <WithScrollbar campaigns={this.state.campaigns}/>
                    </div>
                </div>
            </div>
        )
    }
}