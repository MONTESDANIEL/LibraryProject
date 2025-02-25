import { ReactNode } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface FloatWindowProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children?: ReactNode;
    size?: string;
}

const FloatWindow: React.FC<FloatWindowProps> = ({ isOpen = false, onClose, title = "", children = null, size = "" }) => {
    if (!isOpen) return null;

    return (
        <>
            <div className="modal-backdrop fade show" onClick={onClose}></div>
            <div
                className="modal fade show"
                style={{ display: "block" }}
                tabIndex={-1}
                role="dialog"
                aria-labelledby="modalTitle"
                aria-hidden={!isOpen}
            >
                <div className={`modal-dialog modal-dialog-centered ${size ? `modal-${size}` : ""}`} role="document" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-content">
                        <div className="modal-header m-1">
                            <h6 className="modal-title" id="modalTitle">{title}</h6>
                            <button type="button" className="btn-close" onClick={onClose} aria-label="Cerrar"></button>
                        </div>
                        <div className="modal-body">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FloatWindow;
