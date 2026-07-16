// ═══════════════════════════════════════════════════════════════
//  Maths avec M. Caloy — logique du site
//  (rien à modifier ici pour mettre à jour le contenu : voir config.js)
// ═══════════════════════════════════════════════════════════════

// ---- Classe sélectionnée (mémorisée dans le navigateur) ----
function getClasse() {
    const c = localStorage.getItem('mc-classe');
    return CONFIG.classes[c] ? c : null;
}

function setClasse(code) {
    localStorage.setItem('mc-classe', code);
    document.getElementById('choose-overlay').classList.add('hidden');
    render();
}

// ---- XP de la classe ----
// L'XP est le score COLLECTIF de la classe, stocké sur le serveur
// (defis.php) : chaque défi ne rapporte des points qu'une fois par
// classe, au premier élève qui trouve. Le navigateur garde une copie
// des totaux pour l'affichage hors ligne.
let TOTAUX = {};   // XP par classe (source : serveur)
let MARQUES = {};  // défis déjà marqués, par classe (source : serveur)

function getXP() {
    return TOTAUX[getClasse()] || 0;
}

function popXP(montant) {
    const zone = document.getElementById('xp-pop-zone');
    zone.innerHTML = '<span class="xp-pop">+' + montant + ' XP ✨</span>';
    setTimeout(function() { zone.innerHTML = ''; }, 1500);
}

function niveauPour(xp) {
    let courant = CONFIG.niveauxXP[0];
    let suivant = null;
    for (const n of CONFIG.niveauxXP) {
        if (xp >= n.min) courant = n;
        else { suivant = n; break; }
    }
    return { courant: courant, suivant: suivant };
}

function renderXP() {
    const xp = getXP();
    const lv = niveauPour(xp);
    document.getElementById('xp-level').textContent = lv.courant.nom;
    document.getElementById('xp-value').textContent = xp;
    const fill = document.getElementById('xp-fill');
    if (lv.suivant) {
        const pct = Math.round(((xp - lv.courant.min) / (lv.suivant.min - lv.courant.min)) * 100);
        fill.style.width = Math.max(4, pct) + '%';
    } else {
        fill.style.width = '100%';
    }
}

async function chargerTotaux() {
    try { TOTAUX = JSON.parse(localStorage.getItem('mc-totaux')) || {}; } catch (e) {}
    renderXP();
    try {
        const rep = await fetch('defis.php');
        const data = await rep.json();
        TOTAUX = data.totaux || {};
        MARQUES = data.marques || {};
        localStorage.setItem('mc-totaux', JSON.stringify(TOTAUX));
        renderXP();
        const code = getClasse();
        if (code) renderDefis(CONFIG.classes[code]);
    } catch (e) { /* pas de PHP en local : on garde la copie locale */ }
}

// ---- Série de jours (petite fierté personnelle, sans XP) ----
function updateStreak() {
    const today = new Date();
    const todayKey = today.toDateString();
    const yesterdayKey = new Date(today.getTime() - 86400000).toDateString();
    let data = { last: '', count: 0 };
    try { data = JSON.parse(localStorage.getItem('mc-streak')) || data; } catch (e) {}

    if (data.last !== todayKey) {
        data.count = (data.last === yesterdayKey) ? data.count + 1 : 1;
        data.last = todayKey;
        localStorage.setItem('mc-streak', JSON.stringify(data));
    }
    const s = data.count;
    document.getElementById('streak').textContent = '🔥 ' + s + ' jour' + (s > 1 ? 's' : '');
}

// ---- Sections de la page ----
function renderNow(classe) {
    const banner = document.getElementById('now-banner');
    if (classe.enCeMoment) {
        banner.innerHTML = '📍 En ce moment en classe : <strong>' + classe.enCeMoment + '</strong>';
        banner.classList.remove('hidden');
    } else {
        banner.classList.add('hidden');
    }
}

function renderChapitres(classe) {
    const carte = document.getElementById('chapitres-card');
    const zone = document.getElementById('chapitres');
    const termines = classe.chapitresTermines || [];
    if (termines.length === 0 && !classe.enCeMoment) {
        carte.classList.add('hidden');
        return;
    }
    carte.classList.remove('hidden');

    let html = termines.map(function(titre, i) {
        return '<div class="chapitre done">' +
            '<div class="chapitre-badge">✓</div>' +
            '<div class="chapitre-titre">' + titre + '</div>' +
        '</div>';
    }).join('');

    if (classe.enCeMoment) {
        html += '<div class="chapitre current">' +
            '<div class="chapitre-badge">📍</div>' +
            '<div class="chapitre-titre">' + classe.enCeMoment +
                ' <span class="chapitre-tag">en cours</span></div>' +
        '</div>';
    }

    html += '<div class="chapitre next">' +
        '<div class="chapitre-badge">?</div>' +
        '<div class="chapitre-titre">La suite… mystère ! 👀</div>' +
    '</div>';

    zone.innerHTML = html;
}

function renderAnnonces(classe) {
    const zone = document.getElementById('annonces');
    if (!classe.annonces || classe.annonces.length === 0) {
        zone.innerHTML = '<p class="empty-msg">Rien de nouveau pour le moment. 😄</p>';
        return;
    }
    zone.innerHTML = classe.annonces.map(function(a) {
        return '<div class="annonce"><span class="date">' + a.date + '</span><br>' + a.texte + '</div>';
    }).join('');
}

function renderDevoirs(classe) {
    const zone = document.getElementById('devoirs');
    if (!classe.devoirs || classe.devoirs.length === 0) {
        zone.innerHTML = '<p class="empty-msg">Aucun devoir noté ici pour le moment… mais vérifie quand même ton agenda ! 😉</p>';
        return;
    }
    zone.innerHTML = classe.devoirs.map(function(d) {
        return '<div class="devoir"><span class="pour">📅 ' + d.pour + '</span><span>' + d.texte + '</span></div>';
    }).join('');
}

function renderCountdown(classe) {
    const zone = document.getElementById('countdown');
    const ev = classe.prochaineEval;
    if (!ev || !ev.date) {
        zone.innerHTML = '<div class="chill">Pas d\'éval prévue pour le moment 😎<br><span style="color: var(--text-dim); font-size: 0.85em;">Profites-en pour prendre de l\'avance !</span></div>';
        return;
    }
    const cible = new Date(ev.date + 'T08:00:00');
    const diff = cible - new Date();
    if (diff <= 0) {
        zone.innerHTML = '<div class="chill">Éval passée — bravo, c\'est derrière toi ! ✅</div>';
        return;
    }
    const jours = Math.floor(diff / 86400000);
    const heures = Math.floor((diff % 86400000) / 3600000);
    const compte = jours > 0 ? 'J−' + jours : 'H−' + heures;
    const dateTxt = cible.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
    zone.innerHTML =
        '<div class="big">' + compte + '</div>' +
        '<div class="what"><strong>' + (ev.titre || 'Évaluation') + '</strong><br>le ' + dateTxt + '</div>';
}

// ---- Feu tricolore du comportement ----
const FEU_ETATS = {
    vert:   { emoji: '😄', label: 'Feu vert — tout roule !' },
    orange: { emoji: '😬', label: 'Feu orange — on se ressaisit !' },
    rouge:  { emoji: '🚨', label: 'Feu rouge — stop, on se reprend.' }
};

function renderComportement(classe) {
    const carte = document.getElementById('comportement-card');
    const compo = classe.comportement;
    const couleur = compo && String(compo.couleur || '').toLowerCase();
    if (!FEU_ETATS[couleur]) {
        carte.classList.add('hidden');
        return;
    }
    carte.classList.remove('hidden');

    const etat = FEU_ETATS[couleur];
    document.getElementById('feu-zone').innerHTML =
        '<div class="feu-ligne">' +
            '<div class="feu ' + couleur + '">' +
                '<div class="feu-lampe rouge"></div>' +
                '<div class="feu-lampe orange"></div>' +
                '<div class="feu-lampe verte"></div>' +
            '</div>' +
            '<div class="feu-info">' +
                '<div class="feu-emoji">' + etat.emoji + '</div>' +
                '<div class="feu-label">' + etat.label + '</div>' +
            '</div>' +
        '</div>' +
        (compo.message ? '<p class="feu-msg">💬 ' + compo.message + '</p>' : '');
}

// ---- Défis du jour et de la semaine ----
// Les défis sont définis PAR NIVEAU (4e / 3e) dans CONFIG.defis, avec
// une date de début : le site choisit automatiquement le défi du jour
// et celui de la semaine en cours. Le premier élève de la classe qui
// trouve fait marquer les points à sa classe (une seule fois par défi).
//
// États possibles d'un défi (localStorage 'mc-defis') :
//   "reussi"        → validé après avoir vu l'indice
//   "reussi-bonus"  → validé sans indice (XP bonus)
//   "vu"            → réponse révélée, plus de points possibles
const DEFI_ESSAIS = {}; // compteur d'essais ratés (mémoire de session)

function etatsDefis() {
    try { return JSON.parse(localStorage.getItem('mc-defis')) || {}; } catch (e) { return {}; }
}

function etatDefi(id) {
    return etatsDefis()[id];
}

function setEtatDefi(id, etat) {
    const m = etatsDefis();
    m[id] = etat;
    localStorage.setItem('mc-defis', JSON.stringify(m));
}

function indicesVus() {
    try { return JSON.parse(localStorage.getItem('mc-indices')) || {}; } catch (e) { return {}; }
}

// Ignore majuscules, espaces et remplace la virgule par un point,
// pour accepter « 2 M », « 2m », « 1,5 »…
function normaliser(txt) {
    return String(txt).toLowerCase().replace(/,/g, '.').replace(/\s+/g, '');
}

function aujourdhuiISO() {
    const d = new Date();
    return d.getFullYear() + '-' +
        String(d.getMonth() + 1).padStart(2, '0') + '-' +
        String(d.getDate()).padStart(2, '0');
}

// Le défi affiché = celui dont la date de début est la plus récente
// parmi celles déjà passées (le vendredi reste affiché le week-end).
function defiActuel(liste) {
    if (!liste) return null;
    const ajd = aujourdhuiISO();
    let choisi = null;
    for (const d of liste) {
        if (d.debut && d.debut <= ajd && (!choisi || d.debut > choisi.debut)) choisi = d;
    }
    return choisi;
}

function defiDe(type, classe) {
    const groupe = CONFIG.defis && CONFIG.defis[classe.niveau];
    if (!groupe) return null;
    return defiActuel(type === 'jour' ? groupe.jour : groupe.semaine);
}

function defiId(type, niveau, defi) {
    return type + ':' + niveau + ':' + defi.debut;
}

function pointsDefi(type, sansIndice) {
    const base = type === 'jour' ? CONFIG.xp.defiJour : CONFIG.xp.defiSemaine;
    const bonus = type === 'jour' ? CONFIG.xp.defiJourSansIndice : CONFIG.xp.defiSemaineSansIndice;
    return base + (sansIndice ? (bonus || 0) : 0);
}

function renderDefis(classe) {
    renderDefiCarte('jour', classe);
    renderDefiCarte('semaine', classe);
}

function renderDefiCarte(type, classe) {
    const carte = document.getElementById('defi-' + type + '-card');
    const zone = document.getElementById('defi-' + type);
    const defi = defiDe(type, classe);

    if (!defi || !defi.question) {
        carte.classList.add('hidden');
        return;
    }
    carte.classList.remove('hidden');

    const base = type === 'jour' ? CONFIG.xp.defiJour : CONFIG.xp.defiSemaine;
    const bonus = type === 'jour' ? CONFIG.xp.defiJourSansIndice : CONFIG.xp.defiSemaineSansIndice;
    const tag = document.getElementById('defi-' + type + '-xp-tag');
    if (tag) tag.textContent = '+' + base + ' XP' + (bonus ? ' (+' + bonus + ' sans indice)' : '');

    const id = defiId(type, classe.niveau, defi);
    const etat = etatDefi(id);
    const marque = (MARQUES[getClasse()] || []).indexOf(id) !== -1;

    let html = '<div class="defi-question">' + defi.question + '</div>';

    if (etat === 'reussi' || etat === 'reussi-bonus') {
        html += '<div class="defi-reponse visible">' + (defi.reponse || '') + '</div>' +
            '<p class="defi-statut ok" id="defi-statut-' + type + '">✅ Défi validé' +
            (etat === 'reussi-bonus' ? ' sans indice — bravo ! 🌟' : ' !') + '</p>';
    } else if (etat === 'vu') {
        html += '<div class="defi-reponse visible">' + (defi.reponse || '') + '</div>' +
            '<p class="defi-statut">👀 Réponse révélée — pas de points cette fois. Le prochain défi est pour toi !</p>';
    } else {
        html += marque
            ? '<p class="defi-course">🏁 Ta classe a déjà marqué ces points — mais entraîne-toi quand même !</p>'
            : '<p class="defi-course">⚡ Personne n\'a encore marqué pour ta classe : sois le premier !</p>';
        html +=
            '<div class="defi-saisie">' +
                '<input type="text" id="defi-input-' + type + '" placeholder="Ta réponse…" autocomplete="off"' +
                    ' onkeydown="if (event.key === \'Enter\') validerDefi(\'' + type + '\')">' +
                '<button class="btn success" onclick="validerDefi(\'' + type + '\')">Valider</button>' +
            '</div>' +
            '<p class="defi-feedback" id="defi-feedback-' + type + '"></p>' +
            '<div class="defi-actions">' +
                '<button class="btn ghost" onclick="montrerIndice(\'' + type + '\')">💡 Indice</button>' +
                '<button class="btn ghost" id="defi-reveler-' + type + '" onclick="revelerReponse(\'' + type + '\')">👀 Voir la réponse</button>' +
            '</div>' +
            '<div class="defi-indice" id="defi-indice-' + type + '">💡 ' + (defi.indice || '') + '</div>';
    }

    zone.innerHTML = html;
    if (indicesVus()[id]) {
        const el = document.getElementById('defi-indice-' + type);
        if (el) el.classList.add('visible');
    }
}

function validerDefi(type) {
    const code = getClasse();
    const classe = CONFIG.classes[code];
    const defi = defiDe(type, classe);
    const input = document.getElementById('defi-input-' + type);
    const feedback = document.getElementById('defi-feedback-' + type);
    const essai = normaliser(input.value);

    if (!essai) {
        feedback.textContent = 'Écris ta réponse d\'abord ! ✍️';
        return;
    }

    const correct = (defi.bonnesReponses || []).some(function(r) { return normaliser(r) === essai; });
    const id = defiId(type, classe.niveau, defi);

    if (correct) {
        const sansIndice = !indicesVus()[id];
        setEtatDefi(id, sansIndice ? 'reussi-bonus' : 'reussi');
        renderDefiCarte(type, classe);
        marquerPourLaClasse(code, id, pointsDefi(type, sansIndice), type);
    } else {
        DEFI_ESSAIS[id] = (DEFI_ESSAIS[id] || 0) + 1;
        input.classList.remove('shake');
        void input.offsetWidth; // relance l'animation
        input.classList.add('shake');
        feedback.textContent = DEFI_ESSAIS[id] >= 2
            ? 'Toujours pas… Un petit coup d\'œil à l\'indice ? 💡'
            : 'Pas encore, essaie autre chose ! 🔍';
    }
}

// Envoie la réussite au serveur : points comptés seulement si personne
// de la classe n'avait déjà marqué ce défi.
async function marquerPourLaClasse(code, id, points, type) {
    const statut = document.getElementById('defi-statut-' + type);
    try {
        const rep = await fetch('defis.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ classe: code, defi: id, points: points })
        });
        const data = await rep.json();
        MARQUES[code] = MARQUES[code] || [];
        if (MARQUES[code].indexOf(id) === -1) MARQUES[code].push(id);
        if (data.deja) {
            if (statut) statut.textContent += ' Quelqu\'un de ta classe avait déjà marqué les points. 🏁';
        } else {
            TOTAUX[code] = data.total;
            localStorage.setItem('mc-totaux', JSON.stringify(TOTAUX));
            renderXP();
            popXP(data.points);
            if (statut) statut.textContent += ' Tu marques +' + data.points + ' XP pour ta classe ! 🎉';
        }
    } catch (e) {
        if (statut) statut.textContent += ' (serveur injoignable : points non comptés)';
    }
}

function montrerIndice(type) {
    const classe = CONFIG.classes[getClasse()];
    const defi = defiDe(type, classe);
    const id = defiId(type, classe.niveau, defi);
    const m = indicesVus();
    if (!m[id]) {
        m[id] = true;
        localStorage.setItem('mc-indices', JSON.stringify(m));
    }
    const el = document.getElementById('defi-indice-' + type);
    if (el) el.classList.add('visible');
}

function revelerReponse(type) {
    const btn = document.getElementById('defi-reveler-' + type);
    // Premier clic : on prévient que ça coûte les points. Deuxième : on révèle.
    if (btn && !btn.dataset.confirme) {
        btn.dataset.confirme = '1';
        btn.textContent = '⚠️ Sûr·e ? (0 XP)';
        return;
    }
    const classe = CONFIG.classes[getClasse()];
    const defi = defiDe(type, classe);
    setEtatDefi(defiId(type, classe.niveau, defi), 'vu');
    renderDefiCarte(type, classe);
}

// ---- Boîte à outils ----
function renderOutils() {
    const carte = document.getElementById('outils-card');
    const zone = document.getElementById('outils');
    if (!CONFIG.outils || CONFIG.outils.length === 0) {
        carte.classList.add('hidden');
        return;
    }
    zone.innerHTML = CONFIG.outils.map(function(o) {
        return '<a class="shortcut" href="' + o.url + '" target="_blank" rel="noopener">' +
            '<div class="emoji">' + o.emoji + '</div>' +
            '<div class="label">' + o.label + '</div>' +
            '<div class="desc">' + o.desc + '</div>' +
        '</a>';
    }).join('');
}

// ---- Contact ----
function renderContact() {
    document.getElementById('contact-txt').textContent = CONFIG.messageContact;
    const btn = document.getElementById('contact-btn');
    if (CONFIG.emailProf) {
        btn.href = 'mailto:' + CONFIG.emailProf;
        btn.classList.remove('hidden');
    }
}

// ---- Sélecteurs de classe ----
function renderClassPicker(actif) {
    const picker = document.getElementById('class-picker');
    picker.innerHTML = Object.keys(CONFIG.classes).map(function(code) {
        const c = CONFIG.classes[code];
        return '<button id="pick-' + code + '"' + (code === actif ? ' class="active"' : '') +
            ' onclick="setClasse(\'' + code + '\')">' + c.nom + '</button>';
    }).join('');
}

function renderChooseOverlay() {
    const zone = document.getElementById('choose-zones');
    const parNiveau = {};
    Object.keys(CONFIG.classes).forEach(function(code) {
        const n = CONFIG.classes[code].niveau;
        (parNiveau[n] = parNiveau[n] || []).push(code);
    });
    zone.innerHTML = Object.keys(parNiveau).map(function(niveau) {
        const boutons = parNiveau[niveau].map(function(code) {
            const cls = niveau === '4e' ? 'n4' : 'n3';
            return '<button class="' + cls + '" onclick="setClasse(\'' + code + '\')">' +
                CONFIG.classes[code].nom + '</button>';
        }).join('');
        return '<div class="niveau-label">' + niveau + '</div><div class="choices">' + boutons + '</div>';
    }).join('');
}

// ---- Compteur de visites (discret, masqué si indisponible) ----
async function compteurVisites() {
    try {
        const rep = await fetch('compteur.php');
        const data = await rep.json();
        if (data && data.visites) {
            document.getElementById('visites').textContent = '👁️ ' + data.visites
                + ' visites';
        }
    } catch (e) { /* pas de PHP en local : on n'affiche rien */ }
}

// ---- Rendu global ----
function render() {
    const code = getClasse();
    if (!code) {
        renderChooseOverlay();
        document.getElementById('choose-overlay').classList.remove('hidden');
        return;
    }
    const classe = CONFIG.classes[code];
    document.getElementById('hero-classe').textContent = 'les ' + classe.nom;
    renderXP();
    renderClassPicker(code);
    renderNow(classe);
    renderChapitres(classe);
    renderComportement(classe);
    renderAnnonces(classe);
    renderDevoirs(classe);
    renderCountdown(classe);
    renderDefis(classe);
}

window.addEventListener('DOMContentLoaded', function() {
    document.title = CONFIG.titreSite + ' 🚀';
    renderContact();
    renderOutils();
    renderXP();
    updateStreak();
    render();
    chargerTotaux();
    compteurVisites();
});
