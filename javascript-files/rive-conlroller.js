"use strict";

var RivePlayer = function () {
  var _ViewCenter = [105, 95];
  var _Scale = 1.0;
  var _ScreenScale = 1.0;

  var _ScreenMouse = vec2.create();

  var _WorldMouse = vec2.create();
  /**
   * @constructs FlareExample
   * 
   * @param {Element} canvas - a canvas element object on the html page that's rendering this example.
   * @param {onReadyCallback} ready - callback that's called after everything's been properly initialized.
  */


  function RivePlayer(canvas, ready, element, viewcenter, scale, elapsed, color) {
    var _this = this;

    /** Build and initialize the Graphics object. */
    this._ViewCenter = viewcenter;
    this._Elapsed = elapsed;
    this._Color = color;
    this._Scale = scale;
    this._Element = element;
    this._StaticState = 1;
    this._FirstDraw = 1;
    this._Graphics = new Flare.Graphics(canvas);

    this._Graphics.initialize(function () {
      _this._LastAdvanceTime = Date.now();
      _this._ViewTransform = mat2d.create();
      _this._AnimationInstance = null;
      _this._Animation = null;
      _this._SoloSkaterAnimation = null;
      var _This = _this;
      /** Start the render loop. */

      _ScheduleAdvance(_This);

      _Advance(_This);

      ready();
    }, "../build/");
  }
  /**
   * Advance the current viewport and, if present, the AnimationInstance and Actor.
   * 
   * @param {Object} _This - the current viewer.
   */


  function _Advance(_This) {
    _This.setSize(250, 250);

    var now = Date.now(); //elapsed = (now - _This._LastAdvanceTime)/1000.0;

    let elapsed = 0.010;
    _This._LastAdvanceTime = now;
    var actor = _This._ActorInstance;

    if (_This._AnimationInstance && document.querySelector("" + _This._Element).getAttribute("data") == 1) {
      _This._StaticState = 1;
      var ai = _This._AnimationInstance;
      /** Compute the new time and apply it */

      ai.time = ai.time + _This._Elapsed;
      ai.apply(_This._ActorInstance, 1.0);
    } else if (_This._AnimationInstance && _This._StaticState == 1) {
      _This._StaticState = 0;
      _This._FirstDraw = 1;
      var _ai = _This._AnimationInstance;
      /** Compute the new time and apply it */

      _ai.time = 2.90; //elapsed =  - 0.028

      _ai.apply(_This._ActorInstance, 1);
    }

    if (actor) {
      var graphics = _This._Graphics;
      var w = graphics.viewportWidth;
      var h = graphics.viewportHeight;
      var vt = _This._ViewTransform;
      vt[0] = _This._Scale;
      vt[3] = _This._Scale;
      vt[4] = -_This._ViewCenter[0] * _This._Scale + w / 2;
      vt[5] = -_This._ViewCenter[1] * _This._Scale + h / 2;
      /** Advance the actor to its new time. */

      actor.advance(elapsed);
    }

    _Draw(_This, _This._Graphics);
    /** Schedule a new frame. */


    _ScheduleAdvance(_This);
  }
  /**
   * Performs the drawing operation onto the canvas.
   * 
   * @param {Object} viewer - the object containing the reference to the Actor that'll be drawn.
   * @param {Object} graphics - the renderer.
   */


  function _Draw(viewer, graphics) {
    if (!viewer._Actor) {
      return;
    }

    if (document.querySelector("" + viewer._Element).getAttribute("data") == 1 || viewer._FirstDraw == 1) {
      viewer._FirstDraw = 0; //graphics.clear([0.3628, 0.3628, 0.3628, 1.0]);

      graphics.clear(viewer._Color);
      graphics.setView(viewer._ViewTransform);

      viewer._ActorInstance.draw(graphics);

      graphics.flush();
    }
  }
  /** Schedule the next frame. */


  function _ScheduleAdvance(viewer) {
    clearTimeout(viewer._AdvanceTimeout);
    window.requestAnimationFrame(function () {
      _Advance(viewer);
    });
  }
  /**
   * Loads the Flare file from disk.
   * 
   * @param {string} url - the .flr file location.
   * @param {onSuccessCallback} callback - the callback that's triggered upon a successful load.
   */


  RivePlayer.prototype.load = function (url, callback) {
    var loader = new Flare.ActorLoader();

    var _This = this;

    loader.load(url, function (actor) {
      if (!actor || actor.error) {
        callback(!actor ? null : actor.error);
      } else {
        _This.setActor(actor);

        callback();
      }
    });
  };

  RivePlayer.prototype.advance = function () {};
  /**
   * Cleans up old resources, and then initializes Actors and Animations, storing the instance references for both.
   * This is the final step of the setup process for a Flare file.
   */


  RivePlayer.prototype.setActor = function (actor) {
    /** Cleanup */
    if (this._Actor) {
      this._Actor.dispose(this._Graphics);
    }

    if (this._ActorInstance) {
      this._ActorInstance.dispose(this._Graphics);
    }
    /** Initialize all the Artboards within this Actor. */


    actor.initialize(this._Graphics);
    /** Creates new ActorArtboard instance */

    var actorInstance = actor.makeInstance();
    actorInstance.initialize(this._Graphics);
    this._Actor = actor;
    this._ActorInstance = actorInstance;

    if (actorInstance) {
      /** ActorArtboard.initialize() */
      actorInstance.initialize(this._Graphics);

      if (actorInstance._Animations.length) {
        /** Instantiate the Animation. */
        this._Animation = actorInstance._Animations[0];
        this._AnimationInstance = new Flare.AnimationInstance(this._Animation._Actor, this._Animation);

        if (!this._AnimationInstance) {
          console.log("NO ANIMATION IN HERE!?");
          return;
        }
      }
    }
  };
  /** Set the renderer's viewport to the desired width/height. */


  RivePlayer.prototype.setSize = function (width, height) {
    this._Graphics.setSize(width, height);
  };

  return RivePlayer;
}();
