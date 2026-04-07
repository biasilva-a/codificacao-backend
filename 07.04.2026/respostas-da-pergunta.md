# Exercício 1 — Atualização parcial com `PATCH`

- Por que `PATCH` é a melhor escolha nesse caso?
- O que significa atualização parcial?
- O que acontece quando você envia apenas um campo?
 
# Respostas:

 - Porque  Se você só quer mudar uma coisinha, o PATCH faz isso sem te obrigar a mudar o objeto inteiro e acaba sendo mais rápido.
 - É modificar apenas pedaços de um registro, sem precisar reenviar o objeto inteiro.
 - O servidor atualiza apenas esse valor e mantém todo o resto intacto.

# Exercício 2 — Substituição completa com `PUT`

- Por que `PUT` é considerado uma substituição completa?
- Qual é a diferença entre substituir e atualizar parcialmente?
- Se o objeto tivesse mais campos, o que poderia acontecer se eles não fossem enviados?
 
 # Respostas:
 - Porque a lógica dele é reescrever o valor antigo pela nova versão que você enviou.
 - O parcial (PATCH) edita o que já existe; e o PUT apaga o velho e coloca um novo no lugar.
 - No PUT, os campos não enviados seriam excluídos ou resetados para null. 
 
 