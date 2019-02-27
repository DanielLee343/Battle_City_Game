function Brick(x, y, Length, Width)
{
	this.x = x;
	this.y = y;
	this.Length = Length;
	this.Width = Width;
	this.a = new Array();
	this.b = new Array();
	this.isLive = new Array();
	for(var i = 0; i < this.Width; i++)
	{
		this.a[i] = new Array();
		this.b[i] = new Array();
		this.isLive[i] = new Array();
	}
	for(var i = 0; i < this.Width; i++)
		for(var j = 0; j < this.Length; j++)
		{
			this.a[i][j] = j*22+this.x;
			this.b[i][j] = i*22+this.y;
			this.isLive[i][j] = true;
		}
}
function Firmly(x, y, Length, Width)
{
	this.firmly = Brick;
	this.firmly(x, y, Length, Width);
}
function Grass(x, y, Length, Width)
{
	this.x = x;
	this.y = y;
	this.Length = Length;
	this.Width = Width;
}
function River(x, y, Length, Width)
{
	this.x = x;
	this.y = y;
	this.Length = Length;
	this.Width = Width;
}

function isImPactBrick()
{
	for(var p = 0; p < brick.length; p++)
		for(var q = 0; q < brick[p].Width; q++)
			for(var r = 0; r < brick[p].Length; r++)
			{
				if(Math.abs(player.x+20-brick[p].a[q][r]-11) <= 30 &&
				Math.abs(player.y+20-brick[p].b[q][r]-11) <= 30 && brick[p].isLive[q][r])
				{
					switch(player.direct)
					{
						case 0:player.x += 3;break;
						case 1:player.y += 3;break;
						case 2:player.x -= 3;break;
						case 3:player.y -= 3;break;
					}
				}
				
				for(var k = 0; k < enemy.length; k++)
				{
					if(Math.abs(enemy[k].x+20-brick[p].a[q][r]-11) <= 30 &&
					Math.abs(enemy[k].y+20-brick[p].b[q][r]-11) <= 30 && brick[p].isLive[q][r])
					{
						switch(enemy[k].direct)
						{
							case 0:
							{
								enemy[k].x += 3;
								enemy[k].direct = 2;
								break;
							}
							case 1:
							{
								enemy[k].y += 3;
								enemy[k].direct = 3;
								break;
							}
							case 2:
							{
								enemy[k].x -= 3;
								enemy[k].direct = 0;
								break;
							}
							case 3:
							{
								enemy[k].y -= 3;
								enemy[k].direct = 1;
								break;
							}
						}
					}
				}
			}
}
function isImPactFirmly()
{
	for(var p = 0; p < firmly.length; p++)
		for(var q = 0; q < firmly[p].Width; q++)
			for(var r = 0; r < firmly[p].Length; r++)
			{
				if(Math.abs(player.x+20-firmly[p].a[q][r]-11) <= 30 &&
				Math.abs(player.y+20-firmly[p].b[q][r]-11) <= 30 && firmly[p].isLive[q][r])
				{
					switch(player.direct)
					{
						case 0:player.x += 3;break;
						case 1:player.y += 3;break;
						case 2:player.x -= 3;break;
						case 3:player.y -= 3;break;
					}
				}
				
				for(var k = 0; k < enemy.length; k++)
				{
					if(Math.abs(enemy[k].x+20-firmly[p].a[q][r]-11) <= 30 &&
					Math.abs(enemy[k].y+20-firmly[p].b[q][r]-11) <= 30 && firmly[p].isLive[q][r])
					{
						switch(enemy[k].direct)
						{
							case 0:
							{
								enemy[k].x += 3;
								enemy[k].direct = 2;
								break;
							}
							case 1:
							{
								enemy[k].y += 3;
								enemy[k].direct = 3;
								break;
							}
							case 2:
							{
								enemy[k].x -= 3;
								enemy[k].direct = 0;
								break;
							}
							case 3:
							{
								enemy[k].y -= 3;
								enemy[k].direct = 1;
								break;
							}
						}
					}
				}
			}
}
function isImPactGrass()
{
	var i = 0;
	for(var p = 0; p < grass.length; p++)
		if(Math.abs(player.x+20-grass[p].x-grass[p].Length*11) > 20+grass[p].Length*11 ||
		Math.abs(player.y+20-grass[p].y-grass[p].Width*11) > 20+grass[p].Width*11)
			i++;
	if(i == grass.length)
		player.speed = 3;
	else
		player.speed = 1;
}
function isImPactRiver()
{
	for(var p = 0; p < river.length; p++)
		if(Math.abs(player.x+20-river[p].x-river[p].Length*11) <= 20+river[p].Length*11 &&
		Math.abs(player.y+20-river[p].y-river[p].Width*11) <= 20+river[p].Width*11)
			player.isLive = false;
}

function isShotBrick()
{
	for(var i = 0; i < playerBullets.length; i++)
	{
		if(playerBullets[i].isLive)
		{
			for(var p = 0; p < brick.length; p++)
				for(var q = 0; q < brick[p].Width; q++)
					for(var r = 0; r < brick[p].Length; r++)
					{
						if(Math.abs(playerBullets[i].x+1-brick[p].a[q][r]-11) <= 11 &&
						Math.abs(playerBullets[i].y+1-brick[p].b[q][r]-11) <= 11 && brick[p].isLive[q][r])
						{
							brick[p].isLive[q][r] = false;
							playerBullets[i].isLive = false;
						}
					}
		}
	}
	for(var i = 0; i < enemyBullets.length; i++)
	{
		if(enemyBullets[i].isLive)
		{
			for(var p = 0; p < brick.length; p++)
				for(var q = 0; q < brick[p].Width; q++)
					for(var r = 0; r < brick[p].Length; r++)
					{
						if(Math.abs(enemyBullets[i].x+1-brick[p].a[q][r]-11) <= 11 &&
						Math.abs(enemyBullets[i].y+1-brick[p].b[q][r]-11) <= 11 && brick[p].isLive[q][r])
						{
							brick[p].isLive[q][r] = false;
							enemyBullets[i].isLive = false;
						}
					}
		}
	}
}
function isShotFirmly()
{
	for(var i = 0; i < playerBullets.length; i++)
	{
		if(playerBullets[i].isLive)
		{
			for(var p = 0; p < firmly.length; p++)
				for(var q = 0; q < firmly[p].Width; q++)
					for(var r = 0; r < firmly[p].Length; r++)
					{
						if(Math.abs(playerBullets[i].x+1-firmly[p].a[q][r]-11) <= 11 &&
						Math.abs(playerBullets[i].y+1-firmly[p].b[q][r]-11) <= 11 && firmly[p].isLive[q][r])
							playerBullets[i].isLive = false;
					}
		}
	}
	for(var i = 0; i < enemyBullets.length; i++)
	{
		if(enemyBullets[i].isLive)
		{
			for(var p = 0; p < firmly.length; p++)
				for(var q = 0; q < firmly[p].Width; q++)
					for(var r = 0; r < firmly[p].Length; r++)
					{
						if(Math.abs(enemyBullets[i].x+1-firmly[p].a[q][r]-11) <= 11 &&
						Math.abs(enemyBullets[i].y+1-firmly[p].b[q][r]-11) <= 11 && firmly[p].isLive[q][r])
							enemyBullets[i].isLive = false;
					}
		}
	}
}
function isShotGrass()
{
	for(var i = 0; i < playerBullets.length; i++)
	{
		if(playerBullets[i].isLive)
		{
			for(var p = 0; p < grass.length; p++)
			{
				if(Math.abs(playerBullets[i].x+1-grass[p].x-grass[p].Length*11) <= grass[p].Length*11 &&
				Math.abs(playerBullets[i].y+1-grass[p].y-grass[p].Width*11) <= grass[p].Width*11)
					playerBullets[i].isLive = false;
			}
		}
	}
}

function drawBrick()
{
	var oCan = document.getElementById('can1');
	var cxt = oCan.getContext('2d');
	
	cxt.fillStyle = 'rgb(216, 72, 31)';
	for(var k = 0; k < brick.length; k++)
	{
		for(var i = 0; i < brick[k].Width; i++)
			for(var j = 0; j < brick[k].Length; j++)
				if(brick[k].isLive[i][j])
					cxt.fillRect(brick[k].a[i][j], brick[k].b[i][j], 20, 20);
	}
}
function drawFirmly()
{
	var oCan = document.getElementById('can1');
	var cxt = oCan.getContext('2d');
	
	cxt.fillStyle = '#DDD';
	for(var k = 0; k < firmly.length; k++)
	{
		for(var i = 0; i < firmly[k].Width; i++)
			for(var j = 0; j < firmly[k].Length; j++)
				if(firmly[k].isLive[i][j])
					cxt.fillRect(firmly[k].a[i][j], firmly[k].b[i][j], 20, 20);
	}
}
function drawGrass()
{
	var oCan = document.getElementById('can1');
	var cxt = oCan.getContext('2d');
	
	for(var k = 0; k < grass.length; k++)
	{
		cxt.fillStyle = 'rgb(0, 205, 0)';
		cxt.fillRect(grass[k].x, grass[k].y, grass[k].Length*22, grass[k].Width*22);
		cxt.strokeStyle = 'rgb(0, 135, 0)';
		for(var i = 0; i < 2*grass[k].Length; i++)
		{
			cxt.beginPath();
			cxt.lineWidth = 2;
			cxt.moveTo(grass[k].x+i*11, grass[k].y);
			cxt.lineTo(grass[k].x+i*11, grass[k].y+grass[k].Width*22);
			cxt.stroke();
		}
		for(i = 0; i < 2*grass[k].Width; i++)
		{
			cxt.beginPath();
			cxt.lineWidth = 2;
			cxt.moveTo(grass[k].x, grass[k].y+i*11);
			cxt.lineTo(grass[k].x+grass[k].Length*22, grass[k].y+i*11);
			cxt.stroke();
		}
	}
}
function drawRiver()
{
	var oCan = document.getElementById('can1');
	var cxt = oCan.getContext('2d');
	
	cxt.fillStyle = 'rgb(0, 0, 255)';
	cxt.strokeStyle = 'rgb(0, 0, 155)';
	for(var i = 0; i < river.length; i++)
	{
		cxt.fillRect(river[i].x, river[i].y, river[i].Length*22, river[i].Width*22);
		for(var j = 0; j < 2*river[i].Width; j++)
		{
			cxt.beginPath();
			cxt.moveTo(river[i].x, river[i].y+j*11);
			cxt.lineTo(river[i].x+river[i].Length*22, river[i].y+j*11);
			cxt.stroke();
		}
	}
}