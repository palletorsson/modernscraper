
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
  drums_on: true, 
  logger: [], 
  doc: [], 
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
  synthSets: $.getJSON("./js/synthSets.json"),
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

var getNoteToPlay = function(collection, notes, div) {
    var collLength = collection.length;  
    var theNote = notes[Math.floor(collLength/div)];  
    return theNote;     
}

var getNoteToPlayPos = function(collection, notes, div, i) {
    var posValue = collection[i].pos; 
    var theNote = notes[Math.floor(posValue/div)];  
    return theNote;     
}

var getNoteToPlayPosSim = function(value, notes, div) { 
    var theNote = notes[Math.floor(value/div)];  
    return theNote;     
}

var getCollToPlayPos = function(collection, notes, add, div) {
    soundSys.cindex = [] 
    for (var i=0; i < collection.length-1; i++) {
        soundSys.the_n = getNoteToPlayPos(collection, notes, div, i); 
        if (soundSys.cindex.indexOf(soundSys.the_n) == -1 && collection[i].pos != 0) {
               soundSys.cindex.push(soundSys.the_n); 
               i = i + add; 
        }
    }
    return soundSys.cindex;            
}

var setVolume = function(collection, div, tran, type) {
    var collLength = collection.length;  
    var vol = Math.floor(collLength / div); 
    vol = vol + tran; 
    if (type == '-') {
      vol = vol*-1;  
    }  
    return vol; 
} 

var setVolumeValue = function(collection, div, tran, i, type) {
    var collValue = collection[i].value;  
    var vol = Math.floor(collValue / div); 
    if (type == '-') {
        vol = vol - tran;
        vol = vol*-1;        
    } else {
        vol = vol + tran; 
    }  
    //console.log(vol); 
    return vol; 
}  

var setCount = function(num, max) {
    num++;
    if (num > max-1) {
        num = 0; 
    } 
    return num; 
}  




var rect = function() {

    soundSys.play.sampel_rate = $( "#sampel_rate" ).val();
    soundSys.variables.c = 0;     
    soundSys.pix_row = soundSys.getPixelrow(pixelArray, soundSys.row, imageData);
    soundSys.pix_future = getPixelrowzoom(pixelArray, soundSys.row+soundSys.future); 
       
      for (j = 0; j < soundSys.canvas.height; j = j + 1) {
      
          if (soundSys.seed_img == true && soundSys.variables.c % 4 == 0) { 
              soundSys.ctx.beginPath();
              soundSys.ctx.moveTo(j, soundSys.canvas.width);
              soundSys.rgb_colors = soundSys.pix_row[soundSys.variables.c]+','+soundSys.pix_row[soundSys.variables.c+1]+','+soundSys.pix_row[soundSys.variables.c+2]+',0.5';
              soundSys.ctx.strokeStyle ='rgba('+soundSys.rgb_colors+')';
              soundSys.ctx.lineTo(j, 0);
              soundSys.ctx.closePath();               
              soundSys.ctx.stroke();
          } 

          if (j % soundSys.play.sampel_rate == 0 && soundSys.variables.c < 3905) {
              soundSys.colors.red = soundSys.pix_row[soundSys.variables.c];
              soundSys.colors.green = soundSys.pix_row[soundSys.variables.c+1];
              soundSys.colors.bleu = soundSys.pix_row[soundSys.variables.c+2];

              soundSys.colors.yellow = (soundSys.colors.green + soundSys.colors.red) - soundSys.colors.bleu;
              soundSys.colors.magenta = (soundSys.colors.red + soundSys.colors.bleu) / 2; 

              soundSys.colors.green_rel = soundSys.colors.green - soundSys.colors.magenta;
              soundSys.colors.bleu_rel = soundSys.colors.bleu - soundSys.colors.yellow;
              soundSys.colors.red_rel = soundSys.colors.red - (soundSys.colors.green + soundSys.colors.bleu / 2);  
              soundSys.colors.yellow_rel =  soundSys.colors.magenta/2 - soundSys.colors.green;
              soundSys.colors.pink_rel = (soundSys.colors.red + soundSys.colors.green) - soundSys.colors.bleu; 
              soundSys.colors.magenta_rel = soundSys.colors.yellow/2 - soundSys.colors.bleu;              
              soundSys.colors.sum = (soundSys.colors.red + soundSys.colors.green + soundSys.colors.bleu);
              soundSys.colors.diff = soundSys.diffFromFuture(soundSys.colors.red, soundSys.colors.green, soundSys.colors.bleu, soundSys.pix_future[soundSys.variables.c], soundSys.pix_future[soundSys.variables.c+1], soundSys.pix_future[soundSys.variables.c+2]);
              soundSys.threshold.sum_notes = soundSys.threshold.sum_notes + soundSys.colors.sum; 
              soundSys.threshold.diff_notes = soundSys.threshold.diff_notes + Math.abs(diff); 
             

              if (soundSys.colors.red_rel > soundSys.threshold.red_in) {
                  soundSys.collections.red_note_collection.push({"row": soundSys.row, "value": soundSys.colors.red_rel, "pos": soundSys.variables.c})
                  // soundSys.ctx.fillText("r", c, soundSys.row+red_rel);
              }
              if (soundSys.colors.bleu_rel > soundSys.threshold.bleu_in) {// soundSys.threshold.bleu_in) {
                  soundSys.collections.bleu_note_collection.push({"row": soundSys.row, "value": soundSys.colors.bleu_rel, "pos": soundSys.variables.c})
                  //soundSys.ctx.fillText("b", 400-c, soundSys.row+soundSys.collections.bleu_rel);
           
              }
              if (soundSys.colors.green_rel > soundSys.threshold.green_in) {
                  soundSys.collections.green_note_collection.push({"row": soundSys.row, "value": soundSys.colors.green_rel, "pos": soundSys.variables.c})
                  // soundSys.ctx.fillText("g", c, soundSys.row+bleu_rel);
              }
              if (soundSys.colors.sum > soundSys.threshold.white_in) { 
                  soundSys.collections.white_note_collection.push({"row": soundSys.row, "value": soundSys.colors.sum, "pos": soundSys.variables.c})
                  // soundSys.ctx.8fillText("+", c, soundSys.row+soundSys.colors.sum);                  
              }
              if (soundSys.colors.sum < soundSys.threshold.black_in) { 
                  soundSys.collections.black_note_collection.push({"row": soundSys.row, "value": soundSys.colors.sum, "pos": soundSys.variables.c})
                  // soundSys.ctx.fillText("-", c, soundSys.row+soundSys.colors.sum);     

              }  
              if (soundSys.colors.red > soundSys.threshold.yellow_in[0]  && soundSys.colors.green > soundSys.threshold.yellow_in[1] && soundSys.colors.bleu < soundSys.threshold.yellow_in[2]) {//&& yellow > 220 && yellow < 230) {
                  soundSys.collections.yellow_note_collection.push({"row": soundSys.row, "value": soundSys.colors.yellow, "pos": soundSys.variables.c})
                  // soundSys.ctx.fillText(c, c/4, soundSys.row); 
              } 

              if (soundSys.colors.red > 210 && soundSys.colors.green > 120 && soundSys.colors.green < 200 && soundSys.colors.bleu > 150 && soundSys.colors.bleu < 200) { // soundSys.colors.red > soundSys.threshold.pink_in[0] && soundSys.colors.green  > soundSys.threshold.pink_in[1] && soundSys.colors.bleu > soundSys.threshold.pink_in[2]) {//&& yellow > 220 && yellow < 230) {
                  soundSys.collections.pink_note_collection.push({"row": soundSys.row, "value": soundSys.colors.pink_rel, "pos": soundSys.variables.c})
                  // soundSys.ctx.fillText(c, c/4, soundSys.row); 
              }
              if (Math.abs(soundSys.colors.diff) > soundSys.threshold.diff_in) {                 
                  soundSys.collections.diff_note_collection.push({"row": soundSys.row, "value": soundSys.colors.diff, "pos": soundSys.variables.c})
                  // soundSys.ctx.fillText("+++", c, Math.floor(soundSys.variables.c/40));  
              }

          } // end of sampel_rate
          soundSys.variables.q = soundSys.variables.q + 1; 
          soundSys.variables.c = soundSys.variables.c + 4; 
        
      } // end of pix soundSys.row

    // soundSys.ctx.fillText( "____", 0, soundSys.row)// soundSys.aImages[iCurImage].id, soundSys.colors.sum_notes/13, soundSys.row+200 );

    soundSys.ctx.fillStyle = 'rgb(0,0,0)'

    // DRUMS --------->
   // console.log(soundSys.collections.diff_note_collection.length)

    if (soundSys.drums_on == true) {

        if (soundSys.collections.red_note_collection.length > soundSys.threshold.red_out) {       
            if (soundSys.kick_2_pattern[soundSys.drum_count] == "x") {  
                soundSys.kick_2.triggerAttack('+0.01'); 
            }
        } else {
            if (soundSys.kick_pattern[soundSys.drum_count] == "x") {  
               soundSys.kick_1.triggerAttack('+0.01'); 
            } 

        }

        if (soundSys.collections.green_note_collection.length > soundSys.threshold.green_out) { 
            if (soundSys.row % 16 == 0) {    
                soundSys.swoosh.triggerAttack('+0.03');
            } else {
                soundSys.hat.triggerAttack('+0.03');  
            }
        } else {
            if (soundSys.row % 256 == 63) {
               soundSys.op_hat.triggerAttack('+0.03');
            }
        }

        if (soundSys.collections.white_note_collection.length > soundSys.threshold.white_out) { 
            if (soundSys.row % 64 == 16 || soundSys.row % 64 == 17 ) {
                soundSys.clap.triggerAttack('+0.05');
            }
        } else {
            if (soundSys.row % 4 == 0 || soundSys.row % 8 == 7 ) {
               soundSys.hat_3.triggerAttack('+0.05');  
            }
        }

        if (soundSys.collections.black_note_collection.length > soundSys.threshold.black_out) { 
            if (soundSys.snare_pattern[soundSys.drum_count] == "x") {  
                soundSys.snare.triggerAttack('+0.05'); 
            }
        } else {
            if (soundSys.snare_pattern[soundSys.drum_count] == "x") {  
               soundSys.snare_2.triggerAttack('+0.05'); 
            }
        }

        soundSys.drum_count++; 
        if (soundSys.drum_count > soundSys.snare_pattern.length-1) {
            soundSys.drum_count = 0; 
        }
   }
 
    if (soundSys.row % 10000 == 0) {
         //console.log(soundSys.threshold.sum_notes/4, "---------------------------------")
        if (soundSys.threshold.sum_notes/4 > 6000) {
            soundSys.base_tones = soundSys.progress_3_base; 
            soundSys.mid_tones = soundSys.progress_3_mid;
            soundSys.high_tones = soundSys.progress_3_high;
            console.log("n1")
        } else if (soundSys.threshold.sum_notes/4 < 3500) {
            soundSys.base_tones = soundSys.progress_3_base; 
            soundSys.mid_tones = soundSys.progress_3_mid;
            soundSys.high_tones = soundSys.progress_3_high;
            console.log("n3")
        } else {
          soundSys.base_tones = soundSys.progress_3_base ; 
            soundSys.mid_tones = soundSys.progress_3_mid;
            soundSys.high_tones = soundSys.progress_3_high; 
            console.log("n0")
     
        }
    }

    // red, fmsynth, midtones
    if (soundSys.collections.red_note_collection.length > soundSys.threshold.red_out && soundSys.play.red == true) {
        if (soundSys.row % 8 == 0 || soundSys.row % 8 == 4 || soundSys.row % 8 == 5 || soundSys.row % 8 == 6) { 
            // create note data
            soundSys.vol = setVolume(soundSys.collections.red_note_collection, 1, 10, '+');          
            if (soundSys.row % 8 == 0 || soundSys.row % 8 == 6) {  
                soundSys.note = "C3" 
            } else {
                soundSys.note = getNoteToPlay(soundSys.collections.red_note_collection, soundSys.mid_tones, 4); 
            }
            if (soundSys.row % 8 != 5) {  
                soundSys.vel = Math.random() * 0.2 + 0.2;
            } else {
                soundSys.vel = Math.random() * 0.2 + 0.4;           
            }
            soundSys.hit = "+0.02"
            

            // log 
            soundSys.logger.push({"color": "red", 
                                  "type": 1,
                                  "notes": soundSys.note,
                                  "time": soundSys.hit,
                                  "velocity": soundSys.vel,
                                  "volume": soundSys.vol,
                                  "bar": soundSys.row % 16,
                                  "row": soundSys.row
                                })
            soundSys.marks  = soundSys.marks  + 1;

            // play
            soundSys.red.volume.value = soundSys.vol;  
            soundSys.red.triggerAttackRelease(soundSys.note, soundSys.hit, soundSys.vel);  
            soundSys.red.volume.rampTo(-100, 2);
        } 
    } 
   
    if (soundSys.collections.pink_note_collection.length > soundSys.threshold.pink_out && soundSys.play.black == true) {
        if (soundSys.row % 8 == 1 || soundSys.row % 8 == 5)  {  

            // create note data
            soundSys.vol = setVolume(soundSys.collections.pink_note_collection, 2, 40, '-'); 
            soundSys.note = getNoteToPlay(soundSys.collections.pink_note_collection, soundSys.mid_tones, 1); 
            if (soundSys.row % 8 == 5) {
                soundSys.note = "G3" 
            } 
            soundSys.vel = Math.random() * 0.1 + 0.2;
            soundSys.hit = "+0.04"
            console.log("pnk",soundSys.vol)
            // log
            soundSys.logger.push({"color": "pink", 
                                  "type": 1,
                                  "notes": soundSys.note,
                                  "time": soundSys.hit,
                                  "velocity": soundSys.vel,
                                  "volume": soundSys.vol,
                                  "bar": soundSys.row % 16,
                                  "row": soundSys.row
                                })
            soundSys.marks  = soundSys.marks  + 1;

            // play 
            soundSys.pink.volume.value = soundSys.vol; 
            soundSys.pink.triggerAttackRelease(soundSys.note, soundSys.hit, soundSys.vel); 
            soundSys.pink.volume.rampTo(-100, 1);
        } 
       
    } // end of pink 

    // red modulation: 
    if (soundSys.play.red == true) {
        if (soundSys.row % 64 == 0) { 
               soundSys.red.set({
                  modulationIndex: soundSys.collections.red_note_collection.length/2, 
            });
        }  
        if (soundSys.row % 64 == 8) { 
               soundSys.red.set({
                  harmonicity: soundSys.collections.red_note_collection.length/10,
            });
        }  
    } // end of green red

    if (soundSys.collections.yellow_note_collection.length > soundSys.threshold.yellow_out && soundSys.play.red == true) {
        if (soundSys.row % 4 == 1 && soundSys.row % 4 == 3) {   
            
            // create notes data
            soundSys.vol = setVolume(soundSys.collections.yellow_note_collection, 3, 2, '+'); 
            soundSys.notes = getCollToPlayPos(soundSys.collections.yellow_note_collection, soundSys.mid_tones, 0, 400) 
            soundSys.yellow.volume.value = setVolume(soundSys.collections.yellow_note_collection, 3, 12, '-') //10 // soundSys.collections.red_note_collection.length/2; 
            soundSys.vel = Math.random() * 0.2 + 0.2;
            soundSys.hit = "+0.06"

            // log
            soundSys.logger.push({"color": "yellow", 
                                  "type": 2,
                                  "notes": soundSys.notes,
                                  "time": soundSys.hit,
                                  "velocity": soundSys.vel,
                                  "volume": soundSys.vol,
                                  "bar": soundSys.row % 16,
                                  "row": soundSys.row
                                });
            soundSys.marks  = soundSys.marks  + 1;

            // play
            soundSys.yellow.volume.value = soundSys.vol; 
            for (soundSys.i=1; soundSys.i < soundSys.notes.length; soundSys.i++) {
                soundSys.yellow.triggerAttackRelease(soundSys.notes[soundSys.i], soundSys.hit, soundSys.vel);
            } 
            soundSys.yellow.volume.rampTo(-100, 2);
        } 
      
    } // end of yellow
    
    // green amsynth mid tone 
    if (soundSys.row % 4 == 1 || soundSys.row % 4 == 3) { 
        if (soundSys.play.green == true) {
            soundSys.templ = soundSys.collections.green_note_collection.length;
            if (soundSys.templ > soundSys.threshold.green_out) {

                // crate note data 
                soundSys.vol = setVolume(soundSys.collections.green_note_collection, 3, 2, '+');   
                soundSys.setcount.green = setCount(soundSys.setcount.green, soundSys.templ)
                soundSys.note = getNoteToPlayPos(soundSys.collections.green_note_collection, soundSys.play.high_tones, 300, soundSys.setcount.green); 
                if (soundSys.row % 32 == 1) {
                  soundSys.green_note = "G3"
                }
                soundSys.vel = Math.random() * 0.2 + 0.2;
                soundSys.hit = "+0.08"; 

                // log
                soundSys.logger.push({"color": "green",
                                  "type": 1,
                                  "notes": soundSys.notes,
                                  "time": soundSys.hit,
                                  "velocity": soundSys.vel,
                                  "volume": soundSys.vol,
                                  "bar": soundSys.row % 16,
                                  "row": soundSys.row
                                }); 
                soundSys.marks  = soundSys.marks  + 1;
                // play
                soundSys.green.volume.value = soundSys.vol; 
                soundSys.green.triggerAttackRelease(soundSys.note, soundSys.hit, soundSys.vel); 
                soundSys.green.volume.rampTo(-100, 2);
                
            }  
        }   
    } // end of green

    // green modulation: 
    if (soundSys.play.green == true) {
        if (soundSys.row % 64 == 0) { 
            
            soundSys.green.set({
                modulationIndex: soundSys.collections.green_note_collection.length, 
            });
        }  
        if (soundSys.row % 64 == 8) { 
            soundSys.green.set({
                harmonicity: soundSys.collections.green_note_collection.length/10,
            });
        }  
    } // end of green mod
  
    // bleu monosynth base tones
    if (soundSys.row % 8 == 5) { 
        if (soundSys.collections.bleu_note_collection.length > soundSys.threshold.bleu_out && soundSys.play.bleu == true) {    
                
                // create note data
                soundSys.vol = setVolume(soundSys.collections.bleu_note_collection, 2, 10, '-');    
                soundSys.bleu.volume.value = soundSys.vol;  
                soundSys.notes = [];
                soundSys.hit = "+0.10";
                for (soundSys.i=0; soundSys.i < soundSys.collections.bleu_note_collection.length-1; soundSys.i = soundSys.i + 2) {
                    soundSys.the_n = getNoteToPlayPos(soundSys.collections.bleu_note_collection, soundSys.play.base_tones, 400, soundSys.i); 
          
                  
                    if (soundSys.notes.indexOf(soundSys.the_n) == -1) {
                        soundSys.notes.push(soundSys.the_n);
                        soundSys.bleu.triggerAttack(soundSys.the_n);
                    }
                    
                    if (soundSys.collections.bleu_note_collection[soundSys.i].pos/4+64 < soundSys.collections.bleu_note_collection[soundSys.i+1].pos/4) {
                        soundSys.i = soundSys.i + 5; 
                    }       
                } 
                soundSys.vel = Math.random() * 0.2 + 0.2;
                soundSys.bleu.volume.rampTo(-100, 1);

                // log
                soundSys.logger.push({"color": "bleu",
                                  "type": 3,
                                  "notes": soundSys.notes,
                                  "time": soundSys.hit,
                                  "velocity": soundSys.vel,
                                  "volume": soundSys.vol,
                                  "bar": soundSys.row % 16,
                                  "row": soundSys.row
                                });
                soundSys.marks  = soundSys.marks  + 1; 
            } 
    } // end of bleu

    if (soundSys.play.white == true) {
        if (soundSys.row % 8 == 2 || soundSys.row % 8 == 6) { 
            if (soundSys.collections.white_note_collection.length > soundSys.threshold.white_out) { 

                // create note data 
                soundSys.vol = setVolume(soundSys.collections.white_note_collection, 4, 15, '-');        
                soundSys.newc = [];
                soundSys.high = 0;
                //soundSys.fx_distortion.wet.rampTo(soundSys.collections.white_note_collection.length, 1);
                for (soundSys.i=1; soundSys.i < soundSys.collections.white_note_collection.length; soundSys.i = soundSys.i+1) {                
                    if (soundSys.collections.white_note_collection[soundSys.i].value > soundSys.high) {
                      soundSys.high = soundSys.collections.white_note_collection[soundSys.i].value;  
                    }          
                    soundSys.newc.push(soundSys.collections.white_note_collection[soundSys.i].pos);
                }
                soundSys.notes = [];
                for (soundSys.i=0; soundSys.i < soundSys.newc.length; soundSys.i = soundSys.i +1) {
                    soundSys.n = getNoteToPlayPosSim(soundSys.newc[soundSys.i], soundSys.mid_tones, 400);
                    if (soundSys.notes.indexOf(soundSys.n) == -1) {
                        soundSys.notes.push(soundSys.n);
                    }
                } 
                soundSys.hit = "+0.12"

                // log
                console.log("w");
                soundSys.logger.push({"color": "white",
                                  "type": 2,
                                  "notes": soundSys.notes,
                                  "time": soundSys.hit,
                                  "velocity": soundSys.vel,
                                  "volume": soundSys.vol,
                                  "bar": soundSys.row % 16,
                                  "row": soundSys.row
                                });
                soundSys.marks  = soundSys.marks  + 1;
                
                // play 
                soundSys.white.volume.value = soundSys.vol;
                soundSys.white.triggerAttackRelease(soundSys.notes, soundSys.hit, 0.1) 
                soundSys.white.volume.rampTo(-100, 2)      
            } 
        }
    }// end of white
 
    if (soundSys.row % 128 == 0 && soundSys.collections.white_note_collection.length > soundSys.threshold.white_out) {
        soundSys.count = Math.floor(soundSys.collections.white_note_collection.length/2);
        soundSys.spread = soundSys.collections.white_note_collection.length;
        if (soundSys.row % 36 == 0) { 
            soundSys.white.set({                           
                "oscillator" : {
                  "count" :  soundSys.count, // 3
                  "spread" : soundSys.spread, // 30
                },                           
            });
        }
    }

    if (soundSys.collections.black_note_collection.length > soundSys.threshold.black_out && soundSys.play.black == true) {   
        if (soundSys.row % 8 == 1) {  
            soundSys.vol = setVolume(soundSys.collections.black_note_collection, 3, 12, '-');        
            soundSys.black.volume.value = soundSys.vol;       
            soundSys.notes = getNoteToPlay(soundSys.collections.pink_note_collection, soundSys.base_tones, 1); 
            soundSys.vel = Math.random() * 0.3 + 0.2;  
            soundSys.hit = "+0.14";
            soundSys.bassline.triggerAttackRelease(soundSys.notes, soundSys.hit, soundSys.vel);  
            soundSys.bassline.volume.rampTo(-100, 2);
            soundSys.logger.push({"color": "black",
                                  "type": 1,
                                  "notes": soundSys.notes,
                                  "time": soundSys.hit,
                                  "velocity": soundSys.vel,
                                  "volume": soundSys.vol,
                                  "bar": soundSys.row % 16,
                                  "row": soundSys.row
                                });
        } 
       
    } // end of black1
      
    if (soundSys.play.diff == true) {  
        if (soundSys.row % 8 == 0) { 
            if (soundSys.collections.diff_note_collection.length > soundSys.threshold.diff_out) {  
                soundSys.vol = setVolume(soundSys.collections.diff_note_collection, 3, 45, '+'); 
                soundSys.diff.volume.value = soundSys.vol;  
                soundSys.diff_hit = Math.floor(soundSys.collections.diff_note_collection.length/2);
                soundSys.notes = getNoteToPlayPos(soundSys.collections.diff_note_collection, soundSys.mid_tones, 400, soundSys.diff_hit);
                soundSys.diff.triggerAttackRelease(soundSys.diffchord, '+0.05', 0.5);
                //console.log(soundSys.diffchord);  
                soundSys.diff.volume.rampTo(-40, 3); //
                soundSys.vel = Math.random() * 0.4 + 0.2;  
                soundSys.hit = "+0.01";
                soundSys.logger.push({"color": "diff",
                                  "type": 1,
                                  "notes": soundSys.notes,
                                  "time": soundSys.hit,
                                  "velocity": soundSys.vel,
                                  "volume": soundSys.vol,
                                  "bar": soundSys.row % 16,
                                  "row": soundSys.row
                                }) 
                //console.log(soundSys.logger);
                soundSys.diff.triggerAttackRelease(soundSys.diffchord, soundSys.hit, soundSys.vel);               
                if (soundSys.row % 16 == 0) {
                    soundSys.diffchord[soundSys.setcount.diff] = soundSys.notes; 
                    soundSys.marks = soundSys.marks + 1; 
                    soundSys.setcount.diff++; 
                    if (soundSys.setcount.diff > 4) {
                        soundSys.setcount.diff = 0; 
                    }
                }
            }         
        } 
    } // end of diff

    
    soundSys.doc.push(soundSys.logger);
    soundSys.logger = []
    //console.log(soundSys.doc, soundSys.row % 8); 

    soundSys.threshold.sum_notes = 0; 
    soundSys.threshold.diff_notes = 0; 

    soundSys.collections.red_note_collection = [];
    soundSys.collections.bleu_note_collection = [];
    soundSys.collections.green_note_collection = [];
    soundSys.collections.white_note_collection = [];
    soundSys.collections.black_note_collection = [];
    soundSys.collections.sum_note_collection = [];
    soundSys.collections.diff_note_collection = [];
    soundSys.collections.yellow_note_collection = [];
    soundSys.collections.pink_note_collection = [];
     if (soundSys.row % 16 == 0) { 
        //console.log("m ----- ", soundSys.marks); 
        soundSys.marks = 0; 
      }
  
    soundSys.row = soundSys.row + 1;    
    if (soundSys.row > 100) { // imgHeight
        soundSys.row = 0; 
        console.log("insert")
        var notediv = $(".notes").text(soundSys.doc);
        // clearTimeout(timeOut); 
        if (soundSys.row == 20) {

            console.log("begin"); 
            soundSys.row = 100; 
        }
    soundSys.colors = {
            red: 0,
            green: 0,
            bleu: 0,
            black:0, 
            white:0,
            yellow:0,
            pink:0,
            magenta:0,
            red_rel: 0,
            green_rel: 0,
            bleu_rel: 0,
            yellow_rel:0,
            magenta_rel:0,
            sum: 0,
            diff: 0, 
          }; 
        nextImage();
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
  