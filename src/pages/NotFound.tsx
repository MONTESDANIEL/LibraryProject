import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <section className="container-fluid">
            <div className="d-flex bg-body-tertiary p-3 m-3 rounded-4 min-vh-100 justify-content-center align-items-center">
                <div className="text-center">
                    <h1 className="display-1 text-danger">404</h1>
                    <h2 className="mb-3">Página No Encontrada</h2>
                    <p className="lead">
                        Lo sentimos, la página que buscas no existe.
                    </p>
                    <Link to="/" className="btn btn-secondary btn-lg btn-sm">
                        Volver a la Página de Inicio
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default NotFound;
