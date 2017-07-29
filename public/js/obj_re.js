
var soundSys = {

  type: "testtype", 
  displayType: function() {  // Method which will display type of Animal
    console.log(this.type);
  }, 
  getScaledNoteFromNumber: function (number, scale, trans) {
  
    number = Math.abs(number);
    
    if (!number || number < 1) {
      number = 1;
      console.log("bad") 
    }
    
    var octave = Math.floor( number / scale );
    console.log("o --------", octave)
    if (octave > trans) {
      octave - trans; 
    }
  
    var float_number =  octave/scale
    var the_note = float_number % 1;

    //console.log("n ------ ", the_note)
    var f_the_note = Math.floor(the_note * 10); 
    //console.log("f ----", f_the_note)

    var the_final_note = notes_map[f_the_note]+octave; 

    return the_final_note; 

}
};

// Create new animal type called animal1 
var soundSys1 = Object.create(soundSys);

soundSys1.displayType(); // Output:Invertebrates


var canvas, ctx;
var aImages = [];
var iCurFrame = 0;
var iCurImage = 1;
var iCnt = 0;
var iSmTimer = 0;
var iContr = 0;
var iEfIter = 50;
var row = 0;
var imgHeight = 700; 
var jsonimg = false; 
var saveimages = true;
var folder = "1024"
var old_img = ''
var rectang = 1024;
var playing = 'updown';
var playing_sound = "10th_tune"; 
var zoom = 0;
var move = 0;
var input_text = "index preface divisions thanks method question"
var text_index = 0; 
var random_s = [];
var first_pass = true; 
var pixelArray = '';
var similey = '';
var zooming = 'base';
var c_paning = 'false';
var wavelength= 100,
    amplitude= 10,
    phase= 90,
    width= 1200,
    thickness= 2;
var threshold = 40; 
var anti_threshold = 0; 
var collect_tones = true; 
var note_collation = [];
var bright_note_collation = [];
var dark_note_collation = [];
var red_note_collation = [];
var green_note_collation = [];
var bleu_note_collation = [];
var drum_index = 0; 
var drums = true; 

var base_index = 0; 
var future = 4; 
var soundsys = false; 
var oscillator = false;  
var osc_partials = [];
var diff = 100; 
var old_diff = 110;
var drum_list = []
var duration = 0.8;
var time = 0;
var one_the_beat = false; 
var velocity = 0.2;
var height = amplitude * 2;
var move_wave = 0; 
var road_h = 0;
var road_i = 0;
var gap = 1.8; // increase this for spacing between spiral lines        
var STEPS_PER_ROTATION = 44; // increasing this makes the curve smoother
var notes_map = ["C", "Db", "C#", "D", "Eb", "D#", "E", "F", "Gb", "F#", "G", "Ab", "G#", "A", "Bb", "A#", "B"];
var notes_map_harm = ["C", "D", "A", "D", "C", "B", "E", "F", "F", "F", "G", "G", "G", "A", "A", "A", "B"];

var increment = 2*Math.PI/STEPS_PER_ROTATION;   
var theta = increment;
var color_contrast = 0; 
var lastend = 0;
var myTotal = 1000;
var c = 0; 
var b = 1; 
var q = 0; 
var soundplay = 0; 
var collect = 0; 
var next_step = true; 
var kicks =  ["#","-","-","-", "#","-","-","-", "#","-","_","-", "#","-","-","-", "#","-","-","-", "#","-","-","-", "#","-","_","-", "#","-","#","-", ]; 
var snares = ["-","-","-","-", "x","-","-","-", "-","-","-","-", "x","-","-","-", "-","-","-","-", "x","-","-","-", "-","-","-","-", "x","-","-","-", ]; 
var hats =   ["-","-","o","-", "-","-","o","-", "-","-","o","-", "-","-","o","-", "-","-","o","-", "-","-","o","-", "-","-","o","-", "-","-","o","-",]; 
  
var kicks_2 =  ["#","-","-","-", "#","-","-","-", "#","-","_","-", "#","-","-","-", "#","-","-","-", "#","-","-","-", "#","-","_","-", "#","-","-","-", ]; 
var snares_2 = ["-","-","x","-", "-","-","-","-", "-","-","-","-", "x","-","-","-", "-","-","x","-", "-","-","-","-", "-","-","-","-", "x","-","-","-", ]; 
var hats_2 =   ["-","-","o","-", "-","-","o","-", "-","-","o","-", "-","-","o","-", "-","-","o","-", "-","-","o","-", "-","-","o","-", "-","-","o","-",]; 

var ctrl_list = ["speed", "bpm", "sampel_rate", "threshold", "note_div", "down_scaling", "released", "future", "oscillator_volume", "oscillator_volume", "oscillator_spread", "oscillator_sustain"];       
var play_list = ["none", "second_tune", "third_tune", "histogram", "fourth_tune", "fifth_tune", "sixth_tune"];       

var ctrl_index = 0; 
var part_created = false; 
var piano_parts = {}; 
var chello_parts = {}; 
var sampel_rate = 64; 
var note_div = 60; 
var down_scaling = 10; 
var released = 4096;
var piano_map = [1,1,2,3,3,3,2,1,0]
var yr = 0; 
var yg = 0; 
var yb = 0; 
var l = 0; 
var collect_pattern = 'one';
var coll_r = 0; 
var coll_g = 0; 
var coll_b = 0; 
var z = 0; 
var play_red = false;
var play_bleu = false;
var play_green = false;
var play_brig = false; 
var play_sum = false;
var lop = 0; 
var no_loop = 0; 
var change_set = false; 
var getAllval = false; 
var the_speed = 200; 
var list = []; 
$(function(){
    // creating canvas objects
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    $.getJSON( "../../hist.json", function( obj ) {
      var source = '/images/'+folder+'/'+obj[0].filename+'.jpg'

      $(".images").append('<img src="'+source+'" id="first"/>'); 
      var img = document.getElementById("first");
       
      old_img = img; 
      img.onload = function() {
          ctx.drawImage(img, 0, 0);   
          drawProcess(); 
      }
   
    $.each(obj, function(i, one) {
        var oImgL = new Image();
        oImgL.src = '/images/'+folder+'/'+one.filename+'.jpg';
        oImgL.id = one.filename;
        
        aImages.push(oImgL);  
        if (i > 1) {
              $(".images").append('<img src="'+oImgL.src+'" id="'+obj[i].filename+'"/>'); 
        }
      });
      
    }); //end of getJSON
  
}); //end of $function


function getScaledNoteFromNumber(number, scale, trans) {
  
    number = Math.abs(number);
    
    
    var octave = Math.floor( number / scale ) + 1;

    if (octave > trans) {
      octave = octave - trans; 
    }
  
    var float_number =  (octave/scale)* 10; 
    var the_note = float_number % 1;

 
    var f_the_note = Math.floor(the_note * 10); 
    //var isnumber = isNaN(f_the_note); 
    // console.log("n : ", the_note, " : ", f_the_note)
    
    var the_final_note = notes_map_harm[f_the_note]+octave; 
    // console.log("function", the_final_note)
    if (the_final_note == NaN) {
      return 100; 
    }
   
    return the_final_note; 
 

}

function drawProcess() { 

  // collect dynamic parameters
  var canvasWidth  = canvas.width;
  var canvasHeight = canvas.height;
  var lengthofpixel = canvasWidth; 

  // create image data for canvas image and a blank image
  var newFrame = ctx.createImageData(canvasWidth, canvasHeight);
  var imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
  pixelArray = imageData.data;
  ctx.font = '30pt Arial';
  split_text = input_text.split(" "); 
  console.log(split_text);
  

  function getPixelrowzoom(pixels, row) {
    var pixelrowzoom = []
    if (zooming == 'strobe') {
        zoom = zoom + 2;
    }
    if (zooming == 'base') {
        zoom = zoom + 4;
    }
    
    //zoom = Math.floor(Math.random() * 10) -10;
    //zoom = zoom * 4;  
    index = row * imageData.width * 4 + zoom;
    for (i = index; i < imageData.width * 4 + index; i = i + 1) {
         pixelrowzoom.push(pixels[i])
    }  
    return pixelrowzoom; 
  }


 function getPixelrow(pixels, row) {
    pixelrow = []
 
    //zoom = Math.floor(Math.random() * 10) -10;
    //zoom = zoom * 4;  
    index = row * imageData.width * 4;
    for (i = index; i < imageData.width * 4 + index; i = i + 1) {
         pixelrow.push(pixels[i])
    }  
    return pixelrow; 
  }

  function diffFromFuture(pix_row_1_r, pix_row_1_g, pix_row_1_b, pix_row_f_r, pix_row_f_g, pix_row_f_b) {
    var sum = Math.floor((pix_row_1_r + pix_row_1_g + pix_row_1_b) / 3);
    var sum_f = Math.floor((pix_row_f_r + pix_row_f_g + pix_row_f_b) / 3);
    diff = (sum - sum_f);
    return diff; 
  }

  function nextImage() {

      info = $(".info").html(aImages[iCurImage].id);
      iCurImage = iCurImage + 1; 

      // clear and draw next image
      var img = document.getElementById(aImages[iCurImage].id); 
      
      
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, 0, 0, img.width,  img.height,
                            0, 0, canvasWidth, canvasHeight);  
        imgHeight = img.clientHeight;
     
        newFrame = ctx.createImageData(canvasWidth, canvasHeight);
        imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
        pixelArray = imageData.data;
        old_img.remove()
        old_img = img; 
        if (oscillator) {
        osc.frequency.value = 440; 
        }
        rect(); 
        move = 0;
        anti_troskel = 0;
        troskel = 20; 
      
    // create image data for canvas image and a blank image
    if (iCurImage == aImages.length - 1) {
        iCurImage = -1;
    }
  }


    var rect = function() {
        var c = 0;     
        var pix_row = getPixelrow(pixelArray, row);
        var pix_future = getPixelrowzoom(pixelArray, row+32); 
        
       
            
        for (j = 0; j < canvasHeight; j = j + 1) {
                
                ctx.beginPath();
                ctx.moveTo(j, canvasWidth);
                color_in = pix_row[c]+','+pix_row[c+1]+','+pix_row[c+2]+','+'0.7';
                // console.log(color_in)
                ctx.strokeStyle ='rgba('+color_in+')';
                
                ctx.lineTo(j, 0);
                ctx.closePath(); 
                ctx.stroke();

                if (q % sampel_rate == 0 && c < pix_row.length+34) {
                  ctx.fillText("x", c/4, 100);
                    var red = pix_row[c];
                    var green = pix_row[c+1];
                    var bleu = pix_row[c+2];
                    var red_rel = red - (green + bleu / 2);
                    var green_rel = green - (red + bleu / 2);
                    var bleu_rel = bleu - (red + green / 2);
                    console.log(red_rel, green_rel, bleu_rel)
                    var sum = Math.floor((red + green + bleu) / 3);
                    var diff = diffFromFuture(red, green, bleu, pix_future[c], pix_future[c+1], pix_future[c+2]);
               
                   
                    if (sum > 180) { 
                      ctx.fillText("LIGHT"+ sum + " " + c, c/4, 250);
                    }
                    if (sum < 50) { 
                      ctx.fillText("DARK"+ sum + " " + c, c/4, 275);
                    }

                    if (Math.abs(diff) > 80) {
                        var final_note = getScaledNoteFromNumber(c/9,  47, 3); //Tonal.freq.note(red+200); 
                        list.push(final_note)
                        c = c + 4;
                        ctx.fillText("+"+ final_note + " " + c, c/4, 200);
                    } else {

                        // noiseSynthPink.triggerAttackRelease("8n");

                        if (q % 8104 == 0 && final_note != false ) {
                             kick.triggerAttack(sum); 
                        } 
                       //  console.log("red--", red);
                        if (red > 200 && red < 205) {
                         
                        } else if ( red > 180) {
                          console.log( "f"); 
                          //pianof.triggerAttackRelease(final_note, undefined, 0.1);

                        } else {

                        }
                        if (red_rel > 20 ) {
                          ctx.fillText("red"+ red+ " " + c, c/4, 500);

                          var val = (Math.abs(c/100)); 
                          console.log(val); 
                          piano.volume.value = val *-1;
                          piano.triggerAttackRelease(final_note, undefined, 0.1);
                          
                        } 
                        if (green_rel > 0 ) {
                          ctx.fillText("green"+ sum+ " " + c, c/4, 600);
                          
                        }
                         if (bleu_rel > 40 ) {
                          ctx.fillText("bleu"+ sum+ " " + c, c/4, 400);
                          
                        }

                       
                    }

                } // end of sampel_rate
                q = q + 1; 
                c = c + 4; 
      } // end of pix row
      
      if (list.length > 0) {
          console.log(list)
          
          if (red) {
              var val = (Math.abs(red/100)); 
              console.log(val); 
              synth.volume.value = val *-1;
              synth.triggerAttackRelease(final_note, undefined, 0.1);
              

          }
          if (z % 2 == 0) {
            //osc.stop()
            hat.triggerAttack()
         
        } else {
           base.triggerAttackRelease(list, undefined, 0.01);
        }
          if (z % 8 == 0) {
            snare.triggerAttack() // osc.start()
            list = []; 
          }
          
         z = z + 1;  
      } else {
         noiseSynthPink.triggerAttackRelease("8n");
      }
            
    
      row = row + 1;    
      if (row > 80) { // imgHeight
        row = 0; 
        // clearTimeout(timeOut); 
        if (row < 20) {
          row = 40; 
        }
        nextImage();
      } else {
        var timeOut = setTimeout(function(){  rect(); }, the_speed);
      }
    }
  // play next frame

  var startplaying = document.getElementById('start');
  startplaying.addEventListener('click', rect);
  var first_tune = document.getElementById('first_tune');
  first_tune.addEventListener('click', function() { playing = 'first_tune' });
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
   
}


function nextFrame() {
  iCurFrame++;
  if (iCurFrame == 50) {
    iCurFrame = 0;
  }
    clearInterval(iSmTimer);
    iSmTimer = setInterval(draw, 2000); // extra one timer
}