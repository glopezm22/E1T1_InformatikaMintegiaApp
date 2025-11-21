# Informatika mintegiko aplikazioa


Aplikazio honek informatika mintegiko inbentarioa kudeatzeko balio du.


## Erabilitako teknologiak
- PHP 8+
- MySQL/MariaDB
- HTML5, CSS3, Bootstrap
- JavaScript (Fetch API, balidazioak)


## Funtzionalitate nagusiak
- Erabiltzaileen kudeaketa (admin / user)
- Gailuen, gelaren eta kategorien alta, baja eta aldaketak
- Inbentarioaren erregistroa gela eta dataren arabera
- Balidazio bikoitza: bezeroa + zerbitzaria
- PHP saio bidezko autentifikazioa


## Instalazioa (XAMPP paketea beharrezkoa da)
1. Biltegia klonatu:

```
git clone https://github.com/usuario/E1T1_InformatikaMintegiaApp.git
cd E1T1_InformatikaMintegiaApp
```
2. Secrets karpeta sortu "src"-en eta bertan fitxategi hau sortu:
- db_credentials.php

```
<?php
return [
    'host' => 'localhost', #lokalean exekutatzen bada  
    'user' => 'root', # db erabiltzailea
    'pass' => '',# db pasahitza
    'db'   => 'informintegia',# db izena
];
```

3. MySql
```
mysql -u "erabiltzaile_izena" -p # pasahitza eskatuko du

```

mysql behin sartuta exekutatu hurrego komandoa

```
CREATE DATABASE informintegia;
```

Irten "exit" ipini.

Azkenik, eskema eta datuak sartzeko, "sql" karpetan dauden fitxategiak exekutatu behar dira:

```
mysql -u "erabiltzaile_izena" -p informintegia < schema.sql
mysql -u "erabiltzaile_izena" -p informintegia < data.sql

```


4. Web ikusi

- Web karpeta C:\xampp\htdocs mugitu 
- Apache2 zerbitzua hasi
- Nabigatzaile batean bilatu localhost/E1T1_InformatikaMintegiaApp/public/views
