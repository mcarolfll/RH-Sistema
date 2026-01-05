@echo off
echo ========================================
echo   Sistema de Gestao de RH - React
echo ========================================
echo.

REM Verificar se node_modules existe
if not exist "node_modules\" (
    echo [1/3] Instalando dependencias...
    call npm install
    echo.
) else (
    echo [1/3] Dependencias ja instaladas
    echo.
)

REM Verificar se .env existe
if not exist ".env" (
    echo [2/3] Criando arquivo .env...
    copy .env.example .env
    echo.
    echo ATENCAO: O sistema esta configurado para usar SQLite (database.sqlite).
    echo As configuracoes de MySQL no .env serao ignoradas pelo backend atual.
    echo.
    pause
) else (
    echo [2/3] Arquivo .env encontrado
    echo.
)

echo [3/3] Iniciando aplicacao...
echo.
echo Frontend: http://localhost:3002
echo Backend:  http://localhost:5000/api
echo.
echo Pressione Ctrl+C para parar
echo.

call npm start




