const Footer = () => {
    return (
        <footer className="bg-body-tertiary">

            <div className="container p-3 justify-content-center">
                <div className="d-flex flex-column align-items-center p-2">
                    <h5 className="text-uppercase">Contáctame</h5>
                    <div className="d-flex flex-row align-items-center gap-5 flex-wrap p-1 text-muted">
                        <a href="https://github.com/MONTESDANIEL" target="_blank" rel="noopener noreferrer"
                            className="text-reset">
                            <i className="bi bi-github fs-2"></i>
                        </a>
                        <a href="https://www.linkedin.com/in/daniel-amaya-montes-30a09a294?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-reset">
                            <i className="bi bi-linkedin fs-2"></i>
                        </a>
                        <a href="https://wa.me/3054171043" target="_blank" rel="noopener noreferrer"
                            className="text-reset">
                            <i className="bi bi-whatsapp fs-2"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div className="text-center p-3">
                © {new Date().getFullYear()} Daniel Amaya Montes
            </div>

        </footer>
    )
}

export default Footer;