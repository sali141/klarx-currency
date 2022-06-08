const appStage = process.env.REACT_APP_STAGE;
let apiBaseUrl = ""
let apiKey = ""

switch (appStage) {
  case 'dev' :
    apiBaseUrl = "https://openexchangerates.org/api/";
    apiKey = "031d21d3413842f2a81f75bbd533666a";
    break;
  
  default :
    apiBaseUrl = "https://openexchangerates.org/api/";
    apiKey = "031d21d3413842f2a81f75bbd533666a";
   
}

export const API_BASE_URL = apiBaseUrl;
export const API_KEY = apiKey;