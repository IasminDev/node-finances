### Tecnologias Utilizadas
- **Node.js:** Plataforma principal para execução do servidor.
- **Fastify:** Framework web rápido e eficiente para construção da API.
- **SQLite:** Banco de dados SQL leve para armazenamento das transações.
- **Prisma ORM:** ORM (Object-Relational Mapping) moderno para integração com o SQLite.
- **JWT:** Segurança e controle de acesso com JSON Web Tokens.

### Requerimentos Funcionais
1. **Cadastro de transações:**
   - O sistema deve permitir que o usuário cadastre novas transações financeiras (receitas e despesas).
   - Cada transação deve conter: descrição, valor, tipo (receita ou despesa), data e categoria.

2. **Listagem de transações:**
   - O sistema deve permitir que o usuário visualize todas as transações cadastradas.
   - O sistema deve permitir que o usuário filtre transações por categoria e data.

3. **Atualização de transações:**
   - O sistema deve permitir que o usuário atualize os dados de uma transação existente.

4. **Exclusão de transações:**
   - O sistema deve permitir que o usuário exclua uma transação existente.

5. **Relatórios financeiros:**
   - O sistema deve gerar um resumo financeiro que exiba o saldo total, total de receitas e total de despesas.

6. **Autenticação e autorização:**
   - O sistema deve implementar autenticação de usuário utilizando JWT.
   - O sistema deve permitir o registro de novos usuários e o login de usuários existentes.

### Regras de Negócio
1. **Validação de transações:**
   - O valor da transação deve ser um número positivo.
   - A data da transação não pode ser no futuro.

2. **Categoria obrigatória:**
   - Todas as transações devem ser associadas a uma categoria definida pelo usuário.

3. **Autenticação obrigatória:**
   - Todas as operações de criação, atualização e exclusão de transações devem exigir que o usuário esteja autenticado.

### Requerimentos Não Funcionais
1. **Desempenho:**
   - O sistema deve ser capaz de processar requisições com tempo de resposta inferior a 500ms sob carga normal.

2. **Segurança:**
   - Todos os endpoints devem ser protegidos contra ataques comuns, como injeção de SQL e Cross-Site Scripting (XSS).
   - As senhas dos usuários devem ser armazenadas utilizando hashing seguro.

3. **Escalabilidade:**
   - O sistema deve ser projetado para suportar crescimento e aumento de usuários sem degradação significativa de performance.

4. **Manutenibilidade:**
   - O código deve seguir boas práticas de desenvolvimento, com comentários claros e uma estrutura modular que facilite a manutenção e a adição de novas funcionalidades.

5. **Documentação:**
   - O projeto deve incluir documentação clara sobre a configuração, instalação, execução e utilização da API.
   - A API deve estar documentada com endpoints, parâmetros, exemplos de requisições e respostas utilizando uma ferramenta como Swagger.


#### Como Executar o Projeto
1. Clone este repositório:
   ```sh
   git clone https://github.com/IasminDev/node-finances.git
   ```
2. Instale as dependências:
   ```sh
   cd node-finances
   npm install
   ```
3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto e adicione suas configurações, por exemplo:
   ```env
   DATABASE_URL=file:./dev.db
   JWT_SECRET=sua-chave-secreta-jwt
   ```
4. Execute as migrações do Prisma para configurar o banco de dados:
   ```sh
   npx prisma migrate dev --name init
   ```
5. Inicie o servidor:
   ```sh
   npm start
   ```