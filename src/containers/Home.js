import React, {Component} from 'react'
import Header from '../components/Header'
import WithScrollbar from "../components/CarouselWithoutScrollbar";
import "../assets/style.css";
import "../../node_modules/react-multi-carousel/lib/styles.css";
import RequestService from '../services/RequestService';
import Loading from '../components/Loading';

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
        let urlEnd = 'api/campaign/top/10';
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
                <Loading />
            );
        }

        return(
            <div>
                <Header/>
                <div className="container">
                    <div className="top-campaign-container">
                        <h3 className="top-campaign-title">Top Campaigns</h3>
                        <WithScrollbar campaigns={this.state.campaigns}/>
                    </div>
                </div>
            </div>
        )
    }
}