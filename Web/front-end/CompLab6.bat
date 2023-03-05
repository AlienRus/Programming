javac.exe Lab6\WEB-INF\classes\pack\model\dto\*.java -classpath ".\Lab6\WEB-INF\classes"
javac.exe Lab6\WEB-INF\classes\pack\model\interfaces\product\*.java -classpath ".\Lab6\WEB-INF\classes"
javac.exe Lab6\WEB-INF\classes\pack\model\interfaces\user\*.java -classpath ".\Lab6\WEB-INF\classes"
javac.exe Lab6\WEB-INF\classes\pack\model\user\*.java -classpath ".\Lab6\WEB-INF\classes"
javac.exe Lab6\WEB-INF\classes\pack\model\product\*.java -classpath ".\Lab6\WEB-INF\classes"

javac.exe Lab6\WEB-INF\classes\pack\builder\Built.java -classpath ".\Lab6\WEB-INF\classes;D:\glassfish-6.2.5\glassfish6\glassfish\lib\javaee.jar;"
javac.exe Lab6\WEB-INF\classes\pack\builder\product\ProductBuilder.java -classpath ".\Lab6\WEB-INF\classes;D:\glassfish-6.2.5\glassfish6\glassfish\lib\javaee.jar;D:\glassfish-6.2.5\glassfish6\glassfish\modules\jakarta.enterprise.cdi-api.jar"
javac.exe Lab6\WEB-INF\classes\pack\builder\user\UserBuilder.java -classpath ".\Lab6\WEB-INF\classes;D:\glassfish-6.2.5\glassfish6\glassfish\lib\javaee.jar;D:\glassfish-6.2.5\glassfish6\glassfish\modules\jakarta.enterprise.cdi-api.jar"

javac.exe Lab6\WEB-INF\classes\pack\repository\user\*.java -classpath ".\Lab6\WEB-INF\classes;D:\glassfish-6.2.5\glassfish6\glassfish\lib\javaee.jar;"
javac.exe Lab6\WEB-INF\classes\pack\repository\product\*.java -classpath ".\Lab6\WEB-INF\classes;D:\glassfish-6.2.5\glassfish6\glassfish\lib\javaee.jar;"

javac.exe Lab6\WEB-INF\classes\pack\controller\interceptor\*.java -classpath ".\Lab6\WEB-INF\classes;D:\glassfish-6.2.5\glassfish6\glassfish\lib\javaee.jar;"
javac.exe Lab6\WEB-INF\classes\pack\controller\config\*.java -classpath ".\Lab6\WEB-INF\classes;D:\glassfish-6.2.5\glassfish6\glassfish\lib\javaee.jar;"
javac.exe Lab6\WEB-INF\classes\pack\controller\dto\*.java -classpath ".\Lab6\WEB-INF\classes;D:\glassfish-6.2.5\glassfish6\glassfish\lib\javaee.jar;"
javac.exe Lab6\WEB-INF\classes\pack\controller\path\product\*.java -classpath ".\Lab6\WEB-INF\classes;D:\glassfish-6.2.5\glassfish6\glassfish\lib\javaee.jar;"
javac.exe Lab6\WEB-INF\classes\pack\controller\path\user\*.java -classpath ".\Lab6\WEB-INF\classes;D:\glassfish-6.2.5\glassfish6\glassfish\lib\javaee.jar;"
javac.exe Lab6\WEB-INF\classes\pack\controller\tools\*.java -classpath ".\Lab6\WEB-INF\classes;D:\glassfish-6.2.5\glassfish6\glassfish\lib\javaee.jar;"

pause