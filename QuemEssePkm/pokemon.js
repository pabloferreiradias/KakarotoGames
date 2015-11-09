var game = new Phaser.Game(1200, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('box', 'img/boxG.png');

}

function create() {

    var larguraBox = game.cache.getImage('box').width;
    var alturaBox = game.cache.getImage('box').height;
    
    LARGURA = game.world.width;
    ALTURA = game.world.height;
    
    var espaco = 20;
    var coluna = 0;
    var linha = 0;
    
    for (var i = 0; i < 151; i++){
        var previsao = (linha * alturaBox) + espaco + alturaBox;
        if ( previsao > ALTURA ) {
            linha = 0;
            coluna++;
        }
        
        var box = game.add.sprite( (coluna * larguraBox) + espaco, (linha * alturaBox) + espaco, 'box');
        
        box.name = i+1;
        box.inputEnabled = true;
        box.input.useHandCursor = true;
        box.events.onInputDown.add(destroySprite, this);
        
        linha++;
    }
    

}

function destroySprite (sprite) {

    sprite.destroy();

}
