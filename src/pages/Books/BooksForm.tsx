import { useState, useEffect } from "react";
import { z } from "zod";
import RenderInputField from "@components/RenderInputField.tsx";
import { addBook, updateBook } from "../../api/BookApi.js"; // Importa las funciones de la API

const formSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(1, "El título es obligatorio."),
    author: z.string()
        .min(2, "El autor es obligatorio.")
        .regex(/^[a-zA-Z\s]+$/, "El autor no puede contener números ni caracteres especiales."),
    genre: z.string().min(1, "El género es obligatorio."),
    availability: z.boolean(),
});

interface Book {
    id?: number;
    title: string;
    author: string;
    genre: string;
    availability: boolean;
}

interface BooksFormProps {
    book?: Book;
}

const BooksForm: React.FC<BooksFormProps> = ({ book }) => {
    const [formData, setFormData] = useState<Book>({
        id: book?.id || undefined,
        title: book?.title || "",
        author: book?.author || "",
        genre: book?.genre || "",
        availability: book?.availability ?? true,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
        const result = formSchema.safeParse(formData);
        if (!result.success) {
            const newErrors: { [key: string]: string } = {};
            result.error.errors.forEach((err) => {
                if (err.path.length > 0) {
                    newErrors[err.path[0]] = err.message;
                }
            });
            setErrors(newErrors);
            return false;
        }
        setErrors({});
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            if (formData.id) {
                await updateBook(formData); // Editar libro existente
            } else {
                await addBook(formData); // Agregar nuevo libro
            }
            window.location.reload(); // Refresca la lista de libros
        } catch (error) {
            console.error("Ocurrió un error inesperado:", error);
        }
    };

    return (
        <div className="p-1">
            <form onSubmit={handleSubmit}>
                <RenderInputField
                    label="Título"
                    name="title"
                    value={formData.title}
                    error={errors.title}
                    onChange={handleChange}
                />
                <RenderInputField
                    label="Autor"
                    name="author"
                    value={formData.author}
                    error={errors.author}
                    onChange={handleChange}
                />
                <RenderInputField
                    label="Género"
                    name="genre"
                    value={formData.genre}
                    error={errors.genre}
                    onChange={handleChange}
                />

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
