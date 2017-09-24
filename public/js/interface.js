$( document ).ready(function() {

var multislider_vol = new Nexus.Multislider('#vol_target',{
 'size': [100,200],
 'numberOfSliders': 3,
 'min': -20,
 'max': 20,
 'step': 0,
 'values': [0,0,0]
})

multislider_vol.on('change',function(v) {
  if (v.index == 0) {
      chordPiano.volume.value = v.value; 
  }
  if (v.index == 1) {
    casio_keys.volume.value = v.value; 
  }
  if (v.index == 2) {
    soundSys.bass.volume.value = v.value;
  }
  
})


var multislider_env = new Nexus.Multislider('#env_target',{
 'size': [100,200],
 'numberOfSliders': 3,
 'min': 0,
 'max': 10,
 'step': 1,
 'values': [0.1,0.1,0.1,]
})

multislider_env.on('change',function(v) {
  console.log(v)
  if (v.index == 0) {
      if (v.value == 1) {
          chordPiano.set({
           "oscillator": {                           
                "type" : "sine"
                }
              });
      }
      if (v.value == 3) {
          chordPiano.set({
           "oscillator": {                           
                "type" : "square"
              }
              });
      }
      if (v.value == 5) {
          chordPiano.set({  
           "oscillator": {                          
                "type" : "triangle"
                }
              });
      }
      if (v.value == 7) {

          chordPiano.oscillator.type = "sawtooth"
              
          }
   
  }
  if (v.index == 1) {
     chordPiano.set({                           
                "envelope" : {
                  "attack" :  v.value
                }
              });
     
  }
  if (v.index == 2) {
     chordPiano.set({                           
                "envelope" : {
                  "sustain" : v.value
                }
              });
  }
  //console.log(bass.oscillator.type)
})

});

