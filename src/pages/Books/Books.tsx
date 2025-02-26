import { SetStateAction, useState, useEffect } from "react";
import '@assets/styles/Books.css';
import FloatWindow from "@components/FloatWindow.tsx";
import BookDetails from "./BooksDetails.tsx";
import BooksForm from "./BooksForm.tsx";
import { listAllBooks } from "../../api/BookApi.js";

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
    const book = { id, title, author, genre, availability };
    return (
        <div className="col-md-6 col-lg-4 p-2 custom-container" onClick={() => setActiveBook(book)}>
            <div className="card shadow-sm rounded-3 position-relative custom-card">
                <div className="card-body">
                    <h5 className="card-title text-center fw-bold">{title}</h5>
                    <ul className="list-unstyled">
                        <li className="my-2"><span className="fw-semibold">Autor:</span> {author}</li>
                        <li className="my-2"><span className="fw-semibold">Género:</span> {genre}</li>
                        <li className={`my-2 card-text ${availability ? "text-success" : "text-danger"}`}>
                            <span className="fw-semibold">Disponibilidad:</span> {availability ? "Sí" : "No"}
                        </li>
                    </ul>
                </div>
                <div className="card-overlay">
                    <i className="bi bi-info-circle me-2"></i> Más información
                </div>
            </div>
        </div>
    );
};

const Books = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [activeBook, setActiveBook] = useState<Book | null>(null);
    const [editingBook, setEditingBook] = useState<Book | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("all");

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await listAllBooks();
                setBooks(response);
            } catch (error) {
                console.error("Error al obtener los libros:", error);
            }
        };
        fetchBooks();
    }, []);

    const filters = [
        { label: "Todos", value: "all" },
        { label: "Disponible", value: "available" },
        { label: "No disponible", value: "unavailable" }
    ];

    const handleFilterChange = (filterValue: SetStateAction<string>) => {
        setSelectedFilter(filterValue);
    };

    const filteredBooks = books.filter((book) => {
        if (selectedFilter === "available") return book.availability;
        if (selectedFilter === "unavailable") return !book.availability;
        return true;
    });

    const handleCreate = () => {
        setIsFormOpen(true);
        setEditingBook(null);
    };

    return (
        <section className="container-fluid">
            <div className="d-flex flex-column bg-body-tertiary m-3 p-3 rounded-4 min-vh-100">
                <h1 className="text-center fw-bold p-3">Libros</h1>

                <div className="d-flex justify-content-between p-3 align-items-center">
                    <button type="button" className="btn btn-success btn-sm" onClick={handleCreate}>
                        <i className="bi bi-plus me-2"></i> <span>Nuevo</span>
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

                <div className="row flex-grow-1">
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map((book) => (
                            <ListBook key={book.id} {...book} setActiveBook={setActiveBook} />
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
                <FloatWindow isOpen onClose={() => setActiveBook(null)} title="Detalles del libro">
                    <BookDetails book={activeBook} onEdit={() => setEditingBook(activeBook)} />
                </FloatWindow>
            )}

            {/* Ventana flotante para crear o editar un libro */}
            {(isFormOpen || editingBook) && (
                <FloatWindow isOpen onClose={() => { setIsFormOpen(false); setEditingBook(null); }}
                    title={editingBook ? "Editar libro" : "Agregar nuevo libro"}>
                    <BooksForm book={editingBook || undefined} />
                </FloatWindow>
            )}
        </section>
    );
};

export default Books;
