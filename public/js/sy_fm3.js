
var soundSys = {
  type: "testtype",
  seed_img: true, 
  marks: 0,
  sampel_rate: 16,
  rgb_colors: '',
  vel: 0,
  alien_temp: 0, 
  future: 8,
  base_pos: 0,
  feliz_notes: 0,
  the_length: 0,
  base_tone_val: 0,
  send_base_tones: 0, 
  first_base: 0, 
  colors: {
    red: 0,
    green: 0,
    bleu: 0,
    black:0, 
    white:0,
    yellow:0,
    magenta:0,
    red_rel: 0,
    green_rel: 0,
    bleu_rel: 0,
    yellow_rel:0,
    magenta_rel:0,
    sum: 0,
    diff: 0, 
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
    magenta_note_collection : [],
    diff_note_collection : [],
    sum_note_collection : [], 
  },
  threshold: {
    sum_notes: 0, 
    diff_notes: 0, 
    red_in: 31,
    green_in: 27,
    bleu_in: 23,
    black_in:140, // > sum 
    white_in:90, // < sum
    yellow_in:[140, 100, 70],
    magenta_in:[100, 100, 80],
    diff_in: 100,
    red_rel_in: 0,
    green_rel_in: 0,
    bleu_rel_in: 23,
    red_rel_in: 0,
    green_rel_in: 0,
    red_out: 2, // notes.length
    green_out: 2,
    bleu_out: 1,
    black_out: 5, 
    diff_out: 3,
    black_out_base:5, 
    white_out:4,
  },  
  divitions: {
    red: 0,
    green: 0,
    bleu: 0,
    black:0, 
    white:0,
    yellow:0,
    magenta:0,
    red_rel: 0,
    green_rel: 0,
    bleu_rel: 0,
    yellow_rel:0,
    magenta_rel:0,
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
      for (j=0; j < 3; j++) {
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
    index = soundSysOne.row * imageData.width * 4;
    for (i = index; i < imageData.width * 4 + index; i = i + 1) {
         pixelrow.push(pixels[i])
    }  
    return pixelrow; 
  },

  diffFromFuture: function(pix_row_1_r, pix_row_1_g, pix_row_1_b, pix_row_f_r, pix_row_f_g, pix_row_f_b) {
    var sum = Math.floor((pix_row_1_r + pix_row_1_g + pix_row_1_b) / 3);
    var sum_f = Math.floor((pix_row_f_r + pix_row_f_g + pix_row_f_b) / 3);
    diff = (sum - sum_f);
    return diff; 
  }, 


};

// Create the soundsystem 
var soundSysOne = Object.create(soundSys);

$(function(){
    // creating canvas objects
    soundSysOne.canvas = document.getElementById('canvas');
    soundSysOne.ctx = soundSysOne.canvas.getContext('2d');
    soundSysOne.ctx.lineWidth = 8;
    $.getJSON( "../../hist.json", function( obj ) {
      soundSysOne.source = '/images/'+soundSysOne.folder+'/'+obj[0].filename+'.jpg'
      $(".images").append('<img src="'+soundSysOne.source+'" id="first"/>'); 
      soundSysOne.img = document.getElementById("first");
      soundSysOne.old_img = soundSysOne.img; 
      soundSysOne.img.onload = function() {
          soundSysOne.ctx.drawImage(soundSysOne.img, 0, 0);   
          drawProcess(); 
      }
   
    $.each(obj, function(i, one) {
        soundSysOne.oImgL = new Image();
        soundSysOne.oImgL.src = '/images/'+soundSysOne.folder+'/'+one.filename+'.jpg';
        soundSysOne.oImgL.id = one.filename;
        soundSysOne.aImages.push(soundSysOne.oImgL);  
        if (i > 1) {
              $(".images").append('<img src="'+soundSysOne.oImgL.src+'" id="'+obj[i].filename+'"/>'); 
        }
      });
    }); //end of getJSON
    // collect dynamic parameters
}); //end of $function

// create some scales 
soundSysOne.a_major_3 = soundSysOne.getLongscales('major', 2, 'A');
soundSysOne.a_minor_3 = soundSysOne.getLongscales('minor', 3, 'A');
soundSysOne.a_bebop_3 = soundSysOne.getLongscales('bebop', 3, 'A');
soundSysOne.a_melodic_3 = soundSysOne.getLongscales('melodic minor', 3, 'A');
soundSysOne.a_raga_3 = soundSysOne.getLongscales('kafi raga', 3, 'A');
soundSysOne.a_iwato_3 = soundSysOne.getLongscales('iwato', 3, 'A');
soundSysOne.a_minorblues_3 = soundSysOne.getLongscales('minor blues', 3, 'A'); 
soundSysOne.a_6tone_3 = soundSysOne.getLongscales('six tone symmetric', 3, 'A'); 

soundSysOne.progress_0_base = soundSysOne.creatSpecialProgression(soundSysOne.progressions[0], 0);
soundSysOne.progress_0_mid = soundSysOne.creatSpecialProgression(soundSysOne.progressions[0], 3);
soundSysOne.progress_0_high = soundSysOne.creatSpecialProgression(soundSysOne.progressions[0], 5);
soundSysOne.progress_1_base = soundSysOne.creatSpecialProgression(soundSysOne.progressions[1], 0);
soundSysOne.progress_1_mid = soundSysOne.creatSpecialProgression(soundSysOne.progressions[1], 3);
soundSysOne.progress_1_high = soundSysOne.creatSpecialProgression(soundSysOne.progressions[1], 5);
soundSysOne.progress_2_base = soundSysOne.creatSpecialProgression(soundSysOne.progressions[2], 0);
soundSysOne.progress_2_mid = soundSysOne.creatSpecialProgression(soundSysOne.progressions[2], 3);
soundSysOne.progress_2_high = soundSysOne.creatSpecialProgression(soundSysOne.progressions[2], 5);
soundSysOne.progress_3_base = soundSysOne.creatSpecialProgression(soundSysOne.progressions[5], 0);
soundSysOne.progress_3_mid = soundSysOne.creatSpecialProgression(soundSysOne.progressions[5], 3);
soundSysOne.progress_3_high = soundSysOne.creatSpecialProgression(soundSysOne.progressions[5], 5);

soundSysOne.play.base_tones = soundSysOne.progress_0_base; 
soundSysOne.play.mid_tones = soundSysOne.progress_0_mid;
soundSysOne.play.high_tones = soundSysOne.progress_0_high;  

function getPixelrowzoom(pixels, row) {
    soundSysOne.pixelrowzoom = []
    if (soundSysOne.zooming == 'strobe') {
        soundSysOne.zoom = soundSysOne.zoom + 2;
    }
    if (soundSysOne.zooming == 'base') {
        soundSysOne.zoom = soundSysOne.zoom + 4;
    }
    soundSysOne.index = soundSysOne.row * soundSysOne.imageData.width * 4 + soundSysOne.zoom;
    for (i = soundSysOne.index; i < soundSysOne.imageData.width * 4 + soundSysOne.index; i = i + 1) {
         soundSysOne.pixelrowzoom.push(pixels[i])
    }  
    return soundSysOne.pixelrowzoom; 
}

function createHandels() {
    $.each(soundSysOne.threshold, function( index, value ) {
        console.log( index + ": " + value );
        // add 
    });
}
createHandels()
function drawProcess() { 
    // create image data for soundSysOne.canvas image and a blank image
    soundSysOne.newFrame = soundSysOne.ctx.createImageData(soundSysOne.canvas.width, soundSysOne.canvas.height);
    soundSysOne.imageData = soundSysOne.ctx.getImageData(0, 0, soundSysOne.canvas.width, soundSysOne.canvas.height);
    pixelArray = soundSysOne.imageData.data;
    soundSysOne.ctx.font = '30pt Arial';
    nextImage()
}

function nextImage() {

    soundSysOne.iCurImage = soundSysOne.iCurImage + 1; 
    // clear and draw next image
    soundSysOne.img = document.getElementById(soundSysOne.aImages[soundSysOne.iCurImage].id);     
    soundSysOne.ctx.clearRect(0, 0, soundSysOne.canvas.width, soundSysOne.canvas.height);
    soundSysOne.ctx.drawImage(soundSysOne.img, 0, 0, soundSysOne.img.width,  soundSysOne.img.height,
                        0, 0, soundSysOne.canvas.width, soundSysOne.canvas.height);  
    soundSysOne.newFrame = soundSysOne.ctx.createImageData(soundSysOne.canvas.width, soundSysOne.canvas.height);

    soundSysOne.old_img.remove()
    soundSysOne.old_img = soundSysOne.img; 
    imageData = soundSysOne.ctx.getImageData(0, 0, soundSysOne.canvas.width, soundSysOne.canvas.height);
    pixelArray = imageData.data;
    rect(); 
  
    if (soundSysOne.iCurImage == soundSysOne.aImages.length - 1) {
        soundSysOne.iCurImage = -1;
    }
} // end of nextImage


var rect = function() {

    soundSysOne.play.sampel_rate = $( "#sampel_rate" ).val();
    soundSysOne.variables.c = 0;     
    soundSysOne.pix_row = soundSysOne.getPixelrow(pixelArray, soundSysOne.row, imageData);
    soundSysOne.pix_future = getPixelrowzoom(pixelArray, soundSysOne.row+soundSysOne.future); 
       
      for (j = 0; j < soundSysOne.canvas.height; j = j + 1) {
          if (soundSysOne.seed_img == true && soundSysOne.variables.c % 32 == 0) { 
              soundSysOne.ctx.beginPath();
              soundSysOne.ctx.moveTo(j, soundSysOne.canvas.width);
              soundSysOne.rgb_colors = soundSysOne.pix_row[soundSysOne.variables.c]+','+soundSysOne.pix_row[soundSysOne.variables.c+1]+','+soundSysOne.pix_row[soundSysOne.variables.c+2]+',0.9';
              soundSysOne.ctx.strokeStyle ='rgba('+soundSysOne.rgb_colors+')';
              soundSysOne.ctx.lineTo(j, 0);
              soundSysOne.ctx.closePath();               
              soundSysOne.ctx.stroke();

          } 

          if (j % soundSysOne.play.sampel_rate == 0 && soundSysOne.variables.c < 3905) {
              soundSysOne.colors.red = soundSysOne.pix_row[soundSysOne.variables.c];
              soundSysOne.colors.green = soundSysOne.pix_row[soundSysOne.variables.c+1];
              soundSysOne.colors.bleu = soundSysOne.pix_row[soundSysOne.variables.c+2];

              soundSysOne.colors.yellow = (soundSysOne.colors.green + soundSysOne.colors.red) - soundSysOne.colors.bleu;
              soundSysOne.colors.magenta = (soundSysOne.colors.red + soundSysOne.colors.bleu) / 2; 

              soundSysOne.colors.green_rel = soundSysOne.colors.green - soundSysOne.colors.magenta;
              soundSysOne.colors.bleu_rel = soundSysOne.colors.bleu - soundSysOne.colors.yellow;
              soundSysOne.colors.red_rel = soundSysOne.colors.red - (soundSysOne.colors.green + soundSysOne.colors.bleu / 2);  
              soundSysOne.colors.yellow_rel =  soundSysOne.colors.magenta/2 - soundSysOne.colors.green;
              soundSysOne.colors.magenta_rel = soundSysOne.colors.yellow/2 - soundSysOne.colors.bleu;              
              soundSysOne.colors.sum = (soundSysOne.colors.red + soundSysOne.colors.green + soundSysOne.colors.bleu);
              soundSysOne.colors.diff = soundSysOne.diffFromFuture(soundSysOne.colors.red, soundSysOne.colors.green, soundSysOne.colors.bleu, soundSysOne.pix_future[soundSysOne.variables.c], soundSysOne.pix_future[soundSysOne.variables.c+1], soundSysOne.pix_future[soundSysOne.variables.c+2]);
              soundSysOne.threshold.sum_notes = soundSysOne.threshold.sum_notes + soundSysOne.colors.sum; 
              soundSysOne.threshold.diff_notes = soundSysOne.threshold.diff_notes + Math.abs(diff); 
              

              if (soundSysOne.colors.red_rel > soundSysOne.threshold.red_in) {
                  soundSysOne.collections.red_note_collection.push({"row": soundSysOne.row, "value": soundSysOne.colors.red_rel, "pos": soundSysOne.variables.c})
                  // soundSysOne.ctx.fillText("r", c, soundSysOne.row+red_rel);
                  soundSysOne.marks  = soundSysOne.marks  + 1; 
              }
              
              if (soundSysOne.colors.bleu_rel > 50) {// soundSysOne.threshold.bleu_in) {
                  soundSysOne.collections.bleu_note_collection.push({"row": soundSysOne.row, "value": soundSysOne.colors.bleu_rel, "pos": soundSysOne.variables.c})
                  soundSysOne.ctx.fillText("b", 400-c, soundSysOne.row+soundSysOne.collections.bleu_rel);
                 // console.log("b", soundSysOne.colors.bleu_rel)
                  soundSysOne.marks  = soundSysOne.marks  + 1; 
              }
              if (soundSysOne.colors.green_rel > soundSysOne.threshold.green_in) {
                  soundSysOne.collections.green_note_collection.push({"row": soundSysOne.row, "value": soundSysOne.colors.green_rel, "pos": soundSysOne.variables.c})
                  // soundSysOne.ctx.fillText("g", c, soundSysOne.row+bleu_rel);
                  soundSysOne.marks  = soundSysOne.marks  + 1; 
              }

              if (soundSysOne.colors.sum > soundSysOne.threshold.black_in) { 
                  soundSysOne.collections.white_note_collection.push({"row": soundSysOne.row, "value": soundSysOne.colors.sum, "pos": soundSysOne.variables.c})
                  // soundSysOne.ctx.8fillText("+", c, soundSysOne.row+soundSysOne.colors.sum);      
                  soundSysOne.marks  = soundSysOne.marks  + 1;              
              }
              if (soundSysOne.colors.sum < 80) { 
                  soundSysOne.collections.black_note_collection.push({"row": soundSysOne.row, "value": soundSysOne.colors.sum, "pos": soundSysOne.variables.c})
                  // soundSysOne.ctx.fillText("-", c, soundSysOne.row+soundSysOne.colors.sum); 
                  soundSysOne.marks  = soundSysOne.marks  + 1;    
              }
              //soundSysOne.ctx.fillStyle = 'rgb('+soundSysOne.colors.red+','+soundSysOne.colors.green+', '+soundSysOne.colors.bleu+')'
                  
              if (soundSysOne.colors.red > soundSysOne.threshold.yellow_in[0]  && soundSysOne.colors.green > soundSysOne.threshold.yellow_in[1] && soundSysOne.colors.bleu < soundSysOne.threshold.yellow_in[2]) {//&& yellow > 220 && yellow < 230) {
                  soundSysOne.collections.yellow_note_collection.push({"row": soundSysOne.row, "value": soundSysOne.colors.yellow, "pos": soundSysOne.variables.c})
                  // soundSysOne.ctx.fillStyle = 'rgb('+red+','+green+', '+bleu+')'
                  // soundSysOne.ctx.fillText(c, c/4, soundSysOne.row); 
                  soundSysOne.marks  = soundSysOne.marks  + 1; 
              } 
               if (soundSysOne.colors.bleu > soundSysOne.threshold.magenta_in[0] && soundSysOne.colors.red  > soundSysOne.threshold.magenta_in[1] && soundSysOne.colors.green < soundSysOne.threshold.magenta_in[2]) {//&& yellow > 220 && yellow < 230) {
                  soundSysOne.collections.magenta_note_collection.push({"row": soundSysOne.row, "value": soundSysOne.colors.yellow, "pos": soundSysOne.variables.c})
                  // soundSysOne.ctx.fillStyle = 'rgb('+red+','+green+', '+bleu+')'
                  // soundSysOne.ctx.fillText(c, c/4, soundSysOne.row);  
                  soundSysOne.marks  = soundSysOne.marks  + 1; 
              }

              if (Math.abs(soundSysOne.colors.diff) > soundSysOne.threshold.diff_in) {                 
                  soundSysOne.collections.diff_note_collection.push({"row": soundSysOne.row, "value": soundSysOne.colors.sum, "pos": soundSysOne.variables.c})
                  //soundSysOne.ctx.fillText("-"+c, c, soundSysOne.row+soundSysOne.colors.sum); 
                  soundSysOne.marks  = soundSysOne.marks  + 1;    
              }

              
              if (soundSysOne.colors.bleu_rel > soundSysOne.threshold.bleu_rel_in) {
                  soundSysOne.base_pos--; 
                  if (soundSysOne.base_pos < 1) {
                      soundSysOne.base_pos = 13
                  }
                  if (soundSysOne.base_pos > 14) {
                    soundSysOne.base_pos = 0;  
                  }
              } // end of bleu_rel

        } // end of sampel_rate
        soundSysOne.variables.q = soundSysOne.variables.q + 1; 
        soundSysOne.variables.c = soundSysOne.variables.c + 4; 

    } // end of pix soundSysOne.row

    // soundSysOne.ctx.fillText( "____", 0, soundSysOne.row)// soundSysOne.aImages[iCurImage].id, soundSysOne.colors.sum_notes/13, soundSysOne.row+200 );

    soundSysOne.ctx.fillStyle = 'rgb(0,0,0)'
      //console.log(soundSysOne.threshold.sum_notes)
    // DRUMS --------->
    if (soundSysOne.threshold.sum_notes > 450000) {        
        if (soundSysOne.kick_2_pattern[soundSysOne.drum_count] == "x") {  
            soundSysOne.kick_2.triggerAttack('+0.05'); 
        }
    } else {
        
        if (soundSysOne.hat_pattern[soundSysOne.drum_count] == "x") {  
           soundSysOne.hat.triggerAttack('+0.05'); 
        } 
        if (soundSysOne.kick_pattern[soundSysOne.drum_count] == "x") {  
           soundSysOne.kick_1.triggerAttack('+0.08'); 
        } 
    }
       if (soundSysOne.threshold.sum_notes > 300000) {
       
        if (soundSysOne.snare_pattern[soundSysOne.drum_count] == "x") {  
            soundSysOne.snare.triggerAttack('+0.05'); 
        }
    } else {
        
         if (soundSysOne.snare_pattern[soundSysOne.drum_count] == "x") {  
            soundSysOne.snare.triggerAttack('+0.05'); 
        } 
    }


    soundSysOne.drum_count++; 
    if (soundSysOne.drum_count > soundSysOne.snare_pattern.length-1) {
        soundSysOne.drum_count = 0; 
    }
   
    // add extra drums mix
    if (soundSysOne.colors.diff > 50) {
        var rand = Math.floor(Math.random() * 10); 
        if (rand > 8) {
            soundSysOne.clap.triggerAttack('+0.05'); 
        } 
        if (rand < 2) {
            soundSysOne.swoosh.triggerAttack('+0.05');  
        }
        if (rand < 3) {
            // ophat.triggerAttack('+0.05');  
        }
        if (rand < 4) {
          // soundSysOne.lectric.volume.value = -16
          // soundSysOne.lectric.volume.rampTo(-100, 3)
        }
        
    }
    // choose bewteen diffrent tone sets
    if (soundSysOne.row % 128 == 0) {
        if (soundSysOne.threshold.sum_notes > 1600) {
            soundSysOne.base_tones = soundSysOne.progress_0_base ; 
            soundSysOne.mid_tones = soundSysOne.progress_0_mid;
            soundSysOne.high_tones = soundSysOne.progress_0_high; 
        } else if (soundSysOne.threshold.sum_notes < 800) {
            soundSysOne.base_tones = soundSysOne.progress_1_base; 
            soundSysOne.mid_tones = soundSysOne.progress_1_mid;
            soundSysOne.high_tones = soundSysOne.progress_1_high;
        } else {
            soundSysOne.base_tones = soundSysOne.progress_3_base; 
            soundSysOne.mid_tones = soundSysOne.progress_3_mid;
            soundSysOne.high_tones = soundSysOne.progress_3_high;
        }
    }

    if (soundSysOne.collections.red_note_collection.length > soundSysOne.threshold.red_out && soundSysOne.play.red == true) {
        if (soundSysOne.row % 8 == 0 || soundSysOne.row % 8 == 6  ) {  
            soundSysOne.fmsynth.volume.value = soundSysOne.collections.red_note_collection.length-15; 
            soundSysOne.fmsynth.set({
                    modulationIndex: soundSysOne.divitions.red*3,                            
            });        
            soundSysOne.vel = Math.random() * 0.2 + 0.2;
            if (soundSysOne.divitions.red < soundSysOne.collections.red_note_collection.length) {
              soundSysOne.divitions.red  = soundSysOne.collections.red_note_collection.length; 
            }
            if (soundSysOne.row % 16 == 0) {
                soundSysOne.divitions.red = soundSysOne.divitions.red / 2; 
            }
          //  soundSysOne.fmsynth.triggerAttackRelease(soundSysOne.base_tones[Math.floor(soundSysOne.collections.red_note_collection.length/soundSysOne.divitions.red/2)], "+0.1", soundSysOne.vel); 
            
           //soundSysOne.fmsynth.frequency.rampTo(soundSysOne.high_tones[Math.floor(soundSysOne.collections.red_note_collection.legth/(soundSysOne.divitions.red/2))], 0.1);
           // soundSysOne.fmsynth.triggerAttackRelease(soundSysOne.mid_tones[Math.floor(soundSysOne.collections.red_note_collection.length/soundSysOne.divitions.red/2)], "+0.3", soundSysOne.vel); 
            soundSysOne.fmsynth.triggerAttackRelease(soundSysOne.mid_tones[Math.floor(soundSysOne.collections.red_note_collection.length/soundSysOne.divitions.red/2)], "+0.3", soundSysOne.vel);  
            soundSysOne.ctx.fillText(".", 160+(Math.floor(soundSysOne.collections.red_note_collection.length/3)*4), soundSysOne.row); 
        } else {
            soundSysOne.fmsynth.volume.rampTo(-100, 1);
        }
    } // end of red 

    // green mid tone 
    if (soundSysOne.row % 8 == 2 || soundSysOne.row % 8 == 2 ) { 
        if (soundSysOne.play.green == true) {
            if (soundSysOne.collections.green_note_collection.length > soundSysOne.threshold.green_out) {
                soundSysOne.chellosynth.volume.value = Math.floor(Math.sqrt(soundSysOne.collections.green_note_collection.length+5)) || 1; 
                soundSysOne.chellosynth.triggerAttackRelease(soundSysOne.play.mid_tones[Math.floor((soundSysOne.collections.green_note_collection.length || 1)/4)], '+0.05', soundSysOne.collections.green_note_collection.length*0.1); 
                soundSysOne.ctx.fillText(".", 260+(Math.floor(soundSysOne.collections.green_note_collection.length/4)), soundSysOne.row); 
              console.log(soundSysOne.mid_tones[Math.floor((soundSysOne.collections.green_note_collection.length-3)/4)], soundSysOne.collections.green_note_collection.length)
            }
        }
    } else {
        soundSysOne.chellosynth.volume.rampTo(-100, 3);
    } // end of green
   
    if (soundSysOne.row % 8 == 7) { 
        if (soundSysOne.collections.bleu_note_collection.length > soundSysOne.threshold.bleu_out && soundSysOne.play.bleu == true) {    
                soundSysOne.pianoetta.volume.value = 1; 
            if (soundSysOne.divitions.bleu < soundSysOne.collections.bleu_note_collection.length) {
              soundSysOne.divitions.bleu  = soundSysOne.collections.bleu_note_collection.length; 
            }
            if (soundSysOne.bleu % 128 == 0) {
                soundSysOne.divitions.bleu = soundSysOne.divitions.bleu / 2; 
            }
                soundSysOne.first_base = Math.floor(soundSysOne.collections.bleu_note_collection.length/(soundSysOne.divitions.bleu/5)); 
                console.log(soundSysOne.collections.bleu_note_collection.length, soundSysOne.first_base)
                if (soundSysOne.collections.bleu_note_collection.length > 5) {
                    soundSysOne.feliz_notes = [soundSysOne.base_tones[soundSysOne.first_base+soundSysOne.first_base*2], soundSysOne.base_tones[soundSysOne.first_base+soundSysOne.first_base*3], soundSysOne.base_tones[soundSysOne.first_base+soundSysOne.first_base*4]];
                    console.log(soundSysOne.base_tones[soundSysOne.first_base*3])
                } else {
                    soundSysOne.feliz_notes = [soundSysOne.base_tones[soundSysOne.first_base+5], soundSysOne.base_tones[soundSysOne.first_base+10]]; 
                }
               
                soundSysOne.FelizPart.values = soundSysOne.feliz_notes; 
                soundSysOne.ctx.fillText(".", 360+soundSysOne.first_base, soundSysOne.row); 
                soundSysOne.pianoetta.volume.rampTo(-100, 4);
            } else {
               //soundSysOne.pianoetta.volume.rampTo(-100, 7);
        }
    } // end of bleu

    if (soundSysOne.play.white == true) {
        if (soundSysOne.row % 4 == 0) { 
            if (soundSysOne.collections.white_note_collection.length > soundSysOne.threshold.white_out) {
                soundSysOne.alien.volume.value = ((soundSysOne.collections.white_note_collection.length)*-0.1)-10;    
                soundSysOne.fx_distortion.wet.value = soundSysOne.collections.white_note_collection.length*0.5;     
                soundSysOne.vel = Math.random()   
                soundSysOne.alien_temp = []; 
                
                if (soundSysOne.row % 32 == 0) {
                    soundSysOne.count = Math.floor(soundSysOne.collections.white_note_collection.length/4);
                    soundSysOne.spread = soundSysOne.collections.white_note_collection.length;
                    console.log("count:", soundSysOne.count, "spread:", soundSysOne.spread)
                    soundSysOne.alien.set({
                        
                        "oscillator" : {
                          "count" :  soundSysOne.count, // 3
                          "spread" : soundSysOne.spread, // 30
                        },
                        
                        
                    });
                }
                for (w=1; w < soundSysOne.collections.white_note_collection.length ; w = w+1) { 
                    soundSysOne.alien_temp.push(soundSysOne.mid_tones[Math.floor(soundSysOne.collections.white_note_collection[w].pos/400)]);  // soundSysOne.high_tones[the_sum], undefined, marks*0.1);          
                }  
                soundSysOne.ctx.fillText(".", 460+soundSysOne.collections.white_note_collection.length, soundSysOne.row);                 
                soundSysOne.alien.triggerAttackRelease(soundSysOne.alien_temp, '+0.05')       
            } else {
                soundSysOne.alien.volume.rampTo(-100, 3)    
            }
        } else {
            soundSysOne.alien.volume.rampTo(-100, 3)    
        }
    }// end of white

    if (soundSysOne.collections.black_note_collection.length > soundSysOne.threshold.black_out && soundSysOne.play.black == true) {
    
        if (soundSysOne.row %  8 == 5) {  
            soundSysOne.bassline.volume.value = Math.floor(soundSysOne.collections.black_note_collection.length/10);          
            soundSysOne.vel = Math.random() * 0.3 + 0.2;   
            soundSysOne.base_tone_val = Math.floor(soundSysOne.collections.black_note_collection.length / 7);
            soundSysOne.the_base_tone = soundSysOne.play.base_tones[soundSysOne.base_tone_val]; 
            soundSysOne.bassline.triggerAttack(soundSysOne.play.the_base_tone, '+0.05');
            soundSysOne.ctx.fillText(".", 460+soundSysOne.collections.black_note_collection.length, soundSysOne.row);
            if (soundSysOne.collections.black_note_collection.length > 4) {
                soundSysOne.monoBaseGuitar.volume.value = -13;  
                soundSysOne.vel = Math.random() * 0.1 + 0.1;
                soundSysOne.send_base_tones = [
                                   soundSysOne.mid_tones[Math.floor(soundSysOne.collections.black_note_collection[4].pos/400)],
                                   soundSysOne.mid_tones[Math.floor(soundSysOne.collections.black_note_collection[3].pos/400)], 
                                   soundSysOne.mid_tones[Math.floor(soundSysOne.collections.black_note_collection[2].pos/400)],
                                   soundSysOne.mid_tones[Math.floor(soundSysOne.collections.black_note_collection[1].pos/400)],
                                   soundSysOne.mid_tones[Math.floor(soundSysOne.collections.black_note_collection[0].pos/400)] ]                             
                soundSysOne.bassPart.values = soundSysOne.send_base_tones; 
                soundSysOne.monoBaseGuitar.volume.rampTo(-100, 2)
            }
        } 
    } else {
        soundSysOne.bassline.volume.rampTo(-100, 4)
    } // end of black1

    if (soundSysOne.play.diff == true) {        
        if (soundSysOne.row % 4 == 3 ) {

         
            if (soundSysOne.collections.diff_note_collection.length > soundSysOne.threshold.diff_out) {
                soundSysOne.synth4.volume.value = 4; 
                //piano.volume.value = -8; 
                if (soundSysOne.collections.diff_note_collection.length > 5) {
                  soundSysOne.the_length  = 5; 

                } else {
                  soundSysOne.the_length = soundSysOne.collections.diff_note_collection.length; 
                }
                soundSysOne.ctx.fillText(".", 660+soundSysOne.collections.diff_note_collection.length, soundSysOne.row); 
                for (v=0; v < soundSysOne.the_length; v=v+1) {
                    soundSysOne.synth4.triggerAttackRelease(soundSysOne.mid_tones[Math.floor(soundSysOne.collections.diff_note_collection[v].pos/400)], "+"+v/2, 0.01) 
                        console.log(soundSysOne.row, soundSysOne.mid_tones[Math.floor(soundSysOne.collections.diff_note_collection[v].pos/400)]) 
                }         
            
        } 
        soundSysOne.synth4.volume.rampTo(-100, 3);
      }
    } // end of diff

    soundSysOne.colors.sum_notes = 0; 
    soundSysOne.colors.diff_notes = 0; 

    soundSysOne.collections.red_note_collection = [];
    soundSysOne.collections.bleu_note_collection = [];
    soundSysOne.collections.green_note_collection = [];
    soundSysOne.collections.white_note_collection = [];
    soundSysOne.collections.black_note_collection = [];
    soundSysOne.collections.sum_note_collection = [];
    soundSysOne.collections.diff_note_collection = [];
    soundSysOne.collections.yellow_note_collection = [];
    soundSysOne.collections.magenta_note_collection = [];
    soundSysOne.marks = 0; 
  
    soundSysOne.row = soundSysOne.row + 1;    
    if (soundSysOne.row > 800) { // imgHeight
        soundSysOne.row = 0; 
        // clearTimeout(timeOut); 
        //if (soundSysOne.row < 10) {
            //soundSysOne.row = 40; 
        //}
    soundSysOne.colors = {
            red: 0,
            green: 0,
            bleu: 0,
            black:0, 
            white:0,
            yellow:0,
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
  console.log(next)
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
   

});
  