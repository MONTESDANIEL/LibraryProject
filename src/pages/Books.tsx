import books from "../data/books.js";

const ListBook: React.FC<Book> = ({ title = "", author = "", genre = "", availability = "" }) => {
    return (
        <div className="col-md-6 col-lg-4 p-2">
            <div className="card shadow-sm rounded-3">
                <div className="card-body">
                    <h5 className="card-title text-center fw-bold">{title}</h5>
                    <hr />
                    <p className="card-text text-muted mb-1">
                        <span className="fw-semibold">Autor:</span> {author}
                    </p>
                    <p className="card-text text-muted mb-1">
                        <span className="fw-semibold">Genero:</span> {genre}
                    </p>
                    <p className={`card-text ${availability === "Yes" ? "text-success" : "text-danger"}`}>
                        <span className="fw-semibold">Disponibilidad:</span> {availability}
                    </p>
                </div>
            </div>
        </div>
    );
};

interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    availability: string;
}

const Books = () => {
    return (
        <section className="container-fluid">
            <div className="row bg-body-tertiary m-3 p-3 rounded-4 min-vh-100">
                <h1 className="text-center fw-bold p-3"> Libros</h1>
                {books.length > 0 ? (
                    books.map((row: Book) => (
                        <ListBook key={row.id} {...row} />
                    ))
                ) : (
                    <div className="text-center">
                        <h5 className="mb-0">No se encontro ningun libro para mostrar</h5>
                    </div>
                )}
            </div>

        </section>
    );
};

export default Books;
