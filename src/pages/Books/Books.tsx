import { SetStateAction, useState } from "react";
import books from "../../data/books.js";
import '@assets/styles/Books.css';
import FloatWindow from "@components/FloatWindow.js";
import BookDetails from "./BooksDetails.js";

const ListBook: React.FC<Book> = ({ title = "", author = "", genre = "", availability = false }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handlerBook = () => {
        setIsOpen(true);
    };

    return (
        <div className="col-md-6 col-lg-4 p-2 custom-container" onClick={() => handlerBook()}>
            <div className="card shadow-sm rounded-3 position-relative custom-card">
                <div className="card-body">
                    <h5 className="card-title text-center fw-bold">{title}</h5>
                    <hr />
                    <p className="card-text text-muted mb-1">
                        <span className="fw-semibold">Autor:</span> {author}
                    </p>
                    <p className="card-text text-muted mb-1">
                        <span className="fw-semibold">Género:</span> {genre}
                    </p>
                    <p className={`card-text ${availability ? "text-success" : "text-danger"}`}>
                        <span className="fw-semibold">Disponibilidad:</span> {availability ? "Sí" : "No"}
                    </p>
                </div>
                <div className="card-overlay">
                    <i className="bi bi-info-circle me-2"></i> Más información
                </div>
            </div>
            {isOpen && (
                <FloatWindow
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Más información"
                    size="md"
                >
                    <BookDetails
                        title={title}
                        author={author}
                        genre={genre}
                        availability={availability}
                    />
                </FloatWindow>
            )}
        </div>
    );
};

interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    availability: boolean;
}

const Books = () => {
    const [selectedFilter, setSelectedFilter] = useState("all");

    const filters = [
        { label: "Todos", value: "all" },
        { label: "Disponible", value: "available" },
        { label: "No disponible", value: "unavailable" }
    ];

    const handleFilterChange = (filterValue: SetStateAction<string>) => {
        setSelectedFilter(filterValue);
    };

    // Filtrar libros según el estado seleccionado
    const filteredBooks = books.filter((book: Book) => {
        if (selectedFilter === "available") return book.availability;
        if (selectedFilter === "unavailable") return !book.availability;
        return true; // "Todos"
    });

    const handleCreate = () => {
        console.log("Create")
    }

    return (
        <section className="container-fluid">
            <div className="row bg-body-tertiary m-3 p-3 rounded-4 min-vh-100">
                <h1 className="text-center fw-bold p-3"> Libros</h1>
                <div className="d-flex justify-content-between p-3">
                    <button type="button" className="btn btn-success btn-sm" onClick={() => handleCreate()}>
                        <i className="bi bi-plus me-2"></i>
                        <span>Nuevo</span>
                    </button>
                    <div className="dropdown-center">
                        <button
                            className="btn btn-sm btn-secondary dropdown-toggle"
                            type="button"
                            id="filterDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <span>Filtrar</span>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="filterDropdown">
                            {filters.map((filter) => (
                                <li key={filter.value}>
                                    <button
                                        className="dropdown-item btn btn-sm"
                                        onClick={() => handleFilterChange(filter.value)}
                                    >
                                        {filter.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((row: Book) => (
                        <ListBook key={row.id} {...row} />
                    ))
                ) : (
                    <div className="text-center">
                        <h5 className="mb-0">No se encontró ningún libro para mostrar</h5>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Books;
