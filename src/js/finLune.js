// définition de la classe "selection"
export default class finLune extends Phaser.Scene {
  constructor() {
    super({ key: "finLune" }); // mettre le meme nom que le nom de la classe
  }


  /***********************************************************************/
  /** FONCTION PRELOAD 
  /***********************************************************************/

  /** La fonction preload est appelée une et une seule fois,
   * lors du chargement de la scene dans le jeu.
   * On y trouve surtout le chargement des assets (images, son ..)
   */
  preload() {
    this.load.image("lune", "src/assets/lune.png");
    this.load.image("fond", "src/assets/fond.png");
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

    this.musique_fond = this.sound.add('musique_menu'); 
    this.musique_fond.play(); 

    this.add.image(0, 0).setOrigin(0).setDepth(0).setScale(60,19);

    var fond = this.add.image(960, 300, "fond").setDepth(2);
    fond.setScale(1.5,1.5);

    var lune = this.add.image(920, 300, "lune").setDepth(2);
    lune.setScale(1,1);

    var monstre1 = this.add.image(350, 300, "monstre_1").setDepth(2);
    monstre1.setScale(2,2);

    var monstre11 = this.add.image(1450, 300, "monstre_1").setDepth(2);
    monstre11.setScale(2,2);

    var bouton_quit = this.add.image(920, 300, "bouton_quit").setDepth(2);
    bouton_quit.setScale(1,1);
    bouton_quit.setInteractive();

    bouton_quit.on("pointerover", () => {
      bouton_quit.setTint(0x00FF00); // Change la teinte du bouton 
    });

    bouton_quit.on("pointerout", () => {
      bouton_quit.clearTint(); // Réinitialise la teinte du bouton
    });

    bouton_quit.on("pointerup", () => {
      this.musique_fond.stop();
      this.scene.start("menu");
    });

    const meilleurScore = parseInt(localStorage.getItem(`meilleurScore_${'lune'}`)) || 0;
    const meilleureVague = parseInt(localStorage.getItem(`meilleureVague_${'lune'}`)) || 0;
    const dernierScore = parseInt(localStorage.getItem(`dernierScore_${'lune'}`)) || 0;
    const derniereVague = parseInt(localStorage.getItem(`derniereVague_${'lune'}`)) || 0;

    var dernierScoreText = this.add.text(100, 10, " Score : " + dernierScore, {
      fontSize: "72px",
      fill: "#FFFFFF" //Couleur de l'écriture
    }).setDepth(3);

    var meilleurScoreText = this.add.text(5, 520, " Meilleur Score : " + meilleurScore, {
      fontSize: "72px",
      fill: "#FFFFFF" //Couleur de l'écriture
    }).setDepth(3);

    var derniereVagueText = this.add.text(1200, 10, " Vague : " + derniereVague, {
      fontSize: "72px",
      fill: "#FFFFFF" //Couleur de l'écriture
    }).setDepth(3);

    var meilleureVagueText = this.add.text(1050, 520, " Meilleur Vague : " + meilleureVague, {
      fontSize: "72px",
      fill: "#FFFFFF" //Couleur de l'écriture
    }).setDepth(3);
  }

  /***********************************************************************/
  /** FONCTION UPDATE 
/***********************************************************************/

  update() {
  }
}