# Details zur Anwendung

## Filterung

Die Filterung funktioniert wie folgt:

1. Nur CSS angewählt: Nur die Mitarbeiter, welche CSS als Qualifikation besitzen, werden angezeigt.
2. CSS und Java angewählt: Nur die Mitarbeiter, welche CSS *und* Java als Qualifikation besitzen, werden angezeigt.

## Hosting

Es ist nicht erforderlich, den Backend-Service lokal zu hosten, da er bereits auf einem VPS unter https://api.employee.budidev.de mit dem Keycloak-Access-Token erreichbar ist.
Das Frontend wird ebenfalls auf AWS gehostet, wobei der main-Branch im Git als Produktionszweig dient. Aktuell ist es unter https://main.d1kzuqaq9p5p7d.amplifyapp.com erreichbar.

## Login

Um unerwünschten Zugriff zu verhindern, wurde eine Login-Seite hinzugefügt, die den Keycloak-Benutzernamen und das Passwort verwendet:

Benutzername: user
Passwort: test
