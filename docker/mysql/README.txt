This is the command I ran to get a mysql server up and running.
The volume is one that was created when I did the docker/getting-started tutorial.
docker run --name=dave -v todo-mysql-data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=todos -dp 3306:3306 mysql:5.7

For the docker-compose version, it created a new volume and I just had to create the table and put some entries in it.
I then learned that I could specify the external volume by name and it uses the one created in the getting-started tutorial

After I upgraded to Ubuntu 20.04, MySQL got upgraded from 5.7 to 8.0 so I changed that in the docker-compose.yml

Because the authentication protocols are different in 8.0 and the node mysql package isn't compatible,
I had to add "command: --default-authentication-plugin=mysql_native_password" to docker-compose.yml also.

I got the information to do that from:
https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
After I did that, it worked like a charm
