// DRUMS --------------------------------
var drum_count = 0; 
var hat_pattern =   ["x","-","x","-", "x","-","x","-", "x","-","x","-", "x","-","x","-", "x","-","x","-", "x","-","x","-", "x","-","x","-", "x","-","x","-", ]; 
var kick_pattern =  ["x","-","-","-", "x","-","-","-", "x","-","-","-", "x","-","-","-", "x","-","-","-", "x","-","-","-", "x","-","-","-", "x","-","-","-", ]; 
var snare_pattern = ["-","-","x","-", "-","-","x","-", "-","-","x","-", " ","-","x","-", "-","-","x","-", "-","-","x","x", "-","-","x","x", "-","-","x","-", ]; 

var kick_2_pattern =  ["x","-","x","-", "-","-","-","-", "x","-","x","-", "-","-","-","-", "x","-","x","-", "-","-","-","-", "x","-","x","-", "-","-","-","-", ]; 
var snare_2_pattern = ["-","-","-","-", "x","-","-","-", "-","-","-","-", "x","-","-","-", "-","-","-","-", "x","-","-","-", "-","-","-","-", "x","-","-","-", ]; 

var hat_3_pattern =   ["x","x","x","x", "x","x","x","x", "x","x","x","x", "x","x","x","x", "x","x","x","x", "x","x","x","x", "x","x","x","x", "x","x","x","x", ]; 
var kick_3_pattern =  ["-","-","-","-", "-","-","-","-", "-","-","-","-", "x","-","-","-", "-","-","-","-", "-","-","-","-", "-","-","-","-", "-","-","-","-", ]; 
var snare_3_pattern = ["x","-","-","-", "-","-","-","-", "-","-","-","-", "-","-","-","-", "-","-","-","-", "-","-","-","-", "-","-","-","-", "-","-","-","-", ]; 

var kick_break_pattern =  ["x","-","-","-", "x","-","-","-", "x","x","x","-", "x","-","-","-", ]; 
var snare_break_pattern = ["-","-","x","-", "-","-","x","-", "-","-","x","x", "-","-","x","-", ]; 
var open_pattern =  ["-","-","-","-", "-","-"," ","-", "-","-","-","-", "-","x","-","x", ]; 

var the_break = false;

var hat = new Tone.Sampler({
  "url" : "./audio/505/hh.mp3", 
}).toMaster();

var hat_loop_1 = new Tone.Loop(function(time){
  if (hat_pattern[drum_count] == "x") {  
      hat.triggerAttack(); 
    }
}, "8n")

var kick_1 = new Tone.Sampler({
    "url" :  "./audio/505/kick.mp3", 
}).toMaster()


var kick_loop_1 = new Tone.Loop(function(time){
  if (kick_pattern[drum_count] == "x") {  
      kick_1.triggerAttack(); 
    }
 //   console.log(kick_pattern[drum_count])
}, "8n")// .start(2)

var snare = new Tone.Sampler({
    "url" : "./audio/hip-hop/snare.wav",
    "volume": -2,  
}).toMaster()

var snare_loop_1 = new Tone.Loop(function(time){
    if (snare_pattern[drum_count] == "x") {  
        snare.triggerAttack(); 
    }
}, "8n")//.start(2)

var kick_2 = new Tone.Sampler({
    "url" :  "./audio/techno/kick.wav", 
     "filter" : {
      "type" : "lowpass",
      "rolloff" : -24,
      "Q" : 4,
    }, 
    "volume": -1, 
}).toMaster()

var kick_loop_2 = new Tone.Loop(function(time){
  if (kick_2_pattern[drum_count] == "x") {  
      kick_2.triggerAttack(); 
  }
}, "8n").start()

var snare_2 = new Tone.Sampler({
    "url" : "./audio/techno/snare.wav",
    "volume": -2,  
    envelope:{
        decay:0.01,
        sustain:0.5,
        release:0.01,
      }
}).toMaster()

var snare_loop_2 = new Tone.Loop(function(time){
    if (snare_2_pattern[drum_count] == "x") {  
       snare_2.triggerAttack()  
    }
}, "8n").start()

var drums_count = new Tone.Loop(function(time){
  drum_count++; 
  if (drum_count > snare_pattern.length-1) {
      drum_count = 0; 
  }
//  console.log(drum_count)
}, "8n").start(); 

var comp = new Tone.Compressor(-50, 5);

var hat_3 = new Tone.Sampler({
  "url" : "./audio/techno/hi-hat.wav", 
      "envelope":{
        "attack":0.001,
        "decay":0.001,
        "sustain":0.09,
        "release":0.01,
      }
}).toMaster()

var hat_loop_3 = new Tone.Loop(function(time){
  if (hat_3_pattern[drum_count] == "x") {  
      hat_3.triggerAttack(); 
    }
}, "8n")


var ophat = new Tone.Sampler({
  "url" : "./audio/505/hho.mp3",   
}).toMaster();  

var clap = new Tone.Sampler({
  "url" : "./audio/FactoryKit/Clap/PD_Factory_Clap_02.wav",
  "volume": -1   
}).toMaster(); 

// EFFECTS ------------------->
var swoosh = new Tone.NoiseSynth().toMaster({
    "noise": {
        "type": "white",
        "playbackRate" : 0.6
    },
    "envelope": {
        "attackCurve" : "exponential",
        "attack": 0.3,
        "decay": 0.2,
        "sustain": 0,
        "release": 0.2
    }
});
