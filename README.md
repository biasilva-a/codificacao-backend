# codificacao-backend

Passo a Passo de criação de API no BackEnd:

Criar uma pasta no Visual Studio Code.
   Exemplo: BackEnd-API;

2. Inicia o projeto node: 
  npm init -y
Isso acrescenta o Package.json;

3. Abrir o terminal e colocar:
  Npm install express ou npm i express
isso baixa o express na sua pasta e acrescenta o node_modules a ela;

4. Crie as estruturas de pastas desta forma: 
  src/
      routes/
	      animalRoutes.js
      service/
	      animal.service.js
      Server.js
	    
Desevolver os codigos nos arquivos.
			
5. Devemos ajustar o Package.json, adicionando o type e o scripts:

 {
  "type": "module",
  "scripts": {
    "dev": "node --watch ./src/server.js"
  }

 isso deve ficar acima das dependências que o package.json já traz do express;

6.Instalar a extensão do Bruno no VS Code: 
 Vá no menu lateral de Extensões ;
 	Pesquise por "Bruno";
 		Clique em Install;

7. Configurar os testes no BrunO: 
 - Clica no ícone do cãozinho (Bruno) que apareceu na barra lateral esquerda;
 - No topo do painel, clique no botão de (+) ou em "New Request";
 - Dê um nome (ex: Listar Animais), escolha o método (GET, POST, ETC) e coloque a URL: http://localhost:3000/animal;
 - Clique no botão de Play (Seta) para testar a rota diretamente no VS Code.

8.Testar a porta e ver se a API está rodando:

No terminal do VS Code, digite: npm run dev

Se aparecer uma mensagem (que você configurou no server.js) dizendo que o servidor está rodando na porta 3000, deu certo;

Para testar direto no navegador, digite: http://localhost:3000/animal

Se aparecer o seu array de animais (Cachorro e Gato), a porta está aberta e respondendo corretamente;

Se o navegador ficar carregando e der erro, verifique se o número da porta no código é o mesmo que você digitou na URL.
