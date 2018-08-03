import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { Switch } from 'react-router-dom'
import BookFinder from './BookFinder'
import { BookShelf } from './BookShelf'

class BooksApp extends React.Component {
  state = {
    books: [],
    shelfs: [
      {
        title: 'Currently Reading',
        categoryName: 'currentlyReading'
      },
      {
        title: 'Want to Read',
        categoryName: 'wantToRead'
      },
      {
        title: 'Read',
        categoryName: 'read'
      }
    ]
  }

  /**
   * @description Set the books state with those books which are assigned to a shelf
   */
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }

  /**
   * @description Assign the selected book to the given shelf
   * @param {object} book - The selected book
   * @param {string} shelf - The name of the shelf where you would like to assign the book
   */
  moveBookToShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {
        BooksAPI.getAll().then((books) => {
          this.setState(() => ({
            books
          }))
        })
      });
  };

  render() {
    const appJsParams = {
      booksOnShelfs: this.state.books,
      onAssignBook: this.moveBookToShelf
    }
    return (
      <div className="app">
        <Switch>
          <Route path='/search' render={() => (
            <BookFinder appJsParams={appJsParams} />)} />
          <Route path='/' render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {this.state.shelfs.map((item) => {
                    return (
                      <div key={item.categoryName}>
                        <BookShelf displayedBooks={this.state.books} appJsParams={appJsParams} shelf={item} />
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="open-search">
                <Link to='/search'>Add a book</Link>
              </div>
            </div>
          )} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
