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
                this.setState({searchItem:res})
            })
        }
    }

    onShelfChangeHandler = (book, shelf) => {
        if(shelf==="move") return
        bookApi.update(book, shelf).then((res) => {
            console.log(res)
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