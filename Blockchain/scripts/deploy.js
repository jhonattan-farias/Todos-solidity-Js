const hre = require("hardhat");

async function main() {
  const TodoList = await hre.ethers.getContractFactory("Todolist");
  const todoList = await TodoList.deploy()

  await todoList.deployed()

  await todoList.addTodo('1')  
  await todoList.addTodo('2')  
  await todoList.addTodo('3')

  const todos = await todoList.getTodosX()
  console.log(todos)
  console.log(todoList.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
