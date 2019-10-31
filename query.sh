#!/usr/bin/env bash

when=`date --date="$@" +%s`
SYSLOG_SRV=${SYSLOG_SRV:-localhost}  # If server url is not set or null, use localhost.
curl -m 2 -s -G -X GET "${SYSLOG_SRV}:5000" --data-urlencode "gt=${when}" --data-urlencode "limit=-1" --output -
