import ContainerSecundario from '../../components/container/ContainerSecundario'
import Card from '../../components/card/Card'
import "../../components/card/Card.css"
import "../../assets/css/thead.css";
import "../../assets/css/themify-icons.css"


const Administracao = () => {


    return (
        <div  >
            <ContainerSecundario >
                <div className='container d-flex flex-column ' id="path" >
                    <div className="d-flex align-items-start ">
                        <div className="p-2">
                            <a className="link_a" href="/">Gestão</a>
                        </div>
                        <div className="p-2">
                            <i className=' ti ti-angle-right ' id='card-path' />
                        </div>
                        <div className="p-2">
                            <p className='atual'>Administracao </p>
                        </div>
                    </div>
                </div>
                <div className="container d-flex justify-content-center card-container">
                    <div className="row justify-content-center  w-100">
                        <div className="card col-md-4 " id="bloco" >
                            <Card classBody={"card_home"} classLink={"/liberar_veiculo"} classNameIcon={"ti ti-new-window card-ti"} classFooter={"nome_footer"} text_title={"LIBERACOES"}
                                text_footer={<> Solicitar liberação de um veículo <br /> Solicitar o cancelamento de uma liberação </>} />
                        </div>
                        <div className="card col-md-4" id="bloco"  >
                            <Card classBody={"card_home"} classLink={"/baixar_veiculo"} classNameIcon={"ti ti-close card-ti"} classFooter={"nome_footer"} text_title={"BAIXAR VEÍCULO"}
                                text_footer={<> Realizar baixa de um <br />veiculo do estoque de uma loja </>} />
                        </div>
                        <div className="card col-md-4" id="bloco"  >
                            <Card classBody={"card_home"} classLink={"/relatorios_movimentacao"} classNameIcon={"ti ti-receipt card-ti"} classFooter={"nome_footer"} text_title={"RELATÓRIOS"}
                                text_footer={<>Gerar relatórios de liberação e baixa de veículos </>} />
                        </div>
                    </div>
                </div>
                <div className="container d-flex justify-content-center card-container">
                    <div className="row justify-content-center  w-100">
                        <div className="card col-md-4" id="bloco"  >
                            <Card classBody={"card_home"} classLink={"/historico"} classNameIcon={"ti ti-car card-ti"} classFooter={"nome_footer"} text_title={"HISTÓRICO DO VEICULO"}
                                text_footer={<>Consultar o historico do veículo</>} />
                        </div>
                        <div className="card col-md-4" id="bloco"  >
                            <Card classBody={"card_home"} classLink={"/historico_acessos"} classNameIcon={"ti ti-exchange-vertical card-ti"} classFooter={"nome_footer"} text_title={"HISTÓRICO DE ACESSO"}
                                text_footer={<>Consultar o historico de entradas<br /> e saidas de um veículo</>} />
                        </div>
                        <div className="card col-md-4" id="bloco"  >
                            <Card classBody={"card_home"} classLink={"/dashboard"} classNameIcon={"ti ti-bar-chart card-ti"} classFooter={"nome_footer"} text_title={"DASHBOARD"}
                                text_footer={<>Estatísticas diversas </>} />
                        </div>
                    </div>
                </div>
                <div className="container d-flex justify-content-center card-container">
                    <div className="row justify-content-center  w-100">
                        <div className="card col-md-4" id="bloco"  >
                            <Card classBody={"card_home"} classLink={"/cadastrar_loja"} classNameIcon={"ti ti-home card-ti"} classFooter={"nome_footer"} text_title={"CADASTRAR LOJA"}
                                text_footer={<>Cadastrar ou editar dados de uma loja</>} />
                        </div>
                        <div className="card col-md-4" id="bloco"  >
                            <Card classBody={"card_home"} classLink={"/cadastro_financeira"} classNameIcon={"ti ti-money card-ti"} classFooter={"nome_footer"} text_title={"CADASTRAR BANCO"}
                                text_footer={<>Cadastrar ou editar dados de um banco </>} />
                        </div>
                    </div>
                </div>
            </ContainerSecundario>
        </div>
    )
}

export default Administracao
