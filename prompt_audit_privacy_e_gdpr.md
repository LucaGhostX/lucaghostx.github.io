**Ruolo:** Agisci come un Senior Privacy & Security Engineer specializzato in conformità tecnica GDPR e Direttiva ePrivacy.

**Obiettivo:** Analizza l'intera codebase di questa repository per identificare qualsiasi trasferimento di dati non autorizzato, caricamento di risorse di terze parti o salvataggio di informazioni sul dispositivo dell'utente che avviene **prima** dell'esplicita accettazione tramite il banner dei cookie (Consent Management Platform - CMP).

Esegui una scansione approfondita verificando i seguenti punti:

### 1. Font e Risorse Esterne (CDN)
* **Google Fonts e altri provider:** Controlla nei file HTML, CSS/SCSS, file di configurazione (es. `next.config.js`, `nuxt.config.ts`, `angular.json`) o import JS se vengono effettuate chiamate verso `fonts.googleapis.com`, `fonts.gstatic.com`, Adobe Fonts (`use.typekit.net`) o simili.
* **CDN di terze parti:** Verifica se librerie JS, CSS o icone (es. FontAwesome, Bootstrap, jQuery) vengono caricate da CDN esterne (`cdnjs`, `jsdelivr`, `unpkg`, `cloudflare`) invece di essere ospitate localmente (self-hosted), causando la condivisione automatica dell'indirizzo IP dell'utente con terze parti al caricamento della pagina.

### 2. Cookie e Web Storage (Prima del Consenso)
* **Registrazione preventiva:** Cerca tutti gli utilizzi di `document.cookie`, librerie di gestione cookie (es. `js-cookie`, `universal-cookie`) e impostazioni di header `Set-Cookie` lato server.
* **LocalStorage, SessionStorage e IndexedDB:** Ai sensi della normativa ePrivacy, anche il Web Storage è equiparato ai cookie. Controlla se il sito scrive dati non strettamente tecnici in `localStorage`, `sessionStorage` o `indexedDB` al primo avvio (prima dell'interazione con il banner).
* **Distinzione Tecnici vs. Profilazione/Analitici:** Verifica se esiste una logica di blocco preventivo che impedisca la scrittura di cookie/storage non essenziali finché l'utente non esprime il consenso.

### 3. Script di Tracciamento, Analytics e Pixel
* **Attivazione senza consenso:** Individua l'eventuale presenza di Google Analytics (`gtag`, `ga`), Google Tag Manager (`gtm.js`), Meta Pixel (`fbq`), Hotjar, Microsoft Clarity, TikTok Pixel, LinkedIn Insight Tag o strumenti simili.
* **Google Consent Mode v2:** Se vengono usati strumenti Google, verifica se è implementata correttamente la Consent Mode con tutti i parametri impostati su `denied` di default prima della scelta dell'utente.

### 4. Condivisione Dati, Chiamate di Rete e Telemetria
* **Chiamate automatiche al caricamento:** Analizza le chiamate `fetch`, `axios`, `XMLHttpRequest`, `navigator.sendBeacon` o WebSockets eseguite al montaggio dei componenti (es. dentro `useEffect`, `onMounted`, `DOMContentLoaded`, `window.onload`) che inviano dati dell'utente, eventi di telemetria o log a servizi esterni prima del consenso.
* **Error Tracking e Replay Sessioni:** Controlla se servizi come Sentry, LogRocket, Datadog o FullStory vengono inizializzati immediatamente al caricamento dell'app, raccogliendo IP, dati di navigazione o input dell'utente senza mascheramento o senza consenso.
* **Fingerprinting:** Verifica la presenza di script che raccolgono informazioni sul dispositivo (Canvas fingerprinting, AudioContext, informazioni dettagliate su GPU/risoluzione/font) per identificare l'utente senza cookie.

### 5. Embed e Contenuti di Terze Parti
* **Iframe e Widget:** Cerca l'uso di `<iframe>` o script per YouTube (verifica anche se viene usato `youtube-nocookie.com` o quello standard), Vimeo, Google Maps, Google reCAPTCHA, widget social (Instagram, X/Twitter, Facebook) o mappe interattive.
* **Blocco preventivo (Placeholder):** Controlla se questi elementi vengono caricati subito al rendering della pagina o se sono bloccati da un meccanismo "click-to-load" / vincolati al consenso dei cookie di marketing/preferenze.

### 6. Moduli di Contatto e Raccolta Dati (Form)
* **Consenso esplicito nei form:** Individua tutti i form (contatti, newsletter, registrazione, checkout) e verifica se i dati inseriti vengono inviati a CRM esterni (es. HubSpot, Mailchimp, ActiveCampaign) e se sono presenti le relative checkbox di presa visione della Privacy Policy (non pre-spuntate per il marketing).

---

### Formato dell'Output Richiesto
Fornisci un report dettagliato suddiviso per **Livello di Gravità (Critico, Medio, Basso)**. Per ogni problema riscontrato indica:
1. **Categoria** del problema (es. Google Fonts, Cookie preventivi, Analytics).
2. **Percorso del file e numero di riga** esatto (`filepath:line`).
3. **Snippet del codice** incriminato.
4. **Spiegazione del rischio** lato privacy/GDPR.
5. **Soluzione tecnica (Remediation):** mostra come modificare il codice per renderlo conforme (es. come scaricare i font in locale o come avvolgere lo script nel controllo del consenso).