st="";
objects=[];
alarm_sound="";

function preload(){
alarm_sound=loadSound("Alarm.mp3");
}

function setup(){
canvas=createCanvas(380,380);
canvas.center();
video=createCapture(VIDEO);
video.size(380,380);
video.hide();
objectdetector=ml5.objectDetector("cocossd", ModelLoaded);
document.getElementById("heading").innerHTML="Status:  Detecting Objects";
}
function ModelLoaded(){
st=true;
console.log("Model Loaded");
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
objects=results;
}

function draw(){
image(video,0,0,380,380);
if(st!=""){
    for(i=0;i <objects.length;i++){
        document.getElementById("heading").innerHTML="Status:  Object Detected";
        r=random(255);
        g=random(255);
        b=random(255);
        objectdetector.detect(video,gotResult);
        fill(r,g,b);
        percent=floor((objects[i].confidence)*100);
        text(objects[i].label+"    "+percent+"%",objects[i].x+15,objects[i].y+15);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        if(objects[i].label=="person"){
            document.getElementById("baby").innerHTML="Status:  Baby Found";
alarm_sound.stop();
        }
        else{
            document.getElementById("baby").innerHTML="Status: Baby Not Found";
alarm_sound.play();
        }
    }
    if(objects.lenght==0){
        document.getElementById("baby").innerHTML="Status: Baby Not Found";
alarm_sound.play();
    }
}
}