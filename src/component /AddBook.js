import React, { Component } from 'react'

export class AddBook extends Component {
    render() {
        return (
            <form onSubmit={this.props.addCat}>
                <input placeholder='Enter book name' type="text" name='bookName' />
                <input placeholder='Enter book section' type="text" name='booksec' />
                <input type="submit" value="Add Book" />
            </form>
        )
    }
}

export default AddBook;