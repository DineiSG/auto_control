import { useState, useEffect } from "react";
import "../../assets/css/themify-icons.css"
import './Sidebar.css';
import ButtonSidebar from "../button_sidebar/ButtonSidebar";
import Dropdown from "../dropdown/Dropdown";
import { usePostNotifications } from "../../services/usePostNotifications";
import { useGetData } from "../../services/useGetData";

//hook de teste
/* import { useGetTest } from "../../services/useGetTest"; */


function Sidebar() {

  const [openDropdown, setOpenDropdown] = useState(null)
  const [userPermissions, setUserPermissions] = useState({});
  const [consultasData, setConsultasData] = useState({
    creditos: {},
    laudos: {},
    veiculos: {},
  });


  const { consultas } = usePostNotifications("consultas", 15000)

  const toggleDropdown = (id) => {
    // Se clicar no mesmo dropdown, fecha; senão, abre esse e fecha os outros
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const { data } = useGetData("/auth/session-info")
  console.log("Dados do usuário: ", data)

  /* //Pega dados do usuário - Teste
  const { data } = useGetTest("/auth/session-info") */


  // Função para obter as permissões do usuário
  const getUserPermissions = () => {
    // Verifica se os dados existem e retorna as permissões
    // Ajuste o caminho conforme a estrutura real dos dados. Aqui, assumimos que as permissões estão em data.userData.dados.Permissoes
    return data?.userData?.dados.Permissoes || {};
  };

  // Efeito para atualizar as permissões quando os dados mudarem
  useEffect(() => {
    if (data) {
      const permissions = getUserPermissions();
      setUserPermissions(permissions);
    }
  }, [data]);

  // Função para verificar se o usuário tem permissão para um item específico de Permissoes
  const hasPermission = (permissionKey) => {
    // Retorna true se o usuário tiver permissão para o item especificado
    // Considera que as permissões podem ser booleanas ou objetos
    const permission = userPermissions[permissionKey];
    if (typeof permission === 'boolean') {
      return permission;
    } else if (typeof permission === 'object' && permission !== null) {
      // Se for um objeto, consideramos que tem permissão se existir
      return true;
    }
    return false;
  };


  const possibleDropdownButtons = {
    creditos: [
      { id: 114, text: "114 - NOVA LOCALIZA VEICULOS" },
      { id: 234, text: "234 - BUSCA VEÍCULOS 2" },
    ],
    veiculos: [
      { id: 9, text:"9 - CRED GRAVAME"},
      { id: 24, text: "24 - CRED AGREGADOS" },
      { id: 96, text: "96 - CRED BASE ESTADUAL" },
      { id:78, text:"78 - ESPECIAL"},
      { id: 115, text:"115 - CRE LEILAO PLUS"}
    ],
    laudos: [
      { id: 30, text: "30 - LAUDO CAUTELAR" },
      { id: 31, text: "31 - LAUDO TRANSFERENCIA" },
      { id: 50, text: "50 - LAUDO FINANCEIRO" },
      { id: 166, text: "166 - LAUDO DE IDENTIFICAÇÂO" },
    ],
  };

  useEffect(() => {
    if (data?.userData?.dados?.Consultas) {
      const { creditos = {}, laudos = {}, veiculos = {} } = data.userData.dados.Consultas;
      setConsultasData({ creditos, laudos, veiculos });
    }
  }, [data]);

  const hasItems = (categoria) => {
    const items = consultasData[categoria];
    return items && Object.keys(items).length > 0;
  };


  return (

    <div className="corpo_menu">
      <div className="logo_img">
        <img src="	https://ambteste.credtudo.com.br/adm/sistema/logoClientes/2849/bJHjBMq0CW54OZp.jpeg" alt="Logo" width={275} height={275} />
      </div>
      <div >
        <li className="separator">
          <span>EXPLORE</span>
        </li>
        <div className="menu">

          {hasPermission('dashboard') && (
            <>
              <li className="botoes" id="dashboard">
                <a className="botoes" href="https://ambteste.credtudo.com.br/painel/">
                  <ButtonSidebar iconClass={"ti ti-stats-up "} classNameLink={"item_menu"} text={"Dashboard"} />
                </a>
              </li>
            </>
          )}

          {hasPermission('atividades-recentes') && (
            <>
              <li className="botoes" id="atividades-recentes">
                <a className="botoes" href="https://ambteste.credtudo.com.br/painel/atividades-recentes.php">
                  <ButtonSidebar iconClass={"ti ti-time"} classNameLink={"item_menu"} text={"Atividades Recentes"}  />
                  
                </a>
              </li>
              {consultas.length > 0 && (
                <a className="link_pendencias" href="https://ambteste.credtudo.com.br/painel/atividades-recentes.php">
                  <span className="badge badge-warning-custom" id="avisos_sidebar">
                    {consultas.length}
                  </span>
                </a>
              )}
            </>
          )}

          {hasPermission('administrativo') && (
            <>
              <li className="botoes" id="administrativo">
                <a className="botoes" href="https://ambteste.credtudo.com.br/painel/administrativo.php">
                  <ButtonSidebar iconClass={"ti ti-panel"} classNameLink={"item_menu"} text={"Administrativo"} href={"#"} />
                </a>
              </li>
            </>
          )}

          {hasPermission('agendamento') && (
            <>
              <li className="botoes" id="agendamento">
                <a href="https://ambteste.credtudo.com.br/painel/Agendamento/" className="botoes">
                  <ButtonSidebar iconClass={"ti ti-calendar"} classNameLink={"item_menu"} text={"Agendamento/OS"} href={"#"} />
                </a>
              </li>
            </>
          )}

          {hasPermission('consulta-laudo') && (
            <>
              <li className="botoes" id="consulta-laudo" >
                <a href="https://ambteste.credtudo.com.br/painel/GestaoLaudos/" className="botoes">
                  <ButtonSidebar iconClass={"ti ti-time"} classNameLink={"item_menu"} text={"Gestao de Vistorias"} href={"#"} />
                </a>
              </li>
            </>
          )}

          {hasPermission('laudo') && (
            <>
              <li className="botoes" id="laudo">
                <a href="https://ambteste.credtudo.com.br/painel/laudo-painel.php" className="botoes">
                  <ButtonSidebar iconClass={"ti ti-files"} classNameLink={"item_menu"} text={"Mesa de Análise"} href={"#"} />
                </a>
              </li>
            </>
          )}
          <li className="separator_dropdown">
            <span>CONSULTA</span>
          </li>
          <div className="dropdowns">
            {hasItems('creditos') && (
              <>
                <div className="dropdown1" id="consulta-credito">
                  <Dropdown label={"Crédito"} classNameDrop={"dropdown"} iconClass={"ti ti-wallet dropdown-icon"} isOpen={openDropdown === "credito"} onToggle={() => toggleDropdown("credito")} >
                    {possibleDropdownButtons.creditos
                      .filter(btn => consultasData.creditos[btn.id])
                      .map(btn => (
                        <span className="botoes" key={btn.id}>
                          <ButtonSidebar classNameLink={"item_dropdown"} text={btn.text} href={"#"} id="item_dropdown" />
                        </span>
                      ))}
                  </Dropdown>
                </div>
              </>
            )}

            {hasItems('veiculos') && (
              <div className="dropdown2" id="consulta-veiculo">
                <Dropdown label={"Veículo"} classNameDrop={"dropdown"} iconClass={"ti ti-car dropdown-icon"} isOpen={openDropdown === "veiculo"} onToggle={() => toggleDropdown("veiculo")} >
                  {possibleDropdownButtons.veiculos
                    .filter(btn => consultasData.veiculos[btn.id])
                    .map(btn => (
                      <span className="botoes" key={btn.id}>
                        <ButtonSidebar classNameLink={"item_dropdown"} text={btn.text} href={"#"} />
                      </span>
                    ))}
                </Dropdown>
              </div>
            )}

            {hasItems('laudos') && (
              <div className="dropdown3" id="consulta-laudo">
                <Dropdown label={"Vistoria"} classNameDrop={"dropdown"} iconClass={"ti ti ti-wallet dropdown-icon"} isOpen={openDropdown === "vistoria"}
                  onToggle={() => toggleDropdown("vistoria")} >
                  {possibleDropdownButtons.laudos.filter(btn => consultasData.laudos[btn.id]).map(btn => (<span className="botoes" key={btn.id}>
                    <ButtonSidebar classNameLink={"item_dropdown"} text={btn.text} href={"#"} />
                  </span>
                  ))}
                </Dropdown>
              </div>
            )}
          </div>
          {hasPermission('config-empresa') && (
            <>
              <li className="separator_config"><span>AJUSTES</span></li>
              <li className="botoes" id="config-empresa">
                <ButtonSidebar iconClass={"ti ti-settings"} classNameLink={"item_menu"} text={"Configurações"} href={"#"} />
              </li>
            </>
          )}
        </div>
      </div>
    </div >
  );
}
export default Sidebar;