App= {

    web3Provider: '',

    init: () => {
        console.log('Loaded')
        App.loadEthereum()
        App.loadContracts()
    },
    // Function para ver si existe el obj ethereum 
    // (Ver si el usuario tiene instalado Wallet Metamask en el navegador)
    loadEthereum: async () => {
        if (window.ethereum) {
            App.web3Provider = window.ethereum
            console.log('ethereum existe')
            // Requerir address de la cuenta  (Conexion) modo nuevo Metamask
            await window.ethereum.request({ method: 'eth_requestAccounts' })

        }else if (window.web3) 
            { 
            //conexion cod web3, tradicional
            web3 = new Web3(window.web3.currentProvider)
        }
        else {
            console.log('No ethereum browser installed, Try installing Metamask')
        }
    },

    // Cargar contratos
    loadContracts: async () => {
        const res = await fetch("TasksContract.json")
        const tasksContractJSON = await res.json()
        console.log(tasksContractJSON)
    }
}

App.init()