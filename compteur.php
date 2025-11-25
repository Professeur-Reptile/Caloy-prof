<?php
// Fichier pour stocker le compteur
$fichier = 'compteur.txt';

// Lire le compteur actuel
if (file_exists($fichier)) {
    $visites = (int)file_get_contents($fichier);
} else {
    $visites = 0;
}

// Incrémenter
$visites++;

// Sauvegarder
file_put_contents($fichier, $visites);

// Retourner le résultat en JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Si besoin pour CORS
echo json_encode(['visites' => $visites]);
?>
