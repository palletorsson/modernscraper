// DRUMS --------------------------------
soundSys.drum_count = 0; 
soundSys.hat_pattern =   ["x","x","x","x", "x","x","x","x", "x","x","x","x", "x","x","x","x", "x","x","x","x", "x","x","x","x", "x","x","x","x", "x","x","x","x",]; 
soundSys.kick_pattern =  ["x","-","-","-", "x","-","-","-", "x","-","-","-", "x","-","-","-", "x","-","-","-", "x","-","-","-", "x","-","-","-", "x","-","-","-", ]; 
soundSys.snare_pattern = ["-","-","x","-", "-","-","x","-", "-","-","x","-", " ","-","x","-", "-","-","x","-", "-","-","x","x", "-","-","x","x", "-","-","x","-", ]; 

soundSys.kick_2_pattern =  ["x","-","x","-", "-","-","-","-", "x","-","x","-", "-","-","-","-", "x","-","x","-", "-","-","-","-", "x","-","x","-", "-","-","-","-", ]; 
soundSys.snare_2_pattern = ["-","-","-","-", "x","-","-","-", "-","-","-","-", "x","-","-","-", "-","-","-","-", "x","-","-","-", "-","-","-","-", "x","-","-","-", ]; 

soundSys.hat_3_pattern =   ["x","x","x","x", "x","x","x","x", "x","x","x","x", "x","x","x","x", "x","x","x","x", "x","x","x","x", "x","x","x","x", "x","x","x","x", ]; 
soundSys.kick_3_pattern =  ["-","-","-","-", "-","-","-","-", "-","-","-","-", "x","-","-","-", "-","-","-","-", "-","-","-","-", "-","-","-","-", "-","-","-","-", ]; 
soundSys.snare_3_pattern = ["x","-","-","-", "-","-","-","-", "-","-","-","-", "-","-","-","-", "-","-","-","-", "-","-","-","-", "-","-","-","-", "-","-","-","-", ]; 

soundSys.kick_break_pattern =  ["x","-","-","-", "x","-","-","-", "x","x","x","-", "x","-","-","-", ]; 
soundSys.snare_break_pattern = ["-","-","x","-", "-","-","x","-", "-","-","x","x", "-","-","x","-", ]; 
soundSys.open_pattern =  ["-","-","-","-", "-","-"," ","-", "-","-","-","-", "-","x","-","x", ]; 

soundSys.hat = new Tone.Sampler({
  "url" : "/audio/hip-hop/hi-hat.wav", 
    "volume": -6  
}).toMaster();

soundSys.kick_1 = new Tone.Sampler({
    "url" : "/audio/techno/kick.wav",
     "volume": -8,
      "envelope" : {
      "attack" : 0.001,
      "decay" : 0.02,
      "sustain" : 0.01,
      "release" : 0.01
    }
}).toMaster()

soundSys.snare = new Tone.Sampler({
    "url" : "/audio/hip-hop/snare.wav", 
    "volume": -8
}).toMaster()

soundSys.kick_2 = new Tone.Sampler({
    "url" : "./audio/hip-hop/kick.wav",
    "volume": -4,  
    envelope:{
        decay:0.01,
        sustain:0.5,
        release:0.01,
      }
}).toMaster()

soundSys.snare_2 = new Tone.Sampler({
    "url" : "./audio/techno/snare.wav",
    "volume": -4,  
    envelope:{
        decay:0.01,
        sustain:0.5,
        release:0.01,
      }
}).toMaster()

soundSys.hat_3 = new Tone.Sampler({
  "url" : "./audio/techno/hi-hat.wav", 
}).toMaster()

soundSys.op_hat = new Tone.Sampler({
  "url" : "./audio/505/hho.mp3", 
}).toMaster()

soundSys.bell = new Tone.Sampler({
  "url" : "./audio/505/agogoLow.mp3", 
}).toMaster()

soundSys.clap = new Tone.Sampler({
  "url" : "./audio/FactoryKit/Clap/PD_Factory_Clap_02.wav",
  "volume": -10  
}).toMaster(); 

// EFFECTS ------------------->
soundSys.swoosh = new Tone.NoiseSynth().toMaster({
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
    },
    "volume": 2, 
});
  
soundSys.raiding = new Tone.GrainPlayer({
    "url" : "./audio/DeathDrum/FullBreaks/break_4.wav",
    "grainSize" : 0.1, //  0.01,  0.2,
    "overlap" : 0.1,
    "volume": 20, 
    "detune": 10, 
    "playbackRate": 1
  }).toMaster(); 

soundSys.raiding.volume.value = 20; 

soundSys.raiding2 = new Tone.GrainPlayer({
      "url" : "./audio/DeathDrum/FullBreaks/break_4.wav",
      "grainSize" : 0.1, //  0.01,  0.2,
      "overlap" : 0.1,
      "volume": -6, 
      "detune": 55, 
      "playbackRate": 0.8
    }).toMaster();

