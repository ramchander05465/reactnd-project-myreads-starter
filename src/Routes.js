import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import BookShelf from './containers/books-shelf';
import SearchBook from './containers/search-books';

const routes = () => (
    <main>
        <Switch>
            <Route path='/' exact component={BookShelf} />
            <Route path='/books' component={BookShelf} />
            <Route path='/search' component={SearchBook} />
            <Redirect from='' to='/books' />
        </Switch>
    </main>
)


export default routes;