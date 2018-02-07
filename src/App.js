import React from 'react'
import './App.css'
import Routers from './Routes';

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Routers />
      </div>
    )
  }
}

export default BooksApp
