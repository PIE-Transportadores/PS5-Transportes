-- Criação da tabela Alojamento
CREATE TABLE Alojamento (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(255),
    Bairro VARCHAR(255),
    capacidade int,
    Número INT,
    Cep VARCHAR(8)
);

-- Criação da tabela Tipo_veiculo
CREATE TABLE Tipo_veiculo (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(255)
);

-- Criação da tabela Garagem
CREATE TABLE Garagem (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(255),
    Rua VARCHAR(255),
    Bairro VARCHAR(255),
    Número INT,
    Cep VARCHAR(8), 
    Latitude VARCHAR(255),
    Longitude VARCHAR(255)
);

-- Criação da tabela Veiculo
CREATE TABLE Veiculo (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Placa VARCHAR(7),
    Tipo_id INT,
    Garagem_id INT,
    Ano INT,
    Capacidade INT,
    FOREIGN KEY (Tipo_id) REFERENCES Tipo_veiculo(Id),
    FOREIGN KEY (Garagem_id) REFERENCES Garagem(Id)
);

-- Criação da tabela Funcionario
CREATE TABLE Funcionario (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(255),
    Cpf VARCHAR(11),
    Alojamento_id INT,
    FOREIGN KEY (Alojamento_id) REFERENCES Alojamento(Id)
);

-- Criação da tabela Destino
CREATE TABLE Destino (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(255),
    Rua VARCHAR(255),
    Bairro VARCHAR(255),
    Número INT,
    Cep VARCHAR(8)
);

-- Criação da tabela Servico
CREATE TABLE Servico (
    id INT PRIMARY KEY AUTO_INCREMENT,
    data_inicio date,
    data_termino date,
    Destino_id INT,
    Funcionario_id INT,
    FOREIGN KEY (Destino_id) REFERENCES Destino(Id),
    FOREIGN KEY (Funcionario_id) REFERENCES Funcionario(Id)
);

CREATE TABLE OS_FUNCIONARIO{
    id_servico INT, 
    id_funcionario INT, 
    FOREIGN KEY (servico_id) REFERENCES Servico(Id), 
    FOREIGN KEY (Funcionario_id) REFERENCES Funcionario(Id) 
}

CREATE TABLE usuario{
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255),
    sexo VARCHAR(50),
    email VARCHAR(255),
    data_criada 
}
