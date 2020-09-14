(function () {
  'use strict';

  // Check host
  let hostname = window.location.hostname;
  
  // Pre path
  let pre = "";

  if(hostname === "maxmald.github.io")
  {
    pre = "/steering_behaviors";
  }

  requirejs.config({
    baseUrl: "/",

    paths: {
      'phaser': pre + '/dependencies/phaser/build/phaser',
      'phaser3-nineslice' : pre + '/dependencies/phaser/plugins/nineSlice/nineslice.min',
      'mxUtilities' : pre + '/dependencies/mxUtilities/mxUtilities',
      'game_init' : pre + '/lib/steeringApp'
    },

    bundles: {
      'mxUtilities' : [
        "mxUtilitites",
        "commons/mxEnums",
        "optimization/mxObjectPool",
        "optimization/mxPoolArgs",
        "MxTools",
        "listeners/mxListener",
        "listeners/mxListenerManager"
      ]
    },

    shim: {
      'phaser': {
        exports: 'Phaser'
      }
    }

  });

  define
  (
    ["require", "game_init", "phaser", "mxUtilities"],

    function(require, GameInit, Phaser) 
    {

    // Get Game
    var game_init = new GameInit();
    
    // Start!
    game_init.start();
    
    return; 
    }
  );
  
}());
