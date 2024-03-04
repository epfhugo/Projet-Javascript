import * as fct from "/src/js/fonctions.js";

export default class niveau1 extends Phaser.Scene {



  // constructeur de la classe
  constructor() {
    super({
      key: "niveau1" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }



  preload() {
    this.load.tilemapTiledJSON("carte_lune", "src/assets/carte_lune.json"); 
    this.load.image("vaisseau", "src/assets/vaisseau_marche.png"); 
    this.load.image("monstre", "src/assets/monstre_2.png");
  }

  create() {
    const carte_lune = this.add.tilemap("carte_lune");

    const Surface = carteDuNiveau.createLayer(
      "Surface",
      tileset
    );

    const Planete = carteDuNiveau.createLayer(
      "Planete",
      tileset
    );

    const Fond = carteDuNiveau.createLayer(
      "Fond",
      tileset
    );

    player = this.physics.add(vaisseau);

    player.setCollideWorldBounds(true); 

    player.setBounce(0.2);

    

    clavier = this.input.keyboard.createCursorKeys(); 
  }

  update() {
    
  }
}
