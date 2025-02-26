import { useNavigate } from "react-router-dom";

interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    availability: boolean;
}

interface BookDetailsProps {
    book: Book;
    onEdit: (book: Book) => void;
    onDelete: () => void;  // Aquí corregimos para que no reciba el evento
}


const BookDetails: React.FC<BookDetailsProps> = ({ book, onEdit, onDelete }) => {
    const navigate = useNavigate();

    const handleDelete = () => {
        onDelete();
    };

    // Redirige a la página de préstamo con la información del libro
    const handleLoan = () => {
        navigate("/loan", { state: { book } });
    };

    return (
        <div className="p-3">
            <div className="mb-4">
                <h2 className="text-center">{book.title}</h2>
                <ul className="list-unstyled">
                    <li className="my-2">
                        <span className="fw-semibold">Autor:</span> {book.author}
                    </li>
                    <li className="my-2">
                        <span className="fw-semibold">Género:</span> {book.genre}
                    </li>
                    <li className={`my-2 card-text ${book.availability ? "text-success" : "text-danger"}`}>
                        <span className="fw-semibold">Disponibilidad:</span> {book.availability ? "Sí" : "No"}
                    </li>
                </ul>
            </div>
            <div className="row gap-3 justify-content-center">
                <button type="button" className="btn btn-danger btn-sm col-3" onClick={handleDelete}>
                    <i className="bi bi-trash me-2"></i>
                    <span>Eliminar</span>
                </button>
                <button type="button" className="btn btn-warning btn-sm col-3" onClick={() => onEdit(book)}>
                    <i className="bi bi-pen-fill me-2"></i>
                    <span>Editar</span>
                </button>
                <button
                    type="button"
                    className={`btn btn-primary btn-sm col-3 ${book.availability ? "" : "disabled"}`}
                    onClick={handleLoan}
                    disabled={!book.availability}
                >
                    <i className="bi bi-book me-2"></i>
                    <span>Préstamo</span>
                </button>
            </div>
        </div>
    );
};

export default BookDetails;
