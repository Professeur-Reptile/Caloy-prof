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
    //   • comportement  : la batterie de comportement de la classe !
    //                     niveau de 0 (vide 🚨) à 100 (pleine 🤩),
    //                     message optionnel ("" pour ne rien afficher),
    //                     mettez niveau: null pour masquer la carte
    //   • defi          : le défi de la semaine
    //       - id : UNIQUE, à changer à chaque nouveau défi (sinon pas
    //         de nouveaux XP !)
    //       - bonnesReponses : les réponses acceptées (majuscules,
    //         espaces et virgules/points sont ignorés à la correction ;
    //         listez plusieurs formes : ["100", "100cm", "1m"]).
    //         Si la liste est absente, le défi repasse en simple
    //         bouton « J'ai trouvé » sans vérification.
    //       - reponse : l'explication affichée après la réussite

    classes: {

        "4A": {
            nom: "4e A",
            niveau: "4e",
            chapitresTermines: [
                "Nombres relatifs",
                "Écritures fractionnaires",
                "Puissances",
                "Calcul littéral"
            ],
            enCeMoment: "Théorème de Pythagore",
            annonces: [
                { date: "15/07", texte: "La correction de l'éval sur le calcul littéral est en ligne — regarde-la avant jeudi, on en reparle en classe. ✅" },
                { date: "10/07", texte: "Bravo pour l'éval : la moyenne de la classe est en hausse ! Continuez comme ça. 📈" }
            ],
            devoirs: [
                { pour: "lundi 20/07", texte: "Exercices 4 et 7 p. 152 (calculer l'hypoténuse)" },
                { pour: "jeudi 23/07", texte: "Apprendre la démonstration du théorème vue en classe" }
            ],
            prochaineEval: { date: "2026-07-24", titre: "Éval — Théorème de Pythagore" },
            comportement: {
                niveau: 85,
                message: "Très bonne semaine, classe agréable — continuez comme ça !"
            },
            defi: {
                id: "4A-2026-s38",
                question: "Un écran de télé mesure 80 cm de large et 60 cm de haut. Quelle est la longueur de sa diagonale ?",
                indice: "La diagonale coupe l'écran en deux triangles rectangles… Pythagore peut t'aider !",
                bonnesReponses: ["100", "100cm", "1m"],
                reponse: "<strong>100 cm</strong> — d'après Pythagore : d² = 80² + 60² = 6400 + 3600 = 10000, donc d = 100. C'est comme ça qu'on mesure les écrans (en pouces) ! 📺"
            }
        },

        "4B": {
            nom: "4e B",
            niveau: "4e",
            chapitresTermines: [
                "Nombres relatifs",
                "Écritures fractionnaires",
                "Puissances"
            ],
            enCeMoment: "Calcul littéral",
            annonces: [
                { date: "13/07", texte: "N'oubliez pas vos calculatrices jeudi, on fera une activité notée dessus. 🧮" }
            ],
            devoirs: [
                { pour: "mardi 21/07", texte: "Exercices 12 et 14 p. 98 (réduire les expressions)" }
            ],
            prochaineEval: { date: "2026-07-28", titre: "Éval — Calcul littéral" },
            comportement: {
                niveau: 55,
                message: "Trop de bavardages cette semaine… je sais que vous pouvez recharger la batterie. 🔌"
            },
            defi: {
                id: "4B-2026-s38",
                question: "Je pense à un nombre. Je le double, j'ajoute 5, et j'obtiens 17. Écris le calcul « à l'envers » et trouve mon nombre.",
                indice: "Pars de 17 : enlève 5, puis partage en deux…",
                bonnesReponses: ["6"],
                reponse: "<strong>6</strong> — (17 − 5) ÷ 2 = 6. En langage calcul littéral : 2x + 5 = 17. Tu viens de résoudre une équation sans le savoir ! 💪"
            }
        },

        "4C": {
            nom: "4e C",
            niveau: "4e",
            chapitresTermines: [
                "Nombres relatifs",
                "Écritures fractionnaires",
                "Puissances",
                "Calcul littéral"
            ],
            enCeMoment: "Théorème de Pythagore",
            annonces: [
                { date: "16/07", texte: "Le DM sur les puissances est rendu : correction distribuée lundi. Pensez à le faire signer. ✍️" }
            ],
            devoirs: [
                { pour: "lundi 20/07", texte: "DM n°5 à rendre (feuille distribuée en classe)" }
            ],
            prochaineEval: { date: "2026-07-27", titre: "Éval — Théorème de Pythagore" },
            comportement: {
                niveau: 75,
                message: ""
            },
            defi: {
                id: "4C-2026-s38",
                question: "Un écran de télé mesure 80 cm de large et 60 cm de haut. Quelle est la longueur de sa diagonale ?",
                indice: "La diagonale coupe l'écran en deux triangles rectangles… Pythagore peut t'aider !",
                bonnesReponses: ["100", "100cm", "1m"],
                reponse: "<strong>100 cm</strong> — d'après Pythagore : d² = 80² + 60² = 6400 + 3600 = 10000, donc d = 100. C'est comme ça qu'on mesure les écrans (en pouces) ! 📺"
            }
        },

        "3A": {
            nom: "3e A",
            niveau: "3e",
            chapitresTermines: [
                "Arithmétique et nombres premiers",
                "Calcul littéral et identités remarquables",
                "Équations",
                "Théorème de Thalès"
            ],
            enCeMoment: "Trigonométrie",
            annonces: [
                { date: "15/07", texte: "Les vidéos du cours de trigonométrie sont disponibles — parfait pour réviser avant l'éval de vendredi. 🎬" },
                { date: "08/07", texte: "Brevet blanc : les dates sont fixées, on commencera les révisions après ce chapitre. 🎯" }
            ],
            devoirs: [
                { pour: "mardi 21/07", texte: "Exercices 8 et 9 p. 203 (calculer un angle avec la calculatrice)" }
            ],
            prochaineEval: { date: "2026-07-24", titre: "Éval — Trigonométrie (cos, sin, tan)" },
            comportement: {
                niveau: 90,
                message: "Classe au top, un plaisir de vous faire cours. 👏"
            },
            defi: {
                id: "3A-2026-s38",
                question: "Un skateur descend une rampe de 4 m qui fait un angle de 30° avec le sol. De quelle hauteur part-il ?",
                indice: "Fais un schéma : la rampe est l'hypoténuse, la hauteur est le côté opposé à l'angle… sin ou cos ?",
                bonnesReponses: ["2", "2m", "200cm"],
                reponse: "<strong>2 m</strong> — sin(30°) = hauteur ÷ 4, donc hauteur = 4 × sin(30°) = 4 × 0,5 = 2. 🛹"
            }
        },

        "3B": {
            nom: "3e B",
            niveau: "3e",
            chapitresTermines: [
                "Arithmétique et nombres premiers",
                "Calcul littéral et identités remarquables",
                "Équations"
            ],
            enCeMoment: "Théorème de Thalès",
            annonces: [
                { date: "14/07", texte: "Rappel : ceux qui n'ont pas rendu le DM n°6, dernier délai lundi ! ⏰" }
            ],
            devoirs: [
                { pour: "lundi 20/07", texte: "Exercices 5 et 6 p. 187 (configuration de Thalès)" },
                { pour: "jeudi 23/07", texte: "Préparer les questions sur le cours pour la séance de révisions" }
            ],
            prochaineEval: { date: "2026-07-30", titre: "Éval — Théorème de Thalès" },
            comportement: {
                niveau: 40,
                message: "Batterie faible : trop d'agitation. On repart du bon pied lundi, je compte sur vous."
            },
            defi: {
                id: "3B-2026-s38",
                question: "Pour mesurer la hauteur d'un arbre, Léa plante un bâton d'1 m qui fait une ombre de 60 cm. Au même moment, l'ombre de l'arbre mesure 4,20 m. Quelle est la hauteur de l'arbre ?",
                indice: "Les rayons du soleil sont parallèles… deux triangles, une même proportion : c'est Thalès !",
                bonnesReponses: ["7", "7m", "700cm"],
                reponse: "<strong>7 m</strong> — hauteur ÷ 4,20 = 1 ÷ 0,60, donc hauteur = 4,20 ÷ 0,60 = 7. La méthode de Thalès lui-même pour mesurer les pyramides ! 🌳"
            }
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

    // ---- Niveaux XP -------------------------------------------------
    // Barème des niveaux. Vous pouvez changer les noms et les seuils.
    niveauxXP: [
        { min: 0, nom: "🐣 Débutant" },
        { min: 50, nom: "🧮 Apprenti" },
        { min: 150, nom: "⚡ Calculateur" },
        { min: 300, nom: "🔥 Expert" },
        { min: 500, nom: "🏆 Légende des Maths" }
    ],

    // XP gagnés par action
    xp: {
        defi: 15,           // réussir le défi de la semaine
        defiSansIndice: 5,  // bonus si réussi sans avoir ouvert l'indice
        fidelite: 5         // revenir un jour de plus d'affilée
    }
};
