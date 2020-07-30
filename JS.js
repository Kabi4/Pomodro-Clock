const session = document.getElementById("session-length");
const breaks = document.getElementById("break-length");
const timer = document.getElementById("time-left");
const audio = document.getElementById("beep");
const tt = document.getElementById("timer-label");

var breakVar=5;
var sessionVar=25;
var started = false;
var minutes=25;
var second=0;
var session_bool=true;

function toggleTimer(){
	if(session_bool===true){
		minutes=breakVar;
		session_bool=false;
	}
	else{
		minutes=sessionVar;
		session_bool=true;
	}
	updateTimer();
	audioPlay();
}

function reSet(){
	breakVar=5;
	sessionVar=25;
	session.textContent=25;
	breaks.textContent=5;
	tt.textContent="Session";
	timer.textContent="25"+":"+"00";
	minutes=25;
	second=0;
	session_bool=true;
	started = false;
	audio.pause();
	audio.currentTime=0.0;
	updateTimer()
}

function changeBreak(value){
	if((parseInt(breaks.textContent)>1 || value>=0)&& started === false){
		breakVar=parseInt(breaks.textContent);
		breakVar+=value;
		if(tt.textContent==="Break"){minutes=breakVar;second=0;}
		if(breakVar>60)breakVar=60;
		breaks.textContent=breakVar;
	}
	updateTimer();
}

function changeSession(value){
	if((parseInt(session.textContent)>1 || value>=0)&&started === false){
		sessionVar=parseInt(session.textContent);
		sessionVar+=value;
		if(tt.textContent==="Session"){minutes=sessionVar;second=0;}
		if(sessionVar>60)sessionVar=60;
		session.textContent=sessionVar;
	}
	updateTimer();
}

function audioPlay(){
	audio.volume = 1;
	audio.play();
}

function toggleStart(){
	if(started===true){
		started=false;
	}
	else{
		started=true;
		setTimeout(startWatch,1000);
	}
}

var secondString="";
var minuteString="";

function updateTimer(){
	if(minutes===0){timer.style.color='red';}else{timer.style.color='white';}
	if(second.toString().length==1){secondString="0"+second.toString();}else{secondString=second.toString();}
	if(minutes.toString().length==1){minuteString="0"+minutes.toString();}else{minuteString=minutes.toString();}
	timer.textContent=minuteString+":"+secondString;
}

function startWatch(){
	if(started){
		if(second==0){
			minutes=minutes-1;
			second=60;
		}
		second=second-1;
		if(minutes===0&&second===0){
			if(tt.textContent==="Session"){
				tt.textContent="Break";
			}
			else{
				tt.textContent="Session";
			}	
			setTimeout(toggleTimer,1000);setTimeout(startWatch,2000);}
		else{
		setTimeout(startWatch,1000);
		}
		updateTimer();
	}
}


