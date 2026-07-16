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

// Sauvegarder (LOCK_EX évite de perdre des visites en cas d'accès simultanés)
file_put_contents($fichier, $visites, LOCK_EX);

// Retourner le résultat en JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Si besoin pour CORS
echo json_encode(['visites' => $visites]);
?>
