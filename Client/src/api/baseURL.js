const currentEnviroment = 2; // 1 for local enviroment and 2 for Prod
const LOCAL_BASE_URL = 'http://localhost:3001';
const PROD_BASE_URL = 'https://linkedin-v-2.onrender.com';

const Base_URL = currentEnviroment === 1 ? LOCAL_BASE_URL : PROD_BASE_URL;

export { Base_URL };
