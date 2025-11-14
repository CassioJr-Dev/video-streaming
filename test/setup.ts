import dotenv from 'dotenv';
import fs from 'fs';

const testEnvFile = '.env.test';
const envFile = '.env';

// Verifica se o arquivo .env existe
if (!fs.existsSync(envFile)) {
  throw new Error('.env file not found');
}

// Verifica se o arquivo .env.test existe
if (!fs.existsSync(testEnvFile)) {
  throw new Error('.env.test file not found');
}

// Carrega as variáveis de ambiente padrão (.env)
dotenv.config({ path: envFile });

// Carrega e sobrescreve com as variáveis de teste (.env.test)
dotenv.config({ path: testEnvFile, override: true });
