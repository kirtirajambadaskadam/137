status="";
objects=[];

function setup(){
    canvas=createCanvas(380, 380)
    canvas.center();
    video= createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function draw(){
    image(video, 0, 0, 380, 380);
    if(status !=""){
      objectDetector.detect(video, gotResults);
    
      for(i=0; i <objects.length; i++){
        document.getElementById("status").innerHTML="Status: Object Detected";
        
        fill("#FF0000");
        percent=floor(objects[i].confidence * 100);
        text(objects[i].label +" "+ percent + "%", objects[i].x + 15, objects[i].y +15);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        if(objects[i].label== input1){
            document.getElementById("FoundOrNot").innerHTML=input1 + " Found";
            objectDetector.detect(gotResults);
            video.stop();
            var synth=window.speechSynthesis;
            convert=input1+"Found";
            var utterthis= new SpeechSynthesisUtterance(convert);
            synth.speak(utterthis);
            speak();
        }
    }
    }
}

function gotResults(error, results){
 if(error){
     console.error();
 }
 console.log(results);
 objects=results;
}

function start(){
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Object";
    input1=document.getElementById("input1").value;

}

function modelLoaded(){
    console.log("Model Loaded!");
    status=true;
}
