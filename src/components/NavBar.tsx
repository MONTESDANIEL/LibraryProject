import React from "react";

const Navbar: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
            <div className="container-fluid m-2">

                <a className="navbar-brand fw-bold" href="/books">
                    LIBRERÍA
                </a>

                {/* Botón para dispositivos móviles */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Contenedor de enlaces */}
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item mx-2">
                            <a className="nav-link" href="/books">
                                Libros
                            </a>
                        </li>
                        <li className="nav-item mx-2">
                            <a className="nav-link" href="/statistics">
                                Estadística
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
