# CompassCar API - Sistema de Gestão de Locação de Carros

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/Alisson-Oliver/ANMAR25_D01_COMPASSCAR/blob/main/LICENSE)

## 🇧🇷 Descrição (Português)

A **CompassCar API** é uma solução backend destinada ao gerenciamento de locação de carros para a aplicação **Compass Car**. Ela permite realizar operações de **cadastro**, **busca**, **atualização** e **exclusão** de veículos. A API foi desenvolvida utilizando o framework **Express.js** com **Node.js** e utiliza o banco de dados **MySQL**.

## 🇺🇸 Description (English)

The **CompassCar API** is a backend solution designed for managing car rentals in the **Compass Car** application. It enables operations such as **create**, **read**, **update**, and **delete** of vehicles. The API was developed using **Express.js** with **Node.js** and uses the **MySQL** relational database.

## 🚀 Tecnologias | Technologies

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)

## 📦 Instalação | Installation

### 🇧🇷 Pré-requisitos

- **Node.js** instalado
- Gerenciador de pacotes (**npm** ou **yarn**)
- Banco de dados **MySQL**

### 🇺🇸 Prerequisites

- **Node.js** installed
- Package manager (**npm** or **yarn**)
- **MySQL** database setup

## 🛠️ Configurando o Banco de Dados | Setting up the Database

### 🇧🇷 Quando ainda não há banco criado:

Execute os comandos abaixo no seu MySQL para criar o banco e tabelas:

```sql
CREATE DATABASE IF NOT EXISTS compasscar;

USE compasscar;

CREATE TABLE cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    plate VARCHAR(8) NOT NULL UNIQUE,
    year INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cars_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    car_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (car_id) REFERENCES cars(id)
);
```

### 🇺🇸 If you haven’t created the database yet:

Run the SQL commands below in your MySQL instance:

```sql
CREATE DATABASE IF NOT EXISTS compasscar;

USE compasscar;

CREATE TABLE cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    plate VARCHAR(8) NOT NULL UNIQUE,
    year INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cars_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    car_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (car_id) REFERENCES cars(id)
);
```

## ⚙️ Variáveis de Ambiente | Environment Variables

Crie um arquivo `.env` na raiz do projeto com os seguintes dados:

```env
DB_NAME=compasscar
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_HOST=localhost
SV_PORT=3000
```

> ✅ Ajuste os valores de acordo com o seu ambiente local.

## ▶️ Executando o Projeto | Running the Project

1. **Clone o repositório | Clone the repository:**

```bash
git clone https://github.com/Alisson-Oliver/ANMAR25_D01_COMPASSCAR.git
```

2. **Instale as dependências | Install dependencies:**

```bash
cd ANMAR25_D01_COMPASSCAR
npm install
```

3. **Configure o `.env` | Set up `.env` file:**

```bash
DB_NAME= <your-db-name>
DB_USER= <your-db-user>
DB_PASSWORD= <your-db-password>
DB_HOST= <your-db-host>
SV_PORT= <your-server-port>
```

4. **Inicie o servidor | Start the server:**

```bash
npm start
```

1. ✅ A API estará rodando na porta definida! | The API will be running on the defined port!

## 📡 Endpoints da API | API Endpoints

_A documentação completa dos endpoints será disponibilizada em breve._  
_Full endpoint documentation coming soon._

## 🤝 Contribuição | Contribution

### Fluxo de Trabalho | Workflow

1. Crie as branches seguindo o padrão do Git Flow
2. Faça suas alterações.
3. Faça commit usando a convenção [Conventional Commits](https://www.conventionalcommits.org/):
