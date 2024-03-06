

export default class menu extends Phaser.Scene {
constructor() {
    super({key : "menu"});
    this.planet;
} 
  
  preload() {
    this.load.image("Règles", "src/assets/Règles.png");
    this.load.image("bouton_play", "src/assets/bouton_play.png");
    this.load.image("bouton_play", "src/assets/bouton_play.png");
    this.load.image("bouton_quit", "src/assets/bouton_quit.png");
    this.load.image("spaceBattle_bouton", "src/assets/spaceBattle_bouton.png");
    this.load.image("lune_fond", "src/assets/lune_fond.png");
    this.load.image("fond_terre", "src/assets/fond_terre.png");
    this.load.image("mars_fond", "src/assets/mars_fond.png");
    this.load.image("vaisseau_marche", "src/assets/vaisseau_marche.png");
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
   // on place les éléments de fond
   

  this.add.image(0, 0).setOrigin(0).setDepth(0).setScale(60,19);

  var bouton_règle = this.add.image(980, 530, "Règles").setDepth(2);
  bouton_règle.setScale(1,1);
  bouton_règle.setInteractive();

  var bouton_play = this.add.image(970, 300, "bouton_play").setDepth(2);
  bouton_play.setScale(1,1);
  bouton_play.setInteractive();

  var bouton_quit = this.add.image(975, 420, "bouton_quit").setDepth(2);
  bouton_quit.setScale(1,1);
  bouton_quit.setInteractive();

  var bouton_SpaceBattle = this.add.image(975, 125, "spaceBattle_bouton").setDepth(2);
  bouton_SpaceBattle.setScale(2.4,2.4);
  bouton_SpaceBattle.setInteractive();

  var fond_lune = this.add.image(1500, 310, "lune_fond").setDepth(1);
  fond_lune.setScale(1,1);
  fond_lune.setInteractive();

  var fond_mars = this.add.image(440, 295, "mars_fond").setDepth(1);
  fond_mars.setScale(1,1.05);
  fond_mars.setInteractive();

  var vaisseau = this.add.image(500, 350, "vaisseau_marche").setDepth(1);
  vaisseau.setScale(1,1.05);
  vaisseau.setInteractive();

  bouton_play.on("pointerover", () => {
  bouton_play.setTint(0x00FF00); // Change la teinte du bouton 
   });

  bouton_play.on("pointerup", () => {
  this.scene.start("selection");
  });

  bouton_play.on("pointerout", () => {
  bouton_play.clearTint(); // Réinitialise la teinte du bouton
  });

  bouton_règle.on("pointerover", () => {
  bouton_règle.setTint(0x00FF00); // Change la teinte du bouton 
  });

  bouton_règle.on("pointerout", () => {
  bouton_règle.clearTint(); // Réinitialise la teinte du bouton
  });

  bouton_quit.on("pointerover", () => {
  bouton_quit.setTint(0x00FF00); // Change la teinte du bouton 
  });

  bouton_quit.on("pointerout", () => {
  bouton_quit.clearTint(); // Réinitialise la teinte du bouton
   });

   bouton_quit.on("pointerup", () => {
   this.scene.stop("menu");
   window.close();

    });

  }
      
  update() {

  } 

}