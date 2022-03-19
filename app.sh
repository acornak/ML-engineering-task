#!/bin/bash

echo "install and activate virtual environment..."
pip install virtualenv
virtualenv venv
source venv/Scripts/activate

echo "installing python requirements..."
pip install -r ./backend/requirements.txt

echo "installing Node.js requirements..."
cd ./frontend || exit
npm install
cd ../

echo "==================================="
echo "running frontend unit tests..."
npm test --prefix ./frontend -- --coverage --watchAll=false || exit

echo "==================================="
echo "running backend unit tests..."
coverage run -m pytest  || exit

echo "==================================="
echo "starting local servers..."
npm start --prefix ./frontend &
python backend/app.py &