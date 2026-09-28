FROM ghcr.io/michaelsp/timelimit-server/timelimit:v1.17.0

# Upstream v1.17.0 searches removed TypeScript sources and calls legacy
# migrations with Umzug's newer single-argument convention.
COPY umzug.js /usr/src/app/build/database/migration/umzug.js

ARG BUILD_VERSION=0.1.0
ARG BUILD_ARCH
LABEL io.hass.version="${BUILD_VERSION}" \
      io.hass.type="app" \
      io.hass.arch="${BUILD_ARCH}"

COPY launch.js /timelimit-ha-launch.js
CMD ["node", "/timelimit-ha-launch.js"]
