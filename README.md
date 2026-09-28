# TimeLimit Server for Home Assistant OS

A Home Assistant add-on wrapper for [TimeLimit Server](https://github.com/MichaelSp/timelimit-server), pinned to upstream image `v1.17.0`. The server runs on the HAOS machine with the separate official MariaDB add-on.

Add this repository URL as a custom repository in **Settings → Apps → Install app → ⋮ → Repositories**. Install **TimeLimit Server**, follow its Documentation tab, configure it, and start it.

Version 0.1.3 repairs the upstream image's migration runner, which points at removed TypeScript sources and invokes legacy migrations with the wrong arguments. A GitHub Actions smoke test verifies first start and restart with an empty MariaDB database. The upstream image currently provides amd64 only, so the add-on lists only that architecture. Android client connectivity and remote HTTPS remain to be tested on a live HAOS installation.

The wrapper does not modify upstream server source. Upstream is licensed AGPL-3.0; consult its license when redistributing modified server images.
