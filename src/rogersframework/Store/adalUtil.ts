export const QAConfig = {
    tenant: '0ab4cbbf-4bc7-4826-b52c-a14fed5286b9',
    clientId: 'b042e04b-8e03-4d3e-9a09-c902c7f0cdd7',
    endpoints: {
      api: '9c89359c-f377-46f6-9e3f-4be611828d45',
    },
    cacheLocation: 'localStorage'
  };

  export const DevConfig = {
    tenant: '0ab4cbbf-4bc7-4826-b52c-a14fed5286b9',
    clientId: 'e5c1dbfd-69e4-4f0c-990e-1ad66787f2af',
    endpoints: {
      api: '99310088-9020-4523-a2d9-b1a33ecb71cb',
    },
    cacheLocation: 'localStorage'
  };
  
  export const LocalConfig = {
    tenant: '0ab4cbbf-4bc7-4826-b52c-a14fed5286b9',
    clientId: '4511df5a-b8cc-4fb5-bf1c-b01b807a8769',
    endpoints: {
      api: '435c1dc0-3e8b-47a8-a32d-c1b33e5380dd',
    },
    cacheLocation: 'localStorage'
  }; 
  
  export const ProdConfig ={
    tenant: '0ab4cbbf-4bc7-4826-b52c-a14fed5286b9',
    clientId: '58934b8a-6221-4941-bfc1-d9f44ccb3a4d',
    endpoints: {
      api: '63afc1eb-c5f3-4f56-b4b5-d1221baba198',
    },
    cacheLocation: 'localStorage'
  }

  export function getAdalEnvConfig() {
    let configAdal = LocalConfig;
    switch(process.env.REACT_APP_LOGIN_CONFIG) {
      case "DEV":
          configAdal = DevConfig;
          break;
      case "QA":
          configAdal = QAConfig;
          break;
      case "PROD":
          configAdal = ProdConfig;
          break;
      default:
          configAdal = LocalConfig;
          break;
    }

    return configAdal;
  }
