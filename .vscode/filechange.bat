@echo off
:loop  
timeout -t 1 >nul  
for %%i in (setting.js) do echo %%~ai|find "a">nul || goto :loop
rem do workload
node setting.js
goto :loop