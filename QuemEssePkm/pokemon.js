var game = new Phaser.Game(1200, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

var pokemon;
var acertos = new Array(151);
var nAcertos = 0;
var escolhido = false;
var nEscolhido;

var textStyle = { font: "32px Arial", align: 'center', fill: "#fff"};
var timer;
var milliseconds = 0;
var seconds = 0;
var minutes = 0;

function preload() {
    game.load.image('bg', 'img/deepblue.png');
    game.load.image('box', 'img/boxRedN.png');
    game.load.spritesheet('pokemon', 'img/pokemon.png', 66, 66, 151);

}

function create() {
    LARGURA = game.world.width;
    ALTURA = game.world.height;
    
    game.add.image(0, 0, 'bg');
    
    //Animação do sorteio
    pokemon = game.add.sprite(545, 150, 'pokemon');
    pokemon.scale.setTo(2, 2);
    pokemon.tint = 0x000000;
    pokemon.animations.add('sortear');
    pokemon.animations.play('sortear', 20, true);
       
    //Criando botões e nomes
    var larguraBox = game.cache.getImage('box').width;
    var alturaBox = game.cache.getImage('box').height;
    var espaco = 20;
    var coluna = 0;
    var linha = 0;
    for (var i = 0; i < 151; i++){
        var previsao = (linha * alturaBox) + alturaBox;
        if ( previsao > ALTURA ) {
            linha = 0;
            coluna++;
        }
        if (coluna > 3){
            x = (coluna * larguraBox) + 310;
        }else{
            x = (coluna * larguraBox);
        }
        y = (linha * alturaBox);
        var box = game.add.sprite( x, y, 'box');      
        box.name = i;
        box.inputEnabled = true;
        box.input.useHandCursor = true;
        box.events.onInputDown.add(escolherPokemon, this);
        var nomeEspc = 10;
        if (i > 8) nomeEspc = 5;
        if (i > 98) nomeEspc = 1;
        nome = getNome(i);
        text = game.add.text(x+nomeEspc, y+7, i+1 + " " + nome, {
        font: "14px Arial",
        fill: "#ffffff"
               });
        linha++;
    }
    
    //Colocando Titulo
    tituloX = 480;
    tituloY = 10;
    var style = { font: "bold 32px Arial", fill: "#fff", align: "center", boundsAlignH: "center", boundsAlignV: "middle" };
    //  The Text is positioned at 0, 100
    titleText = game.add.text(tituloX, tituloY, "EU SEI MAIS DE\nPOKEMON\nQUE VOCÊ!", style);
    titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    
    timer = game.add.text(555, 300, '00:00:00', textStyle);
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    
    sortearPokemon();
    

}

function update() {
    
    updateTimer();
    
}

function sortearPokemon(){
    if (!escolhido){
        nEscolhido = Math.floor(Math.random() * (151 - 1 + 1)) + 1;
        while (acertos[nEscolhido] == 1){
            nEscolhido = Math.floor(Math.random() * (151 - 1 + 1)) + 1;
        }
        pararSorteio();
        sortearFrame(nEscolhido);
        revelar();
        escolhido = true;
    }
}

function updateTimer() {

   // minutes = Math.floor(game.time.time / 60000) % 60;
    
    minutes = Math.floor(this.game.time.totalElapsedSeconds() / 60);
    
    seconds = Math.floor(this.game.time.totalElapsedSeconds()) - (60 * minutes);
    if (seconds < 10 ) seconds = '0'+seconds;
    if (minutes < 10 ) minutes = '0'+minutes;
    
    //seconds = Math.floor(game.time.time / 1000) % 60;

    //milliseconds = Math.floor(game.time.time) % 100;

    //If any of the digits becomes a single digit number, pad it with a zero
    //if (milliseconds < 10){
    //milliseconds = '0' + milliseconds;
    //}
    //if (seconds < 10){
    //seconds = '0' + seconds;
    //}
    //if (minutes < 10){
    //minutes = '0' + minutes;
    //}
    //timer.setText(minutes + ':'+ seconds + ':' + milliseconds);
    timer.setText(minutes + ':'+ seconds);

}


function pararSorteio() {
    pokemon.animations.stop();
}

function iniciarSorteio() {
    pokemon.animations.play('sortear', 15, true);
}

function sortearFrame(nEscolhido) {
    pokemon.animations.frame = nEscolhido;
}

function revelar () {
    pokemon.tint = 0xffffff;
}

function acertouBox (sprite) {
    sprite.tint = 0x00ff00;
    acertos[sprite.name] = 1;
    nAcertos++;
    sprite.events.onInputDown.remove(escolherPokemon, this);
}

function errouBox (sprite) {
    sprite.tint = 0xff0000;
}

function escolherPokemon (sprite) {
    if(!escolhido) return;
    
    console.log(sprite.name + " - " + nEscolhido);
    
    if(sprite.name == nEscolhido){
        acertouBox(sprite);
    }else{
        errouBox(sprite);
    }
    escolhido = false;
    sortearPokemon();
}

function getNome(i){
    var nome = [
    "Bulbasaur",
    "Ivysaur",
    "Venusaur",
    "Charmander",
    "Charmeleon",
    "Charizard",
    "Squirtle",
    "Wartortle",
    "Blastoise",
    "Caterpie",
    "Metapod",
    "Butterfree",
    "Weedle",
    "Kakuna",
    "Beedrill",
    "Pidgey",
    "Pidgeotto",
    "Pidgeot",
    "Rattata",
    "Raticate",
    "Spearow",
    "Fearow",
    "Ekans",
    "Arbok",
    "Pikachu",
    "Raichu",
    "Sandshrew",
    "Sandslash",
    "Nidoran",
    "Nidorina",
    "Nidoqueen",
    "Nidoran",
    "Nidorino",
    "Nidoking",
    "Clefairy",
    "Clefable",
    "Vulpix",
    "Ninetales",
    "Jigglypuff",
    "Wigglytuff",
    "Zubat",
    "Golbat",
    "Oddish",
    "Gloom",
    "Vileplume",
    "Paras",
    "Parasect",
    "Venonat",
    "Venomoth",
    "Diglett",
    "Dugtrio",
    "Meowth",
    "Persian",
    "Psyduck",
    "Golduck",
    "Mankey",
    "Primeape",
    "Growlithe",
    "Arcanine",
    "Poliwag",
    "Poliwhirl",
    "Poliwrath",
    "Abra",
    "Kadabra",
    "Alakazam",
    "Machop",
    "Machoke",
    "Machamp",
    "Bellsprout",
    "Weepinbell",
    "Victreebel",
    "Tentacool",
    "Tentacruel",
    "Geodude",
    "Graveler",
    "Golem",
    "Ponyta",
    "Rapidash",
    "Slowpoke",
    "Slowbro",
    "Magnemite",
    "Magneton",
    "Farfetch'd",
    "Doduo",
    "Dodrio",
    "Seel",
    "Dewgong",
    "Grimer",
    "Muk",
    "Shellder",
    "Cloyster",
    "Gastly",
    "Haunter",
    "Gengar",
    "Onix",
    "Drowzee",
    "Hypno",
    "Krabby",
    "Kingler",
    "Voltorb",
    "Electrode",
    "Exeggcute",
    "Exeggutor",
    "Cubone",
    "Marowak",
    "Hitmonlee",
    "Hitmonchan",
    "Lickitung",
    "Koffing",
    "Weezing",
    "Rhyhorn",
    "Rhydon",
    "Chansey",
    "Tangela",
    "Kangaskhan",
    "Horsea",
    "Seadra",
    "Goldeen",
    "Seaking",
    "Staryu",
    "Starmie",
    "Mr. Mime",
    "Scyther",
    "Jynx",
    "Electabuzz",
    "Magmar",
    "Pinsir",
    "Tauros",
    "Magikarp",
    "Gyarados",
    "Lapras",
    "Ditto",
    "Eevee",
    "Vaporeon",
    "Jolteon",
    "Flareon",
    "Porygon",
    "Omanyte",
    "Omastar",
    "Kabuto",
    "Kabutops",
    "Aerodactyl",
    "Snorlax",
    "Articuno",
    "Zapdos",
    "Moltres",
    "Dratini",
    "Dragonair",
    "Dragonite",
    "Mewtwo",
    "Mew"
    ];
    
    return nome[i];
}
