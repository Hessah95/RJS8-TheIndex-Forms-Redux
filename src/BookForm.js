import React, { Component } from "react";

import { connect } from "react-redux";

import * as actionCreators from "./store/actions/index";

class BookForm extends Component {
  state = {
    title: "",
    color: ""
  };

  submitBook = event => {
    event.preventDefault();
    this.props.postBook(
      this.state,
      [this.props.author.id],
      this.props.closeModal
    );
  };

  textChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const errors = this.props.errors;

    let colors = [
      "blue",
      "red",
      "green",
      "yellow",
      "black",
      "white",
      "purple",
      "pink",
      "gray"
    ].map(item => <option value={item}>{item}</option>);

    return (
      <div className="mt-5 p-2">
        <form onSubmit={this.submitBook}>
          {!!errors.length && (
            <div className="alert alert-danger" role="alert">
              {errors.map(error => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Book's Title</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="title"
              onChange={this.textChangeHandler}
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Book's color</span>
            </div>
            <select
              className="form-control"
              name="color"
              onChange={this.textChangeHandler}
            >
              {colors}
            </select>
          </div>

          <input type="submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.rootErrors.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postBook: (book, author, closeModal) =>
      dispatch(actionCreators.postBook(book, author, closeModal)),
    resetErrors: () => dispatch(actionCreators.resetErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookForm);
