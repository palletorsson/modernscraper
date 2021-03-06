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
var playing_sound = "sixth_tune"; 
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

var ctrl_list = ["speed", "oscillator_volume", "oscillator_volume", "oscillator_spread", "oscillator_sustain", "sampel_rate", "note_div", "down_scaling", "released", "future" ];       
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

    console.log("n ------ ", the_note)
    var f_the_note = Math.floor(the_note * 10); 
    console.log("f ----", f_the_note)

    var the_final_note = notes_map[f_the_note]+octave; 

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

        the_speed = $( "#speed" ).val();
        Tone.Transport.bpm.value  = $( "#bpm" ).val();
        console.log(the_speed, Tone.Transport.bpm.value)
        var similey = document.getElementById("smile");
        var c = 0; 
        var b = 0; 
        move = move + 1;
        move_wave = move_wave - 0.1;
        text_index = text_index + 1; 
       
        if (text_index > 4) {
            text_index = 0; 
        }
         
        // get pixel rows on static on moving 
        var pix_row = getPixelrow(pixelArray, row);
        var pix_row_zoom =  getPixelrowzoom(pixelArray, row); 
        var pix_sort =  getPixelrowzoom(pixelArray, row); 
        var pix_future = getPixelrowzoom(pixelArray, row+future); 
        console.log("---", future)
        // get canvas height and width dynamically
        canvasWidth = $( "#canvasWidth" ).val();
        canvasHeight = $( "#canvasHeight" ).val();
            // sustain nob? 
            synth.set({
              "oscillator" : {
                
                "count" : $( "#oscillator_count" ).val(),
                "spread" :  $( "#oscillator_spread" ).val(),
              },
              "volume" : $( "#oscillator_volume" ).val(),
              "filter" : {
                "type" : "highpass"
              },
              "envelope" : {
                
                "sustain": $( "#oscillator_sustain" ).val(),
                
              }
            });
        // transpose the color index, will change rgb_a colors
        c = c + parseInt($( "#c" ).val());
        sampel_rate = $( "#sampel_rate" ).val();
        note_div = $( "#note_div" ).val();
        down_scaling = $( "#down_scaling" ).val();
        released = $( "#released" ).val();
        future = $( "#future" ).val();


        //time = parseInt($( "#time" ).val());
        //threshold = parseInt($( "#velocity" ).val());
        //duration = parseInt($( "#duration" ).val());
        // Loop pixel row
        
        // set rbg color from pixel valuse 
        color_in = pix_row[c]+','+pix_row[c+1]+','+pix_row[c+2]+',0.8';

        var pix_row_zoom = pix_row_zoom.sort();  
        var sum_sum = 0; 

        for (j = 0; j < canvasHeight; j = j + 1) {
            if (playing_sound == 'sixth_tune') {
                if (c % sampel_rate == 0 && c < 4012) {
                    // count change between this row and the future

                    var r_change = pix_row[c] - pix_future[c];
                    var g_change = pix_row[c+1] - pix_future[c+1];
                    var b_change = pix_row[c+2] - pix_future[c+2];
                    // console.log(c, r_change, g_change, b_change)

                    color_in = pix_row[c]+','+pix_row[c+1]+','+pix_row[c+2]+',1';
                    var the_final_note = Tonal.freq.note(Math.floor(Math.abs(r_change*10)-down_scaling)); 
                    if (red_note_collation.indexOf(the_final_note) == -1) { 
                      if (r_change > 1 && r_change != NaN) {
                          
                        red_note_collation.push(the_final_note); 
                        console.log("Red",the_final_note)
                        ctx.fillText("+R"+the_final_note , j , sum);
                      }
                    }
                    var the_final_note = Tonal.freq.note(Math.floor(Math.abs(g_change*10)-down_scaling));   
                        
                    if (green_note_collation.indexOf(the_final_note) == -1) { 
                      if (g_change > 1 && r_change != NaN) {
                        green_note_collation.push(the_final_note); 
                      //  console.log("Green",the_final_note)
                        ctx.fillText("+G"+the_final_note , j , sum);
                      }
                    }
                    var the_final_note = Tonal.freq.note(Math.floor(Math.abs(g_change*10)-down_scaling));  
                        
                    if (bleu_note_collation.indexOf(the_final_note) == -1) { 
                      if (b_change > 1 && r_change != NaN) {
                        bleu_note_collation.push(the_final_note); 
                       // console.log("Blau", the_final_note)
                        ctx.fillText("+B"+the_final_note , j , sum);
                      }
                    }
                }
                if (q % released == 0) { 
                    
                        red2_partsy = red_note_collation;  
                    
                        green2_parts = green_note_collation ;  
                    
                        bleu2_parts = bleu_note_collation;   
                    
                    
                    if (red_note_collation.length > 10) {
                        red_note_collation = []; 
                    }
                    if (green_note_collation.length > 10) {
                        green_note_collation = [];
                    }
                    if (bleu_note_collation.length > 10) {
                        bleu_note_collation = [];
                    }
                }

                ctx.beginPath();
                ctx.moveTo(j, canvasWidth);
                color_in = pix_row[c]+','+pix_row[c+1]+','+pix_row[c+2]+',1';
                ctx.strokeStyle ='rgba('+color_in+')';
                
                ctx.lineTo(j, 0);
                ctx.closePath(); 
                ctx.stroke();

                c = c + 4;
                q = q + 1; 
                
                
            
        } // end of sixth_tune
            if (playing_sound == 'fifth_tune') {
             // console.log("1---")
                if (c % sampel_rate == 0 && c < 4012) {
                    // count change between this row and the future

                    var r_change = pix_row[c] - pix_future[c];
                    var g_change = pix_row[c+1] - pix_future[c+1];
                    var b_change = pix_row[c+2] - pix_future[c+2];
                    //console.log("2---", c, pix_row[c], the_final_note, r_change, g_change, b_change)
                    color_in = pix_row[c]+','+pix_row[c+1]+','+pix_row[c+2]+',1';
                    //console.log("intor")
                    if (r_change > 1) {

                        the_final_note = getScaledNoteFromNumber(r_change, note_div, down_scaling)  
                            
                        if (red_note_collation.indexOf(the_final_note) == -1 && r_change != NaN) { 
                            red_note_collation.push(the_final_note); 

                            //console.log("Red", the_final_note)
                            ctx.fillText("+R"+the_final_note , j , sum);
                        }
                         the_final_note = getScaledNoteFromNumber(g_change, note_div, down_scaling)  
                           
                        if (green_note_collation.indexOf(the_final_note) == -1 && g_change != NaN) { 
                            green_note_collation.push(the_final_note); 
                            //console.log("Green", the_final_note)
                            ctx.fillText("+G"+the_final_note , j , sum);
                        }
                         the_final_note = getScaledNoteFromNumber(b_change, note_div, down_scaling)  
                           
                        if (bleu_note_collation.indexOf(the_final_note) == -1 && b_change != NaN) { 
                            bleu_note_collation.push(the_final_note); 
                            // console.log("Blau", the_final_note)
                            ctx.fillText("+B"+the_final_note , j , sum);
                        }
                    }
                  }
                  if (q % released == 0) { 
                      // console.log(red_note_collation)
                      
                      for (y = 0; y < red_note_collation.length; y = y + 1){
                          red_parts.at(y, red_note_collation);  
                      }
                      
                      for (y = 0; y < green_note_collation.length; y = y + 1){
                          green_parts.at(y, green_note_collation);  
                      }
                      for (y = 0; y < bleu_note_collation.length; y = y + 1){
                          bleu_parts.at(y, bleu_note_collation);  
                      }
                      
                      if (red_note_collation.length > 10) {
                          red_note_collation = []; 
                      }
                      if (green_note_collation.length > 10) {
                          green_note_collation = [];
                      }
                      if (bleu_note_collation.length > 10) {
                          bleu_note_collation = [];
                      }
                  }

                ctx.beginPath();
                ctx.moveTo(j, canvasWidth);
                color_in = pix_row[c]+','+pix_row[c+1]+','+pix_row[c+2]+',1';
                ctx.strokeStyle ='rgba('+color_in+')';
                
                ctx.lineTo(j, 0);
                ctx.closePath(); 
                ctx.stroke();

                c = c + 4;
                q = q + 1; 
                
                
            
        } // end of fifth_tune
        

            if (playing_sound == 'fourth_tune') {

                // lets try piano mapping , mapp note from a scale and only chose from them.
             
                // set the speed 
                // var sum = Math.floor(pix_row[c] + pix_row[c+1] + pix_row[c+2]); 
                // if (sum > 10) Tone.Transport.bpm.value = sum/4;
              
                if (c % sampel_rate == 0) {
                    var sum = Math.floor(pix_row[c] + pix_row[c+1] + pix_row[c+2]); 
                    // console.log(sum)

                    // count change between this row and the future
                    var r_change = pix_row[c] - pix_future[c];
                    var g_change = pix_row[c+1] - pix_future[c+1];
                    var b_change = pix_row[c+2] - pix_future[c+2];
                    var total_change = r_change + b_change + b_change; 
                    d_total_change = Math.abs(total_change); 
                   

                    color_in = pix_row[c]+','+pix_row[c+1]+','+pix_row[c+2]+',1';
                    
                    
                    //var the_final_note = getScaledNoteFromNumber(total_change, 57) 
                   // console.log(sum/7, threshold)
                
                       
                           if (sum < 350) {
                            // piano_parts.remove(0);
                            if (dark_note_collation.indexOf(the_final_note) == -1) { 
                                var the_final_note = getScaledNoteFromNumber(sum, note_div, down_scaling)  
                                dark_note_collation.push(the_final_note); 
                                console.log("Dark ",the_final_note)
                                ctx.fillText("+D"+the_final_note , j , sum);
                            }
                            
                            } else {
                         
                       
                          if (bright_note_collation.indexOf(the_final_note) == -1) {
                              var the_final_note = getScaledNoteFromNumber(sum, note_div, down_scaling) 
                              bright_note_collation.push(the_final_note);

                              console.log("Brig ",the_final_note)
                              ctx.fillText("+B"+the_final_note , j , sum);
                          
                            
                        }
                    }
                    
                 
                     
                   
                    
                  }
                  if (q % released == 0) { 
                      console.log("Brig ", bright_note_collation, dark_note_collation)
                      for (y = 0; y < dark_note_collation.length; y = y + 1){
                          piano_parts.at(y, dark_note_collation[y]); 
                          chello_parts.at(y, bright_note_collation[y]);
                      }
                       
                      q = 0; 
                      if (dark_note_collation.length > 6) {
                          threshold = threshold - 1; 
                      }
                      if (dark_note_collation.length < 1) {
                          threshold = threshold + 1; 
                      }

                      if (dark_note_collation.length > 10) {
                          dark_note_collation = []; 
                      }
                      if (bright_note_collation.length > 10) {
                          bright_note_collation = [];
                      }
                  }

                if (soundsys == true) {
                    ctx.beginPath();
                    ctx.moveTo(j, canvasWidth);
                    ctx.lineTo(j+128, canvasWidth);
                    ctx.lineTo(j+128, total_change+200);
                    ctx.lineTo(j, total_change+200);
                    ctx.lineTo(j, canvasWidth);
                    ctx.fillStyle ='rgba('+color_in+')';
                    ctx.fill();
                    ctx.fillText("+"+sum , j , sum);
                } else {
               
                }
            
                ctx.beginPath();
                ctx.moveTo(j, canvasWidth);
                color_in = pix_row[c]+','+pix_row[c+1]+','+pix_row[c+2]+',1';
                ctx.strokeStyle ='rgba('+color_in+')';
                
                ctx.lineTo(j, 0);
                ctx.closePath(); 
                ctx.stroke();

                c = c + 4;
                q = q + 1; 
                
                
            
        } // end of fourth_tune
        

        if (playing_sound == 'third_tune') {
            
            ctx.beginPath();
            ctx.moveTo(j, canvasWidth);
            color_in = pix_row[c]+','+pix_row[c+1]+','+pix_row[c+2]+',1';
            ctx.strokeStyle ='rgba('+color_in+')';
            var sum = Math.floor(pix_row[c] + pix_row[c+1] + pix_row[c+2]); 

            ctx.lineTo(j, 0);
            ctx.closePath(); 
            ctx.stroke();
            

            if (c % 512 == 0) {
                var r = pix_sort[c];
                var g = pix_sort[c+1]
                var b = pix_sort[c+2]

                var avg = Math.floor((r+g+b)/3);
                var colorSum = colorSum +  avg;

                var brightness = Math.floor(colorSum / j);

            }          
            
            var p_sum = Math.floor(pix_row[c] + pix_row[c+1] + pix_row[c+2]); 
            // the_speed = 200
            //var sum = Math.floor(pix_sort[b] + pix_sort[b+1] + pix_sort[b+2]); 
           // Tone.Transport.bpm.value = p_sum; 
            if (sum < 1023) {
            
                
                if (c % 512 == 0 && sum != 0) {
                    
                    sum = p_sum + sum;
                    if (sum > 1000) {
                        sum = 100; 
                    }

                    //pianoSynth.triggerAttack("F1");
                    var d_octave = sum / 160
                    var octave = Math.floor(d_octave-1)
                    if (octave > 0) {
                        // if oct > 4 light else drak
                        var the_note = d_octave % 1;
                        the_note = Math.floor(the_note  * 10); 

                        var the_final_note = notes_map[the_note]+octave; 
                        // devide the octaves into two diffrent instruments
                        if (octave < 4){
                            dark_note_collation.push(the_final_note);

                        } else {
                            bright_note_collation.push(the_final_note);
                        }
                       
                        note_collation.push(the_final_note);
                        ctx.fillText("+"+the_final_note , j , sum);
                        //pianoSynth.triggerAttack(the_final_note); 
                        
                    }
                }

                 if (dark_note_collation.length == 4 && sum != 0) {
                   //console.log(bright_note_collation, dark_note_collation, note_collation);
                    if (one_the_beat == true) {
                      var steel_parts = new Tone.Sequence(function(time, note){
                          steelsynth.triggerAttackRelease(note, "1n", time)
                          // console.log(note)
                        
                      }, dark_note_collation, "4n").start(0);
                 
                      var sweet_parts = new Tone.Sequence(function(time, note){
                          sweetsynth.triggerAttackRelease(note, "1n", time)
                          // console.log(note)
                      }, bright_note_collation, "4n").start(0);
                    } else {
                        sweetsynth.triggerAttack();
                        steelsynth.triggerAttack(); 
                    }
                 
                   // setTimeout(function(){ synth.triggerRelease(note_collation) }, 100);
                   bright_note_collation = [];
                   dark_note_collation = []; 
                   //note_collation = []; 
                 }
                
                             
              }

             if (c % 256 == 0 && sum != 0) {
                    //kick.triggerAttack(the_final_note);
                  } 
              if (c % 256  && oscillator == true && sum != 0) {
                         osc.frequency.value = octave* 10;
                          
                          
        
                  } 
             c = c + 4;
             b = b + 64; 

          }      


        

        if (playing == 'histogram' || playing_sound == 'histogram')  {
            ctx.beginPath();
            ctx.moveTo(j, canvasWidth);
            color_in = pix_row[c]+','+pix_row[c+1]+','+pix_row[c+2]+',1';
            ctx.strokeStyle ='rgba('+color_in+')';
            var sum = Math.floor(pix_row[c] + pix_row[c+1] + pix_row[c+2]); 

            ctx.lineTo(j, Math.floor(sum));
            ctx.closePath(); 
            ctx.stroke();
            if (c < 4) {

                old_diff = diff / 100; 
                //var sum = Math.floor(pix_row[c] + pix_row[c+1] + pix_row[c+2]); 

                diff = old_diff + pix_row[c]/ old_diff; 
                //console.log((pix_row[c]/pix_row[c+1])*100)
               
                b = b + 1 
                
                if (b == 1) {
                    //osc.frequency.value =Math.floor((pix_row[c]/pix_row[c+1])*100);
                    var d_octave = (pix_row[c]/pix_row[c+1])*100 / 32
                    octave = Math.floor(d_octave)
                    if (octave == 0) {
                        octave = 1; 
                    }
              
        
                    var the_note = d_octave % 1;
                    the_note = Math.floor(the_note  * 10); 

                    // make the final note
                    var the_final_note_1 = notes_map[the_note]+octave; 
                    console.log(the_final_note_1)
                    pianoSynth.triggerAttack(the_final_note_1);
                    setTimeout(function(){ pianoSynth.triggerRelease(the_final_note_1) }, 1000);

                } else if ( b == 2 ) {
                    //osc.frequency.value =Math.floor((pix_row[c+1]/pix_row[c+2])*100);
                    var d_octave = (pix_row[c+2]/pix_row[c+1])*100 / 16
                    octave = Math.floor(d_octave)
                    if (octave == 0) {
                        octave = 1; 
                    }
              
        
                  var the_note = d_octave % 1;
                  the_note = Math.floor(the_note  * 10); 

                  // make the final note
                   var the_final_note_2 = notes_map[the_note]+octave; 
                   
                   pianoSynth.triggerAttack(the_final_note_2);
                   setTimeout(function(){ pianoSynth.triggerRelease(the_final_note_2) }, 1000);
                } else {
                  var d_octave = (pix_row[c+2]/pix_row[c])*100 / 8
                    octave = Math.floor(d_octave)
                    if (octave == 0) {
                        octave = 1; 
                    }
              
        
                  var the_note = d_octave % 1;
                  the_note = Math.floor(the_note  * 10); 

                  // make the final note
                   var the_final_note_3 = notes_map[the_note]+octave; 
                   
                   pianoSynth.triggerAttack(the_final_note_3);
                   setTimeout(function(){ pianoSynth.triggerRelease(the_final_note_3) }, 1000);
                    // osc.frequency.value =Math.floor((pix_row[c+2]/pix_row[c])*100);
                    b = 1; 
                }
                if (soundplay % 64 == 0) {
                    var f_r_octave = pix_row[c] / 32
                    var f_g_octave = pix_row[c+1] / 32
                    var f_b_octave = pix_row[c+2] / 32
                    
                    r_octave = Math.floor(f_r_octave)
                    g_octave = Math.floor(f_g_octave)
                    b_octave = Math.floor(f_b_octave)
                    if (r_octave == 0) r_octave = 1; 
                    if (g_octave == 0) g_octave = 1; 
                    if (b_octave == 0) b_octave = 1;   
                  
            
                    var r_the_note = f_r_octave % 1;
                    r_the_note = Math.floor(r_the_note  * 10); 
                    var g_the_note = f_g_octave % 1;
                    g_the_note = Math.floor(g_the_note  * 10); 

                    var b_the_note = f_b_octave % 1;
                    b_the_note = Math.floor(b_the_note  * 10); 
                    
                    // make the final note
                    var the_final_note_r = notes_map[r_the_note]+r_octave;
                    var the_final_note_g = notes_map[g_the_note]+g_octave; 
                    var the_final_note_b = notes_map[b_the_note]+b_octave;
                    var all_notes = [the_final_note_b , the_final_note_g ,the_final_note_r ]; 
                    //console.log(all_notes)

                    for (g=0; g < all_notes.length; g++) {
                      squaresynth.triggerAttack(all_notes[g]);
                      //console.log(all_notes[g])
                      
                    }
                    setTimeout(function(){ squaresynth.triggerRelease(); }, 1600);

                } 

            }
            
            soundplay = soundplay + 1; 

            c = c + 4
            

            if (soundplay % 512 == 0) {
                if (kicks_2[drum_index] == "#") {
                        kick.triggerAttack();
                    } 

                if (snares_2[drum_index] == "x") {
                    snare.triggerAttack();
                    //console.log("snare", drum_index)
                }
                if (hats_2[drum_index] == "o") {
                    hats.triggerAttack();
                    //console.log("hihat", drum_index)
                }
                drum_index++; 
                if (drum_index == 31) {
                    drum_index = 0; 
                }
                  
            }

           
          
          
            if (c % 2000 == 0) {
                var now = Tone.context.currentTime;
                //console.log("this is ", now);
                var rand  = Math.random() * 2 ; 
                if (sum) {
                    var some = Math.floor(sum/100); 
                    oct = Math.floor(sum/40); 
                

                    // conga.triggerAttackRelease("C"+oct, 0.003, 0, 0.9);
                    // bell.frequency.setValueAtTime(300, 1, 0.5);
                    // bell.triggerAttack(1);
                   // synth.triggerAttackRelease("C"+oct, 0.003, 0, 0.9);
                }
                if (playing == 'histosgram') {
                    // osc.frequency.value = sum * Math.exp(.057762265 * (440 - 69.)); 
                    oct = Math.floor(sum/40); 
                    //console.log(oct)
                    for(var i = 0; i < 10; i++) {
                        synth.triggerAttackRelease(notes_map[i]+oct, 0.003, 0, 0.9);
                    }
                    for(var i = 6; i > 10; i--) {
                        synth.triggerAttackRelease(notes_map[i]+oct, 0.003, 0, 0.9);
                    }
                }
            }                 
        } // end of histogram

        if (playing_sound == 'first_tune'){
          // change 64 128 265
          ctx.beginPath();
          //color_in = brightness+','+brightness+','+brightness+',1';
          color_in = pix_row[c]+','+pix_row[c+1]+','+pix_row[c+2]+',1';
          ctx.moveTo(j, 0);
          ctx.lineTo(j+256, 0);
          ctx.lineTo(j+256, canvasWidth);
          ctx.lineTo(j, canvasWidth);
          ctx.lineTo(j, 0);
          ctx.fillStyle ='rgba('+color_in+')';
          ctx.fill();
          if (c % 32 == 0) {
            
              var brightness_1 = (0.2126*pix_row[c] + 0.7152*pix_row[c+1] + 0.0722*pix_row[c+2]) 
              var brightness = (pix_row[c] + pix_row[c+1] + pix_row[c+2]);
              var brightness = brightness +brightness;              
              var test_r = pix_row[c] / pix_row[c] + pix_row[c+1] +pix_row[c+2];
              var test_g = pix_row[c+1] / pix_row[c] + pix_row[c+1] +pix_row[c+2];
              var test_b = pix_row[c+2] / pix_row[c] + pix_row[c+1] +pix_row[c+2];
              var test_rgb = Math.floor(test_r + test_g + test_b);             
              var contrast = pix_row[c] - pix_row[c+2]; 
              var test_r = pix_row[c]*2 - (pix_row[c+1] + pix_row[c+2]);
              var test_g = pix_row[c+1]*2 - (pix_row[c] +pix_row[c+2]);
              var test_b = pix_row[c+2]*2 - (pix_row[c] + pix_row[c+1]);
              // console.log(test_r, test_g, test_b); 
              if (contrast > 0) {
                  color_contrast = color_contrast + contrast;
                  collect = collect + 1;
              }

              var brightness = Math.floor((pix_row[c]  + pix_row[c+1]  +  pix_row[c + 2]) / 3 || 100);
              the_speed = brightness*2; 
              
              // var brightness = pix_row[c]; 
              var harm = pix_row[c] * (255 / 12); // 20 -> 5000
              var octaves =  Math.floor(pix_row[c+1] / 26) // 0 - 255 -> 1 - 9
              var length = (pix_row[c+2] + 1) / 255; // 0.01 - 1
              var freq = harm + octaves / 32; 
              
              // make 8 an octave number from j, d_octave is used to make the note within the octave 
              // higher number less octaves 
              var d_octave = j / 160
              octave = Math.floor(d_octave)
              if (octave == 0) {
                octave = 1; 
              }
              
              // only play note it the brightness is lower then the set threshold
              if (brightness/2 < threshold) {


                  drum_list.push(j);
                  
                  // get the note with in the octave from the decimals 
                  var the_note = d_octave % 1;
                  the_note = Math.floor(the_note  * 10 ); 

                  // make the final note
                  var the_final_note = notes_map[the_note]+octave; 

                  // use random to spread the notes a lite bit 
                  var rand  = Math.random() * 1 + 0.002; 
                  //console.log(rand)
                  //console.log(j/1000)
                  if (!rand) {
                    rand = 0.009; 
                  }
                  // trigger a note  ... (note, durration, time, velocity)
                  if (collect_tones == true) { 
                      if (note_collation.indexOf(the_final_note) == -1) {
                          note_collation.push(the_final_note); 
                      }
                   
                  } else {
                      if (note_collation.indexOf(the_final_note) == -1) {
                          synth.triggerAttackRelease(the_final_note, undefined, rand, 0.9); // j/200
                      }
                  }
                      
                  
                  // logging
                  // synth.triggerAttackRelease(the_final_note, 0.27403818749999975, 0, 0.8818897637795275);
                  // console.log("-----", the_final_note, the_note, octave); 
                  if (j < canvasWidth/2-100) {
                      ctx.fillText("+" , j , 400-d_octave*60);
                  } else {
                      ctx.fillText("+" , j , 200+d_octave*60);
                  }
                  } else {
                      // rise the bar or the threshold if not notes are playing
                      anti_threshold = anti_threshold + 1;
                      if (anti_threshold > 30000) {
                          threshold = threshold + 1; 
                          anti_threshold = 0;  
                      } 
                  }
                  if (soundsys == true) {
                      ctx.beginPath();
                      //color_in = brightness+','+brightness+','+brightness+',1';
                      color_in = pix_row[c]+','+pix_row[c+1]+','+pix_row[c+2]+',1';
                      ctx.moveTo(j, 0);
                      ctx.lineTo(j+256, 0);
                      ctx.lineTo(j+256, canvasWidth);
                      ctx.lineTo(j, canvasWidth);
                      ctx.lineTo(j, 0);
                      ctx.fillStyle ='rgba('+color_in+')';
                      ctx.fill();
                  }
              }

           

              // console.log(color_in, collect, pix_row[1])
              //if (pix_row[1] > 60) {
                  // collect = collect + 1; 
              //}

              
              var z = c % 5000;
              soundplay = soundplay + 1; 
              if (soundplay % 512 == 0) {
                // drums
                  if (drums == true) { 
                      if (drum_list.length > 1) {
                      // console.log("-----", drum_list); 
              
                        
                          for (a=0; a < drum_list.length; a++) {
                             if (c_paning == true) {
                                c++
                             }                        
                             if (drum_index % 4 == 1) {
                                kick.triggerAttack(note_collation[drum_list.length-1]);
                                // console.log("H", drum_list[a]/600)
                               
                             }
                             if (drum_index % 4 == 0) {
                                kick.triggerAttack(note_collation[drum_list.length]);
                                // console.log("S", drum_list[a]/600)
                             }
                             if (drum_index % 8 == 4) {
                                // kick.triggerAttack(note_collation[drum_list.length-2]);
                             }

                              
                             drum_index = drum_index + 1; 
                             if (drum_index > 32)  {
                                drum_index = 0; 
                             }
                            }
                        }
                    }
                    var parts = [1, 0.2]
                    for (x=0; x < drum_list.length; x++) {
                        parts.push(drum_list[x]/160); 
                    }
                    drum_list = [];

                  }
              
              //console.log(note_collation, rand)

              if (soundplay % 4096/6 == 0) {
                
                  if (drum_index == 16) {
                     // piano.triggerAttack(note_collation, 1);
                  }

                  // console.log(note_collation)
                  // https://www.audiotool.com/app
                  // var scale = Tonal.scale('C oriental')
                  // var harm = Tonal.harmonize(note_collation, 'C')

                  // console.log(harm)
                  // ctx.fillText(anti_threshold  + "rgb test: "+row , 400, 400);
                  var one = "two"; 
                  if (one == "two") {
                      if (note_collation.length > 7) {
                           for (i=note_collation.length+1; i > 2; i = i - 1) {
                              if (i < 6) {
                                  hsynth.triggerAttack(note_collation[piano_map[i]]);
                              } else {
                                  hsynth.triggerAttack(note_collation[i], 1);
                              }
                          } 
                      } else if (note_collation.length > 1) {
                          for (i=note_collation.length+1; i > 2; i = i - 1) {
                              //for (i=0; i < note_collation.length; i= i + 1) {
                              // or pianoSynth, synth, steelsynth
                              // more file:///Users/pato/node/Presets/index.html
                              // this_note = Tonal.transpose(note_collation[i], note_collation[i+1])
                              // console.log(this_note)
                              hsynth.triggerAttack(note_collation[i], 1);

                          } 
                      } else {
                          synth.triggerAttackRelease("C3", undefined, 2, 1);
                      }
                  } else {
                      synth.triggerAttackRelease(note_collation, undefined, 2, 1);
                      console.log(note_collation, threshold)
                      
                      // synth.triggerRelease(note_collation);
                  }  
                  console.log(note_collation, threshold)
                  if (note_collation.length > 20) {
                      threshold = threshold - 1; 
                  }
                  if (note_collation.length < 6) {
                      threshold = threshold + 1; 
                  }
                  // console.log(brightness/2, " < ",  threshold, note_collation.length, note_collation, )
                  
                  note_collation = []; 
                  
                  // console.log("----------")
                  
                  collect = 0; 
                  color_contrast = 0;
                  // console.log(brightness)
                  if (oscillator == true) {
                      // console.log(brightness)
                      
                          // osc.frequency.rampTo(brightness/1.7, 1)
                          osc.frequency.value = brightness/5
                          
                          osc.partials = parts;
                          console.log(parts); 
        
                  } 
                  brightness = 0; 
              } 
              c = c + 4; 
        } // end of music one 
      if (playing_sound == 'second_tune'){
           ctx.beginPath();
              //color_in = brightness+','+brightness+','+brightness+',1';
              color_in = pix_row[c]+','+pix_row[c+1]+','+pix_row[c+2]+',1';
              ctx.moveTo(j, 0);
              ctx.lineTo(j+256, 0);
              ctx.lineTo(j+256, canvasWidth);
              ctx.lineTo(j, canvasWidth);
              ctx.lineTo(j, 0);
              ctx.fillStyle ='rgba('+color_in+')';
              ctx.fill();  
           // change 64 128 265 
          if (c % 16 == 0) {
            if (j < 414) {
              brightness = Math.floor((pix_row[c]  + pix_row[c+1]  +  pix_row[c + 2]) / 3) || 100;
         
              // make 8 an octave number from j, d_octave is used to make the note within the octave 
              // higher number less octaves 
              var d_octave = j / 260
              octave = Math.floor(d_octave+1)
                 
              // get the note with in the octave from the decimals 
              the_note = Math.floor(d_octave * 10+1); 
        
              // make the final note
              // console.log(notes_map[the_note]+octave, j)
              var the_final_note = notes_map[the_note]+octave || "F1"; 
              //console.log(brightness/2, threshold+50)
              // only play note it the brightness is lower then the set threshold 
              if (brightness/2 > threshold+40) {
                  ctx.fillText("#" , j , 200);
                  
                  if (bright_note_collation.indexOf(the_final_note) == -1) {
                      //console.log(the_final_note)
                      bright_note_collation.push(the_final_note); 
                      //console.log(bright_note_collation)
                  }     
              }
              
              // only play note it the brightness is lower then the set threshold
              if (brightness/2 < threshold) {
                  ctx.fillText("+" , j , 200);

                  // trigger a note  ... (note, durration, time, velocity)
                  if (dark_note_collation.indexOf(the_final_note) == -1) {

                      dark_note_collation.push(the_final_note); 
                  }   
              } 

             }
             
          
              }

              soundplay = soundplay + 1; 

              // console.log(bright_note_collation)
              //console.log(note_collation, rand)
              if (soundplay % 4096 == 0) {
                 synth.triggerAttackRelease("C3", undefined, ["1n"], 0.9);
                 var one = 'one'

                 // synth.triggerAttackRelease("C3", undefined, ["1n"], 0.9);
                 var now = Tone.context.currentTime;
                 if (one == 'one'){
                  if (dark_note_collation.length > 1) {
                   
                       for (i=0; i < dark_note_collation.length; i = i + 1) {
                          var now = Tone.context.currentTime;
                          console.log(now, now+i)
                          synth.triggerAttack(dark_note_collation[i]);
                          console.log(dark_note_collation[i])
                        
                            
                        }  
                  } 
                  if (bright_note_collation.length == 1) {
                    var now = Tone.context.currentTime;
                      for (i=0; i < bright_note_collation.length; i = i + 1) {
                      
                              fmsynth.triggerAttack(bright_note_collation[i]);
                       
                            
                      }  
                  } 
                }
                // console.log(bright_note_collation, "---",  dark_note_collation)
                if (bright_note_collation.length == 0) {
                    synth.triggerAttack(dark_note_collation, 1);// , undefined, ["1n"], 0.9);
                } else {
                    synth.triggerAttack(bright_note_collation, 1); 
                }
                if (dark_note_collation.length == 0) {
                    synth.triggerAttack(bright_note_collation, 1);  // , undefined, ["1n"], 0.9);
                } else {
                   synth.triggerAttack(dark_note_collation, 1);
                }

                  if (dark_note_collation.length > 6) {
                      threshold = threshold - 3; 
                  }
                  if (dark_note_collation.length < 2) {
                      threshold = threshold + 2; 
                  }
                  
                  dark_note_collation = []; 
                  bright_note_collation = []; 
                  
                  // console.log("----------")
                  
                  if (oscillator == true) {
                      // console.log(brightness)
                      osc.frequency.value = Math.floor(brightness/4); 
                      
                  } 
                  brightness = 0; 
                      
                  
              } 
              if (c % 2048 == 0) {
                       
                      
                        if (drum_index % 8 == 0) {
                            multiplayer.start("Kick", undefined);
                            //console.log("kick", drum_index); 
                          
                          
                        } 

                        if (drum_index % 12  == 0) {
                            multiplayer.start("Snare", undefined);
                            //osc.mute = true;
                            //console.log("snare", drum_index)
                        }
                        if (drum_index % 16  == 0) {
                          // osc.mute = true;
                            multiplayer.start("Hat", undefined);
                            //console.log("hihat", drum_index)
                        }
                        drum_index++; 
                        if (drum_index == 31) {
                            drum_index = 0; 
                        }
                        //console.log("_ _", drum_index)
                        
                        base_index = base_index + 1; 
                        if (base_index > notes.length-1) {
                          base_index = 0; 
                        }

                    }
            
        c = c + 4
             
        } // end of music two 
        if (playing == 'buttomup'){
              ctx.beginPath();
              //color_in = brightness+','+brightness+','+brightness+',1';
              color_in = pix_row[c]+','+pix_row[c+1]+','+pix_row[c+2]+',1';
              ctx.moveTo(j, 0);
              
              ctx.lineTo(j, canvasWidth);
              
              ctx.strokeStyle ='rgba('+color_in+')';
              ctx.stroke();
              c = c + 4;
              b = b + 2; 
        }

        if (playing == 'inters'){
            ctx.beginPath();
            color_in = pix_row_zoom[c]+','+pix_row_zoom[c+1]+','+pix_row_zoom[c+2]+',0.3';
            ctx.moveTo(0,j);
            ctx.lineTo(canvasWidth, j);
            ctx.strokeStyle ='rgba('+color_in+')';
            ctx.stroke();
            c = c + 4;
            b = b + 2; 
        }

        if (playing == 'hist')  {
            ctx.beginPath();
            ctx.moveTo(j, 1000+move);
            color_in = pix_row[c]+','+pix_row[c+1]+','+pix_row[c+2]+',1';
            ctx.strokeStyle ='rgba('+color_in+')';
            var sum = Math.floor(pix_row[c] + pix_row[c+1] + pix_row[c+2]); 
            if (move < 10) {
                ctx.strokeStyle ='rgba(0,0,0,1)';
                ctx.lineTo(j, Math.floor(sum/1.3)-300+move );
            } else if (move < 1000){
                ctx.lineTo(j, Math.floor(sum/1.3)+30+move );
                
            } else {
                ctx.lineTo(550+move-Math.floor(sum/1.3),  600-j );
            }
            c = c + 4
            ctx.stroke();  
        }



      
        if (playing == 'similey')  {
            color_in = pix_row[c]+','+pix_row[c+1]+','+pix_row[c+2]+',1';
            var rand2 = Math.floor(Math.random() * 1000); 
            ctx.drawImage(similey,j,rand2);
        } 

        if (playing == 'text')  {
            color_in = pix_row[c]+','+pix_row[c+1]+','+pix_row[c+2]+',1';
            ctx.fillStyle = 'rgba('+color_in+')';
            var sum = Math.floor(pix_row[c] + pix_row[c+1] + pix_row[c+2]); 
            if (move > 800) {
                var rand2 = Math.floor(Math.random() * 100); 
                ctx.font = rand2+'pt Webdings'; 
                ctx.fillText("0", j-30, Math.floor(sum)-move+1000);
            } else { 
                ctx.fillText("wmwmwmwm", j-30, 600-Math.floor(sum)- move+1000); }
                c = c + 4;
                // o is good for wave . for city
                // console.log(move, sum, j, c)
            }            
        }
        if (playing == 'rsand'){
            ctx.beginPath();
            color_in = pix_row[c]+','+pix_row[c+1]+','+pix_row[c+2]+',0.3';
            var rand1 = Math.floor(Math.random() * canvasWidth); 
            var rand2 = Math.floor(Math.random() * canvasHeight); 
            ctx.moveTo(j, rand2);
            ctx.lineTo(j, rand1);
            ctx.strokeStyle ='rgba('+color_in+')';
            ctx.stroke();
            c = c + 4;
            b = b + 2; 
        }

      if (playing == 'rand'){   
          color_in = pix_row[c]+','+pix_row[c+1]+','+pix_row[c+2]+',0.1';
          var rand1 = Math.floor(Math.random() * canvasWidth); 
          var rand2 = Math.floor(Math.random() * canvasHeight); 
          var rand3 = Math.floor(Math.random() * canvasHeight); 
          var rand4 = Math.floor(Math.random() * canvasHeight); 
          ctx.beginPath();
          ctx.moveTo(j+canvasWidth/2, rand2);
          ctx.lineTo(rand4+canvasWidth/2, rand1);
          ctx.lineTo(j+canvasWidth/2, rand3);
          ctx.fillStyle ='rgba('+color_in+')';
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(j, rand2/2);
          ctx.lineTo(rand1,rand4);
          ctx.lineTo(j, rand3);
          ctx.fillStyle ='rgba('+color_in+')';
          ctx.fill();
          c = c + 4;
          b = b + 2; 
      }

        
      if (playing == 'rowom'){
          //ctx.translate(j, j); 
          //ctx.rotate(j * Math.PI / 180); 
          ctx.beginPath();
          ctx.rect(1000/2-j,1200/2-j,b,b);
          ctx.strokeStyle ='rgba('+color_in+')';
          ctx.stroke();
          c = c + 4;
          b = b + 2;        
      }

      if (playing == 'spiral'){
          if (j < 600) {
              ctx.beginPath();
              ctx.moveTo(canvasWidth/2, canvasHeight/2);
              color_in = pix_row_zoom[c]+','+pix_row_zoom[c+1]+','+pix_row_zoom[c+2]+',0.3';
              ctx.strokeStyle ='rgba('+color_in+')';
              ctx.lineWidth = 3;
              while( theta < 3) {
                 var newX = canvasWidth/2 + theta * Math.cos(theta+j*6) * 200 + j / 1000; //  gap; 
                 var newY = canvasHeight/2 + theta * Math.sin(theta+j*6) * 200 +  j / 1000;  //gap; 
                 ctx.lineTo(newX, newY);
                 theta = theta + increment + j / 10000;
              }
              theta = 0; 
              ctx.stroke(); // draw the spiral
              c = c + 4;
          } else {
              j = 1200; 
          }
      }

      if (playing == 'trix'){
              
          var x = 1000/2; 
          var y = 1000/2-b;
          var z = j;  
          ctx.beginPath();
          var color_in = pix_row_zoom[c]+','+pix_row_zoom[c+1]+','+pix_row_zoom[c+2]+',0.3';
          ctx.lineWidth = 3;
          ctx.moveTo(x, y); 
          ctx.lineTo(x+z, y+z); // 100, 150
          ctx.lineTo(x+z, y+z*2); // 100, 200
          ctx.lineTo(x, y+z*3); // 100, 200
          
          ctx.lineTo(x-z, y+z*2); // 50, 250
          ctx.lineTo(x-z, y+z); // 50, 250
          ctx.lineTo(x, y); 
          
          
          ctx.strokeStyle ='rgba('+color_in+')';
          ctx.stroke();
          c = c + 4;
          b = b + 2; 
      }

      if (playing == 'road') {
            ctx.beginPath();
            spacing = 2.5
            w = road_i+j;
            h = 4*w;
            x = canvasWidth*.50 - w/2;
            road_h = road_h + spacing * h; 

            ctx.rect(x, road_h, w, h);
            ctx.moveTo(x,road_h);
            ctx.lineTo(x+w,road_h);
            ctx.lineTo(x+w+1/spacing,road_h+h);
            ctx.lineTo(x-1/spacing,road_h+h);
            ctx.lineTo(x,y);
            ctx.closePath();
            ctx.fillStyle ='rgba('+color_in+')';
            ctx.fill(); 
            road_i++; 
            if (road_h > 1000) {
                road_h = 0;
            }

      }
      if (playing == 'arch'){
        var radius = j/6;
        var startAngle = 0 * Math.PI;
        var endAngle = 2 * Math.PI;
        var counterClockwise = false;
        ctx.beginPath();
        ctx.arc(258, 258, radius, startAngle, endAngle, counterClockwise);
         var color_in = pix_row_zoom[c]+','+pix_row_zoom[c+1]+','+pix_row_zoom[c+2]+',0.1';
         
          if (b < 200) {
              ctx.strokeStyle ='rgba(0,0,0,1)';
          } else {
              ctx.strokeStyle ='rgba('+color_in+')';
          }
          ctx.stroke();
          c = c + 12;
          b = b + 2;           
      }
      if (playing == 'wave'){

          if (j > 400 && j < 1100) {
              var rand = Math.floor(Math.random() * 10); 
              phase =  phase * Math.PI / 180;
              var amp = amplitude - thickness / 2;
              var freq = 2 * Math.PI * (1 / wavelength);
              var yOrigin = height / 2 + j - amplitude;
              var y1, y2;
              ctx.beginPath();
              ctx.strokeStyle ='rgba('+color_in+')';
              for ( var i = 0; i < width; i++) { 
                  y1 = amp * Math.sin(phase + freq * i) + yOrigin; 
                  y2 = amp * Math.sin(phase + freq * (i + 1)) + yOrigin; 
                  ctx.moveTo(i , y1); 
                  ctx.lineTo(i + 1, y2); 
              }
              ctx.stroke();
              c = c + 4;
          } else { 
              if (j > 1100) {
                  j = canvasHeight;
              }
              if (j < 600){
                  j = 501; 
              }  
          
          }
          
      }

      if (playing == 'six'){
          var rand = Math.floor(Math.random() * 300); 
          ctx.beginPath();
          ctx.moveTo(j, move); // 50, 100
          ctx.lineTo(j+rand, move+rand); // 100, 150
          ctx.lineTo(j-rand, move+rand); // 100, 200
          ctx.lineTo(j, move-rand); // 50, 250
          ctx.closePath();
          var color_in = pix_row[c]+','+pix_row[c+1]+','+pix_row[c+2]+',0.1';
          ctx.strokeStyle ='rgba('+color_in+')';
          ctx.stroke();
          c = c + 4;
          b = b + 2; 
      }

      if (playing == 'py'){
          var lastend = 0;
          ctx.beginPath();
          var color_in = pix_row_zoom[c]+','+pix_row_zoom[c+1]+','+pix_row_zoom[c+2]+',1';
          ctx.fillStyle ='rgba('+color_in+')';
          lastend = j * 0.0001 + b;
          thisend = lastend + (Math.PI * j * (j / 100000000)) 
          ctx.moveTo(canvas.width / 2 + lastend, 360 + thisend);
          // Arc Parameters: x, y, radius, startingAngle (radians), endingAngle (radians), antiClockwise (boolean)
          ctx.arc(canvas.width / 2, 360, canvas.height, lastend, thisend, false);
          // ctx.lineTo(canvas.width / 4, canvas.height / 4);
          ctx.fill();
          c = c + 4;
          b = b +  0.01
      }

     if (playing == 'tri'){
            
          var lol = 100; 
          ctx.beginPath();
          ctx.moveTo(400, 400); // 50, 100
          ctx.lineTo(j+lol, 800+lol); // 100, 150
          ctx.lineTo(j+lol, 800+lol*2); // 100, 200
          ctx.lineTo(j, 800+lol*3); // 100, 200
          
          ctx.lineTo(j-lol, 800+lol*2); // 50, 250
          ctx.lineTo(j-lol, 800+lol); // 50, 250
          ctx.lineTo(400, 400); // 50, 100
          ctx.closePath();
          var color_in = pix_row[c]+','+pix_row[c+1]+','+pix_row[c+2]+',0.1';
         
          ctx.strokeStyle ='rgba('+color_in+')';
          ctx.stroke();
                                ctx.beginPath();
          ctx.moveTo(400, 400); // 50, 100
          ctx.lineTo(j+lol, -200+lol); // 100, 150
          ctx.lineTo(j+lol, -200+lol*2); // 100, 200
          ctx.lineTo(j, -200+lol*3); // 100, 200
          
          ctx.lineTo(j-lol, -200+lol*2); // 50, 250
          ctx.lineTo(j-lol, -200+lol); // 50, 250
          ctx.lineTo(400, 400); // 50, 100
          ctx.closePath();
          var color_in = pix_row[c]+','+pix_row[c+1]+','+pix_row[c+2]+',0.1';
         
          ctx.strokeStyle ='rgba('+color_in+')';
          ctx.stroke();
          c = c + 4;
          b = b + 2; 
          
      }

      if (playing == 'inter'){
          var c = 0; 
          var b = 0; 
          for (j = 0; j < canvasHeight; j = j + 1) {
              ctx.beginPath();
              color_in = pix_row_zoom[c]+','+pix_row_zoom[c+1]+','+pix_row_zoom[c+2]+',0.3';
              ctx.moveTo(j, 0);
              var line_h = Math.floor(Math.random() * 1000);
              ctx.lineTo(j, line_h);              
              ctx.strokeStyle ='rgba('+color_in+')';              
              ctx.stroke();              
              c = c + 4;
              b = b + 2; 
          }
      }

      if (playing == 'midlines'){
          var c = 0; 
          var b = 0; 
          for (j = 0; j < canvasHeight; j = j + 1) {
              if (j > 600) {
                  ctx.beginPath();
                  color_in = pix_row_zoom[c]+','+pix_row_zoom[c+1]+','+pix_row_zoom[c+2]+',0.3';
                  ctx.moveTo(0,j);
                  ctx.lineTo(canvasWidth, j);
                  ctx.strokeStyle ='rgba('+color_in+')';
                  ctx.stroke();
                  c = c + 4;
                  b = b + 2; 
              } else {
                  j = 700; 
              }
          }
      }

      if (playing == 'inbetween'){
          var h = 1200
          for (j = 0; j < canvasHeight; j = j + 1) {

              if (j < canvasHeight/2 + 10) {
                  var color_in = pix_row[c]+','+pix_row[c+1]+','+pix_row[c+2]+',0.3';
                  
                  ctx.beginPath();
                  ctx.moveTo(0,j);
                  ctx.lineTo(canvasWidth, j);
                  ctx.strokeStyle ='rgba('+color_in+')';
                  ctx.stroke();
                  c = c + 8;
                  h = h - 1
                  ctx.beginPath();
                  ctx.moveTo(0,h);
                  ctx.lineTo(canvasWidth, h);
                  ctx.strokeStyle ='rgba('+color_in+')';
                  ctx.stroke();
              } else if (j < canvasHeight/2 - 10) {
                  ctx.beginPath();
                  ctx.moveTo(0,j);
                  ctx.lineTo(canvasWidth, j);
                  ctx.strokeStyle ='rgba(0,0,0,1)';
                  ctx.stroke();
                  c = c + 8;
                  h = h - 1
              } else {
                  j = canvasHeight
              }
          }
      }
      if (playing == 'inbetween2'){
          var w = 1200 
          for (j = 0; j < canvasHeight; j = j + 1) {
              if (j < canvasWidth/2 +10) {
                  var color_in = pix_row[c]+','+pix_row[c+1]+','+pix_row[c+2]+',0.3';
                  
                  ctx.beginPath();
                  ctx.moveTo(j,0);
                  ctx.lineTo(j, canvasHeight);
                  ctx.strokeStyle ='rgba('+color_in+')';
                  ctx.stroke();
                  c = c + 8;
                  w = w - 1
                  ctx.beginPath();
                  ctx.moveTo(w, 0);
                  ctx.lineTo(w, canvasHeight);
                  ctx.strokeStyle ='rgba('+color_in+')';
                  ctx.stroke();
              } else if (j < canvasWidth/2 -10) {
                  ctx.beginPath();
                  ctx.moveTo(0,j);
                  ctx.lineTo(canvasWidth, j);
                  ctx.strokeStyle ='rgba(0,0,0,1)';
                  ctx.stroke();
                  c = c + 8;
                  h = h - 1
              } else {
                  j = canvasHeight
              }
          }      
      }

      if (playing == 'midlines' ){
          var c = 0; 
          var b = 0; 
          for (j = 0; j < canvasHeight; j = j + 1) {
          
              ctx.beginPath();
              color_in = pix_row[c]+','+pix_row[c+1]+','+pix_row[c+2]+',0.3';
              ctx.moveTo(j,0);
              ctx.lineTo(j, canvasHeight-500);
              ctx.strokeStyle ='rgba('+color_in+')';
              ctx.stroke();
              c = c + 4;
              b = b + 2; 
          }
      }
      if (playing == 'drips'){
            
            for (k=0; k<20; k++) {
              var rand = Math.floor(Math.random() * 1200);
              random_s[k] = rand
            } 
            random_s = random_s.sort()
          
            for (j = 0; j < canvasHeight * 4; j = j + 4) {

                for (i = 0; i < canvasWidth * 4; i = i + 4) {
                var rand = Math.floor(Math.random() * 10000);

                var index = i + (j * imageData.width); 

                 var index2 = i + ((j+1) * imageData.width);
                
                    // check if alfa is 21 then set the color to the next rows color
                    if (newFrame.data[index+3] == 21) {
                        pix_row[i+0] = pix_row[i+7];
                        pix_row[i+1] = pix_row[i+8];
                        pix_row[i+2] = pix_row[i+9]; 
                        pix_row[i+3] = 0.1; 
                       // console.log("blank")
                    } else {
                      // if hit random set alfa to 21 
                      if (rand > 9980) {
                        pix_row[i+0] = pix_row[i+4];
                        pix_row[i+1] = pix_row[i+5];
                        pix_row[i+2] = pix_row[i+6];
                        pix_row[i+3] = 21;
                                  
                      } 
                      newFrame.data[index+0] = pix_row[i+0]  // r
                      newFrame.data[index+1] = pix_row[i+1] // g
                      newFrame.data[index+2] = pix_row[i+2] // b
                      newFrame.data[index+3] = pix_row[i+3] // a          
                      
                    }
                    
                            
                  }
                 

              }
            
            
            ctx.putImageData(newFrame, 0, 0);
            
          }
    row = row + 1;    
    if (row > imgHeight) { // imgHeight
      row = 0; 
      clearTimeout(timeOut); 
      nextImage();
    } else {
      var timeOut = setTimeout(function(){  rect(); }, the_speed);
    }
  }
  // play next frame
  var seed = function() {
    //$('body').scrollTop(0);
    var num = 0; 
    var upord = 'up'
    var pix_row = getPixelrow(pixelArray, row);
    var temp_row = row; 
    
    // pix_row = pix_row.sort(function(a, b, c, d){return c, b, a, d});
    
    for (j = 0; j < canvasHeight * 4; j = j + 4) {
      
      if (j < 25000) {
        for (i = 0; i < canvasWidth * 4; i = i + 4) {

            var index = i + (j * imageData.width); 
            newFrame.data[index+0] = pix_row[i] // r
            newFrame.data[index+1] = pix_row[i+1] // g
            newFrame.data[index+2] = pix_row[i+2] // b
            newFrame.data[index+3] = pix_row[i+3] // a          
            // setPixel(newData, x, y, r, g, b, 255); // 255 opaque
        }
      } else if (j < 2000 ) {

        temp_row = temp_row + 1; 
        pix_row2 = getPixelrow(pixelArray, temp_row);
         

         
        for (i = 0; i < canvasWidth * 4; i = i + 1) {
        
            var index = i + (j * imageData.width);
            
            newFrame.data[index+0] = pix_row2[i] // r
            newFrame.data[index+1] = pix_row2[i+1] // g
            newFrame.data[index+2] = pix_row2[i+2] // b
            newFrame.data[index+3] = pix_row2[i+3] // a          
            // setPixel(newData, x, y, r, g, b, 255); // 255 opaque
        }
      } else {

          pixelArray_temp = pixelArray;
          
          for (i = 0; i < canvasWidth * 4; i = i + 4) {
              var index = i + (j * imageData.width); 
              newFrame.data[index+0] = pix_row2[i] // r
              newFrame.data[index+1] = pix_row2[i+1] // g
              newFrame.data[index+2] = pix_row2[i+2] // b
              newFrame.data[index+3] = pix_row2[i+3] // a          
              // setPixel(newData, x, y, r, g, b, 255); // 255 opaque
        }
      }

    }
    row = row + 1; 
    ctx.putImageData(newFrame, 0, 0);
    
    if (saveimages == true) {
        if (row == 500) {
        var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  
        window.location.href=image;
        }
    }

    if (row > 100) { // imgHeight
        row = 0; 
        nextImage(); 
    } else {
        var timeOut = setTimeout(function(){ rect(); }, the_speed);
    }
  }

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