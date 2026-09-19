# API REST — Catálogo de E-commerce

API RESTful para gerenciar o catálogo de produtos de um e-commerce, construída com Node.js, Express e MongoDB (Atlas), seguindo a arquitetura MVC.

# Instalação

```bash
npm install

cp .env.example .env   # depois preencha a MONGO_URI no .env

npm run seed   

npm start      
```

# Endpoints

```
POST   /api/produtos                // Criar produto
GET    /api/produtos               Listar com filtros, busca e paginação
GET    /api/produtos/:id           Buscar produto por ID
PUT    /api/produtos/:id           Atualizar produto
PATCH  /api/produtos/:id/estoque   Atualizar estoque ($inc)
DELETE /api/produtos/:id           Remover produto
```

Exemplos:

```bash
GET /api/produtos?categoria=Roupas&precoMin=50&precoMax=200

GET /api/produtos?busca=gela

GET /api/produtos?limit=5&ordem=desc
```

# Exemplo de corpo (POST /api/produtos)

```json
{
  "nome": "Camiseta Básica Algodão",
  "preco": 49.90,
  "categoria": "Roupas",
  "estoque": 150,
  "especificacoes": { "tamanho": "M", "cor": "Branca" }
}
```


# Requisitos Funcionais

```
 RF01 Cadastro com esquema dinâmico (especificacoes do tipo Mix)
 RF02 Filtros compostos por categoria e faixa de preço ($eq, $gte, $lte)
 RF03 Busca textual parcial em nome e descrição ($or + $regex)
 RF04 Paginação (limit/skip) e ordenação por preço
 RF05 Atualização de dados e estoque atômico ($inc)
 RF06 Remoção por ID
```