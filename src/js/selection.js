import { tirer } from "/src/js/fonctions.js";

/***********************************************************************/
/** VARIABLES GLOBALES 
/***********************************************************************/

var clavier; // pour la gestion du clavier
// mise en place d'une variable boutonFeu
var boutonFeu;  
// mise en place d'une variable groupeBullets
var groupeBullets;  

var gameOver;


  

// définition de la classe "selection"
export default class selection extends Phaser.Scene {
  constructor() {
    super({ key: "selection" }); // mettre le meme nom que le nom de la classe

  }

  /***********************************************************************/
  /** FONCTION PRELOAD 
  /***********************************************************************/

  /** La fonction preload est appelée une et une seule fois,
   * lors du chargement de la scene dans le jeu.
   * On y trouve surtout le chargement des assets (images, son ..)
   */
  preload() {
    // tous les assets du jeu sont placés dans le sous-répertoire src/assets/

    this.load.image("monstre_1", "src/assets/monstre_1.png");
    this.load.image("monstre_2", "src/assets/monstre_2.png");
    this.load.image("help", "src/assets/help.png");
    this.load.image("bullet", "src/assets/balle.png");
    this.load.image("chiffre1", "src/assets/Chiffre1.png");
    this.load.image("chiffre2", "src/assets/Chiffre2.png");
    this.load.image("chiffre3", "src/assets/Chiffre3.png");
    this.load.image("vaisseau_marche", "src/assets/vaisseau_marche.png");
    this.load.image("vaisseau_arrêt_recule", "src/assets/vaisseau_arrêt_recule.png");
    this.load.image("vaisseau_recule", "src/assets/vaisseau_recule.png");
    this.load.image("vaisseau_haut_2", "src/assets/vaisseau_haut_2.png");
    this.load.image("vaisseau_haut_gauche", "src/assets/vaisseau_haut_gauche.png");
    this.load.image("vaisseau_arrêt", "src/assets/vaisseau_arrêt.png");
    this.load.image("monstre_3", "src/assets/monstre_3.png");

    // chargement tuiles de jeu
    this.load.image("Phaser_tuilesdejeu", "src/assets/Tile_NiveauLune.png");

    // chargement de la carte
    this.load.tilemapTiledJSON("carte", "src/assets/carte_accueil.json");
  }

  /***********************************************************************/
  /** FONCTION CREATE 
/***********************************************************************/

  /* La fonction create est appelée lors du lancement de la scene
   * si on relance la scene, elle sera appelée a nouveau
   * on y trouve toutes les instructions permettant de créer la scene
   * placement des peronnages, des sprites, des platesformes, création des animations
   * ainsi que toutes les instructions permettant de planifier des evenements
   */
  create() {
  
    const carteDuNiveau = this.add.tilemap("carte");

    // chargement du jeu de tuiles
    const tileset = carteDuNiveau.addTilesetImage("Tile_NiveauLune", "Phaser_tuilesdejeu");

    // chargement du calque calque_background
    const calque_background = carteDuNiveau.createLayer("Fond", tileset);

    // chargement du calque calque_background_2
    const calque_background_2 = carteDuNiveau.createLayer("Planète", tileset);

    /****************************
    *  Ajout des Chiffres  *
    ****************************/
    this.help = this.physics.add.staticSprite(1000, 590, "help");
    this.chiffre1 = this.physics.add.staticSprite(350, 330, "chiffre1");
    this.chiffre2 = this.physics.add.staticSprite(980, 330, "chiffre2");
    this.chiffre3 = this.physics.add.staticSprite(1600, 330, "chiffre3");

    this.chiffre1.setScale(0.7); 
    this.chiffre2.setScale(0.7);
    this.chiffre3.setScale(0.7);

    /****************************
    *  Ajout du player *
    ****************************/
    this.player = this.physics.add.image(100, 450, "vaisseau_marche"); 
    this.player.setSize(128,64);
    this.player.setCollideWorldBounds(true);
    this.player.setBounce(0.2);

    this.player.vitesseMax = 800; // Vitesse maximale du vaisseau
    this.player.acceleration = 6; // Accélération du vaisseau

    // redimensionnement du monde avec les dimensions calculées via tiled
    this.physics.world.setBounds(0, 0, 1850, 640);
    // ajout du champs de la caméra de taille identique à celle du monde
    this.cameras.main.setBounds(0, 0, 1850, 640);
    // ancrage de la caméra sur le joueur
    this.cameras.main.startFollow(this.player);

    // creation d'un attribut direction pour le joueur, initialisée avec 'right'
    this.player.direction = 'right'; 

    this.player.peutTirer = true; 

    // création d'un groupe d'éléments vide
    groupeBullets = this.physics.add.group();

    clavier = this.input.keyboard.createCursorKeys(); 

    // affectation de la touche A à boutonFeu
    boutonFeu = this.input.keyboard.addKey('A'); 

    // instructions pour les objets surveillés en bord de monde
    this.physics.world.on("worldbounds", function(body) {
      // on récupère l'objet surveillé
      var objet = body.gameObject;
      // s'il s'agit d'une balle
      if (groupeBullets.contains(objet)) {
          // on le détruit
          objet.destroy();
      }
    });
  }

  /***********************************************************************/
  /** FONCTION UPDATE 
/***********************************************************************/

  update() {
 
// Gestion des mouvements horizontaux
if (clavier.left.isDown) {
  // Accélération progressive vers la gauche
  this.player.setVelocityX(Math.max(this.player.body.velocity.x - this.player.acceleration, -this.player.vitesseMax));
  this.player.setTexture("vaisseau_recule");
  this.player.direction = 'left';
} else if (clavier.right.isDown) {
  // Accélération progressive vers la droite
  this.player.setVelocityX(Math.min(this.player.body.velocity.x + this.player.acceleration, this.player.vitesseMax));
  this.player.setTexture("vaisseau_marche");
  this.player.direction = 'right';
} else {
  // Freinage progressif en cas de relâchement des touches horizontales
  if (this.player.body.velocity.x > 0) {
    this.player.setVelocityX(Math.max(this.player.body.velocity.x - this.player.acceleration, 0));
    this.player.setTexture("vaisseau_marche");
  } else if (this.player.body.velocity.x < 0) {
    this.player.setVelocityX(Math.min(this.player.body.velocity.x + this.player.acceleration, 0));
    this.player.setTexture("vaisseau_recule");
  } else {
    // Ajout de la condition pour la texture lorsque le vaisseau est immobile horizontalement
    if (this.player.direction === 'left') {
      this.player.setTexture("vaisseau_arrêt_recule");
    } else if (this.player.direction === 'right') {
      this.player.setTexture("vaisseau_arrêt");
    }
  }
}
  // Gestion des mouvements verticaux
  if (clavier.up.isDown) {
    // Accélération progressive vers le haut
    this.player.setVelocityY(Math.max(this.player.body.velocity.y - this.player.acceleration, -this.player.vitesseMax));

    // Ajout de la condition pour la texture lorsque le vaisseau monte
    if (this.player.direction === 'left') {
      this.player.setTexture("vaisseau_haut_gauche");
    } else {
      this.player.setTexture("vaisseau_haut_2");
    }
  } else if (clavier.down.isDown) {
    // Accélération progressive vers le bas
    this.player.setVelocityY(Math.min(this.player.body.velocity.y + this.player.acceleration, this.player.vitesseMax));

    // Ajout de la condition pour la texture lorsque le vaisseau descend
    if (this.player.direction === 'left') {
      this.player.setTexture("vaisseau_haut_gauche");
    } else {
      this.player.setTexture("vaisseau_haut_2");
    }
  } else {
    // Freinage progressif en cas de relâchement des touches verticales
    if (this.player.body.velocity.y > 0) {
      this.player.setVelocityY(Math.max(this.player.body.velocity.y - this.player.acceleration, 0));
    } else if (this.player.body.velocity.y < 0) {
      this.player.setVelocityY(Math.min(this.player.body.velocity.y + this.player.acceleration, 0));
    }

    // Réinitialisation de la texture lorsque le vaisseau est immobile verticalement
    if (this.player.direction === 'left') {
      this.player.setTexture("vaisseau_arrêt_recule");
    } else {
      this.player.setTexture("vaisseau_arrêt");
    }
  }

    if (Phaser.Input.Keyboard.JustDown(clavier.space)) {
      if (this.physics.overlap(this.player, this.chiffre1))
        this.scene.switch("niveau1");
      if (this.physics.overlap(this.player, this.chiffre2))
        this.scene.switch("niveau2");
      if (this.physics.overlap(this.player, this.chiffre3))
        this.scene.switch("niveau3");
    }

    if ( Phaser.Input.Keyboard.JustDown(boutonFeu)) {
      if (this.player.peutTirer == true) {
        tirer(this.player, groupeBullets);
        this.player.peutTirer = false; // on désactive la possibilté de tirer
        // on la réactive dans 2 secondes avec un timer
        var timerTirOk = this.time.delayedCall(1000,
           function () {
            this.player.peutTirer = true;
        },
        null, this);  
      }
    }  
  }
}