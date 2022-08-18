const hre = require("hardhat");

async function main() {
  const TodoList = await hre.ethers.getContractFactory("Todolist");
  const todoList = await TodoList.deploy()

  await todoList.deployed()
  await todoList.addTodo("ler um livro")
  await todoList.addTodo("ler dois")
  await todoList.addTodo("ler treis livro")

  const todos = await todoList.getTodos()

  console.log(todos)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
