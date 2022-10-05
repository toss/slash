#!/bin/bash

tsup ./src/*.ts --clean

echo -e 'export * from "ky";\nexport { default } from "ky";' > ./built/index.server.d.mts

for f in ./built/*; do
  contents=$(cat $f)
  echo -e "/* eslint-disable */\n" > $f
  echo "$contents" >> $f
done
