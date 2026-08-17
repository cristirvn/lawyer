# Cabinet de Avocat Lixandru Elena — site

Site static, fără build step și fără dependențe. HTML + CSS + un fișier JS.

## Structură

```
index.html          Acasă
despre.html         Despre Noi
servicii.html       Cum Te Pot Ajuta (domenii de expertiză)
abordare.html       Abordarea Mea
contact.html        Contact + formular
multumim.html       Confirmare după trimiterea formularului
legal/              GDPR, Termeni și Condiții, Cookie-uri
css/style.css       Toate stilurile
js/main.js          Meniu mobil, carusel recenzii, reveal la scroll
img/                Ilustrație hero + favicon
deploy/nginx.conf   Configurație nginx pentru VPS
vercel.json         Configurație Vercel (ignorat în afara Vercel)
```

## Dezvoltare locală

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Mutare pe VPS

```bash
# pe VPS
sudo mkdir -p /var/www/avocatlixandruelena
sudo chown -R $USER:$USER /var/www/avocatlixandruelena
git clone https://github.com/cristirvn/lawyer.git /var/www/avocatlixandruelena

sudo cp /var/www/avocatlixandruelena/deploy/nginx.conf \
        /etc/nginx/sites-available/avocatlixandruelena
sudo ln -s /etc/nginx/sites-available/avocatlixandruelena /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# HTTPS după ce DNS-ul pointează spre VPS
sudo certbot --nginx -d avocatlixandruelena.ro -d www.avocatlixandruelena.ro
```

Actualizări ulterioare: `cd /var/www/avocatlixandruelena && git pull`.

## De schimbat la lansare

În `contact.html`:

- `_next` → `https://avocatlixandruelena.ro/multumim.html`
  (acum pointează spre URL-ul de demo Vercel)

În `deploy/nginx.conf`:

- decomentează linia `Strict-Transport-Security` **după** ce HTTPS funcționează

## Formular de contact

Trimiterile merg prin [FormSubmit](https://formsubmit.co) către
`av.lixandruelena@gmail.com`. Nu există backend și nu se stochează date pe server.

**Activare (o singură dată per adresă):** la prima trimitere, FormSubmit trimite
un e-mail „Activate Form" la adresa destinație. Până când link-ul e apăsat,
mesajele nu se livrează. Verifică și folderul Spam.

Captcha este dezactivat (`_captcha: false`); protecția anti-spam se face prin
câmpul honeypot `_honey`.

## Recenzii

Recenziile de pe pagina principală sunt preluate manual de pe profilul Google
al cabinetului (4,9/5 din 54 de recenzii). Nu se actualizează automat — pentru
recenzii noi, editează secțiunea „Ce spun clienții noștri" din `index.html`.
