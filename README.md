# Users API Microservice using Node
This is a microservice by using nodeJs, ExpressJs, ES6, Mongodb, MySql, etc

## Setup
You need `node v6.9.1` or more latest version to be installed for this project.
You need to install mongodb & mysql and run both database server as well. 

Create `apimicro` database with `users` collection/table and add SID data for _id, username, password, profession

###### for mongodb after creating the users collection, please add the SID data:
```mongodb
{
    "_id" : NumberLong(1479104274018),
    "username" : "nazmul",
    "password" : "123",
    "profession" : "Software Engineer"
}
```

###### for mysql:

```
CREATE DATABASE IF NOT EXISTS `apimicro`
```

```
CREATE TABLE IF NOT EXISTS `users` (
  `_id` bigint(20) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profession` varchar(255) NOT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE KEY `username` (`username`),
  KEY `username_2` (`username`,`password`)
) ENGINE=InnoDB;
```

```
INSERT INTO `users` (`_id`, `username`, `password`, `profession`) VALUES
(1479131260, 'nazmul', '123', 'Software Engineer');
```

## Starting App
```
npm install
npm start
```

###### Open your browser and use the below url:
`http://localhost:8082`