#!/bin/bash

./scripts/clean.sh
./scripts/populate.sh
echo "Database cleaned and populated!"
npx prisma studio
