
if (oscillator == true) {
    var osc = new Tone.Oscillator({
      "frequency" : 440,
      "volume" : 1
    }).toMaster().start(); 
    osc.type = "sawtooth6";
}

var synth = new Tone.PolySynth(4, Tone.Synth, {
    "volume": -10,
    "oscillator": {
        "type": "sine"
    },
    "envelope": {
        "attack": 0.001,
        "decay": 0.1,
        "sustain": 0.1,
        "release": 1.2
    }
}).toMaster();

var basicSynth = new Tone.Synth().toMaster();

var fatSynth = new Tone.PolySynth(4, Tone.Synth, {
  "volume": -20,
   "oscillator" : {
    "type" : "fatsawtooth",
    "count" : 3,
    "spread" : 30
  },
  "envelope": {
    "attack": 0.01,
    "decay": 0.1,
    "sustain": 0.5,
    "release": 0.4,
    "attackCurve" : "exponential"
}

}).toMaster();

var squaresynth = new Tone.Synth({
    "volume": -10, 
    "oscillator" : {
      "type" : "square"
    },
    "envelope" : {
      "attack" : 0.01,
      "decay" : 0.2,
      "sustain" : 0.2,
      "release" : 0.2,
    }
}).toMaster();

 var chellosynth = new Tone.PolySynth(6, Tone.Synth, {
    "volume": -10,  
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

var fsynth = new Tone.PolySynth(6, Tone.Synth, {
      "oscillator" : {
        "partials" : [0, 2, 3, 4],
      }
}).toMaster();

var hsynth = new Tone.PolySynth(3, Tone.Synth, {
    "volume": -10,
    "harmonicity": 3.999,
    "oscillator": {
        "type": "square"
    },
    "envelope": {
        "attack": 0.03,
        "decay": 0.3,
        "sustain": 0.6,
        "release": 0.7
    },
    "modulation" : {
        "volume" : 1,
        "type": "square6"
    },
    "modulationEnvelope" : {
        "attack": 2,
        "decay": 3,
        "sustain": 0.7,
        "release": 0.1
    }
}).toMaster();

var sweetsynth = new Tone.PolySynth(3, Tone.Synth, {
    "volume": -10,  
    "portamento" : 0.0,
    "oscillator": {
        "type": "square4"
    },
    "envelope": {
        "attack": 2,
        "decay": 1,
        "sustain": 0.2,
        "release": 1.1
    }
 }).toMaster(); 
   
var steelsynth = new Tone.PolySynth(3, Tone.Synth, {

    "oscillator": {
        "type": "fatcustom",
        "partials" : [0.2, 1, 0, 0.5, 0.1],
        "spread" : 40,
        "count" : 3
    },
    "envelope": {
        "attack": 0.001,
        "decay": 1.2,
        "sustain": 0.2,
        "release": 1.2
    }, 
}).toMaster();

var fmsynth = new Tone.FMSynth(4, {
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

  var conga = new Tone.MembraneSynth({
      "pitchDecay" : 0.008,
      "octaves" : 2,
      "envelope" : {
        "attack" : 0.0006,
        "decay" : 0.5,
        "sustain" : 0
      }
    }).toMaster();


var bell = new Tone.MetalSynth({
    "harmonicity" : 12,
    "resonance" : 800,
    "modulationIndex" : 20,
    "envelope" : {
      "decay" : 0.4,
    },
    "volume" : -15
}).toMaster();


var lsynth = new Tone.PolySynth(4, Tone.Synth, {
    "portamento" : 0.2,
    "oscillator": {
        "type": "sawtooth"
    },
    "envelope": {
        "attack": 0.03,
        "decay": 0.1,
        "sustain": 0.2,
        "release": 0.02
    }
}).toMaster()

var piano = new Tone.PolySynth(4, Tone.Synth, {
    "volume" : -10,
    "oscillator" : {
        "partials" : [1, 2, 5],
    },
    "portamento" : 0.005
}).toMaster()


var drop = new Tone.PolySynth(4, Tone.Synth, {
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
    }
}).toMaster()

var main_cord = []; 
var the_speed = 1000;
var note_num = 0;
var notes = [      
    {
      "name": "D3",
    },
    {
      "name": "D3",
    },
    {
      "name": "D3",
    },
    {
      "name": "F3",
    },
    {
      "name": "A2",
    },
    {
      "name": "A2",
    },
    {
      "name": "A2",
    },
    {
      "name": "A#2",
    },
    {
      "name": "A#2",
    },
    {
      "name": "A#2",
    },
    {
      "name": "A#2",
    },
    {
      "name": "A#2",
    },
    {
      "name": "A2",
    }
  ]

var bass = new Tone.FMSynth({
  "harmonicity" : 1,
  "volume": -10, 
  "modulationIndex" : 3.5,
  "carrier" : {
    "oscillator" : {
      "type" : "custom",
      "partials" : [0, 1, 0, 2]
    },
    "envelope" : {
      "attack" : 0.08,
      "decay" : 0.3,
      "sustain" : 0,
    },
  },
  "modulator" : {
    "oscillator" : {
      "type" : "square"
    },
    "envelope" : {
      "attack" : 0.1,
      "decay" : 0.2,
      "sustain" : 0.3,
      "release" : 0.01
    },
  }
}).toMaster();

var keys = new Tone.MultiPlayer({
    urls : {
        "K" : "audio/505/kick.mp3",
        "S" : "audio/505/snare.mp3",
        "P" : "audio/505/agogoHigh.mp3",
        "H" : "audio/505/hh.mp3",
        "0H" : "audio/505/hho.mp3",
    },
    volume : 1,
    fadeOut : 0.1,
}).toMaster();

var multiplayer = new Tone.MultiPlayer({
   "volume" : -6,
    urls : {
        "Kick" : "./audio/505/kick.mp3",
        "Snare" : "./audio/505/snare.mp3",
        "P" : "./audio/505/agogoHigh.mp3",
        "Hat" : "./audio/505/hh.mp3",
    },
}).toMaster();
multiplayer.probability = 0.9; 

    // alt drums 
    //and a compressor
var drumCompress = new Tone.Compressor({
    "threshold" : -30,
    "ratio" : 6,
    "attack" : 0.3,
    "release" : 0.1
}).toMaster();

var distortion = new Tone.Distortion({
    "distortion" : 0.4,
    "wet" : 0.4
});

//hats
var hat = new Tone.Sampler({
    "url" : "./audio/loop/hh.mp3",
    "volume" : -10,
    "envelope" : {
      "attack" : 0.001,
      "decay" : 0.02,
      "sustain" : 0.01,
      "release" : 0.01
    }
}).chain(distortion, drumCompress);


//snare
var snare = new Tone.Sampler({
    "url" : "./audio/505/snare.mp3", 
    "envelope" : {
      "attack" : 0.01,
      "decay" : 0.05,
      "sustain" : 0
    },
}).chain(distortion, drumCompress);

var loop = new Tone.Part(function(time){
    console.log(b)    
    b = b + 1; 
    if (b > 15) {
      b = 0; 
    } 
}, [0, 2, 4, 6, ], "16n").start(0);

// kick 
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
    "volume": -5
 }).toMaster(); // .connect(drumCompress);

var brass = new Tone.MonoSynth({
      "volume": -10,
    "portamento": 0.01,
    "oscillator": {
        "type": "sawtooth"
    },
    "filter": {
        "Q": 2,
        "type": "lowpass",
        "rolloff": -24
    },
    "envelope": {
        "attack": 0.1,
        "decay": 0.1,
        "sustain": 0.6,
        "release": 0.5
    },
    "filterEnvelope": {
        "attack": 0.05,
        "decay": 0.8,
        "sustain": 0.4,
        "release": 1.5,
        "baseFrequency": 2000,
        "octaves": 1.5
    }
}).toMaster();
var cheby = new Tone.Chebyshev(100);
var bass = new Tone.PolySynth(4, Tone.Synth, {
    "volume": -10,       
    "oscillator": {
        "type": "fmsquare5",
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
}).connect(cheby).toMaster();

var bdsynth = new Tone.PolySynth(16, Tone.MonoSynth);

var polySynth3 = new Tone.PolySynth(8, Tone.SimpleSynth, {
    oscillator: { type: 'sine', partials: [1,1,0,0,1] },
    envelope: { attack: '4n', decay: 0, sustain: 0, release: '4n' },
    volume: 0
});
var dist = new Tone.Distortion().toMaster();
var polySynth2 = new Tone.PolySynth(8, Tone.SimpleSynth, {
    oscillator: { type: 'sine', partials: [1,0,0,0,1] },
    envelope: { attack: '16n', decay: 0, sustain: 0, release: '16n' },
    volume: -40
}).connect(dist);
var delay = new Tone.FeedbackDelay({ delayTime: '4t', feedback: 0.5, wet: 0.5 })
var limiter = new Tone.Limiter();
var panner = new Tone.Panner(0.5);


var vol = new Tone.Volume(-10).toMaster();
var mc = new Tone.Compressor(-20, 2.5).connect(vol);
var s1 = new Tone.PolySynth(3, Tone.FMSynth).connect(mc);
s1.set({
  envelope: {attack: 0.03, sustain: .01},
  carrier: {oscillator: {type: 'square'}, filter: {type: 'lowpass'}},
  volume: 10
});
var s2 = new Tone.PolySynth(3, Tone.AMSynth).connect(mc);
var s3 = new Tone.PolySynth(3, Tone.MonoSynth).connect(mc);
s3.set({
  envelope: {attack: .3, sustain: .01, decay: .05, release: .1},
  oscillator: {type: 'triangle'}, filter: {type: 'highpass', freq: 300},
  volume: -5
});
var duoSynth = new Tone.DuoSynth().toMaster(); // yaya



var amSynth = new Tone.AMSynth().toMaster(); // yaya
var memSynth = new Tone.MembraneSynth().toMaster();
var noiseSynth = new Tone.NoiseSynth().toMaster();
var noiseSynthPink = new Tone.NoiseSynth({
  type:"pink"
}).toMaster();

var plSynth = new Tone.PluckSynth().toMaster();
var crusher = new Tone.BitCrusher(4).toMaster();
var crucherSynth = new Tone.MonoSynth().connect(crusher);

var cheby = new Tone.Chebyshev(50);
var chebySynth = new Tone.MonoSynth().connect(cheby);

var pingPong = new Tone.PingPongDelay("4n", 0.2).toMaster();
var ping = new Tone.MembraneSynth().connect(pingPong);

//L/R channel merging
    var merge = new Tone.Merge();
    //a little reverb
    var reverb = new Tone.Freeverb({
      "roomSize" : 0.2,
      "wet" : 0.3
    });
    merge.chain(reverb, Tone.Master);
    //the synth settings
    var synthSettings = {
      "oscillator": {
        "detune": 0,
        "type": "custom",
        "partials" : [2, 1, 2, 2],
        "phase": 0,
        "volume": 0
      },
      "envelope": {
        "attack": 0.005,
        "decay": 0.3,
        "sustain": 0.2,
        "release": 1,
      },
      "portamento": 0.01,
      "volume": -20
    };
    //left and right synthesizers
    var synthL = new Tone.Synth(synthSettings).connect(merge.left);
    var synthR = new Tone.Synth(synthSettings).connect(merge.right);


var c_effect =  new Tone.Tremolo(9, 0.75).toMaster().start(); //
// new Tone.AutoPanner("2n").toMaster(); //  new Tone.AutoFilter("32n").toMaster(); //// 
// new Tone.Tremolo(9, 0.75).toMaster().start(); // yaya func
// new Tone.Freeverb().toMaster(); // yaya
// c_effect.dampening.value = 1000; // 

// new Tone.FeedbackDelay("2n", 1.1).toMaster();
// new Tone.Distortion(0.3).toMaster();// new Tone.Chorus(4, 2.5, 0.5).toMaster() ;// new Tone.AutoWah(50, 6, -30).toMaster(); 
// new Tone.BitCrusher(8).toMaster();
var piano = new Tone.PolySynth(4, Tone.Synth, {
      "volume" : -8,
      "oscillator" : {
        "partials" : [1, 2, 1],
      },
      "portamento" : 0.05
    }).toMaster()
var pianoSynth = new Tone.PolySynth(4, Tone.Synth, {
    "oscillator" : {
        "partials" : [1, 2, 1],
    },
    "portamento" : 0.05, 
    "oscillator": {
    "detune": 0,
    "type": "custom",
    "partials" : [2, 1, 2, 2],
    "phase": 0,
    "volume": 0
    },
    "envelope": {
    "attack": 0.005,
    "decay": 0.3,
    "sustain": 0.2,
    "release": 1,
    },
    "portamento": 0.01,
    "volume": -10
}).connect(c_effect);

//DRUMS//
//and a compressor
var drumCompress = new Tone.Compressor({
    "threshold" : -30,
    "ratio" : 6,
    "attack" : 0.3,
    "release" : 0.1
}).toMaster();

var distortion = new Tone.Distortion({
    "distortion" : 0.4,
    "wet" : 0.4
});

//hats

var hats = new Tone.Sampler({
    "url" : "./audio/505/hh.mp3",
    "volume" : -10,
    "envelope" : {
      "attack" : 0.001,
      "decay" : 0.02,
      "sustain" : 0.01,
      "release" : 0.01
    }
}).chain(distortion, drumCompress);

/**    var hatsLoop = new Tone.Loop({
  "callback" : function(time){

  },
  "interval" : "16n",
  "probability" : 0.8
}).start("1m");
//SNARE PART **/

var snare = new Tone.Sampler({
    "url" : "./audio/505/snare.mp3", 
    "envelope" : {
      "attack" : 0.01,
      "decay" : 0.05,
      "sustain" : 0
    },
}).chain(distortion, drumCompress);

/** var snarePart = new Tone.Sequence(function(time, velocity){

}, [null, 1, null, [1, 0.3]]).start(0);

var kick = new Tone.MembraneSynth({
  "pitchDecay" : 0.01,
  "octaves" : 6,
  "oscillator" : {
    "type" : "square4"
  },
  "envelope" : {
    "attack" : 0.001,
    "decay" : 0.2,
    "sustain" : 0
  }
}).connect(drumCompress);

var kickPart = new Tone.Sequence(function(time, probability){
  if (Math.random() < probability){
    kick.triggerAttack("C1", time);
  }
}, [1, [1, [null, 0.3]], 1, [1, [null, 0.5]], 1, 1, 1, [1, [null, 0.8]]], "2n").start(0); **/

    var piano = new Tone.Synth({
      "oscillator" : {
        "type" : "fmsine4",
        "modulationType" : "square"
      }
    }).toMaster();

var i = 0; 
var loop = new Tone.Sequence(function(time){   
    if (snares[i] != "-") {
       //snare.triggerAttack();
    }
    if (kicks[i] != "-") {
        kick.triggerAttack("C1", time);
    }
    
    if (hats[i] != "-") {
        hat.triggerAttack();
    }

}, "32n");

var iloop =  new Tone.Sequence(function(time){  
    l = l + 1;
    if (l > 15) {
      l = 0;
    }
}, "2n");

var snareLoop = new Tone.Sequence(function(time){   
    if (snares[i] != "-") {
       snare.triggerAttack();
    }
}, "32n");

var kickLoop = new Tone.Sequence(function(time){   
    if (kicks[i] != "-") {
        kick.triggerAttack("C1", time);
    }
}, "32n");

var hatLoop = new Tone.Sequence(function(time){   
    if (hats[i] != "-") {
        hat.triggerAttack();
    }
}, "32n");

var brigtness_parts = new Tone.Sequence(function(time, dark_note){
    pianoSynth.triggerAttackRelease(dark_note, "1n", time)
  }, ["Db3", "C3"], "2n");

var chello_parts = new Tone.Sequence(function(time, bright_note){
      chellosynth.triggerAttackRelease(bright_note, "1n", time)
}, ["C3", "Db3",], "8n");  

var inst = 'fatsys'; 

var reds_parts = new Tone.Pattern(function(time, red_note){
  if (inst == 'synt') {
      synth.triggerAttackRelease(red_note, "1n", time)
  } else if (inst == 'fatsys') {
      fatSynth.triggerAttackRelease(red_note, "1n", time)
  } else if (inst == 'piano') {
      pianoSynth.triggerAttackRelease(red_note, "2n", time)  
  } else if (inst == 'steel') {
      steelsynth.triggerAttackRelease(red_note, "2n", time)  
  } else {
      s1.triggerAttackRelease(red_note, "1n", time)
  }

}, [], "upDown");

var green_parts = new Tone.Sequence(function(time, green_note, pitch){
      synth.triggerAttackRelease(green_note, "32n", time)
      //steelsynth.triggerAttackRelease(green_note, "8n", time)
      // s3.triggerAttackRelease(green_note, "8n", time)
      // chellosynth.triggerAttackRelease(green_note, "4n", time)
      // conga.triggerAttack(pitch, time, Math.random()*0.5 + 0.5);
      pianoSynth.triggerAttackRelease(green_note, "8n", time); 
}, [], "2n");                     


var bleu_parts = new Tone.Sequence(function(time, bleu_note){
     //piano.triggerAttackRelease(bleu_note, "32n", time)
       //drop.triggerAttackRelease(bleu_note, "1n", time)
       //synth.triggerAttackRelease(bleu_note, "2n", time)
      //steelsynth.triggerAttackRelease(bleu_note, "1n", time)
      bass.triggerAttackRelease(bleu_note, "1n", time) 
     // fsynth

}, [], "1n");     // "C#7", "C3"  

var red_parts = new Tone.Pattern(function(time, red_note){
      // synth.triggerAttackRelease(red_note, "1n", time) 
      steelsynth.triggerAttackRelease(green_note, "8n", time)
      
  
}, [], "upDown"); // "C3", "D4", "E5", "F1"

var green2_parts = new Tone.Sequence(function(time, green_note){
      brass.triggerAttackRelease(green_note, "1n", time)
}, ["C#7", "C3"], "16n");                     

var bleu2_parts = new Tone.Sequence(function(time, bleu_note){
      drop.triggerAttackRelease(bleu_note, "1n", time)
}, ["C2", "C3"], "8n");                     

                                   
//play the loop between 0-2m on the transport
Tone.Transport.bpm.value = 200;

Tone.Transport.start('+0.1') 
