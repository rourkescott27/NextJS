"use client";

import { useState } from "react";

const AddBook = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    link: "",
    img: "",
  });

  const handleSubmitNewBook = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });

    if (res.ok) {
      setNewBook({
        title: "",
        link: "",
        img: "",
      });
      setModalOpen(false);
    }
  };

  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
        Add Book
      </button>
      <dialog
        id="my_modal_3"
        className={`modal ${modalOpen ? "modal-open" : ""}`}
      >
        <div className="modal-box">
          <form method="dialog" onSubmit={handleSubmitNewBook}>
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setModalOpen(false)}
            >
              ✕
            </button>
            <h3 className="font-bold text-lg text-center">Add New Book</h3>
            <div className="flex flex-col items-center gap-3 mt-5">
              <input
                type="text"
                value={newBook.title}
                onChange={(e) =>
                  setNewBook({ ...newBook, title: e.target.value })
                }
                placeholder="Create Book Title"
                className="input input-primary w-full max-w-xs"
              />
              <input
                type="url"
                value={newBook.img}
                onChange={(e) =>
                  setNewBook({ ...newBook, img: e.target.value })
                }
                placeholder="Image URL"
                className="input input-primary w-full max-w-xs"
              />
              <input
                type="url"
                value={newBook.link}
                onChange={(e) =>
                  setNewBook({ ...newBook, link: e.target.value })
                }
                placeholder="Book Link"
                className="input input-primary w-full max-w-xs"
              />
            </div>
            <button type="submit" className="btn btn-primary w-full mt-5">
              Add Book
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AddBook;
