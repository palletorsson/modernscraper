
if (oscillator == true) {
    var osc = new Tone.Oscillator({
      "frequency" : 440,
      "volume" : 1
    }).toMaster().start(); 
    osc.type = "sawtooth6";
    var osc2 = new Tone.Oscillator({
      "frequency" : 440,
      "volume" : 1
    }).toMaster().start(); 
    osc.type = "sine";
    
}
//AutoPanner - a penning modulation effect
    var panner = new Tone.AutoPanner({
      "frequency" : 4,
      "depth" : 1
    });


    //Tremolo - an amplitude modulation effect
    var tremolo = new Tone.Tremolo({
      "frequency" : 0.6,
      "depth" : 0.7
    });

var piano = new Tone.PolySynth(4, Tone.Synth, {
      "volume" : -8,

      "portamento" : 0.05
    }).toMaster(); 

var pianof = new Tone.PolySynth(4, Tone.Synth, {
      "volume" : -8,

      "portamento" : 0.05
    }).toMaster()

var duoSynth = new Tone.DuoSynth().toMaster(); // yaya

var noiseSynthPink = new Tone.NoiseSynth({
  "type":"pink", 
   "volume": -10
  
}).toMaster();
var lfo = new Tone.LFO("4n", 400, 4000);
//AutoFilter - a filter modulation effect
var filter = new Tone.AutoFilter({
      "frequency" :  0.1,
      "depth" : 0.7
    });

var synth = new Tone.PolySynth(10, Tone.Synth, {
    }).connect(filter).toMaster();

var filter2 = new Tone.Filter(200, "lowpass");


var synthTest = new Tone.PolySynth(10, Tone.Synth, {
 
  "oscillator": {
      "type": "sine" 
      }, 

}).connect(filter).toMaster();

var osc_types = ["sawtooth", "fmsquare", "sawtooth","sawtooth","fmsquare2", "sawtooth","sawtooth","sawtooth","sawtooth","sawtooth", "sawtooth1", "sawtooth6", "sawtooth12", "fatsawtooth", "fatsawtooth2",  "fatsawtooth4", "fatsawtooth6", "fatsawtooth12",  "fatsawtooth10", "fatsawtooth20", "fatsawtooth30","square1", "square2",  "square3", "square4", "square5", "square6", "square7", "square8", "triangle", "triangle"]
var filter_types = ["lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "notch", "allpass", "peaking"]; 
var filter2_types = ["sine", "square", "triangle", "sawtooth"]; 
var osc_cell = 0; 
var filter_cell = 0;

var attack_types = ["linear", "exponential", "sine", "cosine", "bounce", "ripple", "step"];

var lead = new Tone.MonoSynth({
      "oscillator" : {
        "type" : "square"
      },
      "envelope" : {
        "attack" : 0.05,
        "decay" : 0.2,
        "sustain" : 0.4,
        "release" : 1.4,
      },
      "filterEnvelope" : {
        "attack" : 0.005,
        "decay" : 0.1,
        "sustain" : 0.05,
        "release" : 0.8,
        "baseFrequency" : 300,
        "octaves" : 4
      }
    }).toMaster();

  var fmsynth = new Tone.FMSynth({
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

  var bass = new Tone.FMSynth({
  "harmonicity" : 2,
  "volume": -10, 
  "modulationIndex" : 21.5,
  "carrier" : {
    "oscillator" : {
      "type" : "sawtooth"
      
    },
    "envelope" : {
      "attack" : 0.08,
      "decay" : 0.03,
      "sustain" : 0,
      "release" : 0
    },
  },
  "modulator" : {
    "oscillator" : {
      "type" : "sine"
    },
    "envelope" : {
      "attack" : 0.1,
      "decay" : 0.2,
      "sustain" : 0.3,
      "release" : 0.001
    },
  }
}).toMaster();

var kick = new Tone.MembraneSynth({
    "pitchDecay" : 1.1,
    "octaves" : 3,
    "oscillator" : {
      "type" : "triangle"
    },
    "envelope" : {
      "attack" : 0,
      "decay" : 0.5,
      "sustain" : 0, 
       "release" : 0.1

    }, 
    "volume": -10
 }).toMaster();

var snare = new Tone.NoiseSynth({
  "type":"pink", 
   "volume": -10
  
}).toMaster();

var hat = new Tone.MembraneSynth({
    "pitchDecay" : 0.01,
    "octaves" : 6,
    "oscillator" : {
      "type" : "square2"
    },
    "envelope" : {
      "attack" : 0.001,
      "decay" : 0.2,
      "sustain" : 0.01
    }, 
    "volume": -5
 }).toMaster();

var synthPart = new Tone.Sequence(function(time, note){
    kick.triggerAttackRelease(note, "4n", time)
      

    if (osc_cell > 10) {
      osc_cell = 0; 
    }
      

    bass.set({
      "modulation" : {
      "type" : osc_types[osc_cell]
    }
    });
   
   
    filter.set({
     // "type" : filter2_types[osc_cell], 
    "frequency": filter_cell * 0.1
    }); 

    synthTest.attackCurve = attack_types[osc_cell]; 
    console.log(filter.type, filter.frequency.value);
    osc_cell = osc_cell + 1; 
    filter_cell = filter_cell + 1; 

}, [["C1", "D1", "F1"]], "1n").start();

var pianoSynth = new Tone.PolySynth(3, Tone.Synth, {
    "oscillator" : {
        "partials" : [1, 2, 1],
    },
    "portamento" : 0.05, 
    "oscillator": {
    "detune": 1,
    "type": "custom",
    "partials" : [2, 1, 2, 2],
    "phase": 0,
    "volume": 0
    },
    "envelope": {
	    "attack": 0.05,
	    "decay": 0.3,
	    "sustain": 0.2,
	    "release": 1,
    },
    "portamento": 0.01,
    "volume": -10
}).toMaster();

var kick = new Tone.MembraneSynth({
    "pitchDecay" : 0.01,
    "octaves" : 6,
    "oscillator" : {
      "type" : "square2"
    },
    "envelope" : {
      "attack" : 0.001,
      "decay" : 0.2,
      "sustain" : 0.01
    }
}).toMaster(); 

var hat = new Tone.Sampler({
    "url" : "./audio/loop/hh.mp3",
    "volume" : -10,
    "envelope" : {
      "attack" : 0.001,
      "decay" : 0.02,
      "sustain" : 0.01,
      "release" : 0.01
    }
}).toMaster(); 

var snare = new Tone.Sampler({
    "url" : "./audio/505/snare.mp3", 
    "envelope" : {
      "attack" : 0.01,
      "decay" : 0.05,
      "sustain" : 0
    },
}).toMaster(); 

var bdsynth = new Tone.PolySynth(16, Tone.MonoSynth);


 var base = new Tone.PolySynth(4, Tone.Synth, {
    "volume": -10,       
    "oscillator": {
        "type": "triangle",
    "modulationType" : "triangle",
        "modulationIndex" : 2,
        "harmonicity" : 0.501
    },
    "filter": {
        "Q": 1,
        "type": "lowpass",
        "rolloff": -24
    },
    "envelope": {
        "attack": 0.01,
        "decay": 0.1,
        "sustain": 0.4,
        "release": 2
    },
    "filterEnvelope": {
        "attack": 0.01,
        "decay": 0.1,
        "sustain": 0.8,
        "release": 1.5,
        "baseFrequency": 50,
        "octaves": 4.4
    }
}).connect(panner).toMaster();

 var polySynth3 = new Tone.PolySynth(8, Tone.SimpleSynth, {
    oscillator: { type: 'sine', partials: [1,1,0,0,1] },
    envelope: { attack: '4n', decay: 0, sustain: 0, release: '4n' },
    volume: 0
});
 var polysquare2 = new Tone.PolySynth(8, Tone.SimpleSynth, {
    oscillator: { type: 'square2', partials: [1,1,0,0,1] },
    envelope: { attack: '4n', decay: 0, sustain: 0, release: '4n' },
    volume: 0
});
  var polysquare4 = new Tone.PolySynth(8, Tone.SimpleSynth, {
    oscillator: { type: 'square6', partials: [1,1,0,0,1] },
    envelope: { attack: '4n', decay: 0, sustain: 0, release: '4n' },
    volume: 0
});
 var polyTri = new Tone.PolySynth(8, Tone.SimpleSynth, {
    oscillator: { type: 'sawtooth', partials: [1,0,0,0,1] },
    envelope: { attack: '16n', decay: 0, sustain: 0, release: '16n' },
    volume: 0
});

var ampEnv = new Tone.AmplitudeEnvelope({
  "attack": 0.1,
  "decay": 0.2,
  "sustain": 1.0,
  "release": 0.8
}).toMaster();
//create an oscillator and connect it
var osc = new Tone.Oscillator().connect(ampEnv);
//trigger the envelopes attack and release "8t" apart

Tone.Transport.bpm.value = 100;

Tone.Transport.start('+0.1') 