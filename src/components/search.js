import React from 'react';
import {NavLink} from 'react-router-dom';
import {DebounceInput} from 'react-debounce-input';

const search = (props) => (
    <div className="search-books-bar">
        <NavLink to='/' className="close-search">Close</NavLink>
        
        <div className="search-books-input-wrapper">
        <DebounceInput
          minLength={2}
          debounceTimeout={500}
          placeholder="Search by title or author"
          onChange={event => props.search(event.target.value)} />

        </div>
    </div>
)

export default search;