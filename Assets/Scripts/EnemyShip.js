#pragma strict

var explosion : GameObject;
var audioClips : AudioClip[];
var heroShip : GameObject;
var hitSound : AudioClip;

static var speed : int;
static var health : int;
static var level : int;
static var maxLevel : int;
static var nextLevel : int;

private var currentHealth : int;

function Start () 
{
	speed = 40;
	health = 1;
	currentHealth = health;
	maxLevel = 5;
	level = 1; // level starts from 1
	nextLevel = 20;
}

function OnTriggerEnter(col : Collider)
{
	if(col.gameObject.tag == "bullet")
	{
		// bullet hit!
		currentHealth--;
		audio.PlayOneShot(hitSound);
		Destroy(col.gameObject);
		
		if(currentHealth == 0) // enemy ship is destroyed
		{
			Explode(col.gameObject.transform.position);
			ResetPosition();
			HeroShip.score++; // increase player score
		}
	} // end of if
	
}

function Update () 
{
	transform.position.y -= speed * Time.deltaTime;
	transform.Rotate(0, 0, Time.deltaTime * - 500);
	
	LevelUpgrage(); // upgrage the level
	
	if(transform.position.y < -4)
	{	
		ResetPosition();
	} // end of if
}

function ResetPosition()
{
	
	transform.position.y = 71;
	transform.position.x = Random.Range(-11, 68);
	transform.position.z = 0;
	rigidbody.velocity = Vector3.zero;
	
	currentHealth = health;
}

function Explode(pos : Vector3)
{
	audio.PlayOneShot(audioClips[Random.Range(0, audioClips.length)]);
	Instantiate(explosion, pos, Quaternion.identity);
}

function LevelUpgrage()
{
	if(level == maxLevel) return; // no change when max level is reached
	
	if(nextLevel == HeroShip.score) 
	{
		// level up, increase the difficulty
		level++;
		
		speed += 5; 
		health = level;
		nextLevel +=  level * 10;
	}
}