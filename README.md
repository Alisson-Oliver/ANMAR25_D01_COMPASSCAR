# CompassCar API - Sistema de Gestão de Locação de Carros

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/Alisson-Oliver/ANMAR25_D01_COMPASSCAR/blob/main/LICENSE)

## Descrição

A **CompassCar API** é uma solução backend destinada ao gerenciamento de locação de carros para a aplicação **Compass Car**. Ela permite realizar operações de **cadastro**, **busca**, **atualização** e **exclusão** de veículos. A API foi desenvolvida utilizando o framework **Express.js** junto com a plataforma **Node.js**. O armazenamento de dados é feito por meio do banco de dados relacional **MySQL**.

## Tecnologias Utilizadas

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)

## Instruções de Instalação

### Pré-requisitos

- **Node.js** instalado
- Gerenciador de pacotes (**npm** ou **yarn**)
- Banco de Dados **MySQL** configurado no _host local_ ou em um _servidor_ (se você ainda não configurou o banco de dados, siga as instruções na seção **Configurando o Banco de Dados** logo abaixo)

## Configurando o Banco de Dados

Esta seção é destinada a quem ainda não tem o banco de dados configurado.

#### 1. **Crie o Banco de Dados e as Tabelas**

Execute os seguintes comandos no **MySQL** para configurar o banco de dados **compasscar** e criar as tabelas necessárias:

```sql
-- Cria o banco de dados "compasscar", caso ainda não exista
CREATE DATABASE IF NOT EXISTS compasscar;

-- Seleciona o banco de dados
USE compasscar;

-- Criação da tabela de carros
CREATE TABLE cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    plate VARCHAR(255) NOT NULL UNIQUE,
    year INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela de itens de carros
CREATE TABLE cars_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    car_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (car_id) REFERENCES cars(id)
);
```

#### 2. **Verifique a Conexão**

Depois de criar o banco de dados e executar o script SQL, a API deve ser capaz de se conectar ao banco de dados e funcionar corretamente.

#### 3. **Observações Importantes:**

- Dependendo da hospedagem do banco de dados ou de configurações específicas, pode ser necessário ajustar a configuração do banco de dados.

## Passos para rodar a aplicação

1. **Clone o repositório:**

```bash
git clone https://github.com/Alisson-Oliver/ANMAR25_D01_COMPASSCAR.git
```

2. **Instale as dependências:**

```bash
cd ANMAR25_D01_COMPASSCAR
npm install
```

3. **Configure as variáveis de ambiente:**

Crie um arquivo `.env` na raiz do projeto e adicione as seguintes configurações:

```bash
DB_NAME= <nome-do-db>
DB_USER= <usuário-do-db>
DB_PASSWORD= <senha-do-db>
DB_HOST= <host-do-db>
SV_PORT= <porta-do-servidor>
```

> **Observação:** Substitua os valores entre `< >` pelas configurações correspondentes do seu ambiente.

4. **Inicie o servidor:**

```bash
npm start
```

5. **Pronto!** Agora a API está em funcionamento.

## Endpoints da API

(_A documentação completa dos endpoints será disponibilizada em breve._)

## Contribuição

#### Fluxo de Trabalho

1. Crie as **branches** seguindo o **Git Flow** para as alterações.
2. Realize commits seguindo a convenção [**Conventional Commits**](https://www.conventionalcommits.org/).
