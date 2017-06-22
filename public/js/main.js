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
var playing = 'inbetween2'
var zoom = 0;
var move = 0;
var input_text = "index preface divisions thanks method question"
var text_index = 0; 
var random_s = []
var first_pass = true; 
var pixelArray = ''
var similey = ''
var zooming = 'base'
var wavelength= 100,
    amplitude= 10,
    phase= 90,
    width= 1200,
    thickness= 2;
var threshold = 30; 
var anti_threshold = 0; 
var drum_index = 1; 
var drums = true; 
var oscillator = false; 
duration = 0.8;
time = 0;
velocity = 0.2;
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
var b = 0; 
var soundplay = 0; 
var collect = 0; 
var synth = new Tone.FMSynth().toMaster(); 
var osc = new Tone.Oscillator(0).toMaster().start();
var synth = new Tone.PolySynth(3, Tone.Synth, {
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
  },
}).toMaster();
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

   var keys = new Tone.MultiPlayer({
            urls : {
                "K" : "audio/505/kick.mp3",
                "S" : "audio/505/snare.mp3",
                "P" : "audio/505/agogoHigh.mp3",
                "Z" : "audio/505/hh.mp3",
            },
            volume : 0.1,
            fadeOut : 0.1,
        }).toMaster();

    var bass = new Tone.MonoSynth({
            "volume" : -10,
            "envelope" : {
                "attack" : 0.1,
                "decay" : 0.3,
                "release" : 2,
            },
            "filterEnvelope" : {
                "attack" : 0.001,
                "decay" : 0.01,
                "sustain" : 0.5,
                "baseFrequency" : 200,
                "octaves" : 2.6
            }
        }).toMaster();

        var bassPart = new Tone.Sequence(function(time, note){
            bass.triggerAttackRelease(note, "16n", time);
        }, ["C2", ["C3", ["C3", "D2"]], "E2", ["D2", "A1"]]).start(0);


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
        osc.frequency.value = 440; 
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

        // get canvas height and width dynamically
        canvasWidth = $( "#canvasWidth" ).val();
        canvasHeight = $( "#canvasHeight" ).val();
      
        // transpose the color index, will change rgb_a colors
        c = c + parseInt($( "#c" ).val());
        time = parseInt($( "#time" ).val());
        threshold = parseInt($( "#velocity" ).val());
        duration = parseInt($( "#duration" ).val());
        // Loop pixel row 
        for (j = 0; j < canvasHeight; j = j + 1) {

        // set rbg color from pixel valuse 
        color_in = pix_row[c]+','+pix_row[c+1]+','+pix_row[c+2]+',0.8';

        if (playing == 'room'){
              var brightness_1 = (0.2126*pix_row[c] + 0.7152*pix_row[c+1] + 0.0722*pix_row[c+2]) 
              var brightness = (pix_row[c] + pix_row[c+1] + pix_row[c+2]) 

              var amp = brightness;

              
              var test_r = pix_row[c] / pix_row[c] + pix_row[c+1] +pix_row[c+2];
              var test_g = pix_row[c+1] / pix_row[c] + pix_row[c+1] +pix_row[c+2];
              var test_b = pix_row[c+2] / pix_row[c] + pix_row[c+1] +pix_row[c+2];
              var test_rgb = Math.floor(test_r + test_g + test_b);
              
              
             
              var contrast = pix_row[c] - pix_row[c+2]; 
              if (contrast > 0) {
                  color_contrast = color_contrast + contrast;
                  collect = collect + 1;
              }
              var brightness = (pix_row[c]  + pix_row[c+1]  +  pix_row[c + 2]) / 3;
              
              // var brightness = pix_row[c]; 
              var harm = pix_row[c] * (255 / 12); // 20 -> 5000
              var octaves =  Math.floor(pix_row[c+1] / 26) // 0 - 255 -> 1 - 9
              var length = (pix_row[c+2] + 1) / 255; // 0.01 - 1
              var freq = harm + octaves / 32; 
              
              // make 8 an octave number from j, d_octave is used to make the note within the octave 
              var d_octave = j / 120 
              octave = Math.floor(d_octave+1)
              
              // only play note it the brightness is lower then the set threshold
              if (brightness < threshold) {
                  
                  // get the note with in the octave from the decimals 
                  var the_note = d_octave % 1;
                  the_note = Math.floor(the_note  * 10 ); 

                  // make the final note
                  var the_final_note = notes_map[the_note]+octave; 

                  // use random to spread the notes a lite bit 
                  var rand  = Math.random() * 1 * 0.0001 + 0.001; 
                  
                  // trigger a note  ... (note, durration, time, velocity)
                  synth.triggerAttackRelease(the_final_note, rand, 0, 1);
                  
                  // logging
                  // synth.triggerAttackRelease(the_final_note, 0.27403818749999975, 0, 0.8818897637795275);
                  // console.log("-----", the_final_note, the_note, octave); 
                  // ctx.fillText(the_final_note , j , 200);
                  
              } else {
                  // rise the bar or the threshold if not notes are playing
                  anti_threshold = anti_threshold + 1;
                  if (anti_threshold > 30000) {
                    threshold = threshold + 1; 
                    anti_threshold = 0;  
              } 

 
              }

              ctx.beginPath();
              //color_in = brightness+','+brightness+','+brightness+',1';
              color_in = pix_row[c]+','+pix_row[c+1]+','+pix_row[c+2]+',1';
              ctx.moveTo(j, 0);
              ctx.lineTo(j, canvasWidth);
              ctx.strokeStyle ='rgba('+color_in+')';
              ctx.stroke();
              c = c + 4;
              b = b + 2; 

              // console.log(color_in, collect, pix_row[1])
              //if (pix_row[1] > 60) {
                  // collect = collect + 1; 
              //}

              
              var z = c % 5000;
              soundplay = soundplay + 1; 
              // drums
              if (drums == true) { 
                  if (soundplay == 2048 || soundplay == 1024) {
                      // keys.start("P", 0);
                      keys.start("Z", 0);

                      if (drum_index == 1) {
                          keys.start("K", 0);
                      }

                      if (drum_index == 3) {
                          keys.start("S", 0); 
                      }
                     
                      drum_index++; 

                      if (drum_index == 4) {
                        drum_index = 1; 
                      }
                      

                  }
              }
              if (oscillator == true) {
                  if (soundplay == 2048) {
                      // ctx.fillText(anti_threshold  + "rgb test: "+row , 400, 400);
                      // synth.triggerAttackRelease(notes[note_num].name, rand+0.5, 1, 1);
                      var temp_f = osc.frequency.value 
                      osc.frequency.value = brightness/440;
                      soundplay = 0; 
                      collect = 0; 
                      color_contrast = 0;
                  } 
              } else {
                 osc.frequency.value = brightness/10000;
              }
             
        } // end of music

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
        //ctx.moveTo(rectang/2+j,rectang/2);
        //ctx.lineTo(rectang/2-j,rectang/2+j);
        //ctx.lineTo(rectang/2+j,rectang/2);
        //ctx.stroke();
        
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
            // console.log(j)
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

              if (j < canvasHeight/2 - 50) {
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
              } else if (j < canvasHeight/2 + 50) {
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
    if (row > 900) { // imgHeight
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

    if (row > 900) { // imgHeight
      row = 0; 
      nextImage(); 
    } else {
      var timeOut = setTimeout(function(){ rect(); }, the_speed);
    }
  }

  var grayscalebtn = document.getElementById('grayscalebtn');
  grayscalebtn.addEventListener('click', rect);
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
    
   
}


function nextFrame() {
  iCurFrame++;
  if (iCurFrame == 50) {
    iCurFrame = 0;
  }
    clearInterval(iSmTimer);
    iSmTimer = setInterval(draw, 2000); // extra one timer
}