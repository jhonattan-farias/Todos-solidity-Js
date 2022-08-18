// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// import "hardhat/console.sol";

contract Todolist {
    struct Todo {
        string todo;
        bool isCompleted;
        uint256 todoId;
    }

    uint256 id = 0;

    mapping(address => uint256[]) relationOwnerId;
    mapping(uint256 => Todo) todos;

    function addTodo(string memory _todo) external {
        todos[id] = Todo(_todo, false, id);
        relationOwnerId[msg.sender].push(id);
        id++;
    } 

    function getTodos() external view returns(Todo[] memory) {
        uint256[] memory TodosIds = relationOwnerId[msg.sender];
        Todo[] memory todosFromAddress =  new Todo[](TodosIds.length);

        for(uint256 i = 0; i < TodosIds.length; i++) {
          if(relationOwnerId[msg.sender][i] == todos[i].todoId) {
                todosFromAddress[i] = todos[i];
           }
        }

        return todosFromAddress;
    }

    function completeTodo(uint256 _id) external {
        require(relationOwnerId[msg.sender][_id] == _id, "You're not the owner of this Todo");        
        todos[_id].isCompleted = true;
    }
}

