// ═══════════════════════════════════════════════════════════════
//  ⚙️  CONFIGURATION DU SITE — c'est LE fichier à modifier !
//
//  Tout le contenu du site se trouve ici. Modifiez les textes,
//  enregistrez, poussez sur GitHub : le site se met à jour.
//  (Les autres fichiers n'ont pas besoin d'être touchés.)
//
//  ⚠️ Les données ci-dessous sont des EXEMPLES (année fictive)
//  pour visualiser le site : remplacez-les par les vôtres.
// ═══════════════════════════════════════════════════════════════

const CONFIG = {

    // ---- Général ---------------------------------------------------
    titreSite: "Maths avec M. Caloy",

    // Email affiché sur le bouton de contact. Laissez "" pour ne pas
    // afficher de bouton (le message ci-dessous reste affiché).
    emailProf: "",
    messageContact: "Pose ta question en classe, ou envoie-moi un message sur l'ENT / Pronote. Je réponds vite ! 📬",

    // ---- Vos classes ----------------------------------------------
    // Renommez librement (ex : "4e Picasso"). L'ordre est celui des
    // boutons. Chaque classe a SON contenu, à son rythme.
    //
    // Pour chaque classe :
    //   • chapitresTermines : les chapitres déjà faits, dans l'ordre
    //                         (le plus ancien en premier)
    //   • enCeMoment    : le chapitre en cours (texte libre, "" pour masquer)
    //   • annonces      : vos messages, le plus récent EN PREMIER
    //   • devoirs       : le travail à faire, avec la date de rendu
    //   • prochaineEval : date au format "AAAA-MM-JJ" ("" si rien de prévu)
    //   • comportement  : le feu tricolore de la classe !
    //                     couleur : "vert", "orange" ou "rouge",
    //                     message optionnel ("" pour ne rien afficher),
    //                     mettez couleur: "" pour masquer la carte
    //
    // Les DÉFIS ne sont plus dans les classes : voir CONFIG.defis
    // plus bas (défi du jour + défi de la semaine, par niveau).

    classes: {

        "4A": {
            nom: "4e A",
            niveau: "4e",
            chapitresTermines: [
                "Nombres relatifs",
                "Écritures fractionnaires",
                "Triangles et droites remarquables",
                "Puissances",
                "Proportionnalité et pourcentages",
                "Calcul littéral"
            ],
            enCeMoment: "Théorème de Pythagore",
            annonces: [
                { date: "15/07", texte: "La correction de l'éval sur le calcul littéral est en ligne — regarde-la avant jeudi, on en reparle en classe. ✅" },
                { date: "10/07", texte: "Bravo pour l'éval : la moyenne de la classe est en hausse ! Continuez comme ça. 📈" },
                { date: "03/07", texte: "Le défi de la semaine dernière a été réussi par 19 élèves sur 26 — record battu ! 🏆" }
            ],
            devoirs: [
                { pour: "lundi 20/07", texte: "Exercices 4 et 7 p. 152 (calculer l'hypoténuse)" },
                { pour: "jeudi 23/07", texte: "Apprendre la démonstration du théorème vue en classe" }
            ],
            prochaineEval: { date: "2026-07-24", titre: "Éval — Théorème de Pythagore" },
            comportement: {
                couleur: "vert",
                message: "Très bonne semaine, classe agréable — continuez comme ça !"
            }
        },

        "4B": {
            nom: "4e B",
            niveau: "4e",
            chapitresTermines: [
                "Nombres relatifs",
                "Écritures fractionnaires",
                "Triangles et droites remarquables",
                "Puissances",
                "Proportionnalité et pourcentages"
            ],
            enCeMoment: "Calcul littéral",
            annonces: [
                { date: "13/07", texte: "N'oubliez pas vos calculatrices jeudi, on fera une activité notée dessus. 🧮" },
                { date: "07/07", texte: "Les cahiers d'exercices seront ramassés lundi : vérifiez que tout est à jour. 📓" }
            ],
            devoirs: [
                { pour: "mardi 21/07", texte: "Exercices 12 et 14 p. 98 (réduire les expressions)" },
                { pour: "vendredi 24/07", texte: "Finir la fiche « développer avec la distributivité » distribuée en classe" }
            ],
            prochaineEval: { date: "2026-07-28", titre: "Éval — Calcul littéral" },
            comportement: {
                couleur: "rouge",
                message: "Séance de mardi très agitée : feu rouge. On en parle lundi, et je sais que vous pouvez repasser au vert très vite. 🚦"
            }
        },

        "4C": {
            nom: "4e C",
            niveau: "4e",
            chapitresTermines: [
                "Nombres relatifs",
                "Écritures fractionnaires",
                "Triangles et droites remarquables",
                "Puissances",
                "Proportionnalité et pourcentages",
                "Calcul littéral"
            ],
            enCeMoment: "Théorème de Pythagore",
            annonces: [
                { date: "16/07", texte: "Le DM sur les puissances est rendu : correction distribuée lundi. Pensez à le faire signer. ✍️" },
                { date: "09/07", texte: "Séance en salle info vendredi : on découvrira Pythagore avec GeoGebra. 💻" }
            ],
            devoirs: [
                { pour: "lundi 20/07", texte: "DM n°5 à rendre (feuille distribuée en classe)" },
                { pour: "jeudi 23/07", texte: "Exercices 2 et 3 p. 149 (reconnaître un triangle rectangle)" }
            ],
            prochaineEval: { date: "2026-07-27", titre: "Éval — Théorème de Pythagore" },
            comportement: {
                couleur: "orange",
                message: "Bon travail, mais trop de retards de matériel cette semaine : pensez à vos affaires !"
            }
        },

        "3A": {
            nom: "3e A",
            niveau: "3e",
            chapitresTermines: [
                "Arithmétique et nombres premiers",
                "Calcul littéral et identités remarquables",
                "Fonctions : notion et images",
                "Équations",
                "Statistiques",
                "Théorème de Thalès"
            ],
            enCeMoment: "Trigonométrie",
            annonces: [
                { date: "15/07", texte: "Les vidéos du cours de trigonométrie sont disponibles — parfait pour réviser avant l'éval de vendredi. 🎬" },
                { date: "08/07", texte: "Brevet blanc : les dates sont fixées, on commencera les révisions après ce chapitre. 🎯" },
                { date: "01/07", texte: "Les sujets de brevet des années précédentes sont dans la boîte à outils : commencez à vous entraîner ! 📄" }
            ],
            devoirs: [
                { pour: "mardi 21/07", texte: "Exercices 8 et 9 p. 203 (calculer un angle avec la calculatrice)" },
                { pour: "jeudi 23/07", texte: "Fiche de révision trigo : refaire les 3 exemples du cours" }
            ],
            prochaineEval: { date: "2026-07-24", titre: "Éval — Trigonométrie (cos, sin, tan)" },
            comportement: {
                couleur: "vert",
                message: "Classe au top, un plaisir de vous faire cours. 👏"
            }
        },

        "3B": {
            nom: "3e B",
            niveau: "3e",
            chapitresTermines: [
                "Arithmétique et nombres premiers",
                "Calcul littéral et identités remarquables",
                "Fonctions : notion et images",
                "Équations",
                "Statistiques"
            ],
            enCeMoment: "Théorème de Thalès",
            annonces: [
                { date: "14/07", texte: "Rappel : ceux qui n'ont pas rendu le DM n°6, dernier délai lundi ! ⏰" },
                { date: "06/07", texte: "Brevet blanc : les dates sont fixées, pensez à les noter dans l'agenda. 🎯" }
            ],
            devoirs: [
                { pour: "lundi 20/07", texte: "Exercices 5 et 6 p. 187 (configuration de Thalès)" },
                { pour: "jeudi 23/07", texte: "Préparer les questions sur le cours pour la séance de révisions" }
            ],
            prochaineEval: { date: "2026-07-30", titre: "Éval — Théorème de Thalès" },
            comportement: {
                couleur: "orange",
                message: "Feu orange : trop d'agitation. On repart du bon pied lundi, je compte sur vous."
            }
        }
    },

    // ---- Défis ------------------------------------------------------
    // Les défis sont définis PAR NIVEAU (les 4e ont les mêmes défis,
    // les 3e aussi) et PROGRAMMÉS À L'AVANCE : chaque défi a une date
    // de début "AAAA-MM-JJ", le site affiche automatiquement le plus
    // récent déjà commencé. Vous pouvez donc préparer des semaines
    // entières d'avance.
    //
    //   • jour    : un défi rapide par jour de classe
    //   • semaine : un défi plus corsé qui reste toute la semaine
    //
    // Les points vont à la CLASSE : le premier élève de la classe qui
    // trouve fait marquer sa classe, une seule fois par défi (géré par
    // defis.php sur le serveur).
    //
    // bonnesReponses : les réponses acceptées (majuscules, espaces et
    // virgules/points ignorés à la correction ; listez plusieurs
    // formes : ["100", "100cm", "1m"]).
    defis: {

        "4e": {
            jour: [
                {
                    debut: "2026-07-13",
                    question: "Calcule : (−3) + (−9) − (−5)",
                    indice: "Soustraire (−5), c'est ajouter 5…",
                    bonnesReponses: ["-7", "−7"],
                    reponse: "<strong>−7</strong> — (−3) + (−9) = −12, puis −12 + 5 = −7."
                },
                {
                    debut: "2026-07-14",
                    question: "Quel est le double de 3/4 ? (fraction ou décimal)",
                    indice: "Doubler une fraction, c'est doubler son numérateur…",
                    bonnesReponses: ["3/2", "1.5", "6/4", "1,5"],
                    reponse: "<strong>3/2 (= 1,5)</strong> — 2 × 3/4 = 6/4 = 3/2."
                },
                {
                    debut: "2026-07-15",
                    question: "2⁵ = ?",
                    indice: "2 × 2 × 2 × 2 × 2, étape par étape…",
                    bonnesReponses: ["32"],
                    reponse: "<strong>32</strong> — 2⁵ = 2×2×2×2×2 = 32."
                },
                {
                    debut: "2026-07-16",
                    question: "Simplifie : 5x + 3x − 2x (réponse du type « 4x »)",
                    indice: "Compte les x comme des objets : 5 objets + 3 objets − 2 objets…",
                    bonnesReponses: ["6x"],
                    reponse: "<strong>6x</strong> — (5 + 3 − 2)x = 6x."
                },
                {
                    debut: "2026-07-17",
                    question: "Un article à 40 € est soldé à −25 %. Quel est le nouveau prix (en €) ?",
                    indice: "25 %, c'est un quart…",
                    bonnesReponses: ["30", "30€", "30euros"],
                    reponse: "<strong>30 €</strong> — 25 % de 40 = 10, donc 40 − 10 = 30."
                }
            ],
            semaine: [
                {
                    debut: "2026-07-13",
                    question: "Quel est le plus petit nombre entier de TROIS chiffres divisible à la fois par 3 et par 4 ?",
                    indice: "Divisible par 3 et par 4 = divisible par 12…",
                    bonnesReponses: ["108"],
                    reponse: "<strong>108</strong> — il faut un multiple de 12 : 12 × 9 = 108 est le premier à trois chiffres (96 n'en a que deux)."
                },
                {
                    debut: "2026-07-20",
                    question: "La somme de trois entiers consécutifs vaut 141. Quel est le plus petit des trois ?",
                    indice: "Appelle le nombre du milieu n : la somme fait 3n…",
                    bonnesReponses: ["46"],
                    reponse: "<strong>46</strong> — 141 ÷ 3 = 47 (le milieu), donc 46 + 47 + 48 = 141."
                }
            ]
        },

        "3e": {
            jour: [
                {
                    debut: "2026-07-13",
                    question: "84 = 2² × 3 × 7. Combien de facteurs premiers DIFFÉRENTS possède 84 ?",
                    indice: "Compte les nombres premiers différents dans la décomposition…",
                    bonnesReponses: ["3"],
                    reponse: "<strong>3</strong> — les facteurs premiers de 84 sont 2, 3 et 7."
                },
                {
                    debut: "2026-07-14",
                    question: "f(x) = 3x − 5. Calcule f(4).",
                    indice: "Remplace x par 4 dans la formule…",
                    bonnesReponses: ["7"],
                    reponse: "<strong>7</strong> — f(4) = 3 × 4 − 5 = 12 − 5 = 7."
                },
                {
                    debut: "2026-07-15",
                    question: "On développe (x + 3)². Quel est le coefficient devant x ?",
                    indice: "(a + b)² = a² + 2ab + b²…",
                    bonnesReponses: ["6"],
                    reponse: "<strong>6</strong> — (x + 3)² = x² + 6x + 9."
                },
                {
                    debut: "2026-07-16",
                    question: "√81 + √16 = ?",
                    indice: "Cherche les carrés parfaits…",
                    bonnesReponses: ["13"],
                    reponse: "<strong>13</strong> — √81 = 9 et √16 = 4, donc 9 + 4 = 13."
                },
                {
                    debut: "2026-07-17",
                    question: "cos(60°) = ? (fraction ou décimal)",
                    indice: "C'est une des valeurs à connaître par cœur… entre 0 et 1.",
                    bonnesReponses: ["0.5", "1/2", "0,5"],
                    reponse: "<strong>1/2 (= 0,5)</strong> — une valeur remarquable à retenir : cos(60°) = sin(30°) = 0,5."
                }
            ],
            semaine: [
                {
                    debut: "2026-07-13",
                    question: "Une échelle de 5 m est posée contre un mur ; son pied est à 3 m du mur. À quelle hauteur (en m) touche-t-elle le mur ?",
                    indice: "Mur, sol, échelle : un triangle rectangle… Pythagore !",
                    bonnesReponses: ["4", "4m", "400cm"],
                    reponse: "<strong>4 m</strong> — h² = 5² − 3² = 25 − 9 = 16, donc h = 4. Le fameux triangle 3-4-5 ! 🪜"
                },
                {
                    debut: "2026-07-20",
                    question: "Quel est le chiffre des unités de 7⁴⁵ ?",
                    indice: "Regarde le dernier chiffre de 7¹, 7², 7³, 7⁴, 7⁵… un motif se répète !",
                    bonnesReponses: ["7"],
                    reponse: "<strong>7</strong> — les unités des puissances de 7 font 7, 9, 3, 1, 7, 9, 3, 1… (cycle de 4). 45 = 4 × 11 + 1, donc même unité que 7¹ : c'est 7."
                }
            ]
        }
    },

    // ---- Boîte à outils --------------------------------------------
    // Liens utiles affichés pour toutes les classes. Ajoutez, retirez,
    // réordonnez librement (laissez la liste vide pour masquer la carte).
    outils: [
        { emoji: "✏️", label: "Exercices auto-corrigés", desc: "Entraîne-toi, la correction est instantanée", url: "https://coopmaths.fr/alea/" },
        { emoji: "🧮", label: "Calcul mental", desc: "Des défis de rapidité", url: "https://mathsmentales.net/" },
        { emoji: "📐", label: "GeoGebra", desc: "Géométrie dynamique", url: "https://www.geogebra.org/" }
    ],

    // ---- Niveaux XP de classe ---------------------------------------
    // Barème des niveaux (XP cumulés par la classe sur l'année).
    // Vous pouvez changer les noms et les seuils.
    niveauxXP: [
        { min: 0, nom: "🐣 Débutant" },
        { min: 150, nom: "🧮 Apprenti" },
        { min: 450, nom: "⚡ Calculateur" },
        { min: 1000, nom: "🔥 Expert" },
        { min: 2000, nom: "🏆 Légende des Maths" }
    ],

    // XP gagnés par la classe quand un élève réussit le premier
    xp: {
        defiJour: 15,             // défi du jour
        defiJourSansIndice: 5,    // bonus si trouvé sans ouvrir l'indice
        defiSemaine: 30,          // défi de la semaine (plus corsé)
        defiSemaineSansIndice: 10 // bonus sans indice
    }
};
