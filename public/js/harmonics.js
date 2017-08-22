// RED FM

soundSys.red = new Tone.FMSynth({ // fmstnth 1
          "harmonicity": 3.01,
          "modulationIndex": 14,
          "oscillator": {
              "type": "fatsawtooth"
          },
          "envelope": {
              "attack": 0.02,
              "decay": 0.03,
              "sustain": 0.01,
              "release": 0.2
          },
          "modulation" : {
              "type": "fatsawtooth"
          },
          "modulationEnvelope" : {
              "attack": 0.01,
              "decay": 0.5,
              "sustain": 0.2,
              "release": 0.1
          }, 
        "volume": 12
      }).toMaster();

soundSys.pink = new Tone.DuoSynth({
      "vibratoAmount" : 0.5,
      "vibratoRate" : 10,
      "portamento" : 10,
      "harmonicity" : 1.005,
      "volume" : 5,
      "voice0" : {
        "volume" : -2,
        "oscillator" : {
          "type" : "sawtooth"
        },
        "filter" : {
          "Q" : 1,
          "type" : "lowpass",
          "rolloff" : -24
        },
        "envelope" : {
          "attack" : 0.01,
          "decay" : 0.25,
          "sustain" : 0.4,
          "release" : 1.2
        },
        "filterEnvelope" : {
          "attack" : 0.001,
          "decay" : 0.05,
          "sustain" : 0.3,
          "release" : 2,
          "baseFrequency" : 100,
          "octaves" : 4
        }
      },
      "voice1" : {
        "volume" : -10,
        "oscillator" : {
          "type" : "sawtooth"
        },
        "filter" : {
          "Q" : 2,
          "type" : "bandpass",
          "rolloff" : -12
        },
        "envelope" : {
          "attack" : 0.25,
          "decay" : 4,
          "sustain" : 0.1,
          "release" : 0.8
        },
        "filterEnvelope" : {
          "attack" : 0.05,
          "decay" : 0.05,
          "sustain" : 0.7,
          "release" : 2,
          "baseFrequency" : 5000,
          "octaves" : -1.5
        }
      }
    }).toMaster();


// GREEN AM
soundSys.green = new Tone.PolySynth(6, Tone.AMSynth, {    
      "harmonicity": 3.01,
      "modulationIndex": 14,
      "oscillator": {
          "type": "triangle"
      },
      "envelope": {
          "attack": 0.2,
          "decay": 0.3,
          "sustain": 0.1,
          "release": 1.2
      },
      "modulation" : {
          "type": "square"
      },
      "modulationEnvelope" : {
          "attack": 0.01,
          "decay": 0.5,
          "sustain": 0.2,
          "release": 0.1
      }
    }).toMaster();

soundSys.diff = new Tone.PolySynth(6, Tone.MonoSynth, {
    "oscillator" : {
        "type" : "square",
        
    },
      "envelope": {
          "attack": 0.2,
          "decay": 0.3,
          "sustain": 0.1,
          "release": 1.2
      }
}).toMaster();


// http://www.guitarland.com/MusicTheoryWithToneJS/PlayChords.html
soundSys.diff = new Tone.PolySynth().toMaster();
//BLEU BASE MONO ------------------------------
soundSys.bleu = new Tone.PolySynth(6, Tone.MonoSynth, {
          "oscillator": {
              "type": "square"
          },
          "filter": {
              "Q": 2,
              "type": "lowpass",
              "rolloff": -12
          },
          "envelope": {
              "attack": 0.005,
              "decay": 3,
              "sustain": 0,
              "release": 0.45
          },
          "filterEnvelope": {
              "attack": 0.001,
              "decay": 0.32,
              "sustain": 0.9,
              "release": 3,
              "baseFrequency": 700,
              "octaves": 2.3
          }, 
          "volume": -10, 
      } ).toMaster();


// YELLOW
soundSys.yellow = new Tone.DuoSynth().toMaster(); // yaya





//soundSys.lfo = new Tone.LFO("1n", 400, 800);
//soundSys.lectric = new Tone.Synth().toMaster();

// Pattern -------------------- >
soundSys.FelizPart = new Tone.Pattern(function(time, note){
  soundSys.bleu.triggerAttackRelease(note, "32n"); 
}, ["C4", "F4", "C1", "F4",], "upDown");

soundSys.FelizPart.interval = "64n"; 
soundSys.bleu.volume.value = -10; 

//WHITE POLY SYNTH
//soundSys.white = new Tone.PolySynth(10).toMaster();

//soundSys.filter = new Tone.Filter(200,"lowpass").toMaster();

soundSys.white = new Tone.PolySynth(6, Tone.Synth, {
      'oscillator': {
        'type': 'fatsawtooth',
        'count': 3,
        'spread': 30
      },
      'envelope': {
        'attack': 0.01,
        'decay': 0.1,
        'sustain': 0.5,
        'release': 0.4,
        'attackCurve': 'exponential'
      },
    }).toMaster(); // .connect(soundSys.filter); 

soundSys.fx_distortion = new Tone.Distortion(0.8);
soundSys.fx_distortion.wet.value = 0.5;
soundSys.white.chain(soundSys.fx_distortion);

soundSys.sum = new Tone.FMSynth({
      "modulationIndex" : 12.22,
      "envelope" : {
        "attack" : 0.01,
        "decay" : 0.2
      },
      "modulation" : {
        "type" : "square"
      },
      "modulationEnvelope" : {
        "attack" : 0.2,
        "decay" : 0.01
      }
    }).toMaster(); 
soundSys.sum.volume.value = -10;
// PATTERN

soundSys.FullPart = new Tone.Pattern(function(time, note){
   soundSys.red.triggerAttackRelease(note, "16n");
   console.log(note);
}, ["ab3", "G3", "D3", "C3" ], "upDown"); 

soundSys.FullPart.interval = "8n";
soundSys.black.volume.value = 10; 