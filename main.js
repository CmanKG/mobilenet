function setup() {
  canvas = createCanvas(500, 500);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier("MobileNet",modelLoaded)
}
function modelLoaded(){
  console.log("model_is_Loaded")
}
function draw(){
  image(video,0,0,500,500)
  classifier.classify(video,gotresult)
}
var previousresult=""
function gotresult(error,results){
  if (error) {
    console.log(error)
  } else {
    console.log(results)
    if ((results[0].confidence>0.2) && (previousresult != results[0].label)) {
    previousresult=results[0].label
    document.getElementById("result_object_name").innerHTML=results[0].label
    document.getElementById("result_object_accuracy").innerHTML=(results[0].confidence*100).toFixed(2)
     synth=window.speechSynthesis
    speakdata="object detected is:"+results[0].label
    var utterthis=new SpeechSynthesisUtterance(speakdata)
    synth.speak(utterthis)
    }
  }
}