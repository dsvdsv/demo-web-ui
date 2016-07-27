#demo-web-ui

###Технологии
####Backend 
- Для управщения использован spring-boot, для демонстрации чего либо он подходит больше всего, так как не нужно кудато чтото диплоить и т.д.
Веб сервер у него встроенный, по умолчанию tomcat
- gradle как система сборки, по моему опыту наиболее подходит для создания каких либо нестандартных сборок, в данному случае интеграция с nodejs и npm
####Frontend
- npm - популярный на данный момент иструмент управления зависимостями в web-ui
- webpack - минифицирует и собирает проект, у него много фитч, к примеру сборка и минификация ресурсов, live update в dev режиме и т.д.
- angular 2 на typescript - typescript на мой взгляд более перспективен чем Dart, так как отличия между ним и JS минимальны

###Краткое описание
 Для сборки нужно установить gradle или воспользоваться враппером (gradlew/gradlew.bat)
####Сборка
  ```
  gradle clean build
  ```

####Dev
Для разработки нужно установить nodejs и npm, затем создать в Idea launcher для класса Application, в консоли в директории src/main/web 
выполнить команды:
- Скачать зависимости
 ```
  npm install
 ```
- Запустить в dev mode webpack
 ```
  npm start
 ```
открыть в браузере [`http://localhost:8081`](http://localhost:8081) все изменения кода, будут  пересобираться и подсовываться в браузер без необходимости нажимать F5,
 различные ошибки в typescript будут отображаться в консоли, 
 
###Проблемы

Возможно будут проблемы с полной сборкой проекта, поэтому публикую на всякий случай собранный jar, [demo-web-ui-0.0.1-SNAPSHOT.jar](https://github.com/dsvdsv/demo-web-ui/raw/master/build/libs/demo-web-ui-0.0.1-SNAPSHOT.jar)
запустить его можно так: 
 ```
  java -jar demo-web-ui-0.0.1-SNAPSHOT.jar
 ```
 в браузере открыть страницу [`http://localhost:8080`](http://localhost:8080)