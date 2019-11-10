import React from 'react';
import Header from '../../components/Header';

class CampaignSingle extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            dpUrl:'https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
        };
    }
    render()
    {
        return(
            <div className="bigbro-container">
                <Header />
                <div className="container space--top">
                    <div className="row">
                        <div className="col-8">
                            <div className="campaign-card card-ui">
                                <h3 className="campaign-title">Helping A Man In Need</h3>
                                <div className="campaign-image">
                                    <img src="https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" className="img-responsive" />
                                </div>
                                <div className="campaign-meta">
                                    <p>Created 25 October 2019</p>
                                </div>
                                <div className="campaign-description">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere at urna quis maximus. Maecenas efficitur, turpis quis scelerisque consectetur, odio diam porta diam, id fringilla dolor justo eget diam. Aenean convallis interdum tincidunt. Proin ut tortor ut felis ornare venenatis at vel urna. Vivamus maximus, nunc vitae tristique vestibulum, mauris nulla egestas metus, at pretium diam augue non turpis. Donec id ultricies enim, quis gravida purus. Fusce placerat pellentesque imperdiet. Aenean vel magna ac augue blandit faucibus. Ut consequat imperdiet leo sed elementum. Pellentesque sed ligula id sem condimentum egestas at eu enim. Ut volutpat felis sed purus euismod, et euismod ante accumsan. Vestibulum vitae commodo quam, vel maximus odio.</p>
                                </div>
                            </div>
                            <div className="organiser-card card-ui">
                                <h3 className="volunteer-title">Organized By</h3>
                                <div className="media">
                                    <div className="user-dp-circle" style={{backgroundImage:`url(${this.state.dpUrl})`}}></div>
                                    <div className="media-body">
                                        <h5>Sougata Dafader</h5>
                                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                                    </div>
                                </div>
                            </div>
                            <div className="comments-card card-ui">
                                <h3 className="comment-title">Comments</h3>
                                <div className="comment-list">
                                    <div className="media single-comment">
                                        <div className="user-dp-circle" style={{backgroundImage:`url(${this.state.dpUrl})`}}></div>
                                        <div className="media-body">
                                            <h5>Sougata Dafader</h5>
                                            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                                        </div>
                                    </div>
                                    <div className="media single-comment">
                                        <div className="user-dp-circle" style={{backgroundImage:`url(${this.state.dpUrl})`}}></div>
                                        <div className="media-body">
                                            <h5>Sougata Dafader</h5>
                                            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                                        </div>
                                    </div>
                                    <div className="media single-comment">
                                        <div className="user-dp-circle" style={{backgroundImage:`url(${this.state.dpUrl})`}}></div>
                                        <div className="media-body">
                                            <h5>Sougata Dafader</h5>
                                            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="donation-progress-card card-ui">
                                <h3 className="donation-progress">$10000 <span>raised of $20000 target</span></h3>
                                <div className="progress">
                                    <div className="progress-bar" role="progress-bar" style={{width:'50%'}}></div>
                                </div>
                                <div className="donate-btn-container">
                                    <a className="donate-btn" href="#">Donate now</a>
                                </div>
                            </div>
                            <div className="donation-list-card card-ui">
                                <h3 className="donation-list-title">All Donations</h3>
                                <div className="donation-list-container">
                                    <div className="media">
                                        <div className="user-dp-circle" style={{backgroundImage:`url(${this.state.dpUrl})`}}></div>
                                        <div className="media-body">
                                            <h5>Sougata Dafader</h5>
                                            <span className="donation-detail donation-amount">100$</span>
                                            <span className="donation-detail donation-date">2 Nov 2019</span>
                                        </div>
                                    </div>
                                    <div className="media">
                                        <div className="user-dp-circle" style={{backgroundImage:`url(${this.state.dpUrl})`}}></div>
                                        <div className="media-body">
                                            <h5>Sougata Dafader</h5>
                                            <span className="donation-detail donation-amount">100$</span>
                                            <span className="donation-detail donation-date">2 Nov 2019</span>
                                        </div>
                                    </div>
                                    <div className="media">
                                        <div className="user-dp-circle" style={{backgroundImage:`url(${this.state.dpUrl})`}}></div>
                                        <div className="media-body">
                                            <h5>Sougata Dafader</h5>
                                            <span className="donation-detail donation-amount">100$</span>
                                            <span className="donation-detail donation-date">2 Nov 2019</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CampaignSingle;