# MasterQuizz
## Présentation : 
Bonjour, voici le projet MasterQuizz un site vous venez pour tester votre culture général.

---
## Installation pour CentOS7 : 
### Prérequis : 

- Base de donnée
```
Avoir une base de donnée mongoDB, sur mongodb.com
avoir un utilisateur admin sur cette base de donnée et un accés total du network.
Garder les identifiants pour plus tard.
```

- SelLinux
```
sudo setenforce 0
change to permissive in /etc/selinux/config
```

- Mettre à jour le tout : 
```
sudo yum install epel-release
sudo yum update
```

- Installer les prérequis : 
```
sudo yum install nginx -y
sudo yum install npm -y
sudo yum install curl -y
sudo yum install ufw -y
sudo yum install java -y
sudo yum install wget -y
sudo yum install jenkins -y 
```

- Installation de NodeJs :
```
curl -sL https://rpm.nodesource.com/setup_12.x | sudo bash -
sudo yum clean all && sudo yum makecache fast
sudo yum install -y gcc-c++ make
sudo yum install -y nodejs
```

---
### Configurer nginx : 
- Se rendre dans le dossier de nginx :
```
cd /etc/nginx/
```
- Création des certificats ssl permettant la mise en place du https : 
```
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/pki/tls/private/cert.key -out /etc/pki/tls/certs/cert.crt
```
- Modifier la configuration du serveur nginx : 
```
sudo vi nginx.conf
```
- Ouvrir le fichier de configuration avec votre éditeur préférée et y coller le code suivant : 
```
events {
    worker_connections  1024;
}

http {
    server_tokens off;

    upstream express_server {
        server 127.0.0.1:3003;
    }

    upstream monitoring {
        server 127.0.0.1:19999;
        keepalive 64;
    }

    server {
        listen 80 default_server;
        listen [::]:80 default_server;
        server_name www.masterquizz.com masterquizz.com;

        location /stub_status {
            stub_status;
            allow 127.0.0.1;
            deny all;
        }

        return 301 https://$host$request_uri;
     }

    server {
        listen      443 ssl;
        listen [::]:443 ssl;

        server_name www.masterquizz.fr masterquizz.fr;

        ssl_certificate     /etc/pki/tls/certs/cert.crt;
        ssl_certificate_key /etc/pki/tls/private/cert.key;

        location / {
            proxy_pass http://express_server/;
        }

        location /netdata/ {
            proxy_pass http://monitoring/;
        }
    }
}
```
- Tester la configuration du fichier : 
```
sudo nginx -t
```
- Si la commande est réussi passer à la suite, démarrer nginx :
```
sudo systemctl enable nginx
sudo systemctl start nginx
```

---
### Installer et configurer netdata : 
```
bash <(curl -Ss https://my-netdata.io/kickstart.sh) --stable-channel
cd /etc/netdata
```
- Créer et éditer le fichier python.d/nginx.conf avec vi, vim ou nano (au choix)
```
sudo vi python.d/nginx.conf
```
- Puis entrer :
```
localhost:
    name : 'local'
    url  : 'http://localhost/stub_status'
```
- Configurer l'ip de netdata afin de pouvoir y accéder sur notre réseau avec d'autres machines : 
```
sudo vi netdata.conf

```
- Rechercher la partie [web] et remplacer # bind to =  * par : 
```
bind to = 127.0.0.1
```
- Redémarrer Netdata
```
sudo systemctl enable netdata
sudo systemctl start netdata
```

---
### Configuration du pare-feu : 
- Enable le pare-feu :
```
sudo ufw enable
```
- Autoriser les ports 80 et 443 et 8080 : 
```
sudo ufw allow http
sudo ufw allow https
sudo ufw allow 8080
```
- Bloquer les ports 3003, 19999 pour éviter que les utilisateurs sur le réseau puisse utiliser nos applications sans passer par le reverse proxy : 
```
sudo ufw deny 3003
sudo ufw deny 19999
```
- Activer les règles de pare-feu au démarrage :
```
sudo ufw enable
```

### Configurer Jenkins : 

```
download jenkins from the Red Hat repo :
sudo wget -O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins-ci.org/redhat/jenkins.repo

Import the verification key using RPM
sudo rpm --import https://jenkins-ci.org/redhat/jenkins-ci.org.key

start jenkins as a service
sudo systemctl start jenkins.service

Enable jenkins
sudo systemctl enable jenkins

Go to your browser : 
https://your_ip_or_domain:8080

Get your access key :
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

## Getting start with Jenkins

Select "Install suggested plugins".

Create admin user.

Set instance.

Set reverse proxy.

## Setup jenkins

### Install NodeJS plugin :

```
Manage Jenkins > Plugin Manager > Install NodeJS plugin
```

### Config
Créer un nouveau projet de type pipeline.
Dans le pipeline copier ce code :
```
pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Clean project') {
            steps {
                cleanWs()
            }
        }
        stage('Cloning Git') {
            steps {
                sh 'git clone https://github.com/Nimeryon/MasterQuizz'
            }
        }
        stage('Instal dependencies') {
            steps {
                dir('MasterQuizz/') {
                    sh 'npm install'
                }
            }
        }
        stage('Build') {
            steps {
                dir('MasterQuizz/') {
                    sh 'npm run build'
                }
            }
        }
        stage('Run') {
            steps {
                dir('MasterQuizz/') {
                    sh 'npm run start'
                }
            }
        }
    }
}
```
Sauvegarder
Dans les paramètres définir les variables d'envrionement à :
- MongoUser : Nom d'utilisateur mongoDB
- MongoPassword : Mot de passe utilisateur mongoDB
- MongoDb : Nom de la base de donnée.

Lancer le build.