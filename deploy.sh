#!/usr/bin/env sh
set -e
npm run build
cd dist
echo 'www.jackswa.in' > CNAME
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:Jimbo-Wondall/Jimbo-Wondall.github.io.git main
cd -