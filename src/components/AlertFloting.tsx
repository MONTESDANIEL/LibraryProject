import { useState, useEffect } from "react";

interface AlertProps {
    message: string;
    type?: "success" | "danger" | "warning" | "info";
    duration?: number; // Tiempo en milisegundos antes de desaparecer
}

const AlertFloating: React.FC<AlertProps> = ({ message, type = "info", duration = 10000 }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // Esconde la alerta después del tiempo establecido
        const timer = setTimeout(() => setVisible(false), duration);
        return () => clearTimeout(timer);
    }, [duration]);

    if (!visible) return null;

    return (
        <div
            className={`alert alert-${type} alert-dismissible fade show position-fixed`}
            style={{
                bottom: "20px", // Siempre en la parte inferior
                left: "20px",   // Siempre en la parte izquierda
                zIndex: 1050,
                minWidth: "300px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            role="alert"
        >
            {message}
            <button type="button" className="btn-close" onClick={() => setVisible(false)}></button>
        </div>
    );
};

export default AlertFloating;
