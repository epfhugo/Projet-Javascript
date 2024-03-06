import { tirer, chocAvecEnnemis, hit } from "/src/js/fonctions.js";

var groupeBullets; 
var groupe_ennemis; 

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
    this.load.image("vaisseau_recule", "src/assets/vaisseau_recule.png");
    this.load.image("vaisseau_haut_2", "src/assets/vaisseau_haut_2.png");
    this.load.image("vaisseau_haut_gauche", "src/assets/vaisseau_haut_gauche.png");
    this.load.image("vaisseau_arrêt", "src/assets/vaisseau_arrêt.png");
  }
 
  create() {

      const carte_terre = this.add.tilemap("carte_terre");
      const tileset = carte_terre.addTilesetImage("Tile_NiveauTerre","Tuiles_Terre");
  
      const Fond = carte_terre.createLayer(
        "Fond",
        tileset
      );
  
      const Planete = carte_terre.createLayer(
        "Planete",
        tileset
      );
      
      const Surface = carte_terre.createLayer(
        "Surface",
        tileset
      );

      const autre = carte_terre.createLayer(
        "autre",
        tileset
      );

      const Ville = carte_terre.createLayer(
        "Ville",
        tileset
      );

      const calque_ennemi = carte_terre.createLayer(
        "ennemi",
        tileset
      )

      this.player = this.physics.add.image(100, 450,"vaisseau_marche");
      this.player.setCollideWorldBounds(true); 
      this.player.setBounce(0.2);


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

      
    // extraction des poitns depuis le calque calque_ennemis, stockage dans tab_points
    const tab_points = carte_terre.getObjectLayer("calque_ennemi");   
    groupe_ennemis = this.physics.add.group();

    // on fait une boucle foreach, qui parcours chaque élements du tableau tab_points  
    tab_points.objects.forEach(point => {
        if (point.name == "ennemi") {
          var nouvel_ennemi = this.physics.add.sprite(point.x, point.y, "monstre_2");    
          groupe_ennemis.add(nouvel_ennemi);
        }
     }); 

    groupe_ennemis.children.iterate(function iterateur(un_ennemi) {
      un_ennemi.setCollideWorldBounds(true); 
      un_ennemi.setBounce(1);
      un_ennemi.setVelocityX(Phaser.Math.Between(-500, 500));
      un_ennemi.setVelocityY(Phaser.Math.Between(-500, 500));
      un_ennemi.pointsVie = 1;
    }); 

    this.physics.add.collider(this.player, groupe_ennemis, chocAvecEnnemis, null, this); 

    this.physics.add.overlap(groupeBullets, groupe_ennemis, hit, null,this);
  

    var monTimer = this.time.addEvent({
      delay: 5000, // ms
      callback: function () {
        tab_points.objects.forEach(point => {
          if (point.name == "ennemi") {
            var nouvel_ennemi = this.physics.add.sprite(point.x, point.y, "monstre_2");    
            groupe_ennemis.add(nouvel_ennemi);
          }
        }); 
    
        groupe_ennemis.children.iterate(function iterateur(un_ennemi) {
          un_ennemi.setCollideWorldBounds(true); 
          un_ennemi.setBounce(1);
          un_ennemi.setVelocityX(Phaser.Math.Between(-500, 500));
          un_ennemi.setVelocityY(Phaser.Math.Between(-500, 500));
          un_ennemi.pointsVie = 1;
        });;
      },
      args: [],
      callbackScope: this,
      repeat: -1
    }); 

  }

  update() {

    if (this.clavier.left.isDown) {
      this.player.setVelocityX(-450);
      this.player.setTexture("vaisseau_recule");
      this.player.direction = 'left'
    } else if (this.clavier.right.isDown) {
      this.player.setVelocityX(450);
      this.player.setTexture("vaisseau_marche");
      this.player.direction = 'right'
    } else {
      this.player.setVelocityX(0);
    }

    if (this.clavier.up.isDown) {
      this.player.setVelocityY(-500);
      if (this.player.texture.key === "vaisseau_marche") {
          this.player.setTexture("vaisseau_haut_2");
      } else if (this.player.texture.key === "vaisseau_recule") {
          this.player.setTexture("vaisseau_haut_gauche");
      }
    } else if (this.clavier.down.isDown) {
        this.player.setVelocityY(500);
        if (this.player.texture.key === "vaisseau_marche") {
            this.player.setTexture("vaisseau_haut_2");
        } else if (this.player.texture.key === "vaisseau_recule") {
            this.player.setTexture("vaisseau_haut_gauche");
        }
    } else {
        // Réinitialisation de la vélocité verticale lorsque la touche du haut ou du bas n'est pas enfoncée
        this.player.setVelocityY(0);
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
      return;
    } 

  }

}

