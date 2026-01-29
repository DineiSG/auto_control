import "../../../assets/css/thead.css";
import "../../../assets/css/themify-icons.css";
import Form from '../../../components/form/Form';
import Input from '../../../components/input/Input';
import Button from '../../../components/button/Button';

import { useState, useRef, useEffect } from 'react';
import { useGetData } from '../../../services/useGetData';
import { useUpdateData } from "../../../services/useUpdateData";
import { formatTel, formatCNPJ } from "../../../hooks/useMask";

const EditarCadastroFinanceira = () => {
    const [buscaFinanceira, setBuscaFinceira] = useState('');
    const [editavel, setEditavel] = useState(false);
    // estado local com todos os campos
    const [dadosFinanceira, setDadosFinanceira] = useState({ id: '', descricao: '', cnpj: '', agente: '', email: '', telefone: '' });

    // base da API
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    // busca os dados quando houver termo
    const { data: dados } = useGetData(
        buscaFinanceira ? `/instituicoes/descricao/${encodeURIComponent(buscaFinanceira)}` : null
    );

    // só cria apiUrl quando tiver id
    const apiUrl = dadosFinanceira.id
        ? `${API_BASE_URL}/lojas/${dadosFinanceira.id}`
        : null;

    const { updateData } = useUpdateData(apiUrl);

    // para evitar buscas repetidas na API
    const ultimaLoja = useRef('');

    // dispara busca quando sai do campo (blur)
    const handleBlur = () => {
        const term = dadosFinanceira.descricao.trim();
        if (term) {
            if (term !== ultimaLoja.current) {
                ultimaLoja.current = term;
                setBuscaFinceira(term); // dispara fetch
            }
            setEditavel(true);
        } else {
            setEditavel(false);
            setDadosFinanceira({ id: '', descricao: '', cnpj: '', agente: '', email: '', telefone: '' });
        }
    };

    // popula estado local quando chegam dados da API
    useEffect(() => {
        if (dados && !dados.erro) {
            console.log('Dados da loja recebidos:', dados);
            setDadosFinanceira({
                id: dados.id ?? '',
                descricao: dados.descricao ?? '',
                cnpj: dados.cnpj ?? '',
                agente: dados.agente ?? '',
                email: dados.email ?? '',
                telefone: dados.telefone ?? ''
            });
        } else if (dados && dados.erro) {
            console.log('Loja não encontrada');
        }
    }, [dados]);

    //tranforma as letras em caixa alta
    const toUpperFields = (obj, fields = []) => {
        const copy = { ...obj };
        fields.forEach((f) => {
            if (copy[f] !== undefined && copy[f] !== null) {
                copy[f] = String(copy[f]).toUpperCase();
            }
        });
        return copy;
    };

    // formata telefone enquanto digita
    const handlePhoneChange = (e) => {
        const formatted = formatTel(e.target.value);
        setDadosFinanceira(prev => ({ ...prev, telefone: formatted }));
    };

    const handleCnpjChange = (e) => {
        const formatted = formatCNPJ(e.target.value);
        setDadosFinanceira(prev => ({ ...prev, cnpj: formatted }));
    };

    // envia dados editados
    const handleEdit = async (e) => {
        e.preventDefault();

        if (!dadosFinanceira.id) {
            window.alert('Nenhuma loja selecionada para edição.');
            return;
        }

        const dadosPayload = {
            id: dadosFinanceira.id,
            descricao: dadosFinanceira.descricao,
            telefone: dadosFinanceira.telefone,
            email: dadosFinanceira.email,
            qtdVeiculos: dadosFinanceira.qtdVeiculos
        };

        const dadosUpper = toUpperFields(dadosPayload, ['descricao']);

        const confirmar = window.confirm("Confirma a edição do cadastro da loja?");
        if (!confirmar) return;
        if (dadosFinanceira.qtdVeiculos === '' || isNaN(dadosFinanceira.qtdVeiculos)) {
            window.alert('Quantidade de veículos deve ser um número válido.');
            return;
        }

        try {
            // ajuste conforme assinatura do seu hook
            await updateData(dadosUpper, dadosFinanceira.id);
            window.alert('Cadastro editado com sucesso');
        } catch (err) {
            console.error('Falha ao editar cadastro: ', err);
            window.alert('Falha ao editar o cadastro da loja. Veja console para detalhes.');
        }
    };

    return (
        <div>
            <div className='panel-heading'>
                <i className='ti ti-money' id="ti-black"></i>
                <p>EDITAR BANCO <br /> Informe os dados e selecione o que deseja editar</p>
            </div>
            <Form onSubmit={handleEdit}>
                <div className="col-12 col-md-5">
                    {/* campo de busca/controlado */}
                    <Input label="Nome:" type="text" style={{ width: '200px' }} nameInput="descricao" value={dadosFinanceira.descricao}
                        onChange={(e) => setDadosFinanceira(prev => ({ ...prev, descricao: e.target.value }))} onBlur={handleBlur} required />
                    {/* id escondido */}
                    <input type="hidden" value={dadosFinanceira.id} readOnly />
                </div>
                <div className="col-12 col-md-5">
                    <Input label="CNPJ:" type="text" style={{ width: '200px' }} nameInput="cnpj"
                        value={dadosFinanceira.cnpj} readOnly={!editavel} onChange={handleCnpjChange} />
                </div>
                <div className="col-12 col-md-5">
                    <Input label="Nome Agente:" type="text" style={{ width: '300px' }} nameInput="agente" value={dadosFinanceira.agente} readOnly={!editavel}
                        onChange={(e) => setDadosFinanceira(prev => ({ ...prev, agente: e.target.value }))} />
                </div>
                <div className="col-12 col-md-4">
                    <Input label="Email:" type="text" style={{ width: '300px' }} nameInput="email" value={dadosFinanceira.email} readOnly={!editavel}
                        onChange={(e) => setDadosFinanceira(prev => ({ ...prev, email: e.target.value }))} />
                </div>
                <div className="col-12 col-md-3">
                    <Input label="Telefone:" type="text" style={{ width: '150px' }} nameInput="telefone"
                        value={dadosFinanceira.telefone} readOnly={!editavel} onChange={handlePhoneChange} />
                </div>
                <div className="d-flex flex-row-reverse">
                    <Button type="submit" variant="primary">ENVIAR</Button>
                </div>
            </Form>
        </div>
    );
};

export default EditarCadastroFinanceira;
