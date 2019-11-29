import _ from 'lodash';
import faker from 'faker';
import React, { Component } from 'react';
import { Search, Grid, Header, Segment } from 'semantic-ui-react';
import RequestService from '../services/RequestService';

const initialState = { isLoading: false, results: [], value: '' }

const source = _.times(5, () => ({
    title: faker.company.companyName(),
    description: faker.company.catchPhrase(),
    image: faker.internet.avatar(),
    price: faker.finance.amount(0, 100, 2, '$'),
}))

export default class SearchComponent extends Component {
    state = initialState

    handleResultSelect = (e, { result }) => this.setState({ value: result.title })

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
            if (this.state.value.length < 4) return this.setState(initialState)
            this.getSearchResults();
            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = (result) => re.test(result.title)
            this.setState({
                isLoading: false,
                results: _.filter(source, isMatch),
            })
        }, 300)
    }

    async getSearchResults()
    {
        let value = this.state.value;
        let searchUrl = 'api/search/'+value;
        let searchResults = await RequestService.getRequest(searchUrl);
        let searchData = [];
        for(let i=0;i<searchResults.length;i++)
        {
            let searchResult = searchResults[i];
            let title = searchResult.header;
            let description = searchResult.text;
            let image = searchResult.imageUrl;
            let price = searchResult.targetValue;
            let obj = {
                title:title,
                description:description,
                image:image,
                price:price
            };
            searchData.push(obj);
        }
        console.log('Search Data',searchData);
    }

    render() {
        const { isLoading, value, results } = this.state

        return (
            <Grid>
                <Grid.Column width={6}>
                    <Search
                        loading={isLoading}
                        onResultSelect={this.handleResultSelect}
                        onSearchChange={_.debounce(this.handleSearchChange, 500, {
                            leading: true,
                        })}
                        results={results}
                        value={value}
                        {...this.props}
                    />
                </Grid.Column>
            </Grid>
        )
    }
}