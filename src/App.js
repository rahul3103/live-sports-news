import React, { Component } from 'react';
import { CircularProgress, LinearProgress } from '@material-ui/core';
import { getNews } from './news';

import { Bar, List } from './components';

class App extends Component {
  state = {
    articles: [],
    isRefreshing: false,
    isLoading: true,
    page: 1,
    currentTime: '',
    autoRefresh: false,
    errors: {}
  };

  componentDidMount() {
    this.handlefetchNews(true, false);
    this.state.autoRefresh && this.pullUpdates();
  }

  pullUpdates = () => {
    this.puller = setInterval(
      () => this.handlefetchNews(false, true, new Date().toISOString()),
      60000
    );
  };

  handleChange = event => {
    this.setState({ autoRefresh: event.target.checked });
    if (event.target.checked) this.pullUpdates();
    else clearTimeout(this.puller);
  };

  componentWillUnmount() {
    clearTimeout(this.puller);
  }

  fetchNews = currentTime => {
    getNews(this.state.page, currentTime)
      .then(data => {
        let state = {
          isRefreshing: false,
          isLoading: false
        };
        const { articles, message, code } = data;
        if (articles && articles.length > 0) {
          if (currentTime) {
            state.currentTime = currentTime;
            state.articles = [...articles, ...this.state.articles];
          } else {
            state.page = this.state.page + 1;
            state.articles = [...this.state.articles, ...articles];
          }
        } else if (code === 'maximumResultsReached')
          state.errors = {
            loadingErrorMsg: message
          };
        else if (code) {
          state.errors = {
            refreshErrorMsg: message
          };
        }
        this.setState(state);
      })
      .catch(() => this.setState({ isRefreshing: false, isLoading: false }));
  };

  handlefetchNews = (isLoading, isRefreshing, currentTime) => {
    this.setState({ isLoading, isRefreshing }, () =>
      this.fetchNews(currentTime)
    );
  };

  render() {
    const {
      articles,
      isLoading,
      isRefreshing,
      autoRefresh,
      errors
    } = this.state;
    return (
      <React.Fragment>
        <Bar autoRefresh={autoRefresh} handleChange={this.handleChange} />
        {isRefreshing && <LinearProgress />}
        <div style={{ color: '#ff5252', margin: '10 0' }}>
          {errors && errors.refreshErrorMsg}
        </div>
        <div style={{ textAlign: 'center' }}>
          <List
            articles={articles}
            fetchNews={this.handlefetchNews}
            isLoading={isLoading}
            errors={errors}
          />
          <div style={{ color: '#ff5252', marginBottom: 10 }}>
            {errors && errors.loadingErrorMsg}
          </div>
          <div>{isLoading && <CircularProgress />}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
