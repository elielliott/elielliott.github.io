var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1, 
            speed: -3,
            gameItems: [
                {type: 'sawblade',x:400, y:groundY},
                {type: 'sawblade',x:600, y:groundY},
                {type: 'sawblade',x:900, y:groundY},
                {type: 'enemy',x: 400, y:groundY - 10},
                {type: 'enemy',x: 800, y:groundY - 100},
                {type: 'enemy',x: 1200, y:groundY - 50},
                {type: 'reward',x: 300, y:groundY - 120}
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // BEGIN EDITING YOUR CODE HERE
        
        function createSawblades (x,y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var myObstacle = game.createObstacle(hitZoneSize, damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);
            var obstacleImage = draw.bitmap('img/sawblade.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }
       
        var items = levelData.gameItems;
        for (var i = 0; i < items.length; i++) {
            var gameItem = items[i];
            var x = items[i].x;
            var y = items[i].y;
            var type = items[i].type;
            if (type === 'sawblade') {
                createSawblades(x, y);
            }
            else if (type === 'enemy') {
                createEnemy(x, y);
                
            }
            else if (type === 'reward') {
                createReward(x, y);
            }
        }
        function createEnemy (x,y) {
            var enemy =  game.createGameItem('enemy',25);
            var redSquare = draw.rect(50,50,'red');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = y;
            game.addGameItem(enemy);
            enemy.velocityX = -1;
            enemy.rotationVelocity;
            enemy.rotationalVelocity = 10;
            enemy.onPlayerCollision = function() {
                game.changeIntegrity(-10);
                console.log('The enemy has hit Halle');
            }
            enemy.onProjectileCollision = function() {
                console.log('Halle has hit the enemy');
                game.increaseScore(100);
                enemy.fadeOut();
            }
        }
        
        function createReward (x, y) {
            var reward = game.createGameItem('reward', 25);
            var yellowSquare = draw.rect(50,50, 'yellow');
            yellowSquare.x=-25;
            yellowSquare.y=-25;
            reward.addChild(yellowSquare);
            game.addGameItem(reward);
            reward.velocityX = -2;
            reward.x=x;
            reward.y=y;
            reward.onPlayerCollision = function() {
                 reward.fadeOut();
                game.increaseScore(400);
            }
            
        }
        
            
        

        
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}