#pragma strict

var lastX : float; // this will store the last position of the character
var isMoving : boolean = false; // flags whether or not the player is in motion
var explosion : GameObject;
var catchSound : AudioClip;
var bombSounds : AudioClip[];
var playerScore : GUIText;

static var score : int;

var life : int;
var bullet : GameObject;
var pew : AudioClip;

var paused : boolean;

function Start () 
{
	score = 0;
	life = 5;
	UpdateText();
	
	transform.position = Vector3(0, 3, 0 );
	paused = false;
	Time.timeScale = 1;
	//print(Screen.width + " " + Screen.width / 2);
} // end of Start

function OnTriggerEnter(col : Collider)
{
	if(col.gameObject.CompareTag("bomb"))
	{
		// I got hit by a bomb!
		life--;
		
		audio.PlayOneShot(bombSounds[Random.Range(0, bombSounds.length)]);
		
		Instantiate(explosion, gameObject.transform.position, Quaternion.identity);
		
		if(life == 0)
		{
			Application.LoadLevel("Title");
		}
	}
	
	if(col.gameObject.GetComponent(EnemyShip))
	{
		col.gameObject.GetComponent(EnemyShip).ResetPosition();
	} 
} // end of OnCollisionEnter

function Update () 
{
	if(!paused)
	{
		transform.position.x = (Input.mousePosition.x) / 10;
		
		var tiltAroundY : float = (Input.GetAxis("Mouse X")) * 65.0f;
		var target : Quaternion = Quaternion.Euler(0, tiltAroundY, 0);
		
		transform.rotation = Quaternion.Slerp(transform.rotation, 
		target, Time.deltaTime * 5.0);
		//////////////////////////////////////
		if(Input.GetMouseButtonDown(0))
		{
			audio.PlayOneShot(pew);
			
			Instantiate(bullet, transform.position + new Vector3(-2.5, 1.5, 0),
			Quaternion.identity);
			
			Instantiate(bullet, transform.position + new Vector3(2.5, 1.5, 0),
			Quaternion.identity);
		} // end of if
		//print(score);
		//playerScore.text = "SCORE: " + score.ToString() + "\nLIFE: " + life;
		// escape key is pressed
	}
	
	if(Input.GetKeyDown(KeyCode.Escape) )
	{
		SwitchPauseState();
	}
	
	UpdateText();
}

function UpdateText()
{
	playerScore.text = "SCORE: " + score.ToString() + "\nLIFE: " + life + "\nLEVEL: " 
	+ EnemyShip.level;// + "\nNext: " + EnemyShip.nextLevel;
}

function OnGUI()
{
	if(paused) ShowPauseMenu();
}

function SwitchPauseState()
{
	paused = !paused;
	
	Time.timeScale = Mathf.Abs(Time.timeScale - 1);
}

function ShowPauseMenu()
{
	var winPromptW:int = 240;
	
	var winPromptH:int = 180;
	var halfScreenW:float = Screen.width/2;
	var halfScreenH:float = Screen.height/2;
	var halfPromptW:int = winPromptW/2;
	var halfPromptH:int = winPromptH/2;
	
	GUI.BeginGroup(Rect(halfScreenW-halfPromptW, halfScreenH - halfPromptH, winPromptW, winPromptH));
	GUI.Box (Rect (0,0,winPromptW,winPromptH), "Pause Menu");
	var buttonW:int = 80;
	var buttonH:int = 20;
	
	if(GUI.Button(Rect(halfPromptW-(buttonW/2),halfPromptH-(buttonH/2),buttonW,buttonH),"Main Menu"))
	{
		Application.LoadLevel("Title");
	}
	
	GUI.EndGroup();
}

