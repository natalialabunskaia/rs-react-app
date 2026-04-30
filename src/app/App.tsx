import React from 'react';
import Search from './components/Search';
import Results from './components/Results';

export default class App extends React.Component {
  render() {
    return (
      <main>
        <Search />
        <Results />
      </main>
    );
  }
}