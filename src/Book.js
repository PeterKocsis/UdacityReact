import React from 'react'

const Book = (props) => {
  const backgroundImageExists = props.book.hasOwnProperty("imageLinks");
  return (
    <div className="book">
      <div className="book-top">
        {backgroundImageExists ?
          <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${props.book.imageLinks.thumbnail})`, backgroundColor: '#cccccc' }}></div>
          : <div className="book-cover" style={{ width: 128, height: 192, backgroundColor: '#cccccc' }}></div>}
        <div className="book-shelf-changer">
          <select value={props.book.shelf} onChange={(event) => {
            console.log("OnChange event fired");
            props.onBookReplace(props.book, event.target.value);
          }}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.book.title}</div>
      <div className="book-authors">{props.book.authors}</div>
    </div>
  )
}

export default Book;