    mysql> CREATE TABLE user( 
    -> email VARCHAR(50) UNIQUE,  
    -> password VARCHAR(20),
    -> full_name VARCHAR(30),
    -> username VARCHAR(10) UNIQUE PRIMARY KEY);