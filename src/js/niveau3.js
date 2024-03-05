import {tirer} from "/src/js/fonctions.js";

var groupeBullets;

export default class niveau3 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau3" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {

    this.load.image("vaisseau_marche", "src/assets/vaisseau_marche.png"); 
    this.load.image("Tuiles_Mars", "src/assets/Tile_NinveauMars.png");
    this.load.tilemapTiledJSON("carte_mars", "src/assets/carte_mars.json"); 
  }

  create() {

    const carte_mars = this.add.tilemap("carte_mars");
    const tileset = carte_mars.addTilesetImage("Tile_NinveauMars",'Tuiles_Mars');

    
    const Fond = carte_mars.createLayer(
      "Fond",
      tileset
    );

    const autre = carte_mars.createLayer(
      "autre",
      tileset
    );

    const Surface = carte_mars.createLayer(
      "Surface",
      tileset
    );


    const Planete = carte_mars.createLayer(
      "Planete",
      tileset
    );
    
    this.player = this.physics.add.image(100, 450,"vaisseau_marche");
    this.player.setCollideWorldBounds(true); 
    this.player.setBounce(0.2);

    // redimensionnement du monde avec les dimensions calculées via tiled
    this.physics.world.setBounds(0, 0, 6400, 610);
    // ajout du champs de la caméra de taille identique à celle du monde
    this.cameras.main.setBounds(0, 0, 6400, 610);
    // ancrage de la caméra sur le joueur
    this.cameras.main.startFollow(this.player);

    // creation d'un attribut direction pour le joueur, initialisée avec 'right'
    this.player.direction = 'right'; 

    groupeBullets = this.physics.add.group();

    this.clavier = this.input.keyboard.createCursorKeys(); 

    // affectation de la touche A à boutonFeu
    this.boutonFeu = this.input.keyboard.addKey('A'); 

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

  update() {

    if (this.clavier.left.isDown) {
      this.player.setVelocityX(-300);
      this.player.setTexture("vaisseau_recule");
      this.player.direction = 'left'

    } else if (this.clavier.right.isDown) {
      this.player.setVelocityX(300);
      this.player.setTexture("vaisseau_marche");
      this.player.direction = 'right'

    } else {
      this.player.setVelocityX(0);
    }

    if (this.clavier.up.isDown) {
      this.player.setVelocityY(-300);
      if (this.player.texture.key === "vaisseau_marche") {
          this.player.setTexture("vaisseau_haut");
      } else if (this.player.texture.key === "vaisseau_recule") {
          this.player.setTexture("vaisseau_bas_gauche");
      }
    } else if (this.clavier.down.isDown) {
        this.player.setVelocityY(300);
        if (this.player.texture.key === "vaisseau_marche") {
            this.player.setTexture("vaisseau_bas");
        } else if (this.player.texture.key === "vaisseau_recule") {
            this.player.setTexture("vaisseau_haut_gauche");
        }
    } else {
        // Réinitialisation de la vélocité verticale lorsque la touche du haut ou du bas n'est pas enfoncée
        this.player.setVelocityY(0);
        if (this.player.texture.key === "vaisseau_haut" || this.player.texture.key === "vaisseau_bas") {
            this.player.setTexture("vaisseau_marche");
        } else if (this.player.texture.key === "vaisseau_haut_gauche" || this.player.texture.key === "vaisseau_bas_gauche") {
            this.player.setTexture("vaisseau_recule");
        }
    } 

    if ( Phaser.Input.Keyboard.JustDown(this.boutonFeu)) {
      tirer(this.player, groupeBullets);
    }
  }
}
