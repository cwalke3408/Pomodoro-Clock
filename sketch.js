let RADIUS = 125;
let ORGIN_X = 200;
let ORGIN_Y = 200;
let ANGLE = 0;
let MOVE = -RADIUS;
let TRIG  = false;
let COUNT = 0;
let INTERVAL;
let SEC = 1200;
let COUNTDOWN = 0;
let PREV_SEC = 0;
let RUN = false;


function setup() {
  // put setup code here
  createCanvas(400,400);
  background("#000F07");
  displayTime(SEC);
}
/*
function radar(ANGLE, MOVE){

    this.ORGIN_X = 200;
    this.ORGIN_Y = 200;
    this.RADIUS = 125;

    function display(){
        stroke(255);
        ellipse(ORGIN_X, ORGIN_Y, RADIUS*2, RADIUS*2);
        strokeWeight(2);
        ellipse(ORGIN_X, ORGIN_Y, (RADIUS*2)/1.5, (RADIUS*2)/1.5);
        ellipse(ORGIN_X, ORGIN_Y, (RADIUS*2)/3, (RADIUS*2)/3);
        line(ORGIN_X,ORGIN_Y-RADIUS, ORGIN_X, ORGIN_Y+RADIUS);
        line(ORGIN_X-RADIUS,ORGIN_Y, ORGIN_X+RADIUS, ORGIN_Y);
    }

    function sailing(ANGLE, MOVE){
        fill(0);
        stroke(100,200,222);
        strokeWeight(5);

        line(ORGIN_X, ORGIN_Y, RADIUS * Math.cos(ANGLE) + ORGIN_X, RADIUS * Math.sin(ANGLE) + ORGIN_Y);
        ellipse(ORGIN_X+ MOVE, ORGIN_Y-20, 3, 3);
    }
}

*/

function draw() {
  // put drawing code here
  let milli = millis().toFixed(0);
  let CUR_SEC = second().toFixed(0);
  let period = milli % 5000;
  let rad = new radar();


  let ANGLE = +(((2*Math.PI*period)/5000).toFixed(6));
  if(TRIG == true && period < 1000){
   ANGLE = 0;
   TRIG = false;
  }

  if(RUN){
      if(CUR_SEC != PREV_SEC && SEC != COUNTDOWN){
          //onsole.log(SEC);
          PREV_SEC = CUR_SEC;
          displayTime(SEC - COUNTDOWN++);
      } else if(CUR_SEC != PREV_SEC && SEC == COUNTDOWN){
          displayTime(SEC - COUNTDOWN++);
          MOVE = RADIUS;
          startButton();
      }
      let T = Math.acos(-(MOVE+INTERVAL)/Math.sqrt(400+Math.pow(MOVE+INTERVAL, 2)))+Math.PI;

      if (MOVE+INTERVAL >= RADIUS && TRIG == false && ANGLE > T) {
            MOVE = RADIUS;
            TRIG = true;
        } else if(MOVE < RADIUS && TRIG == false && ANGLE > T){
            MOVE += INTERVAL;
            TRIG = true;
       }
   }

   rad.display();
   rad.sailing(ANGLE, MOVE);
}

/*
    Description: Start from where we left off
*/
function startButton(){
    if((COUNTDOWN-1) == SEC) MOVE = -RADIUS;
    if(document.getElementById('start').value == "Start" && (COUNTDOWN-1) != SEC){
        document.getElementById('start').value = "Pause";
        INTERVAL = Math.abs(((MOVE-RADIUS)/SEC) * 5);
        RUN = true;
    }
    else{
         document.getElementById('start').value = "Start";
         RUN = false;
     }
    //if(INTERVAL == undefined) INTERVAL = ((2 * RADIUS) / SEC) * 5;

    //console.log(INTERVAL, ((MOVE-RADIUS)/SEC)*5);
}

/*  resetButton
    Description:  Start timer at the entered by user, start unit to the beginning.
*/
function resetButton(){
    COUNTDOWN = 0;
    if(SEC != 0){
        INTERVAL = ((2 * RADIUS) / SEC) * 5;
        MOVE = -RADIUS;
    }

    document.getElementById('start').value = "Pause";
    RUN = true;
    console.log('I: ', INTERVAL, ' S: ', SEC);
}

function upFunc(increment){
    if(RUN) return;
    let curTime;
    if(COUNTDOWN != 0){
         curTime = SEC - (COUNTDOWN-1);
         COUNTDOWN = 0;
     } else curTime = SEC;

    if(curTime + increment > 3600) SEC = 3600;
    else SEC = curTime + increment;
    displayTime(SEC);
}
function downFunc(decrement){
    if(RUN) return;
    let curTime;
    if(COUNTDOWN != 0){
         curTime = SEC - (COUNTDOWN-1);
         COUNTDOWN = 0;
     } else curTime = SEC;

    if(curTime - decrement < 0) SEC = 0;
    else SEC = curTime - decrement;
    displayTime(SEC);
}


function displayTime(time){
//console.log(time, COUNTDOWN);
    if(time < 0) return;
    document.getElementById("mins").value = Math.floor(time/600);
    time = time % 600;

    document.getElementById("min").value = Math.floor(time/60);
    time = time % 60;

    document.getElementById("secs").value = Math.floor(time/10);
    time = time % 10;

    document.getElementById("sec").value = Math.floor(time);
}
