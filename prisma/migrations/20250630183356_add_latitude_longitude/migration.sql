-- CreateTable
CREATE TABLE `cadastro_funcionario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `turno` VARCHAR(191) NOT NULL,
    `alojamento` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cadastro_alojamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `alojamento` VARCHAR(191) NOT NULL,
    `cep` INTEGER NOT NULL,
    `rua` VARCHAR(191) NOT NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `numero` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `sexo` VARCHAR(191) NOT NULL,
    `dataCriada` DATETIME(3) NOT NULL,

    UNIQUE INDEX `usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cadastro_veiculo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `placa` VARCHAR(191) NOT NULL,
    `garagem` VARCHAR(191) NOT NULL,
    `marca` VARCHAR(191) NOT NULL,
    `ano` INTEGER NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cadastro_destino` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `destino` VARCHAR(191) NOT NULL,
    `rua` VARCHAR(191) NOT NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `numero` INTEGER NOT NULL,
    `cep` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cadastro_garagem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `garagem` VARCHAR(191) NOT NULL,
    `rua` VARCHAR(191) NOT NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `numero` INTEGER NOT NULL,
    `cep` VARCHAR(191) NOT NULL,
    `latitude` VARCHAR(191) NOT NULL,
    `longitude` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
