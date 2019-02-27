var color1 = ['yellow', 'rgb(180, 180, 5)', 'rgb(90, 90, 0)', 'rgb(230, 230, 4)'];
var color2 = ['rgb(0, 255, 255)', 'rgb(5, 180, 180)', 'rgb(0, 90, 90)', 'rgb(4, 230, 230)'];
var color3 = ['pink', 'rgb(180, 5, 180)', 'rgb(90, 0, 90)', 'rgb(230, 4, 230)'];
var color4 = ['red', 'rgb(180, 5, 5)', 'rgb(90, 0, 0)', 'rgb(230, 4, 4)'];
var color5 = ['rgb(0, 255, 0)', 'rgb(5, 180, 5)', 'rgb(0, 90, 0)', 'rgb(4, 230, 4)'];
var color6 = ['rgb(0, 0, 255)', 'rgb(5, 5, 180)', 'rgb(0, 0, 90)', 'rgb(4, 4, 230)'];
var color7 = ['rgb(255, 255, 255)', 'rgb(180, 180, 180)', 'rgb(90, 90, 90)', 'rgb(230, 230, 230)'];
var player = new Player(100, 500, 1, color1);
setInterval('player.motion()', 30);
var playerBullets = new Array();
//var enemy = new Array();
//var enemyBullets=new Array();
var temp = 0;
/*for(var i = 0; i < 3; i++)
{
	enemy[i] = new Enemy(i*70+100, 100, 3, color2);
	setInterval('enemy['+i+'].motion()', 30);
	//enemy[i].shotPlayer();
	setInterval('enemy['+i+'].shotPlayer()', 30);
}
for(var i = 3; i < 6; i++)
{
	enemy[i] = new Enemy(i*70+100, 100, 3, color3);
	setInterval('enemy['+i+'].motion()', 30);
	//enemy[i].shotPlayer();
	setInterval('enemy['+i+'].shotPlayer()', 30);
}*/

function Bullet(x, y, direct, color, type, tank)
{
	this.x = x;
	this.y = y;
	this.direct = direct;
	this.color = color;
	this.timer = null;
	this.isLive = true;
	this.speed = 10;
	this.type = type;
	this.tank = tank;
	this.run = function ()
	{
		if(this.x >= 0 && this.x <= 1366 && this.y >= 0 && this.y <= 644 && this.isLive)
		{
			switch(this.direct)
			{
				case 0:this.x -= this.speed;break;
				case 1:this.y -= this.speed;break;
				case 2:this.x += this.speed;break;
				case 3:this.y += this.speed;break;
			}
		}
		else
		{
			window.clearInterval(this.timer);
			this.isLive = false;
			if(this.type == 'enemy')
				this.tank.bulletIsLive = false;
		}
	};
}
function Tank(x, y, direct, color)
{
	this.x = x;
	this.y = y;
	this.direct = direct;
	this.color = color;
	this.speed = 3;
	this.isLive = true;
	this.timer = null;
	this.moveLeft = function ()
	{
		this.direct = 0;
		this.x -= this.speed;
		if(this.x <= 0)
			this.x = 0;
	};
	this.moveUp = function ()
	{
		this.direct = 1;
		this.y -= this.speed;
		if(this.y <= 0)
			this.y = 0;
	};
	this.moveRight = function ()
	{
		this.direct = 2;
		this.x += this.speed;
		if(this.x >= 1326)
			this.x = 1326;
	};
	this.moveDown = function ()
	{
		this.direct = 3;
		this.y += this.speed;
		if(this.y >= 604)
			this.y = 604;
	};
}
function Player(x, y, direct, color)
{
	this.player = Tank;
	this.player(x, y, direct, color);
	this.bullet = 'singel';
	this.motion = function ()
	{
		isPlayerImpact(this);
	};
	this.shotEnemy = function ()
	{
		if(this.bullet == 'singel')
		{
			if(playerBullets.length == 0 || !playerBullets[playerBullets.length-1].isLive)
			{
				var playerBullet = new Bullet(this.x+19, this.y+19, this.direct, this.color, 'player', this);
				playerBullets.push(playerBullet);
				//clearInterval(time);
				var timer = window.setInterval('playerBullets['+(playerBullets.length-1)+'].run()', 30)
				playerBullets[playerBullets.length-1].timer = timer;
			}
		}
		else if(this.bullet == 'infinite')
		{
			var playerBullet = new Bullet(this.x+19, this.y+19, this.direct, this.color, 'player', this);
			playerBullets.push(playerBullet);
			//clearInterval(time);
			var timer = window.setInterval('playerBullets['+(playerBullets.length-1)+'].run()', 30)
			playerBullets[playerBullets.length-1].timer = timer;
		}
	};
}
function drawPlayerBullet()
{
	var oCan = document.getElementById('can1');
	var cxt = oCan.getContext('2d');
	for(var i = 0; i < playerBullets.length; i++)
	{
		if(playerBullets[i] != null && playerBullets[i].isLive)
		{
			cxt.fillStyle = playerBullets[i].color[0];
			cxt.fillRect(playerBullets[i].x, playerBullets[i].y, 2, 2);
		}
	}
}
function Enemy(x, y, direct, color)
{
	this.enemy = Tank;
	this.count = 0;
	this.bulletIsLive = false;
	this.enemy(x, y, direct, color);
	this.motion = function ()
	{
		switch(this.direct)
		{
			case 0:this.x -= this.speed;break;
			case 1:this.y -= this.speed;break;
			case 2:this.x += this.speed;break;
			case 3:this.y += this.speed;break;
		}
		if(++this.count == 50)
		{
			var direct = Math.floor(Math.random()*4);
			this.direct = direct;
			this.count = 0;
		}
		if(this.x <= 0 || this.x >= 1326 || this.y <= 0 || this.y >= 604 || isTankImpact(this))
			this.direct += (this.direct <= 1 ? 2:-2);
	};
	this.shotPlayer = function ()
	{
		if(this.bulletIsLive == false && this.isLive)
		{
			var enemyBullet = new Bullet(this.x+19, this.y+19, this.direct, this.color, 'enemy', this);
			enemyBullets.push(enemyBullet);
			var timer = window.setInterval('enemyBullets['+(enemyBullets.length-1)+'].run()', 30);
			enemyBullets[enemyBullets.length-1].timer = timer;
			this.bulletIsLive = true;
		}
	};
}
function drawEnemyBullet()
{
	var oCan = document.getElementById('can1');
	var cxt = oCan.getContext('2d');
	for(var i = 0; i < enemyBullets.length; i++)
	{
		if(enemyBullets[i].isLive)
		{
			cxt.fillStyle = enemyBullets[i].color[0];
			cxt.fillRect(enemyBullets[i].x, enemyBullets[i].y, 2, 2);
		}
	}
};
function drawTank(tank)
{
	var oCan = document.getElementById('can1');
	var cxt = oCan.getContext('2d');
	if(tank.isLive)
	{
		if(tank.direct == 1 || tank.direct == 3)
		{
			cxt.fillStyle = tank.color[0];
			cxt.fillRect(tank.x, tank.y, 10, 40);
			cxt.fillRect(tank.x+30, tank.y, 10, 40);
			cxt.fillStyle = tank.color[1];
			cxt.fillRect(tank.x+11, tank.y+5, 18, 30);
			cxt.strokeStyle = tank.color[2];
			for(var i = 0; i <= 40; i += 5)
			{
				cxt.beginPath();
				cxt.moveTo(tank.x, tank.y+i);
				cxt.lineTo(tank.x+10, tank.y+i);
				cxt.stroke();
				cxt.beginPath();
				cxt.moveTo(tank.x+30, tank.y+i);
				cxt.lineTo(tank.x+40, tank.y+i);
				cxt.stroke();
			}
			cxt.beginPath();
			cxt.fillStyle = tank.color[3];
			cxt.arc(tank.x+20, tank.y+20, 9, 0, Math.PI*2, true);
			cxt.fill();
			cxt.beginPath();
			cxt.strokeStyle = tank.color[0];
			cxt.lineWidth = 2;
			cxt.moveTo(tank.x+20, tank.y+20);
			if(tank.direct == 1)
				cxt.lineTo(tank.x+20, tank.y-10);
			else
				cxt.lineTo(tank.x+20, tank.y+50);
			cxt.stroke();
		}
		else if(tank.direct == 0 || tank.direct == 2)
		{
			cxt.fillStyle = tank.color[0];
			cxt.fillRect(tank.x, tank.y, 40, 10);
			cxt.fillRect(tank.x, tank.y+30, 40, 10);
			cxt.fillStyle = tank.color[1];
			cxt.fillRect(tank.x+5, tank.y+11, 30, 18);
			cxt.strokeStyle = tank.color[2];
			for(var i = 0; i <= 40; i += 5)
			{
				cxt.beginPath();
				cxt.moveTo(tank.x+i, tank.y);
				cxt.lineTo(tank.x+i, tank.y+10);
				cxt.stroke();
				cxt.beginPath();
				cxt.moveTo(tank.x+i, tank.y+30);
				cxt.lineTo(tank.x+i, tank.y+40);
				cxt.stroke();
			}
			cxt.beginPath();
			cxt.fillStyle = tank.color[3];
			cxt.arc(tank.x+20, tank.y+20, 9, 0, Math.PI*2, true);
			cxt.fill();
			cxt.beginPath();
			cxt.strokeStyle = tank.color[0];
			cxt.lineWidth = 2;
			cxt.moveTo(tank.x+20, tank.y+20);
			if(tank.direct == 0)
				cxt.lineTo(tank.x-10, tank.y+20);
			else
				cxt.lineTo(tank.x+50, tank.y+20);
			cxt.stroke();
		}
	}
}
function isHitEnemyTank()
{
	for(var i = 0; i < playerBullets.length; i++)
	{
		if(playerBullets[i].isLive)
		{
			for(var j = 0; j < enemy.length; j++)
			{
				if(enemy[j].isLive)
				{
					if(Math.abs(playerBullets[i].x+1-enemy[j].x-20) <= 21 && Math.abs(playerBullets[i].y+1-enemy[j].y-20) <= 21)
					{
						enemy[j].isLive = false;
						playerBullets[i].isLive = false;
					}
				}
			}
		}
	}
}
function isHitPlayerTank()
{
	for(var i = 0; i < enemyBullets.length; i++)
	{
		if(enemyBullets[i].isLive)
		{
			if(player.isLive)
			{
				if(Math.abs(enemyBullets[i].x+1-player.x-20) <= 21 && Math.abs(enemyBullets[i].y+1-player.y-20) <= 21)
				{
					player.isLive = false;
					enemyBullets[i].isLive = false;
				}
			}
		}
	}
}
function isPlayerImpact(tank)
{
	for(var i = 0; i < enemy.length; i++)
	{
		if(enemy[i].isLive)
		{
			if(tank.x-enemy[i].x >= -40 && tank.x-enemy[i].x <= -20 && Math.abs(tank.y-enemy[i].y) <= 40)
				tank.x = enemy[i].x-40;
			else if(tank.y-enemy[i].y >= -40 && tank.y-enemy[i].y <= -20 && Math.abs(tank.x-enemy[i].x) <= 40)
				tank.y = enemy[i].y-40;
			else if(tank.x-enemy[i].x <= 40 && tank.x-enemy[i].x >= 20 && Math.abs(tank.y-enemy[i].y) <= 40)
				tank.x = enemy[i].x+40;
			else if(tank.y-enemy[i].y <= 40 && tank.y-enemy[i].y >= 20 && Math.abs(tank.x-enemy[i].x) <= 40)
				tank.y = enemy[i].y+40;
		}
	}
}
function isTankImpact(tank)
{
	if(player.isLive)
	{
		if(Math.abs(player.x-tank.x) <= 40 && Math.abs(player.y-tank.y) <= 40)
		{
			return true;
		}
	}
	for(var i = 0; i < enemy.length; i++)
	{
		if(enemy[i].isLive && tank != enemy[i])
		{
			if(Math.abs(enemy[i].x-tank.x) <= 40 && Math.abs(enemy[i].y-tank.y) <= 40)
				return true;
		}
	}
}
function haveBullet()
{
	for(var i = 0; i < playerBullets.length; i++)
		if(playerBullets[i].isLive == true)
			return true;
}
function refreshMap()
{
	var oCan = document.getElementById('can1');
	var cxt = oCan.getContext('2d');
	cxt.clearRect(0, 0, 1366, 644);
	drawTank(player);
	drawPlayerBullet();
	isHitEnemyTank();
	for(var i = 0; i < 6; i++)
		drawTank(enemy[i]);
	drawEnemyBullet();
	isHitPlayerTank();
}