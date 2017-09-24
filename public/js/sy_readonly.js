
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
  doc: [], 
  colors: {
    row: 0, 
    red: 0,
    green: 0,
    bleu: 0,
    black:0, 
    white:0,
    yellow:0,
    cyan: 0,
    magenta: 0,
    light: 0,
    dark: 0,
    diff: [], 
  }, 
  color: {}, 
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
    sampel_rate: 64, 
    travel: 0, 
  }, 
  collections: {
    bright_note_collection: 0,
    dark_note_collection : 0,
    red_note_collection : 0,
    green_note_collection : 0,
    bleu_note_collection : 0,
    black_note_collection : 0,
    white_note_collection : 0,
    yellow_note_collection : 0,
    pink_note_collection : 0,
    diff_note_collection : 0,
    sum_note_collection : 0, 
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
  canvas: '', 
  ctx: '',
  img: '',
  aImages : [],
  iCurImage : 1,
  row : 0,
  folder : "1024",
  zoom : 0,
  zooming : 'base',

 getPixelrow: function(theimage, row) {
    var pixelrow = []
    var index = row * theimage.width * 4;
    for (i = index; i < theimage.width * 4 + index; i = i + 1) {
         pixelrow.push(theimage.data[i])
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
  record: {}, 
  aImages: [],
  imageparts: [], 
  imagecollation: [], 
  rowcollect: []


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
          nextImage() 
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

function nextImage() {
    soundSys.iCurImage = soundSys.iCurImage + 1;
  
    soundSys.img = document.getElementById(soundSys.aImages[soundSys.iCurImage].id);
    soundSys.ctx.drawImage(soundSys.img, 0, 0, soundSys.img.width,  soundSys.img.height,
                        0, 0, soundSys.canvas.width, soundSys.canvas.height);  
    soundSys.newFrame = soundSys.ctx.createImageData(soundSys.canvas.width, soundSys.canvas.height);

    soundSys.imageData = soundSys.ctx.getImageData(0, 0, soundSys.canvas.width, soundSys.canvas.height);
    soundSys.pix_row = soundSys.getPixelrow(soundSys.imageData, soundSys.row);
   
    rect(); 
     
    if (soundSys.iCurImage == soundSys.aImages.length - 1) {
        soundSys.iCurImage = -1;
    }
} // end of nextImage
 var fixRows = function(rows) {



      if (soundSys.row == 2) {

        console.log(rows);
      }
    return rows; 

 }

var rect = function() {
    
    soundSys.variables.c = 0;     
    soundSys.pix_row = soundSys.getPixelrow(soundSys.imageData, soundSys.row);
   
    soundSys.pix_future = soundSys.getPixelrow(soundSys.imageData, soundSys.row+soundSys.future); 
    // if ( soundSys.row == 1 ) console.log(soundSys.pix_row, soundSys.pix_future); 
    for (j = 0; j < soundSys.canvas.height; j = j + 1) { 

        if (j % soundSys.play.sampel_rate == 0 && soundSys.variables.c < 3905) {
            soundSys.play.travel =  soundSys.play.travel + 4
            if (soundSys.play.travel > 16) soundSys.play.travel = 0; 
            soundSys.color.red = Math.floor(soundSys.pix_row[soundSys.variables.c] / 10) 
            if (soundSys.color.red > 17) {
              soundSys.colors.red = soundSys.colors.red + Math.floor(soundSys.pix_row[soundSys.variables.c] / 10);
            } 
            soundSys.color.green = Math.floor(soundSys.pix_row[soundSys.variables.c+1] / 10)
            if (soundSys.color.green > 17) {
              soundSys.colors.green = soundSys.colors.green + Math.floor(soundSys.pix_row[soundSys.variables.c+1] / 10);
            }
            soundSys.color.bleu = Math.floor(soundSys.pix_row[soundSys.variables.c+2] / 10)
            if (soundSys.color.bleu > 17) {
              soundSys.colors.bleu = soundSys.colors.bleu + Math.floor(soundSys.pix_row[soundSys.variables.c+2] / 10);
            }

            if (Math.floor((soundSys.color.green + soundSys.color.bleu) / 2) > 17) {
              soundSys.colors.cyan = soundSys.colors.cyan + Math.floor((soundSys.color.green + soundSys.color.bleu) / 2);
            }
     
            if (Math.floor((soundSys.color.red + soundSys.color.bleu) / 2) > 17) {
              soundSys.colors.magenta = soundSys.colors.magenta + Math.floor((soundSys.color.red + soundSys.color.bleu) / 2);
            }

            if (Math.floor((soundSys.color.red + soundSys.color.green) / 2) > 17) {
              soundSys.colors.yellow = soundSys.colors.yellow + Math.floor((soundSys.color.red + soundSys.color.green) / 2);
            }    

            if (Math.floor(soundSys.color.red + soundSys.color.green + soundSys.color.bleu / 3) > 21) {
              soundSys.colors.light = soundSys.colors.light + Math.floor(soundSys.color.red + soundSys.color.green + soundSys.color.bleu / 3);
            }    

            if (Math.floor(soundSys.color.red + soundSys.color.green + soundSys.color.bleu / 3) < 8) {
              soundSys.colors.dark = soundSys.colors.dark + Math.floor(soundSys.color.red + soundSys.color.green + soundSys.color.bleu / 3);
            }  
            
            soundSys.color.diff = Math.floor(soundSys.diffFromFuture(soundSys.color.red, soundSys.color.green, soundSys.color.bleu, soundSys.pix_future[soundSys.variables.c], soundSys.pix_future[soundSys.variables.c+1], soundSys.pix_future[soundSys.variables.c+2]) / 10);
            if (soundSys.color.diff > 19)  {
              soundSys.colors.diff.push(Math.floor(j / 100));  
            }

            soundSys.rowcollect.push(soundSys.color)
            // if ( soundSys.row ==  256 ) console.log(soundSys.color); 

            soundSys.color = {}
            
        } // --- // end of sampel row image 
        // no sampelspace
        soundSys.variables.c = soundSys.variables.c + 4; 
    } // end of row
    soundSys.colors.row = soundSys.row; 
    // if( soundSys.colors.diff.length < 1) { soundSys.colors.diff = 0 } 
    var sum = 0; 
    var values_only = $.map(soundSys.colors, function(value, index) {
        sum = sum + value; 
        return [value];
    });
    if (sum > 0) {
      soundSys.imageparts.push(values_only);
    }
    soundSys.colors.red = 0; 
    soundSys.colors.green = 0; 
    soundSys.colors.bleu = 0; 
    soundSys.colors.black = 0; 
    soundSys.colors.white = 0; 
    soundSys.colors.yellow = 0;
    soundSys.colors.cyan = 0;  
    soundSys.colors.magenta = 0; 
    soundSys.colors.light = 0; 
    soundSys.colors.dark = 0; 
    soundSys.colors.diff = []; 
    //if ( soundSys.row ==  256 ) console.dir(soundSys.imageparts); 
    soundSys.rowcollect = []; 
    soundSys.row++; 

    if (soundSys.row > soundSys.img.height - 200) {
      soundSys.imagecollation[soundSys.aImages[soundSys.iCurImage].id] = soundSys.imageparts;
      //console.log(soundSys.imageparts)
      $.ajax
      ({
        type: "POST",
        url: "/savedata/",
        dataType: "json",
        data:{  "content":JSON.stringify(soundSys.imageparts), 
                "name": soundSys.aImages[soundSys.iCurImage].id
                 }, 
        success: function(data) {
                // console.log('success');
                // console.log(JSON.stringify(data));
            }

       })
      $('pre').text(JSON.stringify(soundSys.imageparts) + '\n\n');
      // reset
      soundSys.imageparts = [];
      soundSys.row = 0; 
      setTimeout( function() { nextImage(); }, 5000)    
    } else {
      rect();
    } 

} // end of rect()
     



  