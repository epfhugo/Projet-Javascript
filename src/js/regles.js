
export default class regles extends Phaser.Scene {
  constructor() {
    super({ key: "regles" });
  }

  preload() {
    this.load.image("règles 1", "src/assets/règles 1.png");
    this.load.image("règles 2", "src/assets/règles 2.png");
    this.load.image("bouton_quit - Copie", "src/assets/bouton_quit - Copie.png");

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

    this.add.image(0, 0).setOrigin(0).setDepth(0).setScale(60, 19);

    var règle1 = this.add.image(1250, 300, "règles 2").setDepth(2);
    règle1.setScale(1.2, 1.18);
    règle1.setInteractive();

    var règle2 = this.add.image(570, 300, "règles 1").setDepth(2);
    règle2.setScale(0.8, 0.8);
    règle2.setInteractive();

    var bouton_quit = this.add.image(1790, 500, "bouton_quit - Copie").setDepth(2);
    bouton_quit.setScale(1, 1);
    bouton_quit.setInteractive();

    bouton_quit.on("pointerover", () => {
      bouton_quit.setTint(0x00FF00); // Change la teinte du bouton 
    });

    bouton_quit.on("pointerout", () => {
      bouton_quit.clearTint(); // Réinitialise la teinte du bouton
    });

    bouton_quit.on("pointerup", () => {
      this.scene.start("menu");
      this.scene.stop('regles');

    });

  }

  update() {



  }
}