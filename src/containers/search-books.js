import React, {Component} from 'react';
import * as bookApi from '../BooksAPI';
import Search from '../components/search';
import BookList from '../components/book-list';

class SearchBooks extends Component{
    state = {
        searchItem:[]
    }
    
    searchBook = (query) => {
        if(query.length > 2){
            bookApi.search(query).then((res) => {
                let shelfHistory = JSON.parse(localStorage.getItem('shelfHistory'));
                let updatedResponse = res.map(book => {
                    book.shelf='none'
                    for(var count = 0; count < shelfHistory.length; count++){
                        
                        if(book.id === shelfHistory[count].id){
                            book.shelf=shelfHistory[count].shelf;
                        }
                    }
                    return book
                });
                this.setState({searchItem:updatedResponse})
            })
        }
    }

    onShelfChangeHandler = (book, shelf) => {
        if(shelf==="move") return
        bookApi.update(book, shelf).then((res) => {
            let shelfHistory = JSON.parse(localStorage.getItem('shelfHistory'));
            for(var count = 0; count < shelfHistory.length; count++){
                let shelfType='none'
                if(book.id === shelfHistory[count].id){
                    shelfType=shelf;   
                }
                shelfHistory[count].shelf=shelfType
            }
            localStorage.setItem('shelfHistory', JSON.stringify(shelfHistory))
        })
    }

    render(){
        return(
            <div className="search-books">
                <Search search={this.searchBook} />
                <div className="search-books-results">
                    {this.state.searchItem.length ? <BookList list={this.state.searchItem} shelftype="all" onShelfChange={this.onShelfChangeHandler} />:null}
                </div>
          </div>
        )
    }
}

export default SearchBooks;