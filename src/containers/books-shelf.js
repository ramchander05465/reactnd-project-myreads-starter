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
            if(res.error) return
           let shelfHistory = res.map(book => {
                return {
                    id:book.id,
                    shelf:book.shelf
                }
            });
            localStorage.setItem('shelfHistory', JSON.stringify(shelfHistory));
            this.setState({books:res})
        })
    }

    onShelfChangeHandler = (book, shelf) => {
        if(shelf==="move") return
        bookApi.update(book, shelf).then((res) => {

            let shelfHistory = JSON.parse(localStorage.getItem('shelfHistory'));
            for(var count = 0; count < shelfHistory.length; count++){
                if(book.id === shelfHistory[count].id){
                    shelfHistory[count].shelf=shelf;   
                }
            }
            localStorage.setItem('shelfHistory', JSON.stringify(shelfHistory))

            let updatedBook = [...this.state.books];
            let selectedIndex=updatedBook.indexOf(book);
            updatedBook[selectedIndex].shelf=shelf; 
            this.setState({books:updatedBook})
        })
    }

    renderBookItems=()=>{
        let shelfType=[{type:'currentlyReading', title:"Currently Reading"}, {type:'wantToRead', title:"Wanted To Read"}, {type:'read', title:"Read"}];
        return shelfType.map(type => (
            <div className="bookshelf" key={type.type}>
                <h2 className="bookshelf-title">{type.title}</h2>
                <div className="bookshelf-books">
                    <BookList list={this.state.books} shelftype={type.type} onShelfChange={this.onShelfChangeHandler} />
                </div>
            </div>
        ))
    }

    render(){
        return(
            <div className="list-books">
                <Header />
                <div className="list-books-content">
                {this.renderBookItems()}
                </div>
                <div className="open-search">
                    <NavLink to="/search" >Add a book</NavLink>
                </div>
            </div>
        )
    }
}

export default BooksShelf;