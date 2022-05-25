// Este contrato inteligente nos permitira hace un CRUD
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract TasksContract {
    uint256 public taskCounter = 0;

    // function Constructor permite ejecutar la funcion cuando se ejecuta el contrato  por primera vez
    constructor() {
        createTask("mi primer tarea/Nota ejemplo", "tengo que hacer algo");
    }

    // Creacion de un Evento, no va a describir un tipo de  dato ,
    //  sino para describir que es lo que va a devolver cuando se cree una tarea
    event TaksCreated(
        uint id,
        string title,
        string description,
        bool done,
        uint createdAt
    );

    // Evento 
    event TaskToggleDone(uint id, bool done);

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
        taskCounter++;
        tasks[taskCounter] = Task(
            taskCounter,
            _title,
            _description,
            false,
            block.timestamp
        );
        // Devolver el evento al crear una tarea
        emit TaksCreated(taskCounter, _title, _description, false,block.timestamp);
    }

    // crea/Actualizara una tarea de false a true
    function toggleDone(uint256 _id) public {
        Task memory _task = tasks[_id];
        _task.done = !_task.done;
        tasks[_id] = _task;
        emit TaskToggleDone(_id, _task.done);
    }
}
