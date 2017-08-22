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

soundSys.black = new Tone.MonoSynth({
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
    //if (soundSys.tempo_pattern[soundSys.temp_count] == "x") {
        soundSys.monoBaseGuitar.triggerAttackRelease(note, "64n", time);
    //}
 
}, ["F4", "C3", "C3" ,"C3"  ], "up");

soundSys.bassPart.interval = "32n"; 

soundSys.monoBaseGuitar.volume.rampTo(-100, 1)
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


soundSys.bassline = new Tone.FMSynth({
    "oscillator": {
        "type": "pulse",
        "width" : 0.3
    },
    "envelope": {
        "attack": 0.01,
        "decay": 0.1,
        "sustain": 0.3,
        "releaseCurve" : "bounce",
        "release": 0.4
    }, 
  
});
soundSys.basslineVolume = new Tone.Volume(-4.25);
soundSys.basslineDistortion = new Tone.Distortion(2.5);
soundSys.basslineDelay = new Tone.FeedbackDelay(0.25); 
soundSys.basslinePhaser = new Tone.Phaser({
  "frequency" : 12.5, 
  "depth" : 15, 
  "baseFrequency" : 2500
})
soundSys.bassline.chain(soundSys.basslineDistortion, soundSys.basslineDelay);
soundSys.bassline.chain(soundSys.basslineDistortion, soundSys.basslinePhaser);
soundSys.bassline.chain(soundSys.basslinePhaser, soundSys.basslineVolume);
soundSys.bassline.chain(soundSys.basslineVolume, Tone.Master);

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

