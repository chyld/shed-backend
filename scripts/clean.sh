#!/bin/bash

rm -rf node_modules
rm -rf prisma/dev.db*
rm -rf prisma/migrations

npm install
npx prisma generate
npx prisma migrate dev --name init

echo "Clean up complete!"
