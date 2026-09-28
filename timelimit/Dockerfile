FROM ghcr.io/michaelsp/timelimit-server/timelimit:v1.17.0

# Upstream v1.17.0 compiles migrations to build/ and removes src/, but its
# compiled Umzug configuration still searches src/*.ts.
RUN node -e 'const fs=require("fs"); const p="/usr/src/app/build/database/migration/umzug.js"; const before=fs.readFileSync(p,"utf8"); const old="src/database/migration/migrations/*.ts"; if (!before.includes(old)) throw new Error("Upstream migration path changed"); fs.writeFileSync(p,before.replace(old,"build/database/migration/migrations/*.js"))'

ARG BUILD_VERSION=0.1.0
ARG BUILD_ARCH
LABEL io.hass.version="${BUILD_VERSION}" \
      io.hass.type="app" \
      io.hass.arch="${BUILD_ARCH}"

COPY launch.js /timelimit-ha-launch.js
CMD ["node", "/timelimit-ha-launch.js"]
