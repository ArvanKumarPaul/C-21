function setup() {

  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet',modelLoaded);

}

function draw() {

  image(video,0,0,300,300);
  classifier.classify(video,gotResult);

}

previous_result = "";

function modelLoaded() {

  console.log("model loaded!");

}

function gotResult(error,result) {

  if(error) {

    console.error(error);

  } else {

    if((result[0].confidence>0.5) && (previous_result=result[0].label)) {

      console.log(result);
      previous_result = result[0].label;
      synth = window.speechSynthesis;
      speak_data = "Object Detected is " + result[0].label;
      utterThis = new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterThis);
      document.getElementById("result_object").innerHTML = result[0].label;
      document.getElementById("result_accuracy").innerHTML = result[0].confidence.toFixed(3);
      

    }

  }

}







