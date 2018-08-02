import React from 'react'
import BookList from './BookList'

export const BookShelf = (props) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelf.title}</h2>
      <div className="bookshelf-books">
        <BookList
          books={props.books.filter(item => item.shelf === props.shelf.categoryName)}
          savedBooks={props.savedBooks}
          onBookReplace={props.onBookReplace} />
      </div>
    </div>
  )
}