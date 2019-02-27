var color1 = ['yellow', 'rgb(180, 180, 5)', 'rgb(90, 90, 0)', 'rgb(230, 230, 4)'];
var color2 = ['rgb(0, 255, 255)', 'rgb(5, 180, 180)', 'rgb(0, 90, 90)', 'rgb(4, 230, 230)'];
var color3 = ['rgb(0, 255, 0)', 'rgb(5, 180, 5)', 'rgb(0, 90, 0)', 'rgb(4, 230, 4)'];
var color4 = ['pink', 'rgb(180, 5, 180)', 'rgb(90, 0, 90)', 'rgb(230, 4, 230)'];
var color5 = ['rgb(0, 0, 255)', 'rgb(5, 5, 180)', 'rgb(0, 0, 90)', 'rgb(4, 4, 230)'];
var color6 = ['red', 'rgb(180, 5, 5)', 'rgb(90, 0, 0)', 'rgb(230, 4, 4)'];
var color7 = ['rgb(255, 255, 255)', 'rgb(180, 180, 180)', 'rgb(90, 90, 90)', 'rgb(230, 230, 230)'];
var color8 = ['black', 'black', 'black', 'black'];
var healths = [0, 50, 10, 20, 30, 50, 80];
var win = false;
var lose = false;

function Bullet(x, y, direct, color, type, tank)
{
	this.x = x;
	this.y = y;
	this.direct = direct;
	this.color = color;
	this.timer = null;
	this.isLive = true;
	this.speed = 12;
	this.type = type;
	this.tank = tank;
	this.run = function ()
	{
		if(this.x >= 220 && this.x <= 1160 && this.y >= 0 && this.y <= 644 && this.isLive)
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
function Tank(x, y, direct, color, health)
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
		if(this.x <= 220)
			this.x = 220;
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
		if(this.x >= 1125)
			this.x = 1125;
	};
	this.moveDown = function ()
	{
		this.direct = 3;
		this.y += this.speed;
		if(this.y >= 604)
			this.y = 604;
	};
}
function Player(x, y, direct, color, health)
{
	this.player = Tank;
	this.player(x, y, direct, color, health);
	this.health = 50;
	this.bullet = 'singel';
	this.kill = 0;
	this.out = 0;
	this.shotEnemy = function ()
	{
		if(this.bullet == 'singel')
		{
			if((playerBullets.length == 0 || !playerBullets[playerBullets.length-1].isLive) && win == false && lose == false)
			{
				var oVid = document.getElementById('vid1');
				oVid.src = '发射.wav';
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
function Enemy(x, y, direct, color, health)
{
	this.enemy = Tank;
	this.count = 0;
	this.bulletIsLive = false;
	this.health = health
	this.enemy(x, y, direct, color, health);
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
		if(this.x <= 220 || this.x >= 1160 || this.y <= 0 || this.y >= 604 || isTankImpact(this))
		{
			switch(this.direct)
			{
				case 0:
				{
					this.x += 3;
					this.direct = 2;
					break;
				}
				case 1:
				{
					this.y += 3;
					this.direct = 3;
					break;
				}
				case 2:
				{
					this.x -= 3;
					this.direct = 0;
					break;
				}
				case 3:
				{
					this.y -= 3;
					this.direct = 1;
					break;
				}
			}
		}
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
}
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
						playerBullets[i].isLive = false;
						player.out += 10;
						enemy[j].health -= 10;
						if(enemy[j].health <= 0)
						{
							var oVid = document.getElementById('vid1');
							oVid.src = 'beat.wav';
							enemy[j].isLive = false;
							player.kill++;
						}
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
					enemyBullets[i].isLive = false;
					player.health -= 10;
					if(player.health <= 0)
						player.isLive = false;
				}
			}
		}
	}
}
function isPlayerImpact()
{
	for(var i = 0; i < enemy.length; i++)
	{
		if(enemy[i].isLive)
		{
			if(Math.abs(player.x-enemy[i].x) <= 40 && Math.abs(player.y-enemy[i].y) <= 40)
			{
				switch(player.direct)
				{
					case 0:player.x += 3;
					case 1:player.y += 3;
					case 2:player.x -= 3;
					case 3:player.y -= 3;
				}
			}
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
function drawHome(x, y)
{
	var oCan = document.getElementById('can1');
	var cxt = oCan.getContext('2d');
	
	cxt.beginPath();
	cxt.fillStyle = 'yellow';
	cxt.arc(x, y, 22, 0, 2*Math.PI, true);
	cxt.fill();
	cxt.closePath();
}
function isWin()
{
	for(var i = 0; i < enemy.length && !enemy[i].isLive; i++)
		;
	if(i == enemy.length && win == false)
	{
		var oVid = document.getElementById('vid1');
		oVid.src = 'win.wav';
		win = true;
		setTimeout(function ()
		{
			alert('win!');
		}, 30);
		setTimeout(function ()
		{
			alert('你的杀敌数:'+player.kill);
			player.kill = 0;
		}, 5000);
		setTimeout(function ()
		{
			alert('你的伤害输出:'+player.out);
			player.out = 0;
		}, 10000);
	}
}
function isLose()
{
	for(var i = 0; i < enemyBullets.length; i++)
		if(enemyBullets[i].isLive)
		{
			var distance = Math.sqrt((enemyBullets[i].x-672)*(enemyBullets[i].x-672)+(enemyBullets[i].y-622)*(enemyBullets[i].y-622));
			if(lose == false && (distance <= 23 || player.isLive == false))
			{
				var oVid = document.getElementById('vid1');
				oVid.src = 'lose.mp3';
				lose = true;
				setTimeout(function ()
				{
					alert('you lose!');
				}, 30);
				setTimeout(function ()
				{
					alert('你的杀敌数:'+player.kill);
					player.kill = 0;
				}, 4000);
				setTimeout(function ()
				{
					alert('你的伤害输出:'+player.out);
					player.out = 0;
					window.open('关卡.html', '_self');
				}, 8000);
			}
		}
}
function displayInformation()
{
	var oCan = document.getElementById('can1');
	var cxt = oCan.getContext('2d');

	cxt.clearRect(0, 0, 200, 644);
	cxt.fillStyle = 'yellow';
	cxt.font = '25px arial';
	cxt.fillText('生命值:'+player.health, 10, 50);
	cxt.fillText('BOSS生命值:', 1200, 50);
	cxt.font = '35px arial';
	cxt.fillText(enemy[0].health, 1230, 100);
}
function refreshMap()
{
	var oCan = document.getElementById('can1');
	var cxt = oCan.getContext('2d');

	if(!win && !lose)
	{
		cxt.clearRect(200, 0, 1100, 644);
		
		isShotBrick();
		drawBrick();
		isImPactBrick();
		
		isShotFirmly();
		drawFirmly();
		isImPactFirmly();
		
		isShotGrass();
		drawGrass();
		isImPactGrass();
		
		drawRiver();
		isImPactRiver();
		
		isPlayerImpact();
		drawTank(player);
		drawPlayerBullet();
		isHitEnemyTank();
		
		for(var i = 0; i < enemy.length; i++)
			drawTank(enemy[i]);
		drawEnemyBullet();
		isHitPlayerTank();
		
		displayInformation();
		isWin();
		isLose();
		drawHome(672, 622);
	}
	else if(lose)
	{
		cxt.clearRect(0, 0, 1366, 644);
		cxt.fillStyle = 'yellow';
		cxt.font = '30px 宋体';
		cxt.fillText('game over!你没能打败BOSS', 500, 300);
	}
	else if(win)
	{
		cxt.clearRect(0, 0, 1366, 644);
		cxt.fillStyle = 'yellow';
		cxt.font = '30px 宋体';
		cxt.fillText('恭喜你，你打败了BOSS。', 500, 300);
	}
}