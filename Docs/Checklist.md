

# Nome do Projeto:

* Objetivo: reduzir retrabalho, garantir segurança e entregar funcionalidades completas.

------------------------------------------------------------------------------------------

## ✅ FASE 1 — DEFINIÇÃO DO ESCOPO ############################

📌 **CONTROLE DE VERSAO**
## Nº VERSAO ATUAL:
## Nº NOVA VERSAO:


- [ ] Funcionalidades da versão atual definidas
- [ ] Itens que NÃO entram nesta versão registrados
- [ ] Critérios de sucesso descritos em linguagem simples
- [ ] Mudanças só entram em versão futura (escopo controlado)

------------------------------------------------------------------------------------------

## 📝 FASE 2 — PRD SIMPLES (DOCUMENTO DO PRODUTO) ##############

🤔 **O que é PRD?**
PRD é o Documento de Requisitos do Produto — uma explicação clara do que o sistema faz.

- [ ] Problema que o sistema resolve descrito
- [ ] Quem usa e como usa (exemplos reais)
- [ ] Regras de negócio explicadas
- [ ] O que acontece em caso de erro definido
- [ ] Critérios de aceite listados
- [ ] Documento salvo em formato `.md`

------------------------------------------------------------------------------------------

## 🧱 FASE 3 — DADOS E BACKEND ANTES DA INTERFACE ###############

🧩 **Termos explicados**
•	Banco de Dados: onde as informações ficam guardadas
•	RLS (Row Level Security): regra que impede usuários de verem dados de outras pessoas
•	Permissões: quem pode acessar o quê

Checklist:

- [ ] Tabelas criadas e revisadas
- [ ] Permissões configuradas
- [ ] RLS ativado desde o início
- [ ] API criada e respondendo corretamente
- [ ] Depois disso → conectar frontend

-----------------------------------------------------------------------------------------

## 🧩 FASE 4 — UMA FEATURE POR VEZ #################################

🤔 **O que é “feature”?**
Feature é uma funcionalidade completa, por exemplo:
“Cadastrar usuário do início ao fim”.


Definition of Done:
- [ ]
- [ ] Funciona de ponta a ponta
- [ ] Conectada ao banco
- [ ] Testada
- [ ] Revisada
- [ ] Pode ir para produção sem riscos

Nada de “quase pronto”.

-------------------------------------------------------------------------------------------

## 🛠️ FASE 5 — DEBUG E TESTES #########################################

🤔 **O que é Debug?**
Debug é o processo de descobrir e resolver erros.

📌 **Mocks no teste**
Mock = “simulação de algo real para testar sem depender do sistema inteiro”.
👉 Sempre que possível, combine com testes reais de integração.

- [ ] Erro reproduzido
- [ ] Hipótese escrita (o que pode estar acontecendo)
- [ ] IA usada como apoio, não como solução cega
- [ ] Correção aplicada
- [ ] Teste criado para evitar o erro no futuro
- [ ] Mocks usados quando necessário
- [ ] Preferir também testes de integração

--------------------------------------------------------------------------------------------

## 🔐 FASE 6 — CHECKLIST DE SEGURANÇA ##################################

🤔 **Termos explicados**
•	API protegida: só pessoas/autos permitidos acessam
•	Edge functions: funções que rodam próximas ao usuário (ex.: serverless)
•	Check de segurança: revisão final antes de publicar


Checklist:

- [ ] RLS ligado
- [ ] APIs exigem autenticação
- [ ] Edge functions revisadas
- [ ] Variáveis secretas protegidas
- [ ] Logs ativos (registro de ações)
- [ ] Rate-limit configurado (evita abuso)
- [ ] Revisão final antes do deploy

-----------------------------------------------------------------------------------------------

## 🎯 FLUXO RESUMIDO ###################################################

1. Definir escopo  
2. Criar PRD simples  
3. Modelar dados + backend  
4. Construir uma feature completa  
5. Testar e corrigir  
6. Passar no checklist de segurança  
7. Só então avançar para a próxima feature  

-----------------------------------------------------------------------------------------------
