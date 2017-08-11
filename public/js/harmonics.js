
// FMSYNTH ---------------------------
//  sawtooth, sawtooth
soundSys.fmsynth = new Tone.FMSynth(
 {
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
    }, 
  "volume": 12
}).toMaster();

soundSys.synth4 = new Tone.Synth({
    "oscillator" : {
        "type" : "fatsawtooth",
        "count" : 23,
        "spread" : 23
    },
    "envelope": {
        "attack": 0.1,
        "decay": 0.01,
        "sustain": 0.5,
        "release": 0.001,
        "attackCurve" : "exponential"
    }
}).toMaster();

soundSys.steel = new Tone.Synth({
    "oscillator": {
        "type": "fatcustom",
        "partials" : [0.2, 1, 0, 0.5, 0.1],
        "spread" : 40,
        "count" : 3
    },
    "envelope": {
        "attack": 0.001,
        "decay": 1.6,
        "sustain": 0,
        "release": 1.6
    }
}).toMaster();

soundSys.fx_reverb = new Tone.Freeverb(0.1, 3000);
soundSys.fx_reverb.wet.value = 0.6;
soundSys.fx_delay = new Tone.PingPongDelay('32n', 1.1);
soundSys.fx_delay.wet.value = 0.3;

soundSys.harm = new Tone.AMSynth({
    "harmonicity": 3.999,
    "oscillator": {
        "type": "sawtooth"
    },
    "envelope": {
        "attack": 0.03,
        "decay": 0.1,
        "sustain": 0.5,
        "release": 0.8,
        "releaseCurve" : "bounce",
    },
    "modulation" : {
        "volume" : 24,
        "type": "pulse"
    },
    "modulationEnvelope" : {
        "attack": 2,
        "decay": 3,
        "sustain": 0.8,
        "release": 0.1
    }
}).toMaster(); 
soundSys.harm.chain(soundSys.fx_reverb, soundSys.fx_delay);

soundSys.fx_distortion = new Tone.Distortion(0.8);
soundSys.fx_distortion.wet.value = 0.5;
soundSys.alien = new Tone.PolySynth(4, Tone.Synth, {
    "oscillator": {
        "type": "fatsawtooth4",
        "spread" : 30,
        "count" : 15
    },
    "envelope": {
        "attack": 0.4,
        "decay": 0.01,
        "sustain": 1,
        "attackCurve" : "sine",
        "releaseCurve" : "sine",
        "release": 0.4
    }
}).toMaster();
soundSys.alien.chain(soundSys.fx_distortion);
// AmSynth ----------------------------------------
soundSys.chellosynth = new Tone.AMSynth(6, Tone.Synth, {  
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
soundSys.pianofilter = new Tone.Filter(200, "highpass");

soundSys.piano = new Tone.PolySynth(4, Tone.Synth, {
    "volume" : -10,
    "oscillator" : {
        "partials" : [1, 2, 5],
    },
    "portamento" : 0.005, 
    "volume": -10
}).toMaster();


//create a new cheby
//var cheby = new Tone.Chebyshev(50);
//create a monosynth connected to our cheby
soundSys.crusher = new Tone.BitCrusher(4).toMaster();

soundSys.pianoetta = new Tone.Synth({
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
}).toMaster();
soundSys.chellosynth.connect(soundSys.crusher);
soundSys.pianoetta2 = new Tone.Synth({
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
}).toMaster();

soundSys.lfo = new Tone.LFO("1n", 400, 800);
soundSys.lectric = new Tone.Synth({
    "portamento" : 0.2,
    "oscillator": {
        "type": "sawtooth"
    },
    "envelope": {
        "attack": 0.03,
        "decay": 0.1,
        "sustain": 0.2,
        "release": 0.02
    },
    "volume": -10, 
}).toMaster();

soundSys.lfo.connect(soundSys.lectric.frequency);

soundSys.FullPart = new Tone.Pattern(function(time, note){
   soundSys.lectric.triggerAttackRelease(note, "16n")
}, ["ab6", "G6", "D6",  ], "upDown").start(); 

soundSys.lectric.volume.value = -100; 
soundSys.FelizPart.interval = "6n"; 
soundSys.FullPart.interval = "8n";

