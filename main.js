var p1="";
var p2="";
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:100
});
var camera=document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
}
console.log(ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/d43Ypw6OM/model.json',modelLoaded);
function modelLoaded(){
    console.log('Model is Loaded');
} 
function speak()
{
    var synth=window.speechSynthesis;
    s1="The First Prediction is - "+p1;
    s2="The Second Prediction is - "+p2;
    var utterThis=new SpeechSynthesisUtterance(s1+s2);
    synth.speak(utterThis);
}
function check()
{
    img=document.getElementById('captured_image');
    classifier.classify(img,gotResults);
}
function gotResults(error,results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        p1=results[0].label;
        p2=results[1].label;
        speak();
        if(results[0].label=="Smile")
        {
            document.getElementById("update_emoji").innerHTML="&#128522;";
        }
        if(results[0].label=="Angry")
        {
            document.getElementById("update_emoji").innerHTML="&#128545;";
        }
        if(results[0].label=="Sad")
        {
            document.getElementById("update_emoji").innerHTML="&#128546;";
        }
        if(results[1].label=="Smile")
        {
            document.getElementById("update_emoji2").innerHTML="&#128522;";
        }
        if(results[1].label=="Angry")
        {
            document.getElementById("update_emoji2").innerHTML="&#128545;";
        }
        if(results[1].label=="Sad")
        {
            document.getElementById("update_emoji2").innerHTML="&#128546;";
        }
    }
}
