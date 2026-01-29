import { ChevronDown, ChevronRight} from "lucide-react";

const Dropdown = ({ 
  label, 
  children, 
  classNameDrop, 
  iconClass, 
  isOpen,        // nova prop: controla se está aberto
  onToggle       // nova prop: função chamada ao clicar
}) => {
  return (
    <div className="">
      {/* Botão principal */}
      <button
        onClick={onToggle} // chama a função do pai
        className={classNameDrop}
      >
        <i className={iconClass} id="ti"></i>
        <span>{label}</span>
        {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>

      {/* Conteúdo do dropdown */}
      <ul className={`dropdown-list ${isOpen ? "open" : ""}`}>
        {children}
      </ul>
    </div>
  );
};

export default Dropdown;

/*"flex justify-between items-center w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg" */