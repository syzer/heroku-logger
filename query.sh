#!/usr/bin/env bash

when=`date --date="$@" +%s`
curl -s -G -X GET 'localhost:5000' --data-urlencode "gt=${when}" --data-urlencode "limit=-1" --output -
