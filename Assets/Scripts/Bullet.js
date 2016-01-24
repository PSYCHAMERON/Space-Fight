#pragma strict

var scr:HeroShip;

function Start () 
{
	rigidbody.velocity.y = 100;
	
}

function Update () 
{
	if(transform.position.y > 62)
	{
		Destroy(gameObject);
	}
}

function OnCollisionEnter()
{
	//print(scr.score);
	//HeroShip.score++;
}