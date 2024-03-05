import {tirer} from "/src/js/fonctions.js";

var groupeBullets;
var groupe_ennemis; 

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

    /*****************************************************
   *  ajout du modele de mobilite des ennemis *
   ******************************************************/
  // par défaut, on va a gauche en utilisant la meme animation que le personnage
  groupe_ennemis.children.iterate(function iterateur(un_ennemi) {
    un_ennemi.setVelocityX(-40);
    un_ennemi.direction = "gauche";
    un_ennemi.setTexture("monstre_3");
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
    tirer(this.player, groupeBullets);
  }
  groupe_ennemis.children.iterate(function iterateur(un_ennemi) {
    if (un_ennemi.direction == "gauche" && un_ennemi.body.blocked.down) {
      var coords = un_ennemi.getBottomLeft();
      var tuileSuivante = calque_plateformes.getTileAtWorldXY(
        coords.x,
        coords.y + 10
      );
      if (tuileSuivante == null || un_ennemi.body.blocked.left) {
        // on risque de marcher dans le vide, on tourne
        un_ennemi.direction = "droite";
        un_ennemi.setVelocityX(40);
      }
    } else if (un_ennemi.direction == "droite" && un_ennemi.body.blocked.down) {
      var coords = un_ennemi.getBottomRight();
      var tuileSuivante = calque_plateformes.getTileAtWorldXY(
        coords.x,
        coords.y + 10
      );
      if (tuileSuivante == null || un_ennemi.body.blocked.right) {
        // on risque de marcher dans le vide, on tourne
        un_ennemi.direction = "gauche";
        un_ennemi.setVelocityX(-40);
        
      }
    }
  });
  
}
}