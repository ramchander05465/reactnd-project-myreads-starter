import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import * as bookApi from '../BooksAPI';

import Header from '../components/header';
import BookList from '../components/book-list';

class BooksShelf extends Component{
    state = {
        books:[]
    }
    
    componentDidMount(){
        bookApi.getAll().then(res => {
            this.setState({books:res})
        })
    }

    onShelfChangeHandler = (book, shelf) => {
        if(shelf==="move") return
        bookApi.update(book, shelf).then((res) => {
            let updatedBook = [...this.state.books];
            let selectedIndex=updatedBook.indexOf(book);
            updatedBook[selectedIndex].shelf=shelf; 
            this.setState({books:updatedBook})
        })
    }

    render(){
        return(
            <div className="list-books">
                <Header />
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <BookList list={this.state.books} shelftype="currentlyReading" onShelfChange={this.onShelfChangeHandler} />
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Wanted to Read</h2>
                            <div className="bookshelf-books">
                                <BookList list={this.state.books} shelftype="wantToRead" onShelfChange={this.onShelfChangeHandler} />
                            </div>
                        </div>

                        <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <BookList list={this.state.books} shelftype="read" onShelfChange={this.onShelfChangeHandler} />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="open-search">
                    <NavLink to="/search" >Add a book</NavLink>
                </div>
            </div>
        )
    }
}

export default BooksShelf;