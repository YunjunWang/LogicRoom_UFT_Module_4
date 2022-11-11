import React, { useState } from "react";
import ReactDOM from "react-dom";
import BooksPresenter from "./Books/BooksPresenter.js";

import "./styles.css";

function App() {
  const booksPresenter = new BooksPresenter();
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [stateViewModel, copyViewModelToStateViewModel] = useState([]);

  React.useEffect(() => {
    async function load() {
      await booksPresenter.load(viewModel => {
        copyViewModelToStateViewModel(viewModel);
      });
    }
    load();
  }, []);

  return (
    <>
      <h3>Books</h3>
      <div>
        {stateViewModel.map((book, i) => {
          return <div key={i}>{book.name}</div>;
        })}
        <h5>Add Book</h5>
        name : &nbsp;&nbsp; <input onKeyUp={e => setName(e.target.value)} />
        <br />
        author : <input onKeyUp={e => setAuthor(e.target.value)} />
        <br />
        <button
          onClick={() => {
            booksPresenter.addBook(name, author);
          }}
        >
          add book
        </button>
      </div>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
