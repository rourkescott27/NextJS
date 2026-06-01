"use client";

import LoadingPage from "../loading";
import AddBook from "./AddBook";
import Link from "next/link";
import { useState, useEffect } from "react";

async function getBooks() {
  const res = await fetch("http://localhost:3000/api/books");
  const json = await res.json();
  return json;
}

const Books = () => {
  //!Removed async from here because useEffect is used to fetch data
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const fetchBooks = async () => { 
    const res = await fetch("/api/books");
    const books = await res.json();
    setBooks(books);
    setLoading(false);
  }

  useEffect(() => {
    fetchBooks();
    // getBooks().then((books) => {
    //   setBooks(books);
    //   setLoading(false);
    // });
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`/api/books/search?query=${query}`);
    const books = await res.json();
    setBooks(books);
    setLoading(false);
    console.log("Searching for:", query);
  };

  const deleteBook = async (id) => {
    const res = await fetch(`api/books/${id}`, {
      method: "DELETE"
    });
    fetchBooks();
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl text-center font-bold text-heading ml-4 mt-5">
        Books
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 mt-5">
          <input
            type="text"
            placeholder="Search books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input input-primary w-full max-w-xs"
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>
      <div className="w-full max-w-5xl bg-base-300 px-6 py-6 rounded-xl shadow-inner flex flex-col items-center mt-5">
        <AddBook refreshBooks={fetchBooks} />
        {books.map((book) => (
          <div key={book.id}>
            <div className="card w-96 bg-base-100 shadow-xl mt-5">
              <figure className="px-10 pt-10">
                <img src={book.img} width="200" height="150" />
              </figure>
              <div className="card-body">
                <div>
                  <h2 className="card-title justify-around">
                    {book.id}) {book.title}
                  </h2>
                </div>
                <div className="card-actions justify-center">
                  <Link href={book.link} className="btn btn-primary">
                    See in Amazon
                  </Link>
                  <button
                    onClick={() => deleteBook(book.id)}
                    className="btn btn-error"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
