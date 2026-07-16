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
function getXP() {
    return parseInt(localStorage.getItem('mc-xp') || '0', 10);
}

function addXP(montant) {
    localStorage.setItem('mc-xp', String(getXP() + montant));
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

// ---- Défi de la semaine ----
function defisReussis() {
    try { return JSON.parse(localStorage.getItem('mc-defis')) || {}; } catch (e) { return {}; }
}

function renderDefi(classe) {
    const zone = document.getElementById('defi');
    const defi = classe.defi;
    if (!defi || !defi.question) {
        zone.innerHTML = '<p class="empty-msg">Nouveau défi bientôt… 👀</p>';
        return;
    }
    const dejaReussi = defisReussis()[defi.id];
    zone.innerHTML =
        '<div class="defi-question">' + defi.question + '</div>' +
        '<div class="defi-actions">' +
            '<button class="btn ghost" onclick="document.getElementById(\'defi-indice\').classList.add(\'visible\')">💡 Indice</button>' +
            '<button class="btn ghost" onclick="document.getElementById(\'defi-reponse\').classList.add(\'visible\')">👀 Voir la réponse</button>' +
            '<button class="btn success" id="defi-gagne" onclick="reussirDefi(\'' + defi.id + '\')"' + (dejaReussi ? ' disabled' : '') + '>' +
                (dejaReussi ? '✅ Défi validé !' : '✅ J\'ai trouvé !') +
            '</button>' +
        '</div>' +
        '<div class="defi-indice" id="defi-indice">💡 ' + (defi.indice || '') + '</div>' +
        '<div class="defi-reponse" id="defi-reponse">' + (defi.reponse || '') + '</div>';
}

function reussirDefi(defiId) {
    const reussis = defisReussis();
    if (reussis[defiId]) return;
    reussis[defiId] = true;
    localStorage.setItem('mc-defis', JSON.stringify(reussis));
    addXP(CONFIG.xp.defi);
    const btn = document.getElementById('defi-gagne');
    btn.disabled = true;
    btn.textContent = '✅ Défi validé !';
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
    renderClassPicker(code);
    renderNow(classe);
    renderChapitres(classe);
    renderAnnonces(classe);
    renderDevoirs(classe);
    renderCountdown(classe);
    renderDefi(classe);
}

window.addEventListener('DOMContentLoaded', function() {
    document.title = CONFIG.titreSite + ' 🚀';
    renderContact();
    renderOutils();
    renderXP();
    updateStreak();
    render();
    compteurVisites();
});
