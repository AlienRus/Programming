set name=lab6

cd .\%name%
"C:\Program Files\WinRAR\winrar.exe" a -r -afzip .\%name%.zip .\*
cd ..
rename .\%name%\%name%.zip %name%.war
del /q D:\glassfish-6.2.5\glassfish6\glassfish\domains\domain1\autodeploy\%name%.war
del /q D:\glassfish-6.2.5\glassfish6\glassfish\domains\domain1\autodeploy\%name%.war_deployed
del /q D:\glassfish-6.2.5\glassfish6\glassfish\domains\domain1\autodeploy\%name%.war_deployFailed
move .\%name%\%name%.war D:\glassfish-6.2.5\glassfish6\glassfish\domains\domain1\autodeploy\
del /q .\%name%\%name%.war
del /q .\%name%\%name%.zip