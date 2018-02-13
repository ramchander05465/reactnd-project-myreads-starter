import React from 'react';

const bookList = (props) => {
    const filterdData = props.shelftype !== "all" ? props.list.filter(book => book.shelf===props.shelftype):props.list;
    const renderBook = () => {
        return filterdData.map(item => <li key={item.id}>
            <div className="book">
            <div className="book-top">                                                      
                <div className="book-cover" style={{backgroundImage: `url(${item.imageLinks ? item.imageLinks.smallThumbnail:"http://via.placeholder.com/128x193?text=No%20Cover"})` }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={(event) => props.onShelfChange(item, event.target.value)} defaultValue={item.shelf}>
                            <option value="">Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{item.title}</div>
                <div className="book-authors">{item.authors?item.authors.join(', '):''}</div>
            </div>
            </li>)
    }
    return(        
        <ol className="books-grid">
            {renderBook()}
        </ol>
    )
}

export default bookList;