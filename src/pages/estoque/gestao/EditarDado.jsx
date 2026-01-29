import ContainerSecundario from '../../../components/container/ContainerSecundario'
import "../../../assets/css/thead.css";
import "../../../assets/css/themify-icons.css"
import Box from '../../../components/box/Box';
import Input from '../../../components/input/Input';
import Form from '../../../components/form/Form';
import { useState, useEffect, useRef } from "react";
import { useGetData } from '../../../services/useGetData';
import { usePutData } from '../../../services/usePutData';
//import { formatTimestamp } from '../../../hooks/formatDate';
import Button from '../../../components/button/Button';

const EditarDado = () => {
  const [placa, setPlaca] = useState('')
  const [buscaPlaca, setBuscaPlaca] = useState("")
  const [unidade, setUnidade] = useState('')
  const [dadosVeiculo, setDadosVeiculo] = useState({ marca: '', modelo: '', cor: '', renavam: '', ano_modelo: '', ano_fabricacao: '', unidade: '' })
  const [editavel, setEditavel] = useState(false)
  const [mostrarSelect, setMostrarSelect] = useState(false)


  // buscando os dados no bd
  const { data: veiculo, } = useGetData(buscaPlaca ? `/veiculos/placa/${placa}` : null)
  const { data: dadosLoja } = useGetData(`/lojas`);

  // Ordena as lojas por descrição
  const lojasOrdenadas = dadosLoja.sort((a, b) => a.descricao.localeCompare(b.descricao))

  // Enviando dados editados
  const { editByPlaca } = usePutData(`/veiculos`);

  // Ref para manter a referência atualizada da última placa buscada
  const ultimaPlacaBuscada = useRef('');

  // Função chamada quando o input da placa perde o foco

  const handleBlur = () => {
    //Verifica se a placa tem 7 caracteres e se o input esta preenchido, se sim, busca os dados do veículo e libera o select
    const placaM = placa.trim().toUpperCase();
    if (placaM.length === 7) {
      // Só busca se a placa for diferente da última buscada
      if (placaM !== ultimaPlacaBuscada.current) {
        //console.log('Buscando placa:', placaM); // Debug
        ultimaPlacaBuscada.current = placaM;
        setBuscaPlaca(placaM);
      }
      setMostrarSelect(true);
      setEditavel(true);
    } else {
      setMostrarSelect(false);
      setDadosVeiculo({
        id: '', placa: '', marca: '', modelo: '', cor: '', renavam: '',
        unidade: '', ano_fabricacao: '', ano_modelo: ''
      });

    }

  };

  // Preencher campos quando os dados solicitados chegarem
  useEffect(() => {
    if (veiculo && !veiculo.erro) {
      console.log('Dados do veículo recebidos:', veiculo); // Debug
      setDadosVeiculo(prev => ({
        ...prev,
        marca: veiculo.marca || '',
        modelo: veiculo.modelo || '',
        cor: veiculo.cor || '',
        renavam: veiculo.renavan || '',
        unidade: veiculo.unidade || '',
        ano_modelo: veiculo.ano_modelo || '',
        ano_fabricacao: veiculo.ano_fabricacao || '',
      }));
    } else if (veiculo && veiculo.erro) {
      console.log('Veículo não encontrado');;
    }

  }, [veiculo]);

  // Função para lidar com a seleção de unidade
  const handleUnidadeChange = (e) => {

    const selectedOption = e.target.selectedOptions?.[0];
    if (!selectedOption || selectedOption.value === "") {
      console.error("Nenhuma loja válida foi selecionada.");
      setUnidade(null);
      return;
    }
    const unidade = selectedOption.getAttribute("data-descricao");

    setUnidade(unidade);
  }

  // Função para converter campos em CAIXA ALTA
  const toUpperFields = (obj, fields = []) => {
    const copy = { ...obj }
    fields.forEach((f) => {
      if (copy[f] !== undefined && copy[f] !== null) {
        copy[f] = String(copy[f]).toUpperCase()
      }
    })
    return copy
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let dados = {
      placa, id: veiculo.id, marca: dadosVeiculo.marca, modelo: dadosVeiculo.modelo, cor: dadosVeiculo.cor, renavan: dadosVeiculo.renavam,
      unidade, ano_fabricacao: dadosVeiculo.ano_fabricacao, ano_modelo: dadosVeiculo.ano_modelo
    }

    dados = toUpperFields(dados, ['placa', 'marca', 'modelo', 'cor', 'unidade'])
    // Padroniza para caixa alta
    //console.log('Dados a serem enviados: ', dados)

    const confirmar = window.confirm("Confirma a edição dos dados do veículo?");
    if (confirmar === true) {
      try {
        const resultado = await editByPlaca(dados, placa)
        console.log('Dados editados com sucesso, ', resultado)
        window.alert('Dados editados com sucesso')
        window.location.reload()


      } catch (err) {
        console.error('Falha ao editar os dados: ', err)
      }
    }
  }

  return (
    <ContainerSecundario>
      <div className='container d-flex'>
        <div className='container d-flex flex-column ' id="path" >
          <div className="d-flex align-items-start ">
            <div className="p-2">
              <a className="link_a" href="/">Gestão</a>
            </div>
            <div className="p-2">
              <i className=' ti ti-angle-right ' id='card-path' />
            </div>
            <div className="p-2">
              <a className="link_a" href="/gestao_estoque">Gestão de Estoque</a>
            </div>
            <div className="p-2">
              <i className=' ti ti-angle-right ' id='card-path' />
            </div>
            <div className="p-2">
              <p className='atual'>Editar Dados </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container d-flex justify-content-center card-container">
        <Box onSubmit={handleSubmit}>
          <div className='panel-heading'>
            <i className='ti ti-car' id="ti-black" ></i>
            <p>EDITAR OS DADOS DE UM VEÍCULO <br /> Informe a placa do veículo para obter os demais dados</p>
          </div>
          <Form >
            <div className="col-12 col-md-2">
              <Input label={"Placa:"} type={"text"} maxLength={"7"} style={{ width: '80px' }} nameInput={"placa"}
                value={placa} onChange={(e) => setPlaca(e.target.value)} onBlur={handleBlur} required />
            </div>

            <div className="col-12 col-md-3">
              <Input label={"Marca:"} type={"text"} style={{ width: '150px' }} nameInput={"marca"} value={dadosVeiculo.marca} readOnly={!editavel} onChange={(e) =>
                setDadosVeiculo(prev => ({ ...prev, marca: e.target.value }))
              } />
            </div>
            <div className="col-12 col-md-3">
              <Input label={"Modelo:"} type={"text"} style={{ width: '150px' }} nameInput={"modelo"} value={dadosVeiculo.modelo} readOnly={!editavel} onChange={(e) =>
                setDadosVeiculo(prev => ({ ...prev, modelo: e.target.value }))} />
            </div>
            <div className="col-12 col-md-3">
              <Input label={"Cor:"} type={"text"} style={{ width: '150px' }} nameInput={"cor"} value={dadosVeiculo.cor} readOnly={!editavel} onChange={(e) =>
                setDadosVeiculo(prev => ({ ...prev, cor: e.target.value }))} />
            </div>
            <div className="col-12 col-md-3">
              <Input label={"Ano Fabricacao:"} type={"text"} style={{ width: '50px' }} nameInput={"ano_fabricacao"} value={dadosVeiculo.ano_fabricacao} required readOnly={!editavel} />
            </div>
            <div className="col-12 col-md-3">
              <Input label={"Ano Modelo:"} type={"text"} style={{ width: '50px' }} nameInput={"ano_modelo"} value={dadosVeiculo.ano_modelo} required readOnly={!editavel} />
            </div>
            <div className="col-12 col-md-3">
              <Input label={"Renavam:"} type={"text"} style={{ width: '150px' }} nameInput={"renavam"} value={dadosVeiculo.renavam} readOnly={!editavel} onChange={(e) =>
                setDadosVeiculo(prev => ({ ...prev, renavam: e.target.value }))} />
            </div>
            {mostrarSelect && (
              <div className='col-12 col-md-3' id='select-all'>
                <label className="label" id="select-label"><span>Loja:</span></label>
                <select type='text' name='loja' value={unidade} onChange={handleUnidadeChange} className="select-item" required >
                  <option value="" >SELECIONE UMA LOJA</option>
                  {lojasOrdenadas.map((loja) => (
                    <option key={loja.descricao} value={loja.descricao} data-descricao={loja.descricao}>
                      {loja.descricao}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="d-flex flex-row-reverse">
              <Button onClick={handleSubmit} variant='primary' >SALVAR</Button>
            </div>
          </Form>
        </Box>
      </div>
    </ContainerSecundario>
  )
}

export default EditarDado
