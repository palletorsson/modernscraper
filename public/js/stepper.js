$( document ).ready(function() {


var to = Tonal.scale.get('chromatic', 'C')


console.log(" test", to)
var soundSys = {
  data : [[239,212,191,189,0,0,190,186,188,630,3,0],[240,213,193,207,0,0,210,187,189,633,3,0],[241,231,209,209,0,0,227,206,208,634,4,0],[244,214,192,188,0,0,210,169,207,635,3,0],[245,213,190,170,0,0,208,168,187,631,2,0],[246,213,189,152,0,0,207,168,188,624,2,0],[247,211,190,151,0,0,207,168,186,622,2,0],[248,210,170,150,0,0,186,167,185,619,1,0],[249,209,170,150,0,0,185,167,184,619,2,0],[250,208,188,150,0,0,186,167,184,620,2,0],[251,191,188,151,0,0,186,167,202,622,2,0],[252,193,207,169,0,0,188,185,203,626,1,0],[253,194,208,168,0,0,189,185,186,628,1,0],[254,196,208,168,0,0,190,185,188,629,1,0],[255,195,208,170,0,0,190,186,188,631,1,0],[400,158,128,126,0,0,133,126,132,411,10,0],[401,158,145,126,0,0,151,126,132,410,9,0],[402,158,145,126,0,0,151,126,132,411,9,0],[403,158,145,108,0,0,151,108,131,412,8,0],[404,157,147,108,0,0,151,108,131,416,8,0],[405,158,129,108,0,0,134,108,131,418,7,0],[406,176,130,108,0,0,134,108,131,423,8,0],[407,177,130,108,0,0,152,108,131,424,9,0],[408,177,128,108,0,0,152,108,131,422,13,0],[409,176,128,107,0,0,134,107,130,421,2,0],[410,158,128,107,0,0,151,107,148,420,2,0],[411,158,128,107,0,0,151,107,148,420,3,0],[412,156,127,106,0,0,132,106,128,416,6,0],[413,156,127,106,0,0,132,106,128,416,9,0],[414,156,127,106,0,0,132,106,128,416,2,0],[415,156,127,107,0,0,132,107,129,415,2,0],[416,156,128,107,0,0,132,107,129,442,9,0],[417,156,128,89,0,0,132,89,128,446,6,0],[418,157,129,88,0,0,133,89,128,452,3,0],[419,175,128,106,0,0,133,107,129,451,1,0],[420,175,128,106,0,0,133,107,129,451,1,0],[421,156,127,106,0,0,132,106,129,443,1,0],[422,138,129,105,0,0,132,106,129,439,1,0],[423,137,129,105,0,0,131,106,128,412,1,0],[424,138,127,105,0,0,132,106,128,432,2,0],[425,138,126,106,0,0,132,106,129,456,3,0],[426,138,126,88,0,0,132,88,128,432,3,0],[427,136,125,87,0,0,130,87,127,426,2,0],[428,136,124,87,0,0,129,87,127,403,2,0],[429,134,123,86,0,0,127,85,126,400,2,0],[430,133,84,84,0,0,124,84,106,391,8,0],[431,132,83,84,0,0,123,83,88,387,7,0],[432,148,80,82,0,0,121,80,86,382,7,0],[433,145,79,82,0,0,101,79,85,378,0,0],[434,147,78,80,0,0,119,78,102,376,0,0],[435,146,96,79,0,0,119,78,100,375,0,0],[436,127,95,78,0,0,118,77,99,370,0,0],[437,126,77,62,0,0,100,60,83,365,0,0],[438,109,95,61,0,0,101,60,100,356,0,0],[439,109,95,61,0,0,101,60,100,324,0,0],[440,108,76,61,0,0,100,59,82,318,0,0],[441,108,75,61,0,0,100,58,82,315,0,0],[442,89,75,60,0,0,82,57,81,309,0,0],[443,90,57,60,0,0,82,57,81,303,0,0],[444,89,57,61,0,0,81,58,82,299,0,0],[445,89,57,61,0,0,63,58,65,296,0,0],[446,70,58,61,0,0,64,59,65,292,0,0],[447,71,58,61,0,0,64,59,65,288,0,0],[448,72,58,61,0,0,64,59,66,261,0,0],[449,72,58,61,0,0,64,59,66,264,0,0],[450,89,58,62,0,0,64,59,66,268,0,0],[451,88,58,61,0,0,64,59,65,267,0,0],[452,88,57,59,0,0,63,57,63,265,6,0],[453,87,55,58,0,0,61,55,62,262,5,0],[454,87,55,58,0,0,79,55,61,263,3,0],[455,87,55,58,0,0,79,55,61,263,4,0],[456,88,55,59,0,0,61,56,63,313,5,0],[457,106,56,60,0,0,62,57,63,322,7,0],[458,107,57,60,0,0,63,57,64,330,0,0],[459,109,59,62,0,0,65,59,65,337,0,0],[460,108,59,62,0,0,65,59,65,340,0,0],[461,109,58,62,0,0,64,59,66,340,0,0],[462,127,58,61,0,0,64,58,66,343,0,0],[463,126,57,60,0,0,63,57,64,343,0,0],[464,126,57,60,0,0,63,57,64,346,0,0],[465,126,56,60,0,0,80,57,64,346,0,0],[466,127,56,58,0,0,80,56,64,349,0,0],[467,127,56,58,0,0,80,56,64,373,0,0],[468,127,58,59,0,0,64,58,64,372,0,0],[469,128,56,58,0,0,63,56,64,373,0,0],[470,128,56,58,0,0,63,56,64,371,0,0],[471,128,57,59,0,0,81,57,64,353,0,0],[472,127,57,58,0,0,80,57,63,352,0,0],[473,145,56,58,0,0,62,56,63,351,0,0],[474,144,56,59,0,0,62,57,64,372,0,0],[475,144,56,59,0,0,62,57,64,373,0,0],[476,125,57,60,0,0,63,58,64,371,0,0],[477,125,57,60,0,0,63,58,64,368,0,0],[478,127,57,60,0,0,81,58,65,350,0,0],[479,126,58,61,0,0,64,59,66,351,0,0],[480,125,58,61,0,0,64,59,66,354,0,0],[481,107,59,60,0,0,64,59,65,353,0,0],[482,107,57,60,0,0,63,58,65,348,0,0],[483,108,57,60,0,0,63,58,65,370,0,0],[484,107,57,60,0,0,63,58,65,370,0,0],[485,90,57,60,0,0,81,58,65,371,0,0],[486,90,57,59,0,0,81,57,64,373,0,0],[487,107,57,59,0,0,63,57,64,377,0,0],[488,124,57,59,0,0,63,57,63,379,0,0],[489,123,57,59,0,0,63,57,63,380,0,0],[490,142,56,58,0,0,62,56,63,384,0,0],[491,142,56,59,0,0,62,56,63,386,0,0],[492,143,56,59,0,0,80,56,63,389,0,0],[493,144,74,58,0,0,98,56,81,393,0,0],[494,143,73,57,0,0,79,55,81,391,0,0],[495,143,73,57,0,0,79,55,81,388,0,0],[496,143,74,57,0,0,80,56,81,386,6,0],[497,143,74,75,0,0,80,74,81,385,7,0],[498,143,73,75,0,0,79,73,81,383,7,0],[499,142,55,58,0,0,78,55,80,381,0,0],[500,141,55,57,0,0,78,55,79,382,0,0],[501,140,54,56,0,0,76,54,77,383,0,0],[502,102,36,38,0,0,58,36,59,378,0,0],[503,102,36,38,0,0,58,36,41,374,0,0],[504,102,36,38,0,0,40,36,41,370,0,0],[505,101,36,38,0,0,40,36,41,365,0,0],[506,102,36,38,0,0,40,36,42,364,0,0],[507,102,36,38,0,0,40,36,42,361,0,0],[508,102,36,38,0,0,40,36,42,361,0,0],[509,83,37,38,0,0,41,37,41,359,0,0],[510,84,37,38,0,0,41,37,41,360,0,0]],
  dataImportCount : 1, 
  row: 2, 

}

var c=document.getElementById("canvas");
var ctx=c.getContext("2d");
ctx.font="12px Georgia";


$.getJSON( "../../hist.json", function( imgdata ) {
      soundSys.alldata = imgdata
      $.getJSON( "./json/"+soundSys.alldata[1].filename+".json", function( imgdata ) {
        soundSys.data = imgdata; 
        console.log(soundSys.data)
      }); 

}); 

var the_count = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

flats = ['C' , 'F' , 'A#', 'E#', 'A', 'C#', 'F#', 'B', 'E', 'A', 'D', 'F','C'] 
sharps = ['B#', 'E#', 'A#' , 'D#', 'G#' , 'C#' , 'F#', 'B', 'E', 'A', 'D', 'G','B#']
 
var chromatic = ["C", "D#", "D", "E#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
var major = [1, 3, 6, 8, 10];
var minor = [1, 4, 6, 9, 11];

var majorCord = []

for  (var j = 0; j < 10; j++) {
  for (var i = 0; i < major.length; i++) {
    majorCord.push(chromatic[major[i]-1]+j);
  }
}
console.log(majorCord); 

/// --- Piano --------------------->
var casio_keys = new Tone.Players({
  "A1" : "./audio/casio/A1.[mp3|ogg]",
  "A#1" : "./audio/casio/As1.[mp3|ogg]", 
  "B1" : "./audio/casio/B1.[mp3|ogg]",
  "C2" : "./audio/casio/C2.[mp3|ogg]",
  "C#2" : "./audio/casio/Cs2.[mp3|ogg]",
  "D2" : "./audio/casio/D2.[mp3|ogg]",
  "D#2" : "./audio/casio/Ds2.[mp3|ogg]",
  "E2" : "./audio/casio/E2.[mp3|ogg]",
  "F2" : "./audio/casio/F2.[mp3|ogg]",
  "F#2" : "./audio/casio/Fs2.[mp3|ogg]",
  "G2" : "./audio/casio/G2.[mp3|ogg]",
  "G#2" : "./audio/casio/Gs1.[mp3|ogg]",
}, {
  "volume" : -10,
  "fadeOut" : "64n",
}).toMaster();

var scale_major_c =["C0", "D0", "F0", "G0", "A0", "C1", "D1", "F1", "G1", "A1", "C2", "D2", "F2", "G2", "A2", "C3", "D3", "F3", "G3", "A3", "C4", "D4", "F4", "G4", "A4", "C5", "D5", "F5", "G5", "A5", "C6", "D6", "F6", "G6", "A6", "C7", "D7", "F7", "G7", "A7", "C8", "D8", "F8", "G8", "A8", "C9", "D9", "F9", "G9", "A9"]
var all_notes = ["A1", "A#1", "B1", "C2", "C#2", "D2", "D#2", "E2", "F2", "F#2", "G2", "G#2" , "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3" , "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5"]
// var all_notes = ["A1", "A#1", "B1", "C2", "C#2", "D2", "D#2", "E2", "F2", "F#2", "G2", "G#2"]
var noteSellect = ["A1", "C#2", "E2", "F#2"];
var note_count = 8;

var green = new Tone.MonoSynth({ // pianoetta
          "oscillator": {
              "type": "square"
          },
          "filter": {
              "Q": 2,
              "type": "lowpass",
              "rolloff": -12
          },
          "envelope": {
              "attack": 0.05,
              "decay": 0.1,
              "sustain": 1.0,
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
          "volume": -20, 
      } ).toMaster();

var init_keys_matrix = [
              [2],
              [2],
              [2],
              [2],

              [2],
              [3],
              [3],
              [3],
              
              [0, 2],
              [0, 2],
              [1, 2],
              [0, 1, 2],
              
              [1],
              [1],
              [0, 1],
              [1],
              
             ];
var keys_matrix = []
for (var x=0; x < init_keys_matrix.length; x++) {
  var column = init_keys_matrix[x];
  var row = []
  for (var i = 0; i < column.length; i++){
    row.push(noteSellect[init_keys_matrix[x][i]])
  }
  keys_matrix.push(row); 
}

var casio_loop = new Tone.Sequence(function(time, col){
  var column = keys_matrix[col];
  //console.log(keys_matrix[col])
  for (var i = 0; i < column.length; i++){
    var vel = Math.random() * 0.5 + 0.3;
    var key = keys_matrix[[col][i]];  
    // console.log(soundSys.data[soundSys.row], soundSys.row)
    if (soundSys.data[soundSys.row][1] != 0 || soundSys.data[soundSys.row][1] < 30) {

      casio_keys.volume.value = Math.floor(soundSys.data[soundSys.row][1]/30 -10);  
      ctx.fillText("c",soundSys.row*3,100+soundSys.data[soundSys.row][1]);

      casio_keys.get(all_notes[Math.floor(soundSys.data[soundSys.row][1]/40)]).start(time, 0, "32n", 0, vel);
    }
    // green.triggerAttackRelease(column[i], "32n", "+0.05", vel);
  }
  if (soundSys.data[soundSys.row][1] < soundSys.data[soundSys.row+1][1]) {
    note_count++; 
  }
  if (soundSys.data[soundSys.row][1] > soundSys.data[soundSys.row+1][1]) {
    note_count--; 
  }
  if (note_count < 0) {
    note_count = 0; 
  }
  if (note_count > all_notes.length-1) {
    note_count--; 
  }
    

  // get next keys
  if (col % 2 == 0) keys_matrix[col] = ["E2", "A1"]; 
}, the_count, "16n");

/// --- Drums ---------------------------->
var drums = new Tone.Players({
  "C10": "./audio/techno/kick.[wav|mp3|ogg]",
  "D10": "./audio/505/snare.[mp3|ogg]",
  "E10": "./audio/techno/hi-hat.[wav|mp3|ogg]", 
  "E11": "./audio/hip-hop/snare.[wav|mp3|ogg]"
}, {
  "volume" : -8,
  "fadeOut" : "64n",
}).toMaster();

var drum_matrix = [
              ["C10"],
              [],
              ["D10" ],
              [],

              ["C10" ],
              [],
              ["D10","C10"],
              [],
              
              ["C10" ],
              [],
              ["D10" ],
              [],
              
              ["C10" ],
              [],
              ["D10" ],
              [],
              
              ["C10" ],
              ["C10" ],
              [],
              [],
             ];

var drum_loop = new Tone.Sequence(function(time, col){
  var column = drum_matrix[col];
  drums.get("E10").start(time, 0, "64n", 0, vel); 
  //console.log(soundSys.data[soundSys.row][9])
  if (soundSys.data[soundSys.row][9] > 100) {
    for (var i = 0; i < column.length; i++){
      //slightly randomized velocities
      var vel = Math.random() * 0.5 + 0.3;
      // console.log(vel)
      drums.get(column[i]).start(time, 0, "32n", 0, vel); 
    }
  } else {
    if (soundSys.data[soundSys.row][9] % 2 == 0){
        drums.get("E11").start(time, 0, "64n", 0, vel); 
    }
  }
  
}, the_count, "16n");

/// --- Base ---------------------->
soundSys.bass = new Tone.MonoSynth({
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
  "volume": 10
}).toMaster();

var baseline =  [
                  "C2", 
                  ["C3", ["C3", "D2"]], 
                  "E2", 
                  ["D2", "A1"]
                ]

var bassPart = new Tone.Sequence(function(time, note){
  // console.log("base", all_notes[Math.floor(soundSys.data[soundSys.row][1]/30)])
  if (soundSys.data[soundSys.row][1] != 0){
    soundSys.bass.volume.value = Math.floor(soundSys.data[soundSys.row][1]/30 -20);
    ctx.fillText("b",soundSys.row*3,200+soundSys.data[soundSys.row][8]);
    soundSys.bass.triggerAttackRelease(all_notes[Math.floor(soundSys.data[soundSys.row][8]/20)], "16n", time);
  }
}, baseline);

bassPart.probability = 0.8;
soundSys.bleu = new Tone.PolySynth(6, Tone.MonoSynth, {
    "oscillator" : {
        "type" : "square",     
    },
      "envelope": {
          "attack": 0.2,
          "decay": 0.1,
          "sustain": 0.1,
          "release": 0.1
      }, 
      "volume": -20
}).toMaster();

var bleepLoop = new Tone.Loop(function(time){
  ctx.fillText("l", soundSys.row*3, 400+soundSys.data[soundSys.row][9]);
  green.triggerAttackRelease(all_notes[Math.floor(soundSys.data[soundSys.row][9]/20)]);
}, "128n");

// Piano ---------__>
var piano = new Tone.Synth({
  "oscillator" : {
    "type" : "fmsine4",
    "modulationType" : "square"
  }, 
  "volume": -10
}).toMaster();

var piano_loop = new Tone.Pattern(function(time){
  if (soundSys.data[soundSys.row][3] != 0) {
    ctx.fillText("p", soundSys.row*3, 300+soundSys.data[soundSys.row][3]);
    piano.triggerAttackRelease(all_notes[Math.floor(soundSys.data[soundSys.row][3]/10)], "8n", time);
  }
}); 

piano_loop.interval = "4n";

var chordPiano = new Tone.PolySynth(3, Tone.Synth, {
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
  volume: -10
}).toMaster(); 

var rythm0 = [["0:0:2"],["0:1:3"], ["0:2:2"], ["0:3:3"]]

var rythm1 = [["0:0:2"], ["0:1"],["0:1:3"], ["0:2:2"], ["0:3"], ["0:3:2"]]
var rythm2 = [["0:0:2"], ["0:0:4"], ["0:0:6"], ["0:1"],["0:1:3"], ["0:2:2"], ["0:3"], ["0:3:2"], ["0:4"], ["0:4:2"], ["0:5"], ["0:5:2"], ["0:6"], ["0:6:2"], ["0:6:4"], ]

var chord = ["D4", "F4", "A4", "C5"];

var pianoPart = new Tone.Part(function(time){
  chordPiano.triggerAttackRelease(chord, "4n", time);
  //chordPiano.frequency = soundSys.data[soundSys.row][9]
  ctx.fillText("r", soundSys.row*3, 450+Math.floor(soundSys.data[soundSys.row][1]/5)+10);
  ctx.fillText("g", soundSys.row*3, 500+Math.floor(soundSys.data[soundSys.row][2]/5)+10);
  ctx.fillText("b", soundSys.row*3, 550+Math.floor(soundSys.data[soundSys.row][3]/5)+10);
  var a = (soundSys.data[soundSys.row][1] != 0) ? scale_major_c[Math.floor(soundSys.data[soundSys.row][1]/10)+10] : "A12";
  var b = (soundSys.data[soundSys.row][2] != 0) ? scale_major_c[Math.floor(soundSys.data[soundSys.row][2]/10)+10] : "A12";
  var c = (soundSys.data[soundSys.row][3] != 0) ? scale_major_c[Math.floor(soundSys.data[soundSys.row][3]/10)+10] : "A12";
  chord = [ a, b, c];
  console.log(chord);
},  rythm0 ).start(3);


pianoPart.loop = true;
pianoPart.loopEnd = "1m";
pianoPart.humanize = true;

// CONTROLS 
soundSys.controlLoop = new Tone.Loop(function(time){
  soundSys.row++;   
  if (soundSys.row == soundSys.data.length-1) {
    soundSys.row = 0; 
    Tone.Transport.stop();
    soundSys.dataImportCount++; 
    $.getJSON( "./json/"+soundSys.alldata[soundSys.dataImportCount].filename+".json", function( imgdata ) {
        soundSys.data = JSON.parse(imgdata); 
        console.log(soundSys.data)
        Tone.Transport.start();
    }); 
  }
}, "16n")


soundSys.controlLoop.start(3); 
// starts ------__>
casio_loop.start(3); 
drum_loop.start(3);
bleepLoop.start(3);
bassPart.start(3);
piano_loop.start(3);
Tone.Transport.start(3);

});

