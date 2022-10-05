#!/bin/bash

concurrently "tsc -p tsconfig.json" "tsc -p tsconfig.esm.json"

# esm 모듈 확장자를 mjs, mts로 변경
for f in $(find ./esm -name "*.ts")
do
    dirname=$(dirname $f)
    filename=$(basename $f .ts)
    cat $f > $dirname/$filename.mts
    rm $f
done

for f in $(find ./esm -name "*.js")
do
    dirname=$(dirname $f)
    filename=$(basename $f .js)
    cat $f > $dirname/$filename.mjs
    rm $f
done
