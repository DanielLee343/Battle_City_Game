var brick = new Array();
var player = new Player(650, 520, 1, color1);
var playerBullets = new Array();
var enemy = new Array();
var enemyBullets = new Array();
var temp = 0;
for(var i = 1; i < 9; i++)
{
	enemy[i] = new Enemy(i*90+300, 10, 3, color2, healths[2]);
	setInterval('enemy['+i+'].motion()', 30);
	setInterval('enemy['+i+'].shotPlayer()', 30);
}
enemy[9] = new Enemy(652, 260, 1, color2, healths[2]);
setInterval('enemy[9].motion()', 30);
setInterval('enemy[9].shotPlayer()', 30);
enemy[0] = new Enemy(1110, 10, 3, color7, 50);
setInterval('enemy[0].motion()', 30);
setInterval('enemy[0].shotPlayer()', 30);
var firmly = new Array();
var grass = new Array();
var river = new Array();
brick[0] = new Brick(630, 580, 4, 3);
for(var i = 1; i <= 2; i++)
	for(var j = 1; j <= 2; j++)
		brick[0].isLive[i][j] = false;
brick[1] = new Brick(290, 80, 3, 10);
brick[2] = new Brick(1035, 80, 3, 10);
brick[3] = new Brick(420, 80, 3, 10);
brick[4] = new Brick(905, 80, 3, 10);
brick[5] = new Brick(574, 80, 3, 8);
brick[6] = new Brick(706, 80, 3, 8);
brick[7] = new Brick(574, 310, 3, 3);
brick[8] = new Brick(706, 310, 3, 3);
brick[9] = new Brick(375, 350, 5, 3);
brick[10] = new Brick(905, 350, 5, 3);
brick[11] = new Brick(290, 450, 3, 7);
brick[12] = new Brick(1005, 450, 3, 7);
brick[13] = new Brick(420, 450, 3, 7);
brick[14] = new Brick(905, 450, 3, 7);
brick[15] = new Brick(574, 400, 3, 7);
brick[16] = new Brick(706, 400, 3, 7);
brick[17] = new Brick(640, 422, 3, 3);

firmly[0] = new Firmly(220, 350, 3, 2);
firmly[1] = new Firmly(1102, 350, 3, 2);
firmly[2] = new Firmly(640, 150, 3, 3);
/*grass[0] = new Grass(200, 500, 10, 3);
grass[1] = new Grass(600, 500, 10, 3);
river[0] = new River(200, 400, 10, 3);
river[1] = new River(600, 400, 10, 3);*/