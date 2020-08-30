function init_gamebox() {

  document.getElementById('game_box').style.position = "absolute";
  document.getElementById('game_box').style.top = "50%";
  document.getElementById('game_box').style.left = "50%";
  document.getElementById('game_box').style.transform = "translate(-50%,-50%)";

  window.onresize = reset_gamebox_size;
  reset_gamebox_size();
  
  return;
}

function reset_gamebox_size() {
    
  let canvas_h = window.innerHeight;
  let canvas_w = window.innerWidth;
  
  let box_h = 0;
  let box_w = 0;

  let apsect_ratio = canvas_w / canvas_h;
  let threshold = 1080 / 1920;
  
  if(apsect_ratio < threshold)
  {
    box_w = canvas_w;
    box_h = box_w * 1.7777;                    
  }
  else
  {
    box_h = canvas_h;
    box_w = box_h * 0.5625;
  }
                  
  document.getElementById('game_box').style.height= box_h + "px";
  document.getElementById('game_box').style.width= box_w + "px";                
  return;
}