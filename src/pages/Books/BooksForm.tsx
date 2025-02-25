import { useState, useEffect } from "react";

interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    availability: boolean;
}

interface BooksFormProps {
    book?: Book;
}

const BooksForm: React.FC<BooksFormProps> = ({ book }) => {

    // Estado para almacenar los datos del formulario
    const [formData, setFormData] = useState<Book>(
        book || { id: Date.now(), title: "", author: "", genre: "", availability: true }
    );

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Efecto para actualizar el formulario (revisar)
    useEffect(() => {
        if (book) {
            setFormData(book);
        }
    }, [book]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "availability" ? value === "true" : value,
        }));
    };

    const validateForm = () => {
        let newErrors: { [key: string]: string } = {};
        if (!formData.title.trim()) newErrors.title = "El título es obligatorio.";
        if (!formData.author.trim()) newErrors.author = "El autor es obligatorio.";
        else if (formData.author.length < 2 || /\d/.test(formData.author)) newErrors.author = "El autor no puede ser numérico.";
        if (!formData.genre.trim()) newErrors.genre = "El género es obligatorio.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            if (!book) {
                setFormData({ id: Date.now(), title: "", author: "", genre: "", availability: true });
            }
        }
    };

    // Función reutilizable para generar campos de entrada en el formulario
    const renderInputField = (label: string, name: keyof Book, type: string = "text") => (
        <div className="mb-3">
            <label htmlFor={name} className="form-label fw-bold">{label}</label>
            <input
                type={type}
                className="form-control"
                id={name}
                name={name}
                placeholder={`Ingrese ${label.toLowerCase()}`}
                value={formData[name] as string}
                onChange={handleChange}
            />
            {errors[name] && <small className="text-danger">{errors[name]}</small>}
        </div>
    );

    return (
        <div className="p-1">
            <form onSubmit={handleSubmit}>
                {renderInputField("Título", "title")}
                {renderInputField("Autor", "author")}
                {renderInputField("Género", "genre")}

                {/* Campo de selección para disponibilidad */}
                <div className="mb-3">
                    <label htmlFor="availability" className="form-label fw-bold">Disponibilidad</label>
                    <select
                        className="form-control"
                        id="availability"
                        name="availability"
                        value={formData.availability.toString()}
                        onChange={handleChange}
                    >
                        <option value="true">Disponible</option>
                        <option value="false">No Disponible</option>
                    </select>
                </div>

                {/* Botón de envío del formulario */}
                <div className="d-flex justify-content-end">
                    <button type="submit" className={`btn ${book ? "btn-success" : "btn-primary"} me-2`}>
                        {book ? "Guardar cambios" : "Agregar libro"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BooksForm;
