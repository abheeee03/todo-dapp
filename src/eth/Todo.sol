// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Todo is Ownable {
    struct todoItem {
        uint id;
        string task;
        bool isDone;
    }

    address[] users;
    uint counter = 0;
    mapping(address => todoItem[]) todos;

    constructor() Ownable(msg.sender) {}

    function addTodo(string memory _task) public {
        if (todos[msg.sender].length == 0) {
            users.push(msg.sender);
        }
        todoItem memory userTodo;
        userTodo.id = counter;
        userTodo.task = _task;
        userTodo.isDone = false;
        todos[msg.sender].push(userTodo);
        counter++;
    }

    function getMyTodos() public view returns (todoItem[] memory) {
        return todos[msg.sender];
    }

    function deleteTodo(uint _id) public {
        uint length = todos[msg.sender].length;
        require(length > 0, "No todos to delete");

        for (uint i = 0; i < length; i++) {
            if (todos[msg.sender][i].id == _id) {
                // shift elements left
                for (uint j = i; j < length - 1; j++) {
                    todos[msg.sender][j] = todos[msg.sender][j + 1];
                }
                todos[msg.sender].pop(); // remove last element
                break;
            }
        }
    }

    function updateTodo(uint _id) public {
        uint length = todos[msg.sender].length;
        for (uint i = 0; i < length; i++) {
            if (todos[msg.sender][i].id == _id) {
                todos[msg.sender][i].isDone = true;
                break;
            }
        }
    }

    function getAllUsers() public view onlyOwner returns (address[] memory) {
        return users;
    }
}
