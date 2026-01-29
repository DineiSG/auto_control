import '../sidebar/Sidebar.css';

function ButtonSidebar({ href, iconClass, text,classNameLink, texto_botao }) {
  return (

    <button className={classNameLink} href={href}>
      <i className={iconClass} id='ti_icons' ></i>
      <span className={texto_botao}>{text}</span>
    </button>


  );
}

export default ButtonSidebar