import React from 'react'
import Book from './Book'

const BookList = (props) => {
  return (
    <ol className="books-grid">
      {props.books.map((item) => {
        return (
          <li key={item.id}>
            <Book book={item} onBookReplace={props.onBookReplace} />
          </li>)
      })}
    </ol>
  )
}

export default BookList;