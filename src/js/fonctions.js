export function doNothing() {
    // cette fonction ne fait rien.
    // c'est juste un exemple pour voir comment mettre une fonction
    // dans un fichier et l'utiliser dans les autres
}


export function doAlsoNothing() {
    // cette fonction ne fait rien non plus.
}

export function tirer(player, groupeBullets) {
  var coefDir;
  if (player.direction == 'left') { coefDir = -1; } else { coefDir = 1 }
  // on crée la balle a coté du joueur
  var bullet = groupeBullets.create(player.x + (25 * coefDir), player.y - 4, 'bullet');
  // parametres physiques de la balle.
  bullet.setCollideWorldBounds(true);
  bullet.body.onWorldBounds = true;  
  bullet.body.allowGravity =false;
  bullet.setVelocity(2000 * coefDir, 0); // vitesse en x et en y
}  

export function chocAvecEnnemis(un_player, un_groupe_ennemies) {
    this.physics.pause();
    this.player.setTint(0xff0000);
    this.gameOver = true;
} 

export function hit (bullet, ennemi) {
  ennemi.pointsVie--;
  if (ennemi.pointsVie==0) {
    ennemi.destroy(); 
    this.score+= 10;
  } 
  bullet.destroy();
}  

export function sauvegarderNouveauRecordEtAfficherInfos(planet, vague, score) {
  // Récupérer le meilleur score, la meilleure vague, le dernier score et la dernière vague pour la planète depuis le Local Storage
  const meilleurScore = parseInt(localStorage.getItem(`meilleurScore_${planet}`)) || 0;
  const meilleureVague = parseInt(localStorage.getItem(`meilleureVague_${planet}`)) || 0;

  // Vérifier si le score actuel est un nouveau record
  if (score > meilleurScore) {
    // Mettre à jour le meilleur score pour la planète dans le Local Storage
    localStorage.setItem(`meilleurScore_${planet}`, score);
  }

  // Vérifier si la vague actuelle est une nouvelle meilleure vague
  if (vague > meilleureVague) {
    // Mettre à jour la meilleure vague pour la planète dans le Local Storage
    localStorage.setItem(`meilleureVague_${planet}`, vague);
  }

  // Mettre à jour le dernier score pour la planète dans le Local Storage
  localStorage.setItem(`dernierScore_${planet}`, score);

  // Mettre à jour la dernière vague pour la planète dans le Local Storage
  localStorage.setItem(`derniereVague_${planet}`, vague);

  const dernierScore = parseInt(localStorage.getItem(`dernierScore_${planet}`)) || 0;
  const derniereVague = parseInt(localStorage.getItem(`derniereVague_${planet}`)) || 0;

  console.log("Meilleur Score:", meilleurScore);
  console.log("Meilleure Vague:", meilleureVague);
  console.log("Dernier Score:", dernierScore);
  console.log("Dernière Vague:", derniereVague);
}