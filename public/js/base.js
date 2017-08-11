// BASE  ------------------------------
soundSys.monoBase = new Tone.MonoSynth({
    "oscillator": {
      "type": "fatsawtooth"
    },
    "envelope": {
      "attack": 0.214,
      "decay": 0.098,
      "sustain": 0.2,
      "release": 0.5
    },
    "filterEnvelope": {
      "attack": 0.01,
      "decay": 0.1,
      "sustain": 0.4,
      "release": 0.15,
      "min": 9000,
      "max": 2000
    },
    "filter" : {
      "type" : "lowpass",
      "rolloff" : -12,
      "Q" : 4,
    }, 
    "volume": -16
  }).toMaster();

soundSys.monoBaseGuitar = new Tone.MonoSynth({
    "oscillator": {
        "type": "fmsquare5",
    "modulationType" : "triangle",
        "modulationIndex" : 6,
        "harmonicity" : 0.501
    },
    "filter": {
        "Q": 1,
        "type": "lowpass",
        "rolloff": -12
    },
    "envelope": {
        "attack": 0.001,
        "decay": 0.1,
        "sustain": 1.4,
        "release": 2
    },
    "filterEnvelope": {
        "attack": 0.01,
        "decay": 0.1,
        "sustain": 0.8,
        "release": 1.5,
        "baseFrequency": 100,
        "octaves": 2.4
    }, 
   "volume": -13,  
}).toMaster();

soundSys.chord_notes = [ "G2", "Ab2", "Eb2", "F2", ]; 
soundSys.tempo_pattern = ["x","-","-","-", "x","x","-","-", "x","x","x","-", "x","x","x","x", ]
soundSys.temp_count = 0; 
soundSys.bassPart = new Tone.Pattern(function(time, note){
    if (soundSys.tempo_pattern[soundSys.temp_count] == "x") {
        soundSys.monoBaseGuitar.triggerAttackRelease(note, "16n", time);
    }
 
}, ["F4", "C3", "C3" ,"C3"  ], "up").start(5);

soundSys.monoBaseGuitar.volume.rampTo(-100, 10)
// Bass -------------->
soundSys.bassline = new Tone.Synth();
soundSys.basslineVolume = new Tone.Volume(-10);
soundSys.basslineDistortion = new Tone.Distortion(50);
soundSys.bassline.chain(soundSys.basslineDistortion, soundSys.basslineVolume);
soundSys.bassline.chain(soundSys.basslineVolume, Tone.Master);

soundSys.base_pos = 5; 

soundSys.base_loop = new Tone.Loop(function(time){
    soundSys.monoBase.triggerAttackRelease(soundSys.progress_1_base[soundSys.base_pos], "4n", time) 
}, "2n")

soundSys.bassBounce = new Tone.Synth({
    "oscillator": {
        "type": "pulse",
        "width" : 0.8
    },
    "envelope": {
        "attack": 0.01,
        "decay": 0.05,
        "sustain": 0.2,
        "releaseCurve" : "bounce",
        "release": 0.4
    }, 
    "volume": -12, 
});
// Pattern -------------------- >
soundSys.FelizPart = new Tone.Pattern(function(time, note){
  soundSys.monoBase.triggerAttackRelease(note, "32n", 0.1); 
}, ["C4", "F4", "C1", "F4",], "down");

soundSys.FelizPart.interval = "16n"; 
soundSys.monoBase.volume = -100; 