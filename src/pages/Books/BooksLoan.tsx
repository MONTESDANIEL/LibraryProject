import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { z } from "zod";
import RenderInputField from "@components/RenderInputField.tsx";

// Tipado para el libro
interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    availability: boolean;
}

const formSchema = z.object({
    id: z.number(),
    book_id: z.number(),
    user_id: z.string(),
    loan_date: z.string().nonempty("La fecha de préstamo es obligatoria."),
    return_date: z.string().nonempty("La fecha de devolución es obligatoria."),
    cc: z.string()
        .min(5, "La cédula debe tener entre 5 y 15 caracteres.")
        .max(15, "La cédula debe tener entre 5 y 15 caracteres.")
        .regex(/^\d+$/, "La cédula solo debe contener números."),
    name: z.string().min(1, "El nombre es obligatorio."),
    email: z.string().email("El email no es válido."),
    phone: z.string()
        .min(7, "El teléfono debe tener entre 7 y 15 dígitos.")
        .max(15, "El teléfono debe tener entre 7 y 15 dígitos.")
        .regex(/^\d+$/, "El teléfono solo debe contener números."),
    address: z.string()
        .min(5, "La dirección debe tener entre 5 y 100 caracteres.")
        .max(100, "La dirección debe tener entre 5 y 100 caracteres.")
        .regex(/^[a-zA-Z0-9\s]+([#\-,.]\s*[a-zA-Z0-9\s]*)*$/, "La dirección contiene caracteres inválidos."),
});

type FormData = z.infer<typeof formSchema>;

const BooksLoan: React.FC = () => {
    const location = useLocation();
    const book: Book | null = location.state?.book ?? null;

    const [formData, setFormData] = useState<FormData>({
        id: 0,
        book_id: book?.id || 0,
        user_id: "",
        loan_date: new Date().toISOString().split("T")[0],
        return_date: new Date().toISOString().split("T")[0],
        cc: "",
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (book) {
            setFormData((prev) => ({ ...prev, book_id: book.id }));
        }
    }, [book]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const result = formSchema.safeParse(formData);
        if (!result.success) {
            const newErrors = result.error.flatten().fieldErrors;
            setErrors(Object.fromEntries(Object.entries(newErrors).map(([key, value]) => [key, value?.[0] || ""])));
            return;
        }

        const newData = { ...formData, user_id: formData.cc };
        console.log("Datos de préstamo registrados:", newData);
    };

    return (
        <section className="container-fluid">
            <div className="row p-2 m-3">
                <div className="p-4 mb-2 bg-body-tertiary rounded-4">
                    <h1 className="text-center fw-bold p-3">Rentar {book?.title}</h1>
                    <ul className="list-unstyled">
                        <li className="my-3">
                            <h5 className="fw-semibold">
                                Autor: <span className="fw-normal">{book?.author}</span>
                            </h5>
                        </li>
                        <li className="my-3">
                            <h5 className="fw-semibold">
                                Género: <span className="fw-normal">{book?.genre}</span>
                            </h5>
                        </li>
                        <li className={`my-3 ${book?.availability ? "text-success" : "text-danger"}`}>
                            <h5 className="fw-semibold">
                                Disponibilidad:{" "}
                                <span className="fw-normal">{book?.availability ? "Sí" : "No"}</span>
                            </h5>
                        </li>
                    </ul>
                </div>

                <div className="p-4 bg-body-tertiary rounded-4">
                    <h1 className="text-center fw-bold p-3 mb-4">Datos del usuario y préstamo</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <RenderInputField label="Cédula" name="cc" value={formData.cc} error={errors.cc} onChange={handleChange} containerClassName="col-md-6" />
                            <RenderInputField label="Nombre" name="name" value={formData.name} error={errors.name} onChange={handleChange} containerClassName="col-md-6" />
                        </div>

                        <div className="row">
                            <RenderInputField label="Email" name="email" value={formData.email} error={errors.email} onChange={handleChange} containerClassName="col-md-6" />
                            <RenderInputField label="Teléfono" name="phone" value={formData.phone} error={errors.phone} onChange={handleChange} containerClassName="col-md-6" />
                        </div>

                        <RenderInputField label="Dirección" name="address" value={formData.address} error={errors.address} onChange={handleChange} />

                        <div className="row">
                            <RenderInputField label="Fecha de préstamo" name="loan_date" type="date" value={formData.loan_date} error={errors.loan_date} onChange={handleChange} containerClassName="col-md-6" />
                            <RenderInputField label="Fecha de devolución" name="return_date" type="date" value={formData.return_date} error={errors.return_date} onChange={handleChange} containerClassName="col-md-6" />
                        </div>

                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary me-2">Registrar préstamo</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default BooksLoan;
