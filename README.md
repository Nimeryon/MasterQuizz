# MasterQuizz
## Présentation : 
Bonjour, voici le projet MasterQuizz un site vous venez pour tester votre culture général. (WIP)
Disponible sur https://masterquizz.fr/

---
## Installation pour CentOS7 : 
### Prérequis : 

- Mettre à jour le tout : 
```
sudo yum install epel-release
sudo yum update
```

- Installer les prérequis : 
```
sudo yum install nginx -y
sudo yum install nodejs -y
sudo yum install npm -y
sudo yum install curl -y
sudo yum install ufw -y
```

---
### Configurer nginx : 
- Se rendre dans le dossier de nginx :
```
cd /etc/nginx/
```
- Supprimer la configuration par défault : 
```
sudo rm sites-available/default
sudo rm sites-enabled/default
```
- Création des certificats ssl permettant la mise en place du https : 
```
sudo cd /etc/pki/tls
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/pki/tls/private/cert.key -out /etc/pki/tls/certs/cert.crt
```
- Créer la configuration du serveur nginx : 
```
sudo touch sites-available/masterquizz.conf
```
- Ouvrir le fichier de configuration avec votre éditeur préférée et y coller le code suivant en remplaçant les cases [IP local] par votre ip local, fonctionne aussi avec localhost : 
```
upstream express_server {
    server [IP local]:3003;
}

upstream monitoring {
    server [IP local]:19999;
}

server {
    listen      80;
    listen [::]:80;

    server_name www.masterquizz.com masterquizz.com;

    location /stub_status {
        stub_status;
        allow 127.0.0.1;
        deny all;
    }
}

server {
    listen      443 ssl;
    listen [::]:443 ssl;

    server_name www.masterquizz.fr masterquizz.fr;

    ssl_certificate     /etc/pki/tls/certs/cert.crt;
    ssl_certificate_key /etc/pki/tls/private/cert.key;

    location / {
        proxy_pass http://express_server;
    }

    location /monitoring {
        proxy_pass http://monitoring/;
    }
}
```
- Créer un lien symbolique de la configuration dans sites-enabled : 
```
sudo ln sites-available/masterquizz.conf sites-enabled/
```
- Tester la configuration du fichier : 
```
sudo nginx -t
```
- Si la commande est réussi passer à la suite, redémarrer nginx :
```
sudo systemctl restart nginx
```

---
### Installer et configurer netdata : 
```
bash <(curl -Ss https://my-netdata.io/kickstart.sh) --stable-channel
cd /etc/netdata
```
- Créer et éditer le fichier python.d/nginx.conf avec vi, vim ou nano (au choix ^^)
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
bind to = 127.0.0.1,[IP local]
```
- Redémarrer Netdata
```
sudo systemctl restart netdata
```

---
### Configuration du pare-feu : 
- Autoriser les ports 80 et 443 : 
```
sudo ufw allow http
sudo ufw allow https
```
- Bloquer les ports 3003, 19999 et 27017 pour éviter que les utilisateurs sur le réseau puisse utiliser nos applications sans passer par le reverse proxy : 
```
sudo ufw deny 3003
sudo ufw deny 19999
sudo ufw deny 27017
```
- Activer les règles de pare-feu au démarrage :
```
sudo ufw enable
```