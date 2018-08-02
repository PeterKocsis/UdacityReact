import React from 'react'
import BookList from './BookList'

export const BookShelf = (props) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelf.title}</h2>
      <div className="bookshelf-books">
        <BookList
          displayedBooks={props.displayedBooks.filter(item => item.shelf === props.shelf.categoryName)}
          appJsParams={props.appJsParams} />
      </div>
    </div>
  )
}