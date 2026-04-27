import fs from "fs/promises";

async function readFruits() {
  const data = await fs.readFile("./fruits.json", "utf-8");
  return JSON.parse(data);
}

async function writeFruits(fruits) {
  const data = JSON.stringify(fruits, null, 2);
  await fs.writeFile("./fruits.json", data, "utf-8");
}

async function getAllFruits() {
  return await readFruits();
}

async function getFruitById(id) {
  const fruits = await readFruits();
  const fruit = fruits.find(item => item.id === Number(id));

  if (!fruit) {
    console.log("Fruta não encontrada.");
  }

  return fruit;
}

async function getFruitByName(nome) {
  const fruits = await readFruits();
  return fruits.find(
    item => item.nome.toLowerCase() === nome.toLowerCase()
  );
}

async function createFruit(nome) {
  const fruits = await readFruits();

  const alreadyExists = fruits.some(
    item => item.nome.toLowerCase() === nome.toLowerCase()
  );

  if (alreadyExists) {
    console.log("Essa fruta já está cadastrada.");
    return null;
  }

  const newFruit = {
    id: fruits.length > 0 ? fruits[fruits.length - 1].id + 1 : 1,
    nome
  };

  fruits.push(newFruit);
  await writeFruits(fruits);

  return newFruit;
}

async function updateFruit(id, novoNome) {
  const fruits = await readFruits();
  const index = fruits.findIndex(item => item.id === Number(id));

  if (index === -1) {
    return null;
  }

  fruits[index].nome = novoNome;
  await writeFruits(fruits);

  return fruits[index];
}

async function deleteFruit(id) {
  const fruits = await readFruits();
  const index = fruits.findIndex(item => item.id === Number(id));

  if (index === -1) {
    return false;
  }

  fruits.splice(index, 1);
  await writeFruits(fruits);

  return true;
}

async function resetFruits() {
  const initialFruits = [
    { id: 1, nome: "Melancia" },
    { id: 2, nome: "Banana" },
    { id: 3, nome: "Laranja" }
  ];

  await writeFruits(initialFruits);
  console.log("Arquivo de frutas resetado para o estado inicial.");
}

async function main() {
  const allFruits = await getAllFruits();
  console.log("Todas as frutas:");
  console.log(allFruits);

  const fruit = await getFruitById(1);
  console.log("Buscar fruta por id:");
  console.log(fruit);

  const createdFruit = await createFruit("Abacaxi");
  console.log("Fruta criada:");
  console.log(createdFruit);

  const updatedFruit = await updateFruit(1, "Maçã Gala");
  console.log("Fruta atualizada:");
  console.log(updatedFruit);

  const deleted = await deleteFruit(3);
  console.log("Fruta removida com sucesso?");
  console.log(deleted);

  const finalList = await getAllFruits();
  console.log("Lista final:");
  console.log(finalList);
}

main();