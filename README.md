# **Kruzer - Desafio Front-End Sênior**

> Utilize a lib de componentes de sua preferência, o objetivo do teste é entender como o problema será resolvido.

## **Desafio:**
Desenvolver um componente de drawer para criação de clientes em duas etapas.

- **Step 1:** Formulário com os dados do cliente (nome, sobrenome, CPF).
- **Step 2:** Lista dinâmica de observações, onde o usuário pode adicionar N inputs para preencher observações separadas.

Após salvar o cliente, o mesmo deve ser automaticamente renderizado em uma listagem de clientes.

### **Requisitos Técnicos:**
- **Jotai:** Gerenciamento de estado.
- **React Hook Forms:** Gerenciamento do formulário e das observações dinâmicas.
- **URL-State:** Armazenamento de termos de busca e aplicação de filtros na listagem de clientes.

## Critérios de Avaliação:

### **Isolamento do Componente:**
- O drawer de criação de cliente deve ser um componente isolado, sem dependências com a listagem de clientes.
- O componente deve ser reutilizável em qualquer parte do sistema, permitindo que qualquer outro componente o chame e receba o novo cliente como retorno.

### **Listagem de Clientes:**
- Os clientes criados devem ser exibidos na listagem automaticamente após a criação.
- Não é necessária a persistência dos clientes em banco de dados ou local storage; apenas o gerenciamento de estado é necessário.

### **Filtro de Clientes:**
- Implementar um campo de filtro por nome do cliente na listagem;
- O filtro deve atualizar o URL-State, refletindo o estado atual do input na URL;
- O Url-State deve, por sua vêz, aplicar o filtro na listagem de clientes.

## **Entregáveis:**
- Código fonte da aplicação hospedado em um repositório público no GitHub.
- Instruções claras para rodar a aplicação localmente (de preferência no arquivo README).
- Ao finalizar, enviar e-mail para **felipe.martins@kruzer.io** com cópia para **andre.ciornavei@kruzer.io**, notificando o término do desafio e com link para o repositório público.
- Esse desafio deve ser entregue em até 2 dias após ser submetido ao condidato.
