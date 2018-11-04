import React, { Component } from "react";

import BookRow from "./BookRow";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredBooks: this.props.books
    };
    this.filterBooks = this.filterBooks.bind(this);
    this.filterColor = this.filterColor.bind(this);
  }
  filterBooks(query) {
    query = query.toLowerCase();
    let filteredBooks = this.props.books.filter(book => {
      return `${book.title}`.toLowerCase().includes(query);
    });
    this.setState({ filteredBooks });
  }
  filterColor() {
    let bookColor = this.props.match.params.bookColor;
    if (bookColor) {
      let filteredBooks = this.state.filteredBooks.filter(
        book => book.color === bookColor
      );
      return filteredBooks;
    } else {
      return this.state.filteredBooks;
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.books !== this.props.books) {
      this.setState({ filteredBooks: this.props.books });
    }
  }
  showAllbutton() {
    if (this.props.match.params.bookColor) {
      return (
        <Link to="/books">
          <button className="btn"> All Books</button>
        </Link>
      );
    }
  }
  render() {
    const bookRows = this.filterColor().map(book => (
      <BookRow key={book.id} book={book} />
    ));

    return (
      <div>
        <SearchBar changeHandler={this.filterBooks} />
        {this.showAllbutton()}
        <table className="mt-3 table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Authors</th>
              <th>Color</th>
            </tr>
          </thead>
          <tbody>{bookRows}</tbody>
        </table>
      </div>
    );
  }
}

export default BookList;
