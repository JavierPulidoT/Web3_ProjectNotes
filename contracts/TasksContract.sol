// Este contrato inteligente nos permitira hace un CRUD
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract TasksContract {
    uint256 public taskCounter = 0;

    // function Constructor permite ejecutar la funcion cuando se ejecuta el contrato  por primera vez
    constructor() {
        createTask("mi primer tarea/Nota ejemplo", "tengo que hacer algo");
    }

    struct Task {
        uint256 id;
        string title;
        string description;
        bool done;
        uint256 createdAt;
    }

    mapping(uint256 => Task) public tasks;

    //Funcion para poder guardar tareas
    function createTask(string memory _title, string memory _description)
        public
    {
        tasks[taskCounter] = Task(
            taskCounter,
            _title,
            _description,
            false,
            block.timestamp
        );
        taskCounter++;
    }

    // crea/Actualizara una tarea de false a true
    function toggleDone(uint256 _id) public {
        Task memory _task = tasks[_id];
        _task.done = !_task.done;
        tasks[_id] = _task;
    }
}
