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

// ---- XP, niveaux et série de jours ----
// L'XP est compté PAR CLASSE : chaque classe a son propre compteur,
// résoudre le défi d'une autre classe ne rapporte rien à la sienne.
function xpKey() {
    return 'mc-xp:' + localStorage.getItem('mc-classe');
}

function getXP() {
    return parseInt(localStorage.getItem(xpKey()) || '0', 10);
}

function addXP(montant) {
    if (!getClasse()) return;
    localStorage.setItem(xpKey(), String(getXP() + montant));
    renderXP();
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

function updateStreak() {
    const today = new Date();
    const todayKey = today.toDateString();
    const yesterdayKey = new Date(today.getTime() - 86400000).toDateString();
    let data = { last: '', count: 0 };
    try { data = JSON.parse(localStorage.getItem('mc-streak')) || data; } catch (e) {}

    if (data.last !== todayKey) {
        if (data.last === yesterdayKey) {
            data.count += 1;
            addXP(CONFIG.xp.fidelite);
        } else {
            data.count = 1;
        }
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

// ---- Défi de la semaine ----
// États possibles d'un défi (localStorage 'mc-defis') :
//   "reussi"        → validé après avoir vu l'indice
//   "reussi-bonus"  → validé sans indice (XP bonus)
//   "vu"            → réponse révélée, plus d'XP possible
// (true = ancien format, traité comme "reussi")
const DEFI_ESSAIS = {}; // compteur d'essais ratés (mémoire de session)

function etatsDefis() {
    try { return JSON.parse(localStorage.getItem('mc-defis')) || {}; } catch (e) { return {}; }
}

function etatDefi(id) {
    const brut = etatsDefis()[id];
    return brut === true ? 'reussi' : brut;
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
// pour accepter « 2 M », « 2m », « 2,0 m »…
function normaliser(txt) {
    return String(txt).toLowerCase().replace(/,/g, '.').replace(/\s+/g, '');
}

function renderDefi(classe) {
    const zone = document.getElementById('defi');
    const defi = classe.defi;
    const tag = document.getElementById('defi-xp-tag');
    if (tag) {
        tag.textContent = '+' + CONFIG.xp.defi + ' XP' +
            (CONFIG.xp.defiSansIndice ? ' (+' + CONFIG.xp.defiSansIndice + ' sans indice)' : '');
    }
    if (!defi || !defi.question) {
        zone.innerHTML = '<p class="empty-msg">Nouveau défi bientôt… 👀</p>';
        return;
    }

    const etat = etatDefi(defi.id);
    let html = '<div class="defi-question">' + defi.question + '</div>';

    if (etat === 'reussi' || etat === 'reussi-bonus') {
        html += '<div class="defi-reponse visible">' + (defi.reponse || '') + '</div>' +
            '<p class="defi-statut ok">✅ Défi validé' +
            (etat === 'reussi-bonus' ? ' sans indice — bravo ! 🌟' : ' !') + '</p>';
    } else if (etat === 'vu') {
        html += '<div class="defi-reponse visible">' + (defi.reponse || '') + '</div>' +
            '<p class="defi-statut">👀 Réponse révélée — pas d\'XP cette fois. Le prochain défi est pour toi !</p>';
    } else if (defi.bonnesReponses && defi.bonnesReponses.length > 0) {
        html +=
            '<div class="defi-saisie">' +
                '<input type="text" id="defi-input" placeholder="Ta réponse…" autocomplete="off"' +
                    ' onkeydown="if (event.key === \'Enter\') validerDefi(\'' + defi.id + '\')">' +
                '<button class="btn success" onclick="validerDefi(\'' + defi.id + '\')">Valider</button>' +
            '</div>' +
            '<p class="defi-feedback" id="defi-feedback"></p>' +
            '<div class="defi-actions">' +
                '<button class="btn ghost" onclick="montrerIndice(\'' + defi.id + '\')">💡 Indice</button>' +
                '<button class="btn ghost" id="defi-reveler" onclick="revelerReponse(\'' + defi.id + '\')">👀 Voir la réponse</button>' +
            '</div>' +
            '<div class="defi-indice" id="defi-indice">💡 ' + (defi.indice || '') + '</div>';
    } else {
        // Pas de bonnesReponses dans la config : simple bouton déclaratif
        html +=
            '<div class="defi-actions">' +
                '<button class="btn ghost" onclick="montrerIndice(\'' + defi.id + '\')">💡 Indice</button>' +
                '<button class="btn ghost" onclick="document.getElementById(\'defi-reponse\').classList.add(\'visible\')">👀 Voir la réponse</button>' +
                '<button class="btn success" onclick="reussiSansVerif(\'' + defi.id + '\')">✅ J\'ai trouvé !</button>' +
            '</div>' +
            '<div class="defi-indice" id="defi-indice">💡 ' + (defi.indice || '') + '</div>' +
            '<div class="defi-reponse" id="defi-reponse">' + (defi.reponse || '') + '</div>';
    }

    zone.innerHTML = html;
    if (indicesVus()[defi.id]) {
        const el = document.getElementById('defi-indice');
        if (el) el.classList.add('visible');
    }
}

function validerDefi(id) {
    const classe = CONFIG.classes[getClasse()];
    const defi = classe.defi;
    const input = document.getElementById('defi-input');
    const feedback = document.getElementById('defi-feedback');
    const essai = normaliser(input.value);

    if (!essai) {
        feedback.textContent = 'Écris ta réponse d\'abord ! ✍️';
        return;
    }

    const correct = defi.bonnesReponses.some(function(r) { return normaliser(r) === essai; });

    if (correct) {
        const sansIndice = !indicesVus()[id];
        setEtatDefi(id, sansIndice ? 'reussi-bonus' : 'reussi');
        addXP(CONFIG.xp.defi + (sansIndice ? (CONFIG.xp.defiSansIndice || 0) : 0));
        renderDefi(classe);
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

function montrerIndice(id) {
    const m = indicesVus();
    if (!m[id]) {
        m[id] = true;
        localStorage.setItem('mc-indices', JSON.stringify(m));
    }
    const el = document.getElementById('defi-indice');
    if (el) el.classList.add('visible');
}

function revelerReponse(id) {
    const btn = document.getElementById('defi-reveler');
    // Premier clic : on prévient que ça coûte les XP. Deuxième : on révèle.
    if (btn && !btn.dataset.confirme) {
        btn.dataset.confirme = '1';
        btn.textContent = '⚠️ Sûr·e ? (0 XP)';
        return;
    }
    setEtatDefi(id, 'vu');
    renderDefi(CONFIG.classes[getClasse()]);
}

function reussiSansVerif(id) {
    if (etatDefi(id)) return;
    setEtatDefi(id, 'reussi');
    addXP(CONFIG.xp.defi);
    renderDefi(CONFIG.classes[getClasse()]);
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
    renderDefi(classe);
}

window.addEventListener('DOMContentLoaded', function() {
    // Migration : l'XP était global ('mc-xp') avant d'être compté par classe
    const ancienXP = localStorage.getItem('mc-xp');
    if (ancienXP !== null) {
        if (getClasse()) localStorage.setItem(xpKey(), ancienXP);
        localStorage.removeItem('mc-xp');
    }
    document.title = CONFIG.titreSite + ' 🚀';
    renderContact();
    renderOutils();
    renderXP();
    updateStreak();
    render();
    compteurVisites();
});
