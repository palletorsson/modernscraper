
var soundSys = {
  type: "testtype",
  seed_img: true, 
  marks: 0,
  sampel_rate: 16,
  rgb_colors: '',
  vel: 0,
  cf: 0, 
  alien_temp: 0, 
  future: 32,
  base_pos: 0,
  feliz_notes: 0,
  the_length: 0,
  base_tone_val: 0,
  send_base_tones: 0, 
  first_base: 0, 
  drums_on: false, 
  logger: [], 
  doc: {}, 
  colors: {
    red: 0,
    green: 0,
    bleu: 0,
    black:0, 
    white:0,
    yellow:0,
    pink:0,
    red_rel: 0,
    green_rel: 0,
    bleu_rel: 0,
    yellow_rel:0,
    pink_rel:0,
    magenta_rel:0,
    sum: 0,
    diff: 0, 
  }, 
  volume: {
    red: 40,
    green: 20,
    bleu: -20,
    black: -100, 
    white: -30,
    yellow: 0,
    pink: 20,
    diff: 30, 
  }, 
  play: {
    base_tones: [],
    mid_tones: [],
    high_tones: [],
    red : false,
    bleu : false,
    green : false,
    black : false, 
    white : false,
    diff : false,  
  }, 
  collections: {
    bright_note_collection: [],
    dark_note_collection : [],
    red_note_collection : [],
    green_note_collection : [],
    bleu_note_collection : [],
    black_note_collection : [],
    white_note_collection : [],
    yellow_note_collection : [],
    pink_note_collection : [],
    diff_note_collection : [],
    sum_note_collection : [], 
  },
  threshold: {
    sum_notes: 0, 
    diff_notes: 0, 
    red_in: 31,
    green_in: 23,
    bleu_in: 120,
    black_in: 90, // > sum 
    white_in: 590, // < sum
    yellow_in:[100, 100, 80],
    pink_in:[240, 105, 180],
    diff_in: 40,
    red_rel_in: 0,
    green_rel_in: 0,
    bleu_rel_in: 30,
    red_rel_in: 0,
    green_rel_in: 0,
    red_out: 2, // notes.length
    green_out: 1,
    bleu_out: 3,
    black_out: 0,
    yellow_out: 1,
    pink_out: 2, 
    diff_out: 0,
    black_out_base:5, 
    white_out:2,
  },
  fm_control: {
    count: 3, 
    spread: 21
  }, 
  divitions: {
    red: 0,
    green: 0,
    bleu: 0,
    black:0, 
    white:0,
    yellow:0,
    pink:0,
    red_rel: 0,
    green_rel: 0,
    bleu_rel: 0,
    yellow_rel:0,
    pink_rel:0,
    sum: 0,
    diff: 0, 
  }, 
  variables: {
    c:0,
    q:0 
  },
  progressions: [ ["G", "D", "Eb", "C", "D"],  
                      ["G", "D", "Eb", "Bb", "C", "D"],
                      ["G", "G", "G", "G", "C", "C", "G", "G", "D", "D", "G", "G"],
                      ["ab", "C", "D"],
                      ["eb", "C", "G", "D"],
                      ["ab", "G", "D", "F#", "F", "E"] ], 
  canvas: '', 
  ctx: '',
  img: '',
  aImages : [],
  iCurImage : 1,
  row : 0,
  folder : "1024",
  zoom : 0,
  zooming : 'base',
  creatSpecialProgression: function(progress, octave) {
      final_set = [];
      for (j=0; j < 10; j++) {
        for (i=0; i < progress.length; i++) {
          var oct = octave+j;
          var nstr = oct.toString();
          final_set.push(progress[i]+nstr);      
        }
      }   
      return final_set;
  }, 

  getLongscales: function(scale, octave, note) {
      var part0 = Tonal.scale.get(scale, note+(octave));
      var oct = octave+1;
      var nstr = oct.toString();
      var part1 = Tonal.scale.get(scale, note+nstr);
      var oct = octave+2;
      var nstr = oct.toString();
      var part2 = Tonal.scale.get(scale, note+nstr);
      var oct = octave+3;
      var nstr = oct.toString();
      var part3 = Tonal.scale.get(scale, note+nstr);
      var oct = octave+4;
      var nstr = oct.toString();
      var part4 = Tonal.scale.get(scale, note+nstr);
      var oct = octave+5;
      var nstr = oct.toString();
      var part5 = Tonal.scale.get(scale, note+nstr);
      var final_set = part0.concat(part1);
      final_set.concat(part2);
      final_set.concat(part3);  
      final_set.concat(part4);  
      final_set.concat(part5);  
      return final_set;
  }, 


 iterOsci: function() {
      fmsynth.set({
        oscillator:{
          type:osc_types2[z]
        }, 
        modulation:{
          type:osc_types[z]
              }
            }
        ); 
      z = z + 1; 
      if(z > osc_types.length-1 || z>osc_types2.length-1) {
          z = 0; 
      }
  },

 getScaledNoteFromNumber: function(number, scale, trans) {
    number = Math.abs(number);
    var octave = Math.floor( number / scale ) + 1;
    if (octave > trans) {
      octave = octave - trans; 
    }
    var float_number =  (octave/scale)* 10; 
    var the_note = float_number % 1;
    var f_the_note = Math.floor(the_note * 10); 
    var the_final_note = notes_map_harm[f_the_note]+octave; 
    if (the_final_note == NaN) {
      return 100; 
    }   
    return the_final_note; 
  }, 

 getPixelrow: function(pixels, row, imageData) {
    pixelrow = []
    index = soundSys.row * imageData.width * 4;
    for (i = index; i < imageData.width * 4 + index; i = i + 1) {
         pixelrow.push(pixels[i])
    }  
    return pixelrow; 
  },

  diffFromFuture: function(pix_row_1_r, pix_row_1_g, pix_row_1_b, pix_row_f_r, pix_row_f_g, pix_row_f_b) {
    var sum = Math.floor((pix_row_1_r + pix_row_1_g + pix_row_1_b) / 3);
    var sum_f = Math.floor((pix_row_f_r + pix_row_f_g + pix_row_f_b) / 3);
    diff = (sum - sum_f);
    return Math.abs(diff); 
  }, 
  synthSets: '', // $.getJSON("./js/synthSets.json"),
  noteSet: $.getJSON("./js/notes.json"),
  setcount: {
    red: 0,
    green: 0,
    bleu: 0,
    diff: 0
  },
  diffchord: ["C3", "E3", "G3"], 
  synthdefaults: {
    fm: {
      harmonicity:3,
      modulationIndex:10,
      detune:0,
      oscillator:{
        type:"sine"
      },
      envelope:{
        attack:0.01,
        decay:0.01,
        sustain:1,
        release:0.5,
      },
      modulation:{
        type:"square",
      },
      modulationEnvelope:{
        attack:0.5,
        decay:0,
        sustain:1,
        release:0.5,
      }

    }
  }, 
  record: {}


};

// Create the soundsystem 
Object.create(soundSys);


$(function(){
    // creating canvas objects
    soundSys.canvas = document.getElementById('canvas');
    soundSys.ctx = soundSys.canvas.getContext('2d');
    //soundSys.ctx.lineWidth = 8;
    $.getJSON( "../../hist.json", function( obj ) {
      soundSys.source = '/images/'+soundSys.folder+'/'+obj[0].filename+'.jpg'
      $(".images").append('<img src="'+soundSys.source+'" id="first"/>'); 
      soundSys.img = document.getElementById("first");
      soundSys.old_img = soundSys.img; 
      soundSys.img.onload = function() {
          soundSys.ctx.drawImage(soundSys.img, 0, 0);   
          drawProcess(); 
      }
   
    $.each(obj, function(i, one) {
        soundSys.oImgL = new Image();
        soundSys.oImgL.src = '/images/'+soundSys.folder+'/'+one.filename+'.jpg';
        soundSys.oImgL.id = one.filename;
        soundSys.aImages.push(soundSys.oImgL);  
        if (i > 1) {
              $(".images").append('<img src="'+soundSys.oImgL.src+'" id="'+obj[i].filename+'"/>'); 
        }
      });
    }); //end of getJSON
    // collect dynamic parameters
}); //end of $function

// create some scales 
soundSys.a_major_3 = soundSys.getLongscales('major', 2, 'A');
soundSys.a_minor_3 = soundSys.getLongscales('minor', 3, 'A');
soundSys.a_bebop_3 = soundSys.getLongscales('bebop', 3, 'A');
soundSys.a_melodic_3 = soundSys.getLongscales('melodic minor', 3, 'A');
soundSys.a_raga_3 = soundSys.getLongscales('kafi raga', 3, 'A');
soundSys.a_iwato_3 = soundSys.getLongscales('iwato', 3, 'A');
soundSys.a_minorblues_3 = soundSys.getLongscales('minor blues', 3, 'A'); 
soundSys.a_6tone_3 = soundSys.getLongscales('six tone symmetric', 3, 'A'); 

soundSys.progress_0_base = soundSys.creatSpecialProgression(soundSys.progressions[0], 0);
soundSys.progress_0_mid = soundSys.creatSpecialProgression(soundSys.progressions[0], 3);
soundSys.progress_0_high = soundSys.creatSpecialProgression(soundSys.progressions[0], 5);
soundSys.progress_1_base = soundSys.creatSpecialProgression(soundSys.progressions[1], 0);
soundSys.progress_1_mid = soundSys.creatSpecialProgression(soundSys.progressions[1], 3);
soundSys.progress_1_high = soundSys.creatSpecialProgression(soundSys.progressions[1], 5);
soundSys.progress_2_base = soundSys.creatSpecialProgression(soundSys.progressions[2], 0);
soundSys.progress_2_mid = soundSys.creatSpecialProgression(soundSys.progressions[2], 3);
soundSys.progress_2_high = soundSys.creatSpecialProgression(soundSys.progressions[2], 5);
soundSys.progress_3_base = soundSys.creatSpecialProgression(soundSys.progressions[5], 0);
soundSys.progress_3_mid = soundSys.creatSpecialProgression(soundSys.progressions[5], 3);
soundSys.progress_3_high = soundSys.creatSpecialProgression(soundSys.progressions[5], 5);

soundSys.play.base_tones = soundSys.getLongscales('minor', 0, 'A');
soundSys.play.mid_tones = soundSys.getLongscales('minor', 2, 'A');
soundSys.play.high_tones = soundSys.getLongscales('minor', 5, 'A');

function getPixelrowzoom(pixels, row) {
    soundSys.pixelrowzoom = []
    if (soundSys.zooming == 'strobe') {
        soundSys.zoom = soundSys.zoom + 2;
    }
    if (soundSys.zooming == 'base') {
        soundSys.zoom = soundSys.zoom + 4;
    }
    soundSys.index = soundSys.row * soundSys.imageData.width * 4 + soundSys.zoom;
    for (i = soundSys.index; i < soundSys.imageData.width * 4 + soundSys.index; i = i + 1) {
         soundSys.pixelrowzoom.push(pixels[i])
    }  
    return soundSys.pixelrowzoom; 
}

function createHandels() {
    var sliddiv = $(".sliders");
    $.each(soundSys.threshold, function( key, value ) { 
        sliddiv.append('<div id="'+key+'" class="myslider"><span id="_'+key+'">'+key+'<span></div>');  
        $( "#"+key ).slider({
          orientation: "vertical",
          range: "min",
          min: 0,
          max: 100,
          value: value,
          slide: function( event, ui ) {
            soundSys.threshold[key]= ui.value;
            $( '#_'+key).text(ui.value); 
           }
        }); 
        
    });
    var level1 = 0; 
    var level2 = 1; 
    $.each(soundSys.synthdefaults.fm, function( key, value ) { 
      console.dir(soundSys.synthdefaults.fm[key])
      if (typeof soundSys.synthdefaults.fm[key] == "object") {
      $.each(value, function( k, v ) {

          sliddiv.append('<div id="'+key+k+'" class="myslider"><span id="_'+key+k+'">'+key+k+'<span></div>');  
       $( "#"+key+k ).slider({
          orientation: "vertical",
          range: "min",
          min: 0,
          max: 100,
          value: v,
          slide: function( event, ui ) {
            soundSys.green[key][k] = ui.value/1000;
            $( '#_'+key+k).text(ui.v); 
            console.log(soundSys.green[key][k], ui.value)
           }
        });

       });
    } else { 
      sliddiv.append('<div id="'+key+'" class="myslider"><span id="_'+key+'">'+key+'<span></div>');  
       $( "#"+key ).slider({
          orientation: "vertical",
          range: "min",
          min: 0,
          max: 100,
          value: value,
          slide: function( event, ui ) {
            soundSys.green[key].value = ui.value;
            $( '#_'+key).text(ui.value); 
            console.log(soundSys.green[key], ui.value)
           }
        }); 

     }

    });
  

}



function drawProcess() { 
    // create image data for soundSys.canvas image and a blank image
    soundSys.newFrame = soundSys.ctx.createImageData(soundSys.canvas.width, soundSys.canvas.height);
    soundSys.imageData = soundSys.ctx.getImageData(0, 0, soundSys.canvas.width, soundSys.canvas.height);
    pixelArray = soundSys.imageData.data;
    soundSys.ctx.font = '30pt Arial';
    nextImage()
}

function nextImage() {

    soundSys.iCurImage = soundSys.iCurImage + 1; 
    // clear and draw next image
    soundSys.img = document.getElementById(soundSys.aImages[soundSys.iCurImage].id);     
    soundSys.ctx.clearRect(0, 0, soundSys.canvas.width, soundSys.canvas.height);
    soundSys.ctx.drawImage(soundSys.img, 0, 0, soundSys.img.width,  soundSys.img.height,
                        0, 0, soundSys.canvas.width, soundSys.canvas.height);  
    soundSys.newFrame = soundSys.ctx.createImageData(soundSys.canvas.width, soundSys.canvas.height);

    soundSys.old_img.remove()
    soundSys.old_img = soundSys.img; 
    imageData = soundSys.ctx.getImageData(0, 0, soundSys.canvas.width, soundSys.canvas.height);
    pixelArray = imageData.data;
    rect(); 
  
    if (soundSys.iCurImage == soundSys.aImages.length - 1) {
        soundSys.iCurImage = -1;
    }
} // end of nextImage






var rect = function() {

    // DRUM) --------->
   // soundSys.white.volume.value = 30; 
    soundSys.thenotes = soundSys.noteSet.responseJSON[soundSys.row][0];
    //console.log(soundSys.thenotes)
     if (soundSys.thenotes != undefined) {
        for (var i = 0; i < soundSys.thenotes.length; i++) {
            //console.log(soundSys.thenotes[i].color, soundSys.thenotes[i].notes)
            

            var synth = soundSys[soundSys.thenotes[i].color]; 
            synth.volume.value = 10;
            console.log(soundSys.thenotes[i].volume) //, i, soundSys.thenotes[i].notes, soundSys.row)
            synth.triggerAttackRelease(soundSys.thenotes[i].notes, "+0.03", soundSys.thenotes[i].velocity); 
       synth.volume.rampTo(-100, 1);
        }
    }

    soundSys.row = soundSys.row + 1;    

    if (soundSys.row > 600) { 
    
        //nextImage();
    }
} // end of rect()

$(function() {
var next = document.getElementById('next');

  next.addEventListener('click', nextImage);
  var room = document.getElementById('room');
  next.addEventListener('click', function() { playing = 'room' });
  var inter = document.getElementById('inter');
  inter.addEventListener('click', function() { playing = 'inter' });
  var arch = document.getElementById('arch');
  arch.addEventListener('click', function() { playing = 'arch' });  
  var rand = document.getElementById('rand');
  rand.addEventListener('click', function() { playing = 'rand' });  
  var hist = document.getElementById('hist');
  hist.addEventListener('click', function() { playing = 'hist' });
  var text = document.getElementById('text');
  text.addEventListener('click', function() { playing = 'text' }); 
  var trix = document.getElementById('trix');
  trix.addEventListener('click', function() { playing = 'trix' }); 
  var midlines = document.getElementById('midlines');
  midlines.addEventListener('click', function() { playing = 'midlines' });
  var wave = document.getElementById('wave');
  wave.addEventListener('click', function() { playing = 'wave' });
  var spiral = document.getElementById('spiral');
  spiral.addEventListener('click', function() { playing = 'spiral' });
  var py = document.getElementById('py');
  py.addEventListener('click', function() { playing = 'py' }); 
  var inbetween = document.getElementById('inbetween');
  inbetween.addEventListener('click', function() { playing = 'inbetween' }); 
  var inbetween2 = document.getElementById('inbetween2');
  inbetween2.addEventListener('click', function() { playing = 'inbetween2' });     
   
createHandels()
});
  