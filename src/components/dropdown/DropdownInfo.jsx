const DropdownInfo = ({ dropInfo, imagem, src, children, iconClass, dropBtn, idDrop, isOpen, onToggle, styleIcon }) => {
    return (
        <div className="dropdown-wrapper">
            {/* Botão que aciona o dropdown */}
            <a
                href="#"
                aria-expanded={isOpen}
                onClick={(e) => { e.preventDefault(); onToggle(); }}
                className={`${dropInfo} ${isOpen ? 'dropdown-open' : ''}`}
                id={dropBtn}
            >
                {iconClass && <i className={iconClass} id={styleIcon}></i>}
                {src && <img className={imagem} src={src} alt="dropdown icon" />}
            </a>

            {/* Conteúdo do dropdown */}
            <ul className={`dropdown-menu ${isOpen ? "show" : ""}`} id={idDrop}>
                {children}
            </ul>
        </div>
    );
};

export default DropdownInfo;
