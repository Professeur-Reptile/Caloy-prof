// ═══════════════════════════════════════════════════════════════
//  ⚙️  CONFIGURATION DU SITE — c'est LE fichier à modifier !
//
//  Tout le contenu du site se trouve ici. Modifiez les textes,
//  enregistrez, poussez sur GitHub : le site se met à jour.
//  (Les autres fichiers n'ont pas besoin d'être touchés.)
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
    //   • enCeMoment    : le chapitre en cours (texte libre, "" pour masquer)
    //   • annonces      : vos messages, le plus récent EN PREMIER
    //   • devoirs       : le travail à faire, avec la date de rendu
    //   • prochaineEval : date au format "AAAA-MM-JJ" ("" si rien de prévu)
    //   • defi          : le défi de la semaine (id UNIQUE à changer à
    //                     chaque nouveau défi, sinon pas de nouveaux XP !)

    classes: {

        "4A": {
            nom: "4e A",
            niveau: "4e",
            enCeMoment: "",
            annonces: [
                { date: "16/07", texte: "Bienvenue sur votre nouvel espace ! Reviens régulièrement : annonces, devoirs et défis t'attendent ici. ✨" }
            ],
            devoirs: [
                // { pour: "jeudi 18/09", texte: "Exercices 12 et 14 p. 47" }
            ],
            prochaineEval: { date: "", titre: "" },
            defi: {
                id: "4A-2026-s1",
                question: "Je suis un nombre. Si tu me multiplies par 3 puis que tu ajoutes 12, tu obtiens 30. Qui suis-je ?",
                indice: "Fais le chemin à l'envers : pars de 30, enlève 12, puis divise…",
                reponse: "<strong>6</strong> — car 6 × 3 = 18, et 18 + 12 = 30. Tu viens de résoudre l'équation 3x + 12 = 30 ! 💪"
            }
        },

        "4B": {
            nom: "4e B",
            niveau: "4e",
            enCeMoment: "",
            annonces: [
                { date: "16/07", texte: "Bienvenue sur votre nouvel espace ! Reviens régulièrement : annonces, devoirs et défis t'attendent ici. ✨" }
            ],
            devoirs: [],
            prochaineEval: { date: "", titre: "" },
            defi: {
                id: "4B-2026-s1",
                question: "Je suis un nombre. Si tu me multiplies par 3 puis que tu ajoutes 12, tu obtiens 30. Qui suis-je ?",
                indice: "Fais le chemin à l'envers : pars de 30, enlève 12, puis divise…",
                reponse: "<strong>6</strong> — car 6 × 3 = 18, et 18 + 12 = 30. Tu viens de résoudre l'équation 3x + 12 = 30 ! 💪"
            }
        },

        "4C": {
            nom: "4e C",
            niveau: "4e",
            enCeMoment: "",
            annonces: [
                { date: "16/07", texte: "Bienvenue sur votre nouvel espace ! Reviens régulièrement : annonces, devoirs et défis t'attendent ici. ✨" }
            ],
            devoirs: [],
            prochaineEval: { date: "", titre: "" },
            defi: {
                id: "4C-2026-s1",
                question: "Je suis un nombre. Si tu me multiplies par 3 puis que tu ajoutes 12, tu obtiens 30. Qui suis-je ?",
                indice: "Fais le chemin à l'envers : pars de 30, enlève 12, puis divise…",
                reponse: "<strong>6</strong> — car 6 × 3 = 18, et 18 + 12 = 30. Tu viens de résoudre l'équation 3x + 12 = 30 ! 💪"
            }
        },

        "3A": {
            nom: "3e A",
            niveau: "3e",
            enCeMoment: "",
            annonces: [
                { date: "16/07", texte: "Bienvenue sur votre nouvel espace ! Reviens régulièrement : annonces, devoirs et défis t'attendent ici. ✨" }
            ],
            devoirs: [],
            prochaineEval: { date: "", titre: "" },
            defi: {
                id: "3A-2026-s1",
                question: "Une échelle de 5 m est posée contre un mur. Son pied est à 3 m du mur. À quelle hauteur touche-t-elle le mur ?",
                indice: "Triangle rectangle + une longueur à trouver… ça sent le théorème de Pythagore !",
                reponse: "<strong>4 m</strong> — d'après Pythagore : 5² = 3² + h², donc h² = 25 − 9 = 16, et h = 4. 🪜"
            }
        },

        "3B": {
            nom: "3e B",
            niveau: "3e",
            enCeMoment: "",
            annonces: [
                { date: "16/07", texte: "Bienvenue sur votre nouvel espace ! Reviens régulièrement : annonces, devoirs et défis t'attendent ici. ✨" }
            ],
            devoirs: [],
            prochaineEval: { date: "", titre: "" },
            defi: {
                id: "3B-2026-s1",
                question: "Une échelle de 5 m est posée contre un mur. Son pied est à 3 m du mur. À quelle hauteur touche-t-elle le mur ?",
                indice: "Triangle rectangle + une longueur à trouver… ça sent le théorème de Pythagore !",
                reponse: "<strong>4 m</strong> — d'après Pythagore : 5² = 3² + h², donc h² = 25 − 9 = 16, et h = 4. 🪜"
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
        defi: 15,       // réussir le défi de la semaine
        fidelite: 5     // revenir un jour de plus d'affilée
    }
};
