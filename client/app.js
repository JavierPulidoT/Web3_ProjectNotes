App= {

    web3Provider: '',
    contracts: {},
    //account

    init: () => {
        console.log('Loaded')
        App.loadEthereum()
        App.loadAccount()
        App.loadContracts()
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

    // Crear Tarea
    createTask: async (title, description) => {
        const result = await App.tasksContract.createTask(title, description, {
            from: App.account
        });
        console.log(result.logs[0].args);
    }
}

App.init()