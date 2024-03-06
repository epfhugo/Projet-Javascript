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
  bullet.setVelocity(1000 * coefDir, 0); // vitesse en x et en y
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
  } 
  bullet.destroy();
}  