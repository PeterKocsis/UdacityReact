import React from 'react'
import { Link } from 'react-router-dom'
import BookList from './BookList'
import * as BooksAPI from './BooksAPI'

class BookFinder extends React.Component {
  state = {
    query: '',
    books: []
  }

  /**
   * @description Updates the this.state.books property with the given value
   * @param {object} result - A collection of book objects
   */
  updateBooks = (result) => {
    this.setState(() => ({
      books: result ? [...result] : []
    }))
  };

  /**
   * @description Updates the this.state.query property with the given value
   * @param {string} query - The new value of search input
   */
  updateQuery = (query) => {
    this.setState(() => ({
      query: query,
    }))
  };

  //TODO it seems to me its not working exactly how it should. It still calls multiple time
  debounce = (func, delay) => {
    let inDebounce;
    return function () {
      const context = this
      const args = arguments
      clearTimeout(inDebounce)
      inDebounce = setTimeout(() => func.apply(context, args), delay)
    }
  };

  /**
   * @description Get a collection of book objects based on the query string
   * @param {string} query
   */
  getSearchResult = (query) => {
    if (query !== '') {
      BooksAPI.search(query)
        .then((results) => {
          this.updateBooks(results);
        })
        .catch(() => { this.updateBooks([]) });
      console.log(query);
    } else {
      this.updateBooks([]);
    }
  };

  /**
   * @description Make a search request for the backend service and updates the state of the component based on answer
   */
  searchBooks = (event) => {
    event.preventDefault();
    let query = event.target.value;
    let promise = Promise.resolve(this.updateQuery(query));
    promise.then(this.debounce(() => this.getSearchResult(this.state.query), 700));
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => { this.searchBooks(event) }}
            />
          </div>
        </div>
        <div className="search-books-results">
          <BookList displayedBooks={this.state.books} appJsParams={this.props.appJsParams} />
          <ol className="books-grid"></ol>
        </div>
      </div>
    )
  }
}

export default BookFinder;