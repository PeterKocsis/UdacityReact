import React from 'react'

class ShelfSelector extends React.Component {
  constructor(props){
    super(props);
    let shelf = 'none';
    for (const book of props.appJsParams.booksOnShelfs) {
      if(book.id === props.book.id){
        shelf = book.shelf;
        break;
      }
    }
    this.state = {
      shelf : shelf
    }
  }

  updateBookShelf=(event)=>{
    event.preventDefault();
    let targetShelf = event.target.value;
    this.setState(()=>({
      shelf : targetShelf
    }))
    this.props.appJsParams.onAssignBook(this.props.book, targetShelf)
  };

  render(){
    return(
      <select value={this.state.shelf} onChange={(event) => {
        console.log("OnChange event fired");
        this.updateBookShelf(event);
      }}>
        <option value="move" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    )
  }
}

export default ShelfSelector;