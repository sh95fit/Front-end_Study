import React from 'react';
import './App.css';
import Header from './components/Header'
import Nav from './containers/NavWrap'
import Article from './containers/ArticleWrap'


function App() {
  return (
    <div className="App">

      <Header />

      <Nav />

      <Article />

    </div>
  );
}

export default App;
