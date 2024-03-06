import { tirer, chocAvecEnnemis, hit } from "/src/js/fonctions.js";

var groupeBullets;
var groupe_ennemis; 
var level = 0; 
var levelText;
var collision;

export default class niveau3 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau3" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {

    this.load.image("Tuiles_Mars", "src/assets/Tile_NinveauMars.png");
    this.load.tilemapTiledJSON("carte_mars", "src/assets/carte_mars.json"); 
    this.load.image("vaisseau_marche", "src/assets/vaisseau_marche.png");
    this.load.image("vaisseau_recule", "src/assets/vaisseau_recule.png");
    this.load.image("vaisseau_haut_2", "src/assets/vaisseau_haut_2.png");
    this.load.image("vaisseau_haut_gauche", "src/assets/vaisseau_haut_gauche.png");
    this.load.image("vaisseau_arrêt", "src/assets/vaisseau_arrêt.png");

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

    const calque_ennemis_1 = carte_mars.createLayer(
      "ennemi",
      tileset
    )

    levelText = this.add.text(0, 0, "Level : " + level, {
      fontSize: "24px",
      fill: "#FFFFFF" //Couleur de l'écriture
    });
    levelText.setScrollFactor(0); 
    
    this.player = this.physics.add.image(100, 450,"vaisseau_marche");
    this.player.setCollideWorldBounds(true); 
    this.player.setBounce(0.2);

    this.player.vitesseMax = 800; // Vitesse maximale du vaisseau
    this.player.acceleration = 7; // Accélération du vaisseau


    // redimensionnement du monde avec les dimensions calculées via tiled
    this.physics.world.setBounds(0, 0, 6400, 610);
    // ajout du champs de la caméra de taille identique à celle du monde
    this.cameras.main.setBounds(0, 0, 6400, 610);
    // ancrage de la caméra sur le joueur
    this.cameras.main.startFollow(this.player);
    this.player.setSize(128,64);

    // creation d'un attribut direction pour le joueur, initialisée avec 'right'
    this.player.direction = 'right'; 

    this.player.peutTirer = true; 

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

  const tab_points = carte_mars.getObjectLayer("calque_ennemis_1");   
  groupe_ennemis = this.physics.add.group();

  // on fait une boucle foreach, qui parcours chaque élements du tableau tab_points  
  tab_points.objects.forEach(point => {
    if (point.name == "ennemi") {
      var nouvel_ennemi = this.physics.add.sprite(point.x, point.y, "monstre_3");    
      groupe_ennemis.add(nouvel_ennemi);
    }
  }); 

  groupe_ennemis.children.iterate(function iterateur(un_ennemi) {
    un_ennemi.setCollideWorldBounds(true); 
    un_ennemi.setBounce(1);
    un_ennemi.setVelocityX(Phaser.Math.Between(-500, 500));
    un_ennemi.setVelocityY(Phaser.Math.Between(-500, 500));
    un_ennemi.pointsVie = 3;
  });

  var timerImmunite = this.time.delayedCall(10000,
    function () {
       collision = this.physics.add.collider(this.player, groupe_ennemis, chocAvecEnnemis, null, this);
    },
    null, this);

  this.physics.add.overlap(groupeBullets, groupe_ennemis, hit, null,this);

  var monTimer = this.time.addEvent({
    delay: 20000, // ms
    callback: function () {
      collision.destroy();
      level++;
      levelText.setText("Level : " + level);
      console.log(level);
      tab_points.objects.forEach((point, index) => {
        if (point.name === "ennemi") {
            var nouvel_ennemi = this.physics.add.sprite(point.x, point.y, "monstre_2");
            groupe_ennemis.add(nouvel_ennemi);
        }
      })
      let nb = 0;
      while (nb < level * 2){
        tab_points.objects.forEach((point, index) => {
          if (point.name === "ennemi" && Phaser.Math.Between(1, 15) == 1) {
            var nouvel_ennemi = this.physics.add.sprite(point.x, point.y, "monstre_3");
            groupe_ennemis.add(nouvel_ennemi);
            nb++;
          }
        });
      }
      groupe_ennemis.children.iterate(function iterateur(un_ennemi) {
        un_ennemi.setCollideWorldBounds(true); 
        un_ennemi.setBounce(1);
        un_ennemi.setVelocityX(Phaser.Math.Between(-500, 500));
        un_ennemi.setVelocityY(Phaser.Math.Between(-500, 500));
        un_ennemi.pointsVie = 3;
      });;
      console.log(groupe_ennemis.getLength());
      var timerImmunite = this.time.delayedCall(10000,
        function () {
           collision = this.physics.add.collider(this.player, groupe_ennemis, chocAvecEnnemis, null, this);
        },
        null, this);
    },
    args: [],
    callbackScope: this,
    repeat: -1
  });

}

  update() {

// Gestion des mouvements horizontaux
if (this.clavier.left.isDown) {
  // Accélération progressive vers la gauche
  this.player.setVelocityX(Math.max(this.player.body.velocity.x - this.player.acceleration, -this.player.vitesseMax));
  this.player.setTexture("vaisseau_recule");
  this.player.direction = 'left';
} else if (this.clavier.right.isDown) {
  // Accélération progressive vers la droite
  this.player.setVelocityX(Math.min(this.player.body.velocity.x + this.player.acceleration, this.player.vitesseMax));
  this.player.setTexture("vaisseau_marche");
  this.player.direction = 'right';
} else {
  // Freinage progressif en cas de relâchement des touches horizontales
  if (this.player.body.velocity.x > 0) {
    this.player.setVelocityX(Math.max(this.player.body.velocity.x - 2 * this.player.acceleration, 0));
    this.player.setTexture("vaisseau_marche");
  } else if (this.player.body.velocity.x < 0) {
    this.player.setVelocityX(Math.min(this.player.body.velocity.x + 2 * this.player.acceleration, 0));
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
if (this.clavier.up.isDown) {
  // Accélération progressive vers le haut
  this.player.setVelocityY(Math.max(this.player.body.velocity.y - this.player.acceleration, -this.player.vitesseMax));

  // Ajout de la condition pour la texture lorsque le vaisseau monte
  if (this.player.direction === 'left') {
    this.player.setTexture("vaisseau_haut_gauche");
  } else {
    this.player.setTexture("vaisseau_haut_2");
  }
} else if (this.clavier.down.isDown) {
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
    this.player.setVelocityY(Math.max(this.player.body.velocity.y - 4 * this.player.acceleration, 0));
  } else if (this.player.body.velocity.y < 0) {
    this.player.setVelocityY(Math.min(this.player.body.velocity.y + 4 * this.player.acceleration, 0));
  }

  // Réinitialisation de la texture lorsque le vaisseau est immobile verticalement
  if (this.clavier.left.isUp && this.clavier.right.isUp && this.clavier.up.isUp && this.clavier.down.isUp) {
    if (this.player.direction === 'left') {
      this.player.setTexture("vaisseau_arrêt_recule");
    } else {
      this.player.setTexture("vaisseau_arrêt");
    }
  }
}

    if ( Phaser.Input.Keyboard.JustDown(this.boutonFeu)) {
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

    if (this.gameOver) {
      this.gameOver = false;
      var timerRestart = this.time.delayedCall(1000,
        function () {
          sauvegarderNouveauRecordEtAfficherInfos("Mars", level);
          level = 0;
          this.scene.restart();
        },
        null, this);   
    } 
    
  }

}