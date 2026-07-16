<?php
// ═══════════════════════════════════════════════════════════════
//  Points de classe pour les défis (même principe que compteur.php)
//
//  Chaque défi ne peut être marqué qu'UNE fois par classe : le
//  premier élève qui trouve fait gagner les points à sa classe.
//
//  GET  defis.php            → { totaux: {"4A": 120, …},
//                                marques: {"4A": ["jour:4e:2026-09-01", …] } }
//  POST defis.php  (JSON)    → { classe, defi, points }
//       réponse              → { deja: bool, points: gagnés, total: de la classe }
// ═══════════════════════════════════════════════════════════════

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$fichier = 'defis-data.json';
$fp = fopen($fichier, 'c+');
flock($fp, LOCK_EX); // évite les écritures simultanées (2 élèves en même temps)

$contenu = stream_get_contents($fp);
$data = $contenu ? json_decode($contenu, true) : null;
if (!is_array($data)) {
    $data = ['totaux' => [], 'marques' => []];
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $corps  = json_decode(file_get_contents('php://input'), true) ?: [];
    $classe = preg_replace('/[^A-Za-z0-9_-]/', '', (string)($corps['classe'] ?? ''));
    $defi   = preg_replace('/[^A-Za-z0-9:_-]/', '', (string)($corps['defi'] ?? ''));
    $points = max(0, min(50, (int)($corps['points'] ?? 0))); // garde-fou

    if ($classe === '' || $defi === '' || $points === 0) {
        http_response_code(400);
        echo json_encode(['erreur' => 'requête invalide']);
    } else {
        $deja = in_array($defi, $data['marques'][$classe] ?? [], true);
        if (!$deja) {
            $data['marques'][$classe][] = $defi;
            $data['totaux'][$classe] = ($data['totaux'][$classe] ?? 0) + $points;
            ftruncate($fp, 0);
            rewind($fp);
            fwrite($fp, json_encode($data));
        }
        echo json_encode([
            'deja'   => $deja,
            'points' => $deja ? 0 : $points,
            'total'  => $data['totaux'][$classe] ?? 0
        ]);
    }
} else {
    echo json_encode([
        'totaux'  => (object)$data['totaux'],
        'marques' => (object)$data['marques']
    ]);
}

flock($fp, LOCK_UN);
fclose($fp);
?>
