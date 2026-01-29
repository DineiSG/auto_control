import Card from "../../components/card/Card"
import ContainerSecundario from "../../components/container/ContainerSecundario"
import { useGetData } from "../../services/useGetData";
import { useState, useEffect } from "react";

//hook de teste
/* import { useGetTest } from "../../services/useGetTest"; */

const Home = () => {
    const [isAdministrador, setIsAdministrador] = useState(null); // null = carregando

    const { data } = useGetData("/auth/session-info");
    console.log("Dados do usuário: ", data);

    //Pega dados do usuário - Teste
    /*  const { data } = useGetTest("/auth/session-info")
     console.log("Dados do usuário: ", data) */

    useEffect(() => {
        if (!data?.userData) {
            setIsAdministrador(null); // ou false, dependendo do fallback desejado
            return;
        }

        const unidade = data.userData.dados.Unidade;

        // Verifica se Unidade é "vazio": null, undefined, {}, ou [] (se aplicável)
        const isUnidadeVazia =
            !unidade || // cobre null, undefined, false, etc.
            (typeof unidade === 'object' &&
                !Array.isArray(unidade) &&
                Object.keys(unidade).length === 0);

        setIsAdministrador(isUnidadeVazia);
    }, [data]);



    return (
        <ContainerSecundario>
            <div className='container d-flex flex-column ' id="path">
                <div className="d-flex align-items-start ">
                    <div className="p-2">
                        <a className="link_a" href="#">Início</a>
                    </div>
                    <div className="p-2">
                        <i className=' ti ti-angle-right ' id='card-path' />
                    </div>
                    <div className="p-2">
                        <p className='atual'>Gestão </p>
                    </div>
                </div>
            </div>

            <div className="container d-flex justify-content-center card-container">
                <div className="row justify-content-center w-100">
                    {/* Sempre mostra o card LOJISTA */}
                    <div className="card col-md-4" id="bloco">
                        <Card classBody={"card_home"} classLink={"/lojista/"} classNameIcon={"ti ti-money card-ti"} classFooter={"nome_footer"} text_title={"LOJISTA"} />
                    </div>

                    {/* Mostra os outros cards apenas se for administrador */}
                    {!isAdministrador && (
                        <>
                            <div className="card col-md-4" id="bloco">
                                <Card classBody={"card_home"} classLink={"/gestao_estoque"} classNameIcon={"ti ti-briefcase card-ti"} classFooter={"nome_footer"} text_title={"GESTÃO DE ESTOQUE"} />
                            </div>
                            <div className="card col-md-4" id="bloco">
                                <Card classBody={"card_home"} classLink={"/administracao"} classNameIcon={"ti ti-write card-ti"} classFooter={"nome_footer"} text_title={"ADMINISTRAÇÃO"} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </ContainerSecundario>
    );
}

export default Home;