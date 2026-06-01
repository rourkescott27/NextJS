"use client";

import { useState } from "react";

const AddBook = () => {
  const [modalOpen, setModalOpen] = useState(false);

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
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setModalOpen(false)}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Add New Book</h3>
        </div>
      </dialog>
    </div>
  );
};

export default AddBook;
