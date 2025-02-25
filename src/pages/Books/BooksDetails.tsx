interface BookDetailsProps {
    title: string;
    author: string;
    genre: string;
    availability: boolean;
}

const BookDetails: React.FC<BookDetailsProps> = ({ title, author, genre, availability }) => {

    const handleDelete = () => {
        console.log("Delete");
    }

    const handleUpdate = () => {
        console.log("Update");
    }

    const handleLoan = () => {
        console.log("Loan");
    }

    return (
        <div className=" p-3">
            <div className="mb-4">
                <h2 className="text-center">{title}</h2>
                <ul className="list-unstyled">
                    <li className="my-2">
                        <span className="fw-semibold">Autor:</span> {author}
                    </li>
                    <li className="my-2">
                        <span className="fw-semibold">Género:</span> {genre}
                    </li>
                    <li className={`my-2 card-text ${availability ? "text-success" : "text-danger"}`}>
                        <span className="fw-semibold">Disponibilidad:</span> {availability ? "Sí" : "No"}
                    </li>
                </ul>
            </div>
            <div className="row gap-3 justify-content-center">
                <button type="button" className="btn btn-danger btn-sm col-3" onClick={() => handleDelete()}>
                    <i className="bi bi-trash me-2"></i>
                    <span>Eliminar</span>
                </button>
                <button type="button" className="btn btn-warning btn-sm col-3" onClick={() => handleUpdate()}>
                    <i className="bi bi-pen-fill me-2"></i>
                    <span>Editar</span>
                </button>
                <button type="button" className={`btn btn-primary btn-sm col-3 ${availability ? "" : "disabled"}`} onClick={() => handleLoan()}>
                    <i className="bi bi-book me-2"></i>
                    <span>Rentar</span>
                </button>
            </div>

        </div >
    );
};

export default BookDetails;
