const fs = require('node:fs');
const { spawn } = require('node:child_process');

let options;
try {
  options = JSON.parse(fs.readFileSync('/data/options.json', 'utf8'));
} catch (error) {
  console.error(`Cannot read add-on options: ${error.message}`);
  process.exit(1);
}

for (const key of ['database_url', 'mail_sender', 'mail_transport']) {
  if (!options[key] || typeof options[key] !== 'string') {
    console.error(`Set ${key} in the add-on configuration before starting.`);
    process.exit(1);
  }
}

try {
  const database = new URL(options.database_url);
  if (database.protocol !== 'mariadb:' && database.protocol !== 'mysql:') {
    throw new Error('expected a mariadb:// or mysql:// URL');
  }
  JSON.parse(options.mail_transport);
} catch (error) {
  console.error(`Invalid database URL or mail transport JSON: ${error.message}`);
  process.exit(1);
}

const env = {
  ...process.env,
  NODE_ENV: 'production',
  PORT: '8080',
  DATABASE_URL: options.database_url,
  MAIL_SENDER: options.mail_sender,
  MAIL_TRANSPORT: options.mail_transport,
  ALWAYS_PRO: options.always_pro ? 'yes' : 'no',
};

const child = spawn('npm', ['start'], { env, stdio: 'inherit' });
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => child.kill(signal));
}
child.on('error', error => {
  console.error(`Cannot start TimeLimit: ${error.message}`);
  process.exitCode = 1;
});
child.on('exit', (code, signal) => {
  process.exit(signal ? 1 : (code ?? 1));
});
