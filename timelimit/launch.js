const fs = require('node:fs');
const { spawn } = require('node:child_process');

let options;
try {
  options = JSON.parse(fs.readFileSync('/data/options.json', 'utf8'));
} catch (error) {
  console.error(`Cannot read add-on options: ${error.message}`);
  process.exit(1);
}

for (const key of ['database_url']) {
  if (!options[key] || typeof options[key] !== 'string') {
    console.error(`Set ${key} in the add-on configuration before starting.`);
    process.exit(1);
  }
}

let database;
try {
  database = new URL(options.database_url);
  if (database.protocol !== 'mariadb:' && database.protocol !== 'mysql:') {
    throw new Error('expected a mariadb:// or mysql:// URL');
  }
  if (!database.hostname || !database.pathname.slice(1)) {
    throw new Error('database host and name are required');
  }
  if (options.mail_transport) JSON.parse(options.mail_transport);
} catch (error) {
  console.error(`Invalid database URL or mail transport JSON: ${error.message}`);
  process.exit(1);
}

const env = {
  ...process.env,
  NODE_ENV: 'production',
  PORT: '8080',
  DB_DRIVER: database.protocol.slice(0, -1),
  DB_HOST: database.hostname,
  DB_PORT: database.port || '3306',
  DB_USER: decodeURIComponent(database.username),
  DB_PASS: decodeURIComponent(database.password),
  DB_NAME: decodeURIComponent(database.pathname.slice(1)),
  ALWAYS_PRO: options.always_pro ? 'yes' : 'no',
};
if (options.mail_sender) env.MAIL_SENDER = options.mail_sender;
if (options.mail_transport) env.MAIL_TRANSPORT = options.mail_transport;

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
