This is the command I ran to get a mysql server up and running.
The volume is one that was created when I did the docker/getting-started tutorial.
docker run --name=dave -v todo-mysql-data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=todos -dp 3306:3306 mysql:5.7

For the docker-compose version, it created a new volume and I just had to create the table and put some entries in it.
I then learned that I could specify the external volume by name and it uses the one created in the getting-started tutorial