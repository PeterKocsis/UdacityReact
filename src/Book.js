import React from 'react'
import ShelfSelector from './ShelfSelector'

const Book = (props) => {
  const backgroundImageExists = props.book.hasOwnProperty("imageLinks");
  return (
    <div className="book">
      <div className="book-top">
        {backgroundImageExists ?
          <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${props.book.imageLinks.thumbnail})`, backgroundColor: '#cccccc' }}></div>
          : <div className="book-cover" style={{ width: 128, height: 192, backgroundColor: '#cccccc' }}></div>}
        <div className="book-shelf-changer">
          <ShelfSelector
            book={props.book}
            appJsParams={props.appJsParams} />
        </div>
      </div>
      <div className="book-title">{props.book.title}</div>
      <div className="book-authors">{props.book.authors}</div>
    </div>
  )
}

export default Book;