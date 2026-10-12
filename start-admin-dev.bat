@echo off
set ROOT=%~dp0

start "UFS Backend API" cmd /k "cd /d "%ROOT%Backend" && npm start"
start "UFS Frontend Vite" cmd /k "cd /d "%ROOT%Frontend" && npm run dev -- --host 127.0.0.1"

echo Backend:  http://localhost:5000/api
echo Frontend: http://127.0.0.1:5173/admin/login
echo.
echo Keep both terminal windows open while working.
