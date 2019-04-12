import React from 'react';
import { Article, scrollable } from '../components';

const List = ({ articles }) => (
  <div style={{ display: 'inline-block', marginTop: 15 }}>
    {articles.map(article => (
      <Article {...article} key={article.url} />
    ))}
  </div>
);

export default scrollable(List);
