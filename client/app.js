App= {

    web3Provider: '',
    contracts: {},
    //account

    init: async () => {
        console.log('Loaded')
        await App.loadEthereum();
        await App.loadAccount();
        await App.loadContracts();
        await App.render();  // no es funcion asincrona
        await App.renderTasks();
       
    },

    // Function para ver si existe el obj ethereum 
    // (Ver si el usuario tiene instalado Wallet Metamask en el navegador)
    loadEthereum: async () => {
        if (window.ethereum) {
            App.web3Provider = window.ethereum
            console.log('ethereum existe')
            // Requerir address de la cuenta  (Conexion) modo nuevo Metamask
            await window.ethereum.request({ method: 'eth_requestAccounts'})

        }else if (window.web3) 
            { 
            //conexion cod web3, tradicional
            web3 = new Web3(window.web3.currentProvider)
        }
        else {
            console.log('No ethereum browser installed, Try installing Metamask')
        }
    },

    // Cargar Cuenta
    loadAccount: async () => {
           const accounts =  await window.ethereum.request({ method: 'eth_requestAccounts' })
           App.account = accounts[0]

           console.log(accounts)
    },

    // Cargar contratos
    loadContracts: async () => {
        const res = await fetch("TasksContract.json")
        const tasksContractJSON = await res.json()
        
        App.contracts.tasksContract = TruffleContract(tasksContractJSON)

        App.contracts.tasksContract.setProvider(App.web3Provider) // Contrato conectando desde nuestra cuenta Metamask

        //Contrato finalmente configurado
        App.tasksContract = await App.contracts.tasksContract.deployed()
    },
    //Metodo para listar 
    render: () => {
        console.log(App.account)
        //traer desde el document, leer un campo especifico
        document.getElementById('account').innerText = App.account
    },

   
    renderTasks: async () => {
 //traer el taskContract
        const taskCounter = await App.tasksContract.taskCounter()
        const taskCounterNumber = taskCounter.toNumber()  // ver cuantas tareas hay en la Blockchain
        console.log(taskCounterNumber)

        let html = "";

        // Mostrar ideas
        for (let i = 1; i <= taskCounterNumber; i++) {
           const task = await App.tasksContract.tasks(i)

            const taskId = task[0].toNumber();
            const taskTitle = task[1];
            const taskDescription = task[2];
            const taskDone = task[3];
            const taskCreatedAt = task[4];

       // Creando card de ideas
      let taskElement = `
              <div class="card bg-dark rounded-0 mb-2">
                <div class="card-header d-flex justify-content-between align-items-center">
                   <span>${taskTitle}</span>
                      <div class="form-check form-switch">
                       <input class="form-check-input" data-id="${taskId}" type="checkbox" onchange="App.toggleDone(this)"
                       ${taskDone  && "checked"} />
        </div>
      </div>
      <div class="card-body">
        <span>${taskDescription}</span>
        <!--<span>${taskDone}</span>-->       
        <p class="text-muted">Task was created ${new Date(
          taskCreatedAt * 1000).toLocaleString()}</p>
        </label>
      </div>
    </div>`;
    html += taskElement;
  }
        document.querySelector('#taskList').innerHTML = html;
    },


    // Crear Tarea
    createTask: async (title, description) => {
        const result = await App.tasksContract.createTask(title, description, {
            from: App.account
        });
        console.log(result.logs[0].args);
    },

    // funtion para actualizar el check input
    toggleDone: async (element) => {
        const taskId = element.dataset.id;
        await App.tasksContract.toggleDone(taskId, {
          from: App.account,
        });
        window.location.reload();
      },
    };
