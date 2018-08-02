import React from 'react'
import {Link} from 'react-router-dom'
import BookList from './BookList'
import * as BooksAPI from './BooksAPI'

class BookFinder extends React.Component {
  state = {
    query: '',
    books: []
  }

  componentWillReceiveProps(nextProps) {
    console.log("Will recive Props");
    this.mergeSavedBooksIntoQueryResult(nextProps.books, this.state.query);
  }

  updateBooks = (result) => {
    console.log("BookFinder books updateing");
    this.setState(() => ({
      books: result ? [...result] : []
    }))
  };

  mergeSavedBooksIntoQueryResult = (savedBooks, query) => {
    BooksAPI.search(query)
      .then((results) => {
        if (results) {
          for (let result of results) {
            result["shelf"] = "none";
            for (const savedBook of savedBooks) {
              if (result.id === savedBook.id) {
                result["shelf"] = savedBook.shelf;
                break;
              }
            }
          }
        }
        this.updateBooks(results);
      })
      .catch(() => { this.updateBooks([]) });
  };

  searchBook=(event)=>{
    event.preventDefault();
    let query = event.target.value;
    this.mergeSavedBooksIntoQueryResult(this.props.books, query);
    this.updateQuery(query);
  };

  updateQuery = (query) => {
    this.setState(() => ({
      query: query
    }))
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
              onChange={(event) => {this.searchBook(event)}}
            />
          </div>
        </div>
        <div className="search-books-results">
          <BookList books={this.state.books} onBookReplace={this.props.onBookReplace} />
          <ol className="books-grid"></ol>
        </div>
      </div>
    )
  }
}

export default BookFinder;