@echo off
Setlocal EnableDelayedExpansion
rmdir /s /q .\src\posts\
xcopy ..\_posts\* .\src\posts\data\ /E /Y
cd .\src\posts\data
set list=
set /a cnt=0
for %%i in (*) do call :write_md_info %%i

echo const fileList = [%list:~0,-1%]; >> ../index.js
echo export default fileList; >> ../index.js

:write_md_info
if not exist "%1" goto :eof
echo import post%cnt% from "./data/%1"; >> ../index.js
set list=%list%post%cnt%,
set /a cnt+=1
goto :eof