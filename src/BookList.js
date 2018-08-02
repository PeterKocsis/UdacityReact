import React from 'react'
import Book from './Book'

const BookList = (props) => {
  return (
    <ol className="books-grid">
      {props.displayedBooks.map((item) => {
        return (
          <li key={item.id}>
            <Book
              book={item}
              appJsParams={props.appJsParams} />
          </li>)
      })}
    </ol>
  )
}

export default BookList;