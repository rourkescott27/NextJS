import Link from "next/link";
async function getBooks() {
  const res = await fetch("http://localhost:3000/api/books");
  const json = await res.json();
  return json;
}

const Books = async () => {
  const books = await getBooks();
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl text-center font-bold text-heading ml-4 mt-5">
        Books
      </h1>
      <div className="w-full max-w-5xl bg-base-300 px-6 py-6 rounded-xl shadow-inner flex flex-col items-center mt-5">
        {books.map((book) => (
          <div key={book.id}>
            <div className="card w-96 bg-base-100 shadow-xl mt-5">
              <figure className="px-10 pt-10">
                <img src={book.img} width="200" height="150" />
              </figure>
              <div className="card-body">
                <div className="flex items-center gap-2">
                  <h2 className="card-title">{book.id})</h2>
                  <p>{book.title}</p>
                </div>
                <div className="card-actions justify-end">
                  <Link href={book.link} className="btn btn-primary">
                    See in Amazon
                  </Link>
                  <button className="btn btn-error"> Delete </button>
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
