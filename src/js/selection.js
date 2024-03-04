import * as fct from "/src/js/fonctions.js";

/***********************************************************************/
/** VARIABLES GLOBALES 
/***********************************************************************/

var player; // désigne le sprite du joueur
var clavier; // pour la gestion du clavier


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
    this.load.image("player", "src/assets/vaisseau_marche.png");
    this.load.image("chiffre1", "src/assets/Chiffre1.png");
    this.load.image("chiffre2", "src/assets/Chiffre2.png");
    this.load.image("chiffre3", "src/assets/Chiffre3.png");

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

    this.player = this.physics.add.image(100, 450, "player");

    this.player.setCollideWorldBounds(true);

    this.player.setBounce(0.2);

    // redimensionnement du monde avec les dimensions calculées via tiled
    this.physics.world.setBounds(0, 0, 3200, 640);
    // ajout du champs de la caméra de taille identique à celle du monde
    this.cameras.main.setBounds(0, 0, 3200, 640);
    // ancrage de la caméra sur le joueur
    this.cameras.main.startFollow(this.player);

    clavier = this.input.keyboard.createCursorKeys();

    /****************************
     *  Ajout des portes   *
     ****************************/
    this.chiffre1 = this.physics.add.staticSprite(650, 300, "chiffre1");
    this.chiffre2 = this.physics.add.staticSprite(1650, 300, "chiffre2");
    this.chiffre3 = this.physics.add.staticSprite(2650, 300, "chiffre3");
  }

  /***********************************************************************/
  /** FONCTION UPDATE 
/***********************************************************************/

  update() {
    if (clavier.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("anim_tourne_gauche", true);
    } else if (clavier.right.isDown) {
      this.player.setVelocityX(160);
    } else {
      this.player.setVelocityX(0);
    }

    if (clavier.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    } else if (clavier.down.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(330);
    }

    if (Phaser.Input.Keyboard.JustDown(clavier.space)) {
      if (this.physics.overlap(this.player, this.chiffre1))
        this.scene.switch("niveau1");
      if (this.physics.overlap(this.player, this.chiffre2))
        this.scene.switch("niveau2");
      if (this.physics.overlap(this.player, this.chiffre3))
        this.scene.switch("niveau3");
    }
  }
}