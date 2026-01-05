#!/bin/bash

echo "========================================"
echo "  Sistema de Gestão de RH - React"
echo "========================================"
echo ""

# Verificar se node_modules existe
if [ ! -d "node_modules" ]; then
    echo "[1/3] Instalando dependências..."
    npm install
    echo ""
else
    echo "[1/3] Dependências já instaladas"
    echo ""
fi

# Verificar se .env existe
if [ ! -f ".env" ]; then
    echo "[2/3] Criando arquivo .env..."
    cp .env.example .env
    echo ""
    echo "ATENÇÃO: Edite o arquivo .env com suas credenciais do MySQL!"
    echo ""
    read -p "Pressione Enter para continuar..."
else
    echo "[2/3] Arquivo .env encontrado"
    echo ""
fi

echo "[3/3] Iniciando aplicação..."
echo ""
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:5000/api"
echo ""
echo "Pressione Ctrl+C para parar"
echo ""

npm start




