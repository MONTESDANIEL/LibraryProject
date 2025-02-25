import { SetStateAction, useState } from "react";
import booksData from "../../data/books.js";
import '@assets/styles/Books.css';
import FloatWindow from "@components/FloatWindow.js";
import BookDetails from "./BooksDetails.js";
import BooksForm from "./BooksForm.js";

interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    availability: boolean;
}

interface ListBookProps extends Book {
    setActiveBook: (book: Book | null) => void;
}

const ListBook: React.FC<ListBookProps> = ({ id, title, author, genre, availability, setActiveBook }) => {

    const book = { id, title, author, genre, availability }
    return (
        <div className="col-md-6 col-lg-4 p-2 custom-container" onClick={() => setActiveBook(book)}>
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
        </div>
    );
};

const Books = () => {
    const [books] = useState<Book[]>(booksData);
    const [activeBook, setActiveBook] = useState<Book | null>(null);
    const [editingBook, setEditingBook] = useState<Book | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
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
        setIsFormOpen(true);
    };

    return (
        <section className="container-fluid">
            {/* Contenedor principal */}
            <div className="d-flex flex-column bg-body-tertiary m-3 p-3 rounded-4 min-vh-100">
                <h1 className="text-center fw-bold p-3">Libros</h1>

                {/* Botones de acción */}
                <div className="d-flex justify-content-between p-3 align-items-center">
                    <button type="button" className="btn btn-success btn-sm" onClick={handleCreate}>
                        <i className="bi bi-plus me-2"></i>
                        <span>Nuevo</span>
                    </button>
                    <div className="dropdown">
                        <button
                            className="btn btn-sm btn-secondary dropdown-toggle"
                            type="button"
                            id="filterDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Filtrar
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

                {/* Lista de libros */}
                <div className="row flex-grow-1">
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map((row: Book) => (
                            <ListBook key={row.id} {...row} setActiveBook={setActiveBook} />
                        ))
                    ) : (
                        <div className="d-flex justify-content-center align-items-center">
                            <h5 className="mb-0">No se encontró ningún libro para mostrar</h5>
                        </div>
                    )}
                </div>
            </div>

            {/* Ventana flotante para detalles del libro */}
            {activeBook && !editingBook && (
                <FloatWindow
                    isOpen={!!activeBook}
                    onClose={() => setActiveBook(null)}
                    title="Detalles del libro">
                    <BookDetails book={activeBook || undefined} onEdit={() => setEditingBook(activeBook)} />
                </FloatWindow>
            )}

            {/* Ventana flotante para crear o editar un libro */}
            {(isFormOpen || editingBook) && (
                <FloatWindow
                    isOpen={isFormOpen || !!editingBook}
                    onClose={() => { setIsFormOpen(false); setEditingBook(null); }}
                    title={editingBook ? "Editar libro" : "Agregar nuevo libro"}>
                    <BooksForm book={editingBook || undefined} />
                </FloatWindow>
            )}

        </section>
    );
};

export default Books;
