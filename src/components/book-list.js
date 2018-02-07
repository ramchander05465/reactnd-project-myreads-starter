import React from 'react';

const bookList = (props) => {
    const filterdData = props.shelftype !== "all" ? props.list.filter(book => book.shelf===props.shelftype):props.list;
    return(        
        <ol className="books-grid">
            {filterdData.map(item => <li key={item.id}>
            <div className="book">
            <div className="book-top">                                                      
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${item.imageLinks ? item.imageLinks.smallThumbnail:""})` }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={(event) => props.onShelfChange(item, event.target.value)}>
                            <option value="none">Move to...</option>
                            <option value="currentlyReading" className={item.shelf === "currentlyReading" ? 'check-mark':''}>Currently Reading</option>
                            <option value="wantToRead" className={item.shelf === "wantToRead" ? 'check-mark':''}>Want to Read</option>
                            <option value="read" className={item.shelf === "read" ? 'check-mark':''}>Read</option>
                            <option value="none"  className={item.shelf === "none" ? 'check-mark':''}>None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{item.title}</div>
                <div className="book-authors">{item.authors}</div>
            </div>
            </li>)}
        </ol>
    )
}

export default bookList;