# TimeLimit Server for Home Assistant OS

An initial Home Assistant add-on wrapper for [TimeLimit Server](https://github.com/MichaelSp/timelimit-server), pinned to upstream image `v1.17.0`. The server runs on the HAOS machine with the separate official MariaDB add-on.

Once this repository is published, add its GitHub URL as a custom repository in **Settings → Add-ons → Add-on Store**. Install **TimeLimit Server**, follow its Documentation tab, configure it, and start it.

Current status: packaging draft; HAOS runtime and Android client behavior still need end-to-end verification. No native HA entities are implemented yet.

The wrapper does not copy or modify the upstream server source. Upstream is licensed AGPL-3.0; consult its license when redistributing modified server images.
