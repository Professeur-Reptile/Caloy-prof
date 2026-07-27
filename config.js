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

    // Écran de nuit : le site est BLOQUÉ entre debutHeure et finHeure
    // (un écran « c'est l'heure de dormir » recouvre tout). Mettez
    // texte: "" pour désactiver le blocage.
    nuit: {
        debutHeure: 22,  // bloqué à partir de 22 h…
        finHeure: 6,     // …jusqu'à 6 h du matin
        // Blocage désactivé (texte vide). Pour le réactiver, remettez :
        // texte: "Les défis seront encore là demain — ton cerveau retient mieux les maths après une bonne nuit. 😴"
        texte: ""
    },

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
    // plus bas (un pool 4e et un pool 3e, rotation automatique).

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
    // Un POOL de défis PAR NIVEAU ("4e" et "3e"), chacun avec :
    //   • jour    : 10 défis → chaque jour de classe (lun-ven), chaque
    //     classe du niveau reçoit un défi différent du pool ; le
    //     lendemain tout décale d'un cran. Jamais deux classes du même
    //     niveau sur le même défi le même jour. En 2 semaines, chaque
    //     classe fait les 10, puis ça reboucle (renouvelez le pool !).
    //     Le week-end, le défi du vendredi reste affiché.
    //   • semaine : 5 défis → permutation entre les classes du niveau
    //     chaque lundi.
    // Un même défi peut figurer dans les DEUX pools (questions
    // communes) ou dans un seul (spécial 4e ou spécial 3e).
    //   • defisDebut : le LUNDI où démarre la rotation ("AAAA-MM-JJ").
    //
    // Les points vont à la CLASSE : le premier élève de la classe qui
    // trouve fait marquer sa classe, une seule fois par défi (géré par
    // defis.php sur le serveur).
    //
    // bonnesReponses : les réponses acceptées (majuscules, espaces et
    // virgules/points ignorés ; listez plusieurs formes : ["1/2", "0,5"]).
    defisDebut: "2026-07-13",

    defis: {

        "4e": {
            jour: [
                {
                    question: "Calcule : (−5) + 8 − (−3)",
                    indice: "Soustraire (−3), c'est ajouter 3…",
                    bonnesReponses: ["6", "+6"],
                    reponse: "<strong>6</strong> — (−5) + 8 = 3, puis 3 + 3 = 6."
                },
                {
                    question: "(−2)³ = ?",
                    indice: "(−2) × (−2) × (−2)… attention au signe !",
                    bonnesReponses: ["-8", "−8"],
                    reponse: "<strong>−8</strong> — (−2)×(−2) = 4, puis 4×(−2) = −8. Un exposant impair garde le signe moins."
                },
                {
                    question: "Quelle est la moitié de 3/4 ? (fraction ou décimal)",
                    indice: "Prendre la moitié, c'est multiplier par 1/2…",
                    bonnesReponses: ["3/8", "0.375", "0,375"],
                    reponse: "<strong>3/8</strong> — 3/4 × 1/2 = 3/8 (= 0,375)."
                },
                {
                    question: "Combien font 15 % de 60 ?",
                    indice: "10 % de 60, puis 5 % de 60… additionne !",
                    bonnesReponses: ["9"],
                    reponse: "<strong>9</strong> — 10 % de 60 = 6, 5 % de 60 = 3, donc 6 + 3 = 9."
                },
                {
                    question: "Simplifie : 5x + 3x − 2x (réponse du type « 4x »)",
                    indice: "Compte les x comme des objets : 5 + 3 − 2…",
                    bonnesReponses: ["6x"],
                    reponse: "<strong>6x</strong> — (5 + 3 − 2)x = 6x."
                },
                {
                    question: "2⁴ × 2³ = 2 puissance combien ?",
                    indice: "Compte le nombre total de 2 multipliés…",
                    bonnesReponses: ["7", "2^7", "2puissance7"],
                    reponse: "<strong>2⁷</strong> — quatre 2 multipliés par trois 2 : ça fait sept 2. On ADDITIONNE les exposants : 4 + 3 = 7."
                },
                {
                    question: "Un triangle a deux angles de 35° et 65°. Combien mesure le troisième ?",
                    indice: "La somme des angles d'un triangle fait 180°…",
                    bonnesReponses: ["80", "80°", "80degres", "80degrés"],
                    reponse: "<strong>80°</strong> — 180 − 35 − 65 = 80."
                },
                {
                    question: "1/2 + 1/4 = ? (fraction ou décimal)",
                    indice: "Mets tout sur le même dénominateur : des quarts…",
                    bonnesReponses: ["3/4", "0.75", "0,75", "6/8"],
                    reponse: "<strong>3/4</strong> — 1/2 = 2/4, donc 2/4 + 1/4 = 3/4 (= 0,75)."
                },
                {
                    question: "Le périmètre d'un carré est 36 cm. Quelle est son aire (en cm²) ?",
                    indice: "Trouve d'abord la longueur d'un côté…",
                    bonnesReponses: ["81", "81cm2", "81cm²"],
                    reponse: "<strong>81 cm²</strong> — côté = 36 ÷ 4 = 9, aire = 9 × 9 = 81."
                },
                {
                    question: "J'achète 3 cahiers à 2,50 € pièce et je paie avec un billet de 10 €. Combien me rend-on (en €) ?",
                    indice: "Calcule d'abord le prix des 3 cahiers…",
                    bonnesReponses: ["2.5", "2,5", "2.50", "2€50", "2.5€", "2.50€"],
                    reponse: "<strong>2,50 €</strong> — 3 × 2,50 = 7,50, et 10 − 7,50 = 2,50."
                }
            ],
            semaine: [
                {
                    question: "Quel est le plus petit nombre entier de TROIS chiffres divisible à la fois par 3 et par 4 ?",
                    indice: "Divisible par 3 et par 4 = divisible par 12…",
                    bonnesReponses: ["108"],
                    reponse: "<strong>108</strong> — il faut un multiple de 12 : 12 × 9 = 108 est le premier à trois chiffres (96 n'en a que deux)."
                },
                {
                    question: "La somme de trois entiers consécutifs vaut 141. Quel est le plus petit des trois ?",
                    indice: "Appelle le nombre du milieu n : la somme fait 3n…",
                    bonnesReponses: ["46"],
                    reponse: "<strong>46</strong> — 141 ÷ 3 = 47 (le milieu), donc 46 + 47 + 48 = 141."
                },
                {
                    question: "Un écran de télé mesure 80 cm de large et 60 cm de haut. Quelle est la longueur de sa diagonale (en cm) ?",
                    indice: "La diagonale coupe l'écran en deux triangles rectangles… Pythagore peut t'aider !",
                    bonnesReponses: ["100", "100cm", "1m"],
                    reponse: "<strong>100 cm</strong> — d'après Pythagore : d² = 80² + 60² = 6400 + 3600 = 10000, donc d = 100. C'est comme ça qu'on mesure les écrans (en pouces) ! 📺"
                },
                {
                    question: "Dans un groupe de 10 personnes, chacun serre la main de tous les autres une seule fois. Combien de poignées de main en tout ?",
                    indice: "La 1re personne en serre 9, la 2e n'en a plus que 8 de nouvelles…",
                    bonnesReponses: ["45"],
                    reponse: "<strong>45</strong> — 9 + 8 + 7 + … + 1 = 45 (ou 10 × 9 ÷ 2)."
                },
                {
                    question: "Un nénuphar double de surface chaque jour. Il recouvre tout l'étang en 30 jours. En combien de jours en recouvrait-il la MOITIÉ ?",
                    indice: "Pars de la fin : la veille du jour 30, il était deux fois plus petit…",
                    bonnesReponses: ["29", "29jours", "29j"],
                    reponse: "<strong>29 jours</strong> — s'il double chaque jour, la moitié de l'étang c'est juste la veille de la fin. Pas 15 ! 🪷"
                }
            ]
        },

        "3e": {
            jour: [
                {
                    question: "f(x) = 3x − 5. Calcule f(4).",
                    indice: "Remplace x par 4 dans la formule…",
                    bonnesReponses: ["7"],
                    reponse: "<strong>7</strong> — f(4) = 3 × 4 − 5 = 12 − 5 = 7."
                },
                {
                    question: "On développe (x + 3)². Quel est le coefficient devant x ?",
                    indice: "(a + b)² = a² + 2ab + b²…",
                    bonnesReponses: ["6"],
                    reponse: "<strong>6</strong> — (x + 3)² = x² + 6x + 9."
                },
                {
                    question: "√81 + √16 = ?",
                    indice: "Cherche les carrés parfaits…",
                    bonnesReponses: ["13"],
                    reponse: "<strong>13</strong> — √81 = 9 et √16 = 4, donc 9 + 4 = 13."
                },
                {
                    question: "cos(60°) = ? (fraction ou décimal)",
                    indice: "C'est une des valeurs à connaître par cœur… entre 0 et 1.",
                    bonnesReponses: ["0.5", "1/2", "0,5"],
                    reponse: "<strong>1/2 (= 0,5)</strong> — une valeur remarquable à retenir : cos(60°) = sin(30°) = 0,5."
                },
                {
                    question: "84 = 2² × 3 × 7. Combien de facteurs premiers DIFFÉRENTS possède 84 ?",
                    indice: "Compte les nombres premiers différents dans la décomposition…",
                    bonnesReponses: ["3"],
                    reponse: "<strong>3</strong> — les facteurs premiers de 84 sont 2, 3 et 7."
                },
                {
                    question: "Résous : 2x + 5 = 17. Que vaut x ?",
                    indice: "Enlève 5 des deux côtés, puis divise…",
                    bonnesReponses: ["6", "x=6"],
                    reponse: "<strong>6</strong> — 2x = 12, donc x = 6."
                },
                {
                    question: "Combien font 15 % de 60 ?",
                    indice: "10 % de 60, puis 5 % de 60… additionne !",
                    bonnesReponses: ["9"],
                    reponse: "<strong>9</strong> — 10 % de 60 = 6, 5 % de 60 = 3, donc 6 + 3 = 9."
                },
                {
                    question: "Un triangle a deux angles de 35° et 65°. Combien mesure le troisième ?",
                    indice: "La somme des angles d'un triangle fait 180°…",
                    bonnesReponses: ["80", "80°", "80degres", "80degrés"],
                    reponse: "<strong>80°</strong> — 180 − 35 − 65 = 80."
                },
                {
                    question: "Quel est le plus petit nombre premier plus grand que 20 ?",
                    indice: "21 = 3 × 7, 22 = 2 × 11…",
                    bonnesReponses: ["23"],
                    reponse: "<strong>23</strong> — 21 et 22 se divisent, 23 n'est divisible que par 1 et lui-même."
                },
                {
                    question: "Le périmètre d'un carré est 36 cm. Quelle est son aire (en cm²) ?",
                    indice: "Trouve d'abord la longueur d'un côté…",
                    bonnesReponses: ["81", "81cm2", "81cm²"],
                    reponse: "<strong>81 cm²</strong> — côté = 36 ÷ 4 = 9, aire = 9 × 9 = 81."
                }
            ],
            semaine: [
                {
                    question: "Une échelle de 5 m est posée contre un mur ; son pied est à 3 m du mur. À quelle hauteur (en m) touche-t-elle le mur ?",
                    indice: "Mur, sol, échelle : un triangle rectangle… Pythagore !",
                    bonnesReponses: ["4", "4m", "400cm"],
                    reponse: "<strong>4 m</strong> — h² = 5² − 3² = 25 − 9 = 16, donc h = 4. Le fameux triangle 3-4-5 ! 🪜"
                },
                {
                    question: "Quel est le chiffre des unités de 7⁴⁵ ?",
                    indice: "Regarde le dernier chiffre de 7¹, 7², 7³, 7⁴, 7⁵… un motif se répète !",
                    bonnesReponses: ["7"],
                    reponse: "<strong>7</strong> — les unités des puissances de 7 font 7, 9, 3, 1, 7, 9, 3, 1… (cycle de 4). 45 = 4 × 11 + 1, donc même unité que 7¹ : c'est 7."
                },
                {
                    question: "Dans un groupe de 10 personnes, chacun serre la main de tous les autres une seule fois. Combien de poignées de main en tout ?",
                    indice: "La 1re personne en serre 9, la 2e n'en a plus que 8 de nouvelles…",
                    bonnesReponses: ["45"],
                    reponse: "<strong>45</strong> — 9 + 8 + 7 + … + 1 = 45 (ou 10 × 9 ÷ 2)."
                },
                {
                    question: "Un nénuphar double de surface chaque jour. Il recouvre tout l'étang en 30 jours. En combien de jours en recouvrait-il la MOITIÉ ?",
                    indice: "Pars de la fin : la veille du jour 30, il était deux fois plus petit…",
                    bonnesReponses: ["29", "29jours", "29j"],
                    reponse: "<strong>29 jours</strong> — s'il double chaque jour, la moitié de l'étang c'est juste la veille de la fin. Pas 15 ! 🪷"
                },
                {
                    question: "La somme de trois entiers consécutifs vaut 141. Quel est le plus petit des trois ?",
                    indice: "Appelle le nombre du milieu n : la somme fait 3n…",
                    bonnesReponses: ["46"],
                    reponse: "<strong>46</strong> — 141 ÷ 3 = 47 (le milieu), donc 46 + 47 + 48 = 141."
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
