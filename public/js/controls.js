// CONTROLS 
soundSys.rect_loop = new Tone.Loop(function(time){
  Tone.Draw.schedule(function(){
    rect();
  }, time)
   
}, "16n")


Tone.Transport.bpm.value = 120;
Tone.Transport.start(0); 
Tone.context.latencyHint = 'playback'
soundSys.rect_loop.start(3); 
soundSys.FelizPart.start(2);  

// very important ----------------
// kick_loop_1.start(3);
 //kick_loop_2.start(3);
//base_loop.start(3); 