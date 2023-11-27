# Epayment
For window:
1. Use wsl to create mutiple instance (virtual machine)
2. Start server in each instance by using "npm install" and "node client.js"
    -> allow everyone to be a web server and communicate via http

For mac:
1. Create mutiple instance using vmware or whatever (virtual machine)
2. Start server using same command as above


### Epayment-gui (Frontend)
Enter the following command at root directory of project `.\Epayment`

```
cd epayment-gui
```
```
npm install --global yarn
```
```
yarn install
```
```
yarn start
```

### MongoDB (Storage)
Go to this link to download MongoDB
```
https://www.mongodb.com/try/download/community
```

Excecute and select all default value to install
Install MongoSBCompass too, can help you easier to manage DB

Open MongoDBCompass, use the following db connection URL
```
mongodb://localhost:27017
```

### Redis (Storage - Memory)
Install Windows Subsystem for Linux (WSL)

Open Terminal, enter following command:
```
wsl --install
```

After installing Ubuntu, type following command to enter Linux:
```
wsl
```

Install redis in Linux:
```
sudo apt-get install redis
```

Open redis client:
```
redis-cli
```

Open redis server:
```
redis-server
```

Can checkout for more info in:
```
[[https://www.mongodb.com/try/download/community](https://learn.microsoft.com/en-us/windows/wsl/install)](https://learn.microsoft.com/en-us/windows/wsl/install)
```



