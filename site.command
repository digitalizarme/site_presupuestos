#! /bin/bash

echo "deploy site"
npm run build
echo "enviado al firebase"
firebase deploy --only hosting