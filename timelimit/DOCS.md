# TimeLimit Server

This add-on packages the upstream TimeLimit connected-mode server. It does not create Home Assistant entities; that integration is a separate project.

## Database

Install the Home Assistant MariaDB add-on. In its configuration, add `timelimit` to `databases`, a login with a strong password to `logins`, and a matching `timelimit` grant in `rights`. Start MariaDB first. Use `core-mariadb` as the hostname within HAOS.

Set `database_url` to `mariadb://timelimit:<URL-encoded-password>@core-mariadb:3306/timelimit`. Encode reserved characters in the password (for example, `@` as `%40`). Keep this value private.

## Mail

Set `mail_sender` to your sender address and `mail_transport` to the JSON transport object supported by TimeLimit and your SMTP provider, for example `{"host":"smtp.example.org","port":587,"secure":false,"auth":{"user":"account","pass":"secret"}}`. This value contains credentials and is stored in Supervisor add-on options. Configure a working mail transport before using account recovery or invitations.

## Clients and access

The server listens on port 8080. On your LAN, point clients at `http://<HA-machine-IP>:8080`. For devices away from home, use a separate HTTPS reverse proxy with WebSocket forwarding and a stable DNS name; do not expose port 8080 directly to the Internet. Configure the Android clients with the URL they can reach both at home and away.

Back up both the MariaDB add-on and this add-on before upgrades. The database lives in MariaDB, not in this add-on's `/data` directory.

This is an initial package. It has not yet been tested against a live HAOS Supervisor, MariaDB instance, and Android client.
