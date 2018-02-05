import React from 'react';
import {NavLink} from 'react-router-dom';

const search = (props) => (
    <div className="search-books-bar">
        <NavLink to='/' className="close-search">Close</NavLink>
        
        <div className="search-books-input-wrapper">
        <input type="text" onChange={(event) => props.search(event.target.value)} 
        placeholder="Search by title or author"/>

        </div>
    </div>
)

export default search;