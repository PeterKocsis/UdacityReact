import React from 'react'
import {Link} from 'react-router-dom'
import BookList from './BookList'
import * as BooksAPI from './BooksAPI'

class BookFinder extends React.Component {
  state = {
    query: '',
    books: [],
  }

  updateBooks = (result) => {
    this.setState(() => ({
      books: result ? [...result] : []
    }))
  };

  updateQuery = (query) => {
    this.setState(() => ({
      query: query
    }))
  };

  getSearchResult(query){
      BooksAPI.search(query)
      .then((results) => {
        this.updateBooks(results);
      })
      .catch(() => { this.updateBooks([])});
  }

  searchBooks=(event)=>{
    event.preventDefault();
    let query = event.target.value;
    this.updateQuery(query);
    this.getSearchResult(query);
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
              onChange={(event) => {this.searchBooks(event)}}
            />
          </div>
        </div>
        <div className="search-books-results">
          <BookList displayedBooks={this.state.books} appJsParams={this.props.appJsParams}/>
          <ol className="books-grid"></ol>
        </div>
      </div>
    )
  }
}

export default BookFinder;