@echo off
Setlocal EnableDelayedExpansion
rmdir /s /q .\src\posts\
xcopy ..\_posts\* .\src\posts\ /E /Y
cd .\src\posts
set list=
set /a cnt=0
for %%i in (*) do call :write_md_info %%i

echo export {%list:~0,-1%}; >> index.js

:write_md_info
if "%1"=="index.js" goto :eof
if not exist "%1" goto :eof
echo import post%cnt% from "./%1"; >> index.js
set list=%list%post%cnt%,
set /a cnt+=1
goto :eof