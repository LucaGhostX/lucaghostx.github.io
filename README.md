# lucaghostx.github.io

Sito web statico e aggregatore di collegamenti (Linktree) per i canali ufficiali di **LucaGhostX**, ospitato su **GitHub Pages**.

Il progetto è stato sviluppato interamente tramite **vibe coding** (programmazione assistita da intelligenza artificiale con affinamento iterativo di logica, conformità normativa ed estetica).

---

## 1. Descrizione del Progetto

Il repository contiene una pagina vetrina statica finalizzata a raccogliere e presentare in modo ordinato i collegamenti ai profili social, streaming e community di LucaGhostX (YouTube, Twitch, Discord, Instagram, TikTok).

L'obiettivo principale della codebase è offrire una pagina leggera, indipendente da piattaforme commerciali terze (come Linktree o HeyLink) e progettata secondo rigorosi standard di riservatezza e conformità normativa europea.

---

## 2. Architettura Tecnica e Funzionamento

Il sito adotta un'architettura **Client-Side Only** (nessun backend, nessun server applicativo, nessun database).

### Flusso di navigazione e Routing
- **Radice (`/`)**: Il file [`index.html`](./index.html) nella root ha il solo scopo di gestire un reindirizzamento immediato lato client verso il percorso [`/link/`](./link/) (tramite `window.location.replace` e tag `meta refresh`). In questo modo, l'indirizzo base `lucaghostx.github.io` rimane isolato e pronto per ospitare una futura home page o portfolio personale senza interferire con i link.
- **Percorso Link (`/link/`)**: Contiene l'applicazione autonoma con l'interfaccia utente, i pulsanti e la logica di visualizzazione.

### Separazione Dati e Presentazione (Zero Hardcoding)
Per evitare modifiche dirette al markup HTML:
1. **Nessun dato cablato in [`link/index.html`](./link/index.html)**: Il file HTML include unicamente lo scheletro semantico.
2. **Configurazione centralizzata in [`link/config.json`](./link/config.json)**: Contiene l'intero dataset del sito (profilo, avatar, lista dei link attivi, canali social nel footer, variabili di stile e tutti i testi dell'informativa legale).
3. **Rendering dinamico via [`link/app.js`](./link/app.js)**: Al caricamento della pagina (`DOMContentLoaded`), il motore JavaScript esegue una richiesta `fetch` locale al file `config.json` e genera dinamicamente gli elementi del DOM, applicando icone SVG inline e gestendo le interazioni.
4. **Tecnologie impiegate**: Esclusivamente HTML5 semantico, Vanilla CSS e Vanilla JavaScript nativo (nessun framework o runtime esterno).

---

## 3. Inquadramento Legale e Conformità Normativa

Il sito è stato progettato applicando il principio di **Privacy by Design e by Default** (Art. 25 del Regolamento UE 2016/679 - GDPR) e le disposizioni della **Direttiva 2002/58/CE (ePrivacy)**, recepita in Italia dall'Art. 122 del D.Lgs. 196/2003 (Codice Privacy).

### A. Esenzione dal Cookie Banner
Ai sensi delle *Linee Guida del Garante Privacy del 10 giugno 2021* e delle *Linee Guida EDPB 05/2020*, l'obbligo di mostrare un banner di acquisizione del consenso (CMP) sussiste unicamente nel caso in cui vengano archiviati o letti identificatori (cookie, fingerprinting o storage) sul terminale dell'utente per finalità diverse da quelle strettamente tecniche.
- **Assenza di Cookie**: La pagina non genera, non memorizza e non legge alcun cookie (`document.cookie` non è mai utilizzato).
- **Assenza di Web Storage**: Non viene impiegato né `localStorage`, né `sessionStorage`, né `IndexedDB`.
- **Conseguenza giuridica**: Non essendovi alcun accesso al dispositivo dell'utente, **non è legalmente necessario né richiesto alcun banner di consenso**.

### B. Assenza di Trattamento di Dati Personali
- **Zero Log e Telemetria**: Non sono presenti strumenti di tracciamento del traffico, web analytics (es. Google Analytics) o pixel pubblicitari (Meta Pixel, TikTok Pixel).
- **Zero Profilazione**: Nessuna correlazione di sessioni, monitoraggio del comportamento o fingerprinting del browser/hardware.
- **Hosting su GitHub Pages**: La gestione della connessione HTTPS e dei log di rete tecnici a livello infrastrutturale è operata direttamente da GitHub Inc. secondo i propri termini di servizio, senza alcun accesso ai log da parte del gestore di questo repository.

### C. Risorse Self-Hosted e Tutela dell'Indirizzo IP
- **Nessuna CDN esterna**: Non vengono utilizzate CDN pubbliche (`cdnjs`, `unpkg`, ecc.) che riceverebbero l'indirizzo IP del visitatore durante il download di librerie.
- **Nessun Google Fonts**: Non vengono effettuate chiamate verso `fonts.googleapis.com` o server terzi, in conformità con la giurisprudenza europea (es. sentenza LG München 3 O 17493/20). La visualizzazione del testo sfrutta il *System Font Stack* nativo del sistema operativo dell'utente.
- **Icone e Immagini Locali**: Tutte le icone social sono file SVG locali residenti in [`link/assets/icons/socials/`](./link/assets/icons/socials/); l'avatar e le icone dei pulsanti sono file WebP residenti nella cartella [`link/assets/icons/links/`](./link/assets/icons/links/). Zero richieste a server esterni.

### D. Reindirizzamento e Piattaforme Esterne
I pulsanti presenti nella pagina sono normali elementi di ancoraggio HTML (`<a>`) con attributo `rel="noopener noreferrer"`. Cliccando su un link, l'utente abbandona questo sito per navigare verso piattaforme terze (YouTube, Twitch, Discord, Instagram, TikTok), le quali applicano le proprie e autonome informative sulla privacy e policy sui cookie.

### E. Trasparenza verso l'Utente (Art. 13 GDPR)
A fondo pagina è presente il badge interattivo `Zero Cookie • 100% GDPR Compliant`. Cliccandovi sopra, si apre una modale esplicativa (con testi gestiti interamente in `config.json`) che informa chiaramente l'utente circa il funzionamento privo di tracciamento del sito.

---

## 4. Struttura del Repository

```text
lucaghostx.github.io/
├── index.html                       # Redirect forzato e istantaneo della root verso /link/
├── README.md                        # Documentazione tecnica e legale del progetto
├── LICENSE                          # Licenza del repository (Doppia licenza: MIT + Proprietary)
└── link/                            # Modulo autonomo contenente la pagina dei collegamenti
    ├── index.html                   # Struttura HTML semantica priva di contenuti hardcodati
    ├── style.css                    # Fogli di stile, responsive layout e animazioni
    ├── app.js                       # Logica applicativa: parser JSON, rendering e modale
    ├── config.json                  # File di configurazione sorgente dei dati e dei testi
    └── assets/                      # Risorse grafiche locali
        ├── avatar.webp              # Immagine profilo di LucaGhostX (Tutti i diritti riservati)
        └── icons/                   # Icone grafiche locali
            ├── links/               # Icone per i pulsanti dei link (formato WebP)
            └── socials/             # Icone SVG vettoriali per i profili social (personalizzabili)
```

---

## 5. Manutenzione e Aggiornamento dei Contenuti

Tutte le modifiche relative ai link o alle impostazioni vanno effettuate esclusivamente all'interno di **[`link/config.json`](./link/config.json)**.

### Aggiunta o modifica di un link
Ogni collegamento è rappresentato da un oggetto nell'array `"links"`:
```json
{
  "id": "youtube",
  "title": "YouTube",
  "url": "https://www.youtube.com/@LucaGhostX",
  "icon": "assets/icons/links/youtube.webp",
  "active": true
}
```
- `"active"`: Se impostato su `false`, esclude il pulsante dal rendering senza dover cancellare la configurazione.

### Canali social nel footer
Gestiti nell'array `"socials"`. Le icone SVG possono essere scelte o aggiunte a piacere nella cartella `link/assets/icons/socials/`:
```json
{
  "platform": "youtube",
  "url": "https://youtube.com/@LucaGhostX",
  "title": "YouTube",
  "icon": "assets/icons/socials/youtube.svg",
  "active": true
}
```
Se la proprietà `"icon"` non viene specificata, il sistema carica automaticamente `assets/icons/socials/<platform>.svg`.

### Personalizzazione dei colori e dei social
Tutte le icone SVG in `socials/` utilizzano `fill="currentColor"`. Per cambiare il colore delle icone social o dell'effetto hover non serve modificare i file SVG: basta impostare `"socialColor"` e `"socialHoverColor"` all'interno dell'oggetto `"theme"` in `config.json`.

---

## 6. Distribuzione su GitHub Pages

Il repository è configurato per la pubblicazione tramite **GitHub Pages** con sorgente dal branch `main` e cartella radice `/`:
- **URL Root**: `https://lucaghostx.github.io/` (reindirizza a `/link/`)
- **URL Pagina Link**: `https://lucaghostx.github.io/link/`

---

## 7. Licenza e Condizioni d'Uso (Doppia Licenza)

Il progetto è distribuito secondo un modello di **Doppia Licenza** per distinguere tra l'infrastruttura tecnica e l'identità personale del creator (si veda il file completo [`LICENSE`](./LICENSE)):

### A. Codice Sorgente (Licenza MIT)
L'intera codebase tecnica — inclusi i file HTML, CSS, JavaScript ([`link/app.js`](./link/app.js)), la struttura di configurazione [`link/config.json`](./link/config.json) e l'architettura di rendering — è rilasciata sotto licenza open source **[MIT](./LICENSE)**. Chiunque è libero di studiare, copiare, modificare, integrare o utilizzare questo codice per i propri progetti o linktree personali.

### B. Identità Personale, Brand e Avatar (Tutti i Diritti Riservati - All Rights Reserved)
I seguenti elementi sono **espressamente esclusi** dalla licenza MIT e restano di esclusiva proprietà intellettuale di **LucaGhostX**:
1. **L'immagine del profilo / avatar** ([`link/assets/avatar.webp`](./link/assets/avatar.webp)) e qualsiasi grafica/fotografia raffigurante LucaGhostX.
2. **Il nome d'arte, nickname e brand "LucaGhostX"**.
3. **I testi biografici e descrittivi personali**.

> [!IMPORTANT]
> **Condizione di Fork e Riuso**: Chiunque decida di clonare o effettuare un *fork* di questo repository per pubblicare una propria pagina web **DEVE OBBLIGATORIAMENTE sostituire l'immagine `avatar.webp`, il nome "LucaGhostX" e i collegamenti social con la propria identità** prima della messa online. È vietato qualsiasi uso non autorizzato dell'avatar o del nome a scopo di impersonificazione, plagio o riuso promozionale.

### C. Marchi di Terze Parti
Tutti i marchi, i nomi commerciali e i loghi terzi citati o presenti nelle icone (YouTube, Twitch, Discord, Instagram, TikTok, GitHub, X, Threads, Spotify, Reddit, Telegram) appartengono ai rispettivi proprietari e sono utilizzati esclusivamente con finalità identificative e di collegamento ipertestuale (*fair use / uso leale nominativo*).
