import fs from "fs/promises";

async function readFruits() {
  try {
    const data = await fs.readFile("./fruits.json", "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeFruits(fruits) {
  const data = JSON.stringify(fruits, null, 2);
  await fs.writeFile("./fruits.json", data, "utf-8");
}

async function getAllFruits() {
  const fruits = await readFruits();
  console.log("Lista de frutas carregada.");
  return fruits;
}

async function getFruitById(id) {
  const fruits = await readFruits();
  const fruit = fruits.find(f => f.id === Number(id));

  if (!fruit) {
    console.log("Nenhuma fruta encontrada com esse ID.");
    return null;
  }

  console.log("Fruta encontrada pelo ID.");
  return fruit;
}

async function getFruitByName(nome) {
  const fruits = await readFruits();

  const fruit = fruits.find(
    f => f.nome.toLowerCase().includes(nome.toLowerCase())
  );

  if (!fruit) {
    console.log("Nenhuma fruta encontrada com esse nome.");
    return null;
  }

  console.log("Fruta encontrada pelo nome.");
  return fruit;
}

async function createFruit(nome, cor, preco) {
  const fruits = await readFruits();

  const alreadyExists = fruits.some(
    f => f.nome.toLowerCase() === nome.toLowerCase()
  );

  if (alreadyExists) {
    console.log("Erro: já existe uma fruta com esse nome.");
    return null;
  }

  const newFruit = {
    id: fruits.length > 0 ? fruits[fruits.length - 1].id + 1 : 1,
    nome,
    cor,
    preco
  };

  fruits.push(newFruit);
  await writeFruits(fruits);

  console.log("Fruta criada com sucesso.");
  return newFruit;
}

async function updateFruit(id, nome, cor, preco) {
  const fruits = await readFruits();
  const index = fruits.findIndex(f => f.id === Number(id));

  if (index === -1) {
    console.log("Erro: fruta não encontrada para atualização.");
    return null;
  }
if (nome) {
  const alreadyExists = fruits.some(
    f =>
      f.nome.toLowerCase() === nome.toLowerCase() &&
      f.id !== Number(id)
  );

  if (alreadyExists) {
    console.log("Erro: já existe outra fruta com esse nome.");
    return null;
  }
}
  fruits[index] = {
    ...fruits[index],
    nome,
    cor,
    preco
  };

  await writeFruits(fruits);

  console.log("Fruta atualizada com sucesso.");
  return fruits[index];
}

async function deleteFruit(id) {
  const fruits = await readFruits();
  const index = fruits.findIndex(f => f.id === Number(id));

  if (index === -1) {
    console.log("Erro: fruta não encontrada para remoção.");
    return false;
  }

  fruits.splice(index, 1);
  await writeFruits(fruits);

  console.log("Fruta removida com sucesso.");
  return true;
}

async function resetFruits() {
  const initialFruits = [
    { id: 1, nome: "Amora", cor: "Vermelha", preco: 6.5 },
    { id: 2, nome: "Maracuja", cor: "Amarelo", preco: 5.0 },
    { id: 3, nome: "Kiwi", cor: "Verde", preco: 4.0 }
  ];

  await writeFruits(initialFruits);
  console.log("Arquivo resetado com sucesso.");
}

async function main() {
  await resetFruits();

  console.log(await getAllFruits());

  console.log(await getFruitById(1));

  console.log(await getFruitByName("mor"));

  console.log(await createFruit("Banana", "Amarelo", 7.5));

  console.log(await updateFruit(1, "Maçã Gala", "Vermelha", 9.0));

  console.log(await deleteFruit(2));

  console.log(await getAllFruits());
}

main();