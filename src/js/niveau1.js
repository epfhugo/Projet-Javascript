import * as fct from "/src/js/fonctions.js";

var clavier;
var Surface;
export default class niveau1 extends Phaser.Scene {

  // constructeur de la classe
  constructor() {
    super({
      key: "niveau1" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }

  preload() {

    
    this.load.image("vaisseau_marche", "src/assets/vaisseau_marche.png"); 
    this.load.image("Tuiles_Terre", "src/assets/Tile_NiveauTerre.png");
    this.load.tilemapTiledJSON("carte_terre", "src/assets/carte_terre.json"); 

  }
 
  create() {

      const carte_lune = this.add.tilemap("carte_terre");
      const tileset = carte_lune.addTilesetImage("Tile_NiveauTerre","Tuiles_Terre");
  
      
      const Fond = carte_lune.createLayer(
        "Fond",
        tileset
      );
  
      const Planete = carte_lune.createLayer(
        "Planete",
        tileset
      );
      
      const Surface = carte_lune.createLayer(
        "Surface",
        tileset
      );

      const autre = carte_lune.createLayer(
        "autre",
        tileset
      );

      const Ville = carte_lune.createLayer(
        " Ville",
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
      
      clavier = this.input.keyboard.createCursorKeys(); 
    }
  

  update() {
 
    if (clavier.left.isDown) {
      this.player.setVelocityX(-300);
      this.player.setTexture("vaisseau_recule");

    } else if (clavier.right.isDown) {
      this.player.setVelocityX(300);
      this.player.setTexture("vaisseau_marche");

    } else {
      this.player.setVelocityX(0);
    }

    if (clavier.up.isDown) {
      this.player.setVelocityY(-300);
      if (this.player.texture.key === "vaisseau_marche") {
          this.player.setTexture("vaisseau_haut");
      } else if (this.player.texture.key === "vaisseau_recule") {
          this.player.setTexture("vaisseau_bas_gauche");
      }
  } else if (clavier.down.isDown) {
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
