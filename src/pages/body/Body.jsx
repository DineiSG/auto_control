//importações React
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

//Importação de estilos
import "../../assets/css/thead.css";
import "../../assets/css/themify-icons.css"
import "./Body.css"

//Importação de componentes
import Sidebar from "../../components/sidebar/Sidebar";
import ContainerPrincipal from "../../components/container/ContainerPrincipal";
import ContainerSecundario from "../../components/container/ContainerSecundario";
import DropdownInfo from "../../components/dropdown/DropdownInfo";
import ModalCam from "../../components/modal/ModalCam";
import { useGetData } from "../../services/useGetData";
import { usePostNotifications } from "../../services/usePostNotifications";
import { LojistaProvider } from "../../hooks/LojistaProvider";
import LojistaLayout from "../../hooks/LojistaLayout";


//Importação de páginas
import RegistrarVenda from "../lojista/vendas/RegistrarVenda"
import Home from "../home/Home";
import Lojista from "../lojista/Lojista"
import GestaoEstoque from "../estoque/GestaoEstoque";
import Administracao from "../administracao/Administracao"
import LiberarVeiculo from "../administracao/movimentacoes/LiberarVeiculo";
import BaixarVeiculo from "../administracao/movimentacoes/BaixarVeiculo";
import HistoricoVeiculo from "../administracao/historico/HistoricoVeiculo";
import RelatoriosMovimentacao from "../administracao/movimentacoes/RelatoriosMovimentacao";
import RelatorioEstoque from "../estoque/gestao/RelatorioEstoque";
import CadastroVeiculoBIN from "../estoque/gestao/CadastroVeiculoBIN";
import CadastroVeiculo from "../estoque/gestao/CadastroVeiculo";
import EditarDado from "../estoque/gestao/EditarDado";
import ConsultarVenda from "../lojista/vendas/ConsultarVenda";
import SolicitarLiberacao from "../lojista/movimentacoes/SolicitarLiberacao";
import CadastrarVendedor from "../lojista/vendas/CadastrarVendedor";
import Dashboard from "../administracao/dashboard/Dashboard";
import HistoricoAcessos from "../administracao/historico/HistoricoAcessos";
import CadastroLoja from "../administracao/lojista/CadastroLoja";
import CadastroFinanceira from "../administracao/lojista/CadastroFinanceira";
import TestAuthComponent from "../../Test/TestAuthComponent";
import EstoqueLoja from "../lojista/estoque/EstoqueLoja";


//Hook de teste
/* import { useGetTest } from "../../services/useGetTest"; */


function Body() {
  // const [ativRecente, setAtivRecente] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true);
  const [dropdownAtivado, setDropdownAtivado] = useState('')

  const navRef = useRef(null)

  //Pega dados do usuário
  const { data } = useGetData("/auth/session-info")
  console.log("Dados do usuário: ", data)

  /* //Pega dados do usuário - Teste
  const { data } = useGetTest("/auth/session-info")
  console.log("Dados do usuário: ", data)*/

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; //Alterar apos o teste para VITE_API_BASE_URL_TEST


  //Pega notificações
  const { pendencias, consultas } = usePostNotifications(600000)
  console.log("Pendências: ", pendencias)
  console.log("Consultas: ", consultas)

  //Busca o id do usuário master
  const idUser = data?.userData?.dados?.Master.Codigo || ""

  //Busca o tipo usuario
  const letterUser = data?.userData?.dados?.Login.tipo || ""
  //Verifica se o tipo do login foi M, caso tenha sido imprime na tela M apos o id master
  const userLetter = letterUser === "M" ? "M" : "U"

  //Definindo o nome de login que será exibido
  let nameLogin;
  if (letterUser === "M" || letterUser === "C" || letterUser === "F") {
    nameLogin = data?.userData?.dados?.empresa;
  } else if (letterUser === "U") {
    nameLogin = data?.userData?.dados?.Unidade?.Fantasia;
  } else {
    nameLogin = "Tipo de login não suportado";
  }

  //Buscando o id do lojista quando ele existe
  const idLojista = data?.userData?.dados?.Unidade?.Codigo_sub

  const emailUser = data?.userData?.dados?.Master.Email


  //Alterna dropdown
  const handleDropdown = (value) => {
    setDropdownAtivado((prev) => (prev === value ? "" : value))
  }

  //Fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setDropdownAtivado("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => { document.removeEventListener("mousedown", handleClickOutside) };
  }, [setDropdownAtivado]);



  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  }

  return (
    <ContainerPrincipal className="container-principal" >
      <header className="navbar navbar-expand-lg d-flex align-items-center " id="barra_navegacao">
        <div className="container-fluid">
          {/*Responsável pelo icone que aciona a barra lateral */}
          <button className="navbar-brand icon-bg p-0" onClick={toggleSidebar} > <i className="ti ti-menu" id="botao_menu" /> </button>
          { /*Buscar endpoints para variação de usuarios */}
          <h1 className="page-title">
            {nameLogin}
            <span className="id-logado">ID - {idUser} {idLojista} - {userLetter}</span>
          </h1>
        </div >
        <div className="d-flex justify-content-end" ref={navRef}>
          <div className="p-2">
           {pendencias.length > 0 && (
              <span className="badge badge-warning" id="avisos_pendencias">
                {pendencias.length}
              </span>
            )}
            <DropdownInfo dropInfo={"avisos"} iconClass={"ti ti-email"} idDrop={"alertDropdown"} value="mensagens"
              isOpen={dropdownAtivado === "mensagens"} onToggle={() => handleDropdown("mensagens")} styleIcon={"icon_message"}>
              <div className="notification-header">
                <p>MENSAGENS</p>
              </div>
              <div className="notificationSpace">
                <ul className="lista_mensagens">
                  {pendencias.length > 0 && (
                    pendencias.map((p) => (
                      <li key={p.id} className="mensagem_individual">
                        <div className="mensagem-alerta">
                          <span className="icone-alerta"><i className="ti ti-alert" id="icone_alerta" /></span>
                          <a className="link_pendencias" href="https://ambteste.credtudo.com.br/painel/Agendamento/alertas  ">
                            <div className="mensagem-texto">
                              {p.descricao}
                              <span className="mensagem-data">{p.data_criacao}</span>
                            </div>
                          </a>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
              <div className="notification-footer">
                <span>VEJA TODAS AS MENSAGENS</span>
              </div>
            </DropdownInfo>
          </div>
          <div className="p-2">
           {consultas.length > 0 && (
              <span className="badge badge-warning  " id="avisos_consultas">
                {consultas.length}
              </span>
            )}
            <DropdownInfo dropInfo={"atividades"} iconClass={"ti ti-bell"} idDrop={"activityDropdown"} value="atividades"
              isOpen={dropdownAtivado === "atividades"} onToggle={() => handleDropdown("atividades")} styleIcon={"icon_alert"}>
              <div className="notification-header">
                <p>ATIVIDADES RECENTES</p>
              </div>
              <div className="notificationSpace">
                <ul className="lista_mensagens">
                 {consultas.map((c) => (
                    <li key={c.codCons} className="mensagem_individual">
                      <div className="mensagem-consulta">
                        <span className="icone-consulta"><i className="ti ti-check" id="icone_consulta"></i></span>
                        <a className="link_pendencias" href="https://ambteste.credtudo.com.br/painel/atividades-recentes.php  ">
                          <div className="mensagem-texto">
                            {c.nome}
                            {c.item && c.valor && (
                              <span> • {c.item}: {c.valor}</span>
                            )}
                            <span className="mensagem-data">{c.hora}</span>
                          </div>
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="notification-footer">
                <span>VEJA TODAS AS ATIVIDADES RECENTES</span>
              </div>
            </DropdownInfo>
          </div>
          <div className="p-6">
            <DropdownInfo dropInfo={"dados_usuario"} imagem={"img-circle"} src={"https://ambteste.credtudo.com.br/assets/img/profile.jpg  "} idDrop={"userDropdown"}
              value="dados_usuario" isOpen={dropdownAtivado === "dados_usuario"} onToggle={() => handleDropdown("dados_usuario")}>
              <div className="topnav-dropdown-header" id="user-info-header">
                <span>{emailUser}</span>
              </div>
              <li id="li-user">
                <a className="meus-dados" >
                  <i className="ti ti-user" id="icones"></i><span>Usuário</span>
                </a>
              </li>
              <li id="li-user">
                <a className="meus-dados" >
                  <i className="ti ti-lock" id="icones"></i><span>Alterar Senha</span>
                </a>
              </li>
              <li id="li-user">
                <a className="meus-dados" href="https://ambteste.credtudo.com.br/painel/config-empresa.php  " >
                  <i className="ti ti-settings" id="icones"></i><span>Configurações</span>
                </a>
              </li>
              <li id="li-user">
                <a className="meus-dados" href="https://ambteste.credtudo.com.br/vistoriago/  ">
                  <i className="ti ti-settings" id="icones"></i><span>Vistoria GO!</span>
                </a>
              </li>
              <li id="li-user">
                <a className="meus-dados" href="https://ambteste.credtudo.com.br/painel/Agendamento/ContaBancaria  " >
                  <i className="ti ti-money" id="icones" ></i><span>Dados bancários</span>
                </a>
              </li>
              <div className="user-info-footer"  >
                <a className="meus-dados" href="https://ambteste.credtudo.com.br/  " ></a>
                <i className="ti ti-shift-right" id="icones"></i><span>Sair</span>
              </div>
            </DropdownInfo>
          </div>
        </div>
        <ModalCam />
      </header>
      <div className="menu_container">
        {showSidebar && (
          <Sidebar id="sidebar"></Sidebar>
        )}
        <ContainerSecundario >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />

              {/* Rotas do LOJISTA – com escopo isolado */}
              <Route
                path="/lojista"
                element={
                  <LojistaProvider endpointLojista={`${API_BASE_URL}/auth/session-info`}>
                    <LojistaLayout />
                  </LojistaProvider>
                }
              >
                <Route index element={<Lojista />} />
                <Route path="registrar_venda" element={<RegistrarVenda />} />
                <Route path="cadastrar_vendedor" element={<CadastrarVendedor />} />
                <Route path="solicitar_liberacao" element={<SolicitarLiberacao />} />
                <Route path="consultar_venda" element={<ConsultarVenda />} />
                <Route path="estoque_loja" element={<EstoqueLoja/>}/>
              </Route>
              {/*Rotas Administracao*/}
              <Route path="/administracao" element={<Administracao />} />
              <Route path="/cadastrar_loja" element={<CadastroLoja />} />
              <Route path="/cadastro_financeira" element={<CadastroFinanceira />} />
              <Route path="/liberar_veiculo" element={<LiberarVeiculo />} />
              <Route path="/baixar_veiculo" element={<BaixarVeiculo />} />
              <Route path="/relatorios_movimentacao" element={<RelatoriosMovimentacao />} />
              <Route path="/historico" element={<HistoricoVeiculo />} />
              {/*Rotas Gestao de Estoque*/}
              <Route path="/gestao_estoque" element={<GestaoEstoque />} />
              <Route path="/relatorio_estoque" element={<RelatorioEstoque />} />
              <Route path="/cadastro_veiculo" element={<CadastroVeiculo />} />
              <Route path="/cadastro_veiculo_bin" element={<CadastroVeiculoBIN />} />
              <Route path="/editar_dado" element={<EditarDado />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/historico_acessos" element={<HistoricoAcessos />} />
              <Route path="/test_auth" element={<TestAuthComponent/>}/>
              {/* Adicione outras rotas conforme necessário */}
            </Routes>
          </BrowserRouter>
        </ContainerSecundario>
      </div>
    </ContainerPrincipal >


  );
}
export default Body;
