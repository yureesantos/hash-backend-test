# Hash Back-end Challenge

### **_PARA RODAR O DESAFIO, ACESSE O INSTRUÇÕES.MD_**

## Sobre o challenge

A ideia inicial do challenge seria criar uma API REST de um checkout (simulando um carrinho de compras) que consumiria um serviço de desconto em gRPC que deve ser retornado no response da requisição.

## Tecnologias utilizadas (linguagens, frameworks e bibliotecas)

- Node.JS com TypeScript para tipagem;
- Express;
- Winston (logs);
- Joi (Hapi, para tratamento de requisições);
- Jest & Supertest (para testes);
- gRPC-tools (para gerar o cliente do gRPC a partir de um .proto);

## Considerações extras

O maior desafio do teste em si, foi a implementação do gRPC com Node/TypeScript. Como uso o MacBook com o processador M1 (que tem a arquitetura arm64), o grpc-tools (ferramenta para gerar o cliente gRPC) ainda não trabalha nessa arquitetura, o que se fez necessário utilizar algumas flags do **yarn** para conseguir baixar o package.

Após uma longa pesquisa, consegui achar essas **issues (**https://github.com/grpc/grpc-node/issues/1405, https://github.com/grpc/grpc-node/issues/922**)\*\\\\\* no repo da ferramenta que me auxiliaram a resolver esse problema, utilizando as flags `"—-ignore-scripts" e "—-target-arch=x64"` .

Além disso, para rodar o **bash** que gera o client gRPC, também descobri que é necessário rodar pelo yarn, passando da seguinte forma (que geraram longos dias de busca)**:**

```
# Generate js
yarn run grpc_tools_node_protoc \
  --js_out=import_style=commonjs,binary:${OUTPUT_DIR} \
  --grpc_out=grpc_js:${OUTPUT_DIR} \
  --plugin=protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin \
  -I ${PROTO_DIR} \
  ${PROTO_DIR}/*.proto

# Generate ts
yarn run grpc_tools_node_protoc \
  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  --ts_out=grpc_js:${OUTPUT_DIR} \
  -I ${PROTO_DIR} \
  ${PROTO_DIR}/*.proto
```

Passando por todos esses contratempos entre gRPC & arquitetura M1 do Mac, consegui focar nas regras de negócio do desafio, essas que não ficaram tão caprichadas, muito por esse tempo perdido com a geração do cliente gRPC.

## Como esse projeto pode ser melhorado?

Com mais tempo dedicado ao projeto, suas regras de negócio e sua arquitetura, algumas coisas poderiam ser diferentes. Na minha opinião, a principal delas é a modelagem, o que ajudaria na organização do código, e por exemplo, eu poderia ter partido para uma abordagem de [DDD](https://medium.com/beelabacademy/domain-driven-design-vs-arquitetura-em-camadas-d01455698ec5).

Testes. Sempre que falar de aplicações robustas, com regras de negócios complexas e afins, precisamos de muitos testes, para garantir que nosso código não vai quebrar no meio da execução. Como temos uma conexão com um serviço externo (gRPC), acho que seria interessante adicionar mais testes nesse serviço para garantir que ele está nos retornando o que buscamos de forma correta.

## Referências

[Blog Lucas Santos - **O guia completo do gRPC**](https://blog.lsantos.dev/o-guia-do-grpc-3/)

[Repositório do grpc-node](https://github.com/grpc/grpc-node)

[Documentação do gRPC](https://grpc.io/docs/languages/node/basics/)
