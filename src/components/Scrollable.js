import React, { Component } from 'react';

const scrollable = WrappedComponent => {
  class HOC extends Component {
    componentDidMount() {
      window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll = () => {
      const { articles, isLoading, fetchNews, errors } = this.props;
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        articles.length &&
        !isLoading &&
        !(errors && errors.loadingErrorMsg)
      )
        fetchNews(true, false);
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return HOC;
};

export default scrollable;
