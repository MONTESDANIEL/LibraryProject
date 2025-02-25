import React from "react";

// Define la interfaz para las props del componente
interface RenderInputFieldProps {
    label: string;
    name: string;
    type?: string;
    value: string;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    containerClassName?: string;
    disabled?: boolean;
}

const RenderInputField: React.FC<RenderInputFieldProps> = ({
    label,
    name,
    type = "text",
    value,
    error,
    onChange,
    containerClassName = "",
    disabled = false,
}) => {
    return (
        <div className={`${containerClassName} mb-3`}>
            <label htmlFor={name} className="form-label fw-bold">
                {label}
            </label>
            <input
                type={type}
                className="form-control"
                id={name}
                name={name}
                placeholder={`Ingrese ${label.toLowerCase()}`}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
            {error && <small className="text-danger">{error}</small>}
        </div>
    );
};

export default RenderInputField;
