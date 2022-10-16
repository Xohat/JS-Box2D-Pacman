
var canvas;
var ctx;

var targetDeltaTime = 1 / 60;
var currentDeltaTime = 0;
var time = 0,
    FPS  = 0,
    frames    = 0,
    acumDelta = 0;
var timeSinceBegining = 0;

var pause = false;

// graphic assets references
var graphicAssets = {
    tileset: {
        path: "assets/tileset.png",
        image: null
    },
    general: {
        path: "assets/general.png",
        image: null
    },
    pacman: {
        path: "assets/pacman.png",
        image: null
    },
    blinky: {
        path: "assets/blinky.png",
        image: null
    },
    pacmanlogo: {
        path: "assets/pacmanlogo.png",
        image: null
    },
    pacmansideright: {
        path: "assets/pacmansideR.png",
        image: null
    },
    pacmansideleft: {
        path: "assets/pacmansideL.png",
        image: null
    },
    pelletsMap: {
        path: "assets/pelletMapLazyVersion.png",
        image: null
    },
    pellet: {
        path: "assets/pellets.png",
        image: null
    },
    WASD:
    {
        path: "assets/WASD.png",
        image: null
    },
    deathAnimation:
    {
        path: "assets/DeathAnimation.png",
        image: null
    },
    GhostPellet:
    {
        path: "assets/PowerPelletGhost.png",
        image: null
    }
};

// audio assets references
var audioAssets = {
    menuMusic: {
        path: "assets/Audio/menumusic.wav",
        Audio: null
    },
    background: {
        path: "assets/Audio/background-theme.wav",
        Audio: null
    },
    chompLoop: {
        path: "assets/Audio/chomp.wav",
        Audio: null
    },
    powerPelletMode: {
        path: "assets/Audio/powerpellet.wav",
        Audio: null
    },
    eatGhost : {
        path: "assets/Audio/eatghost.wav",
        Audio: null
    },
    deathSound : {
        path: "assets/Audio/death.wav",
        Audio: null
    },
    eatFruit:{
        path: "assets/Audio/eatfruit.wav",
        Audio: null
    }
};

var world = null; // box2d world reference

window.requestAnimationFrame = (function (evt) {
    return window.requestAnimationFrame ||
    	window.mozRequestAnimationFrame    ||
    	window.webkitRequestAnimationFrame ||
    	window.msRequestAnimationFrame     ||
    	function (callback) {
        	window.setTimeout(callback, targetDeltaTime * 1000);
    	};
}) ();

window.onload = BodyLoaded;

function LoadAudio(assets, onloaded)
{
    let audioToLoad = 0;
    
    const onload = () => --audioToLoad === 0 && onloaded();

    // iterate through the object of assets and load every image
    for (let asset in assets)
    {
        if (assets.hasOwnProperty(asset))
        {
            audioToLoad++; // one more image to load

            // create the new image and set its path and onload event
            const Aud = assets[asset].image = new Audio;
            Aud.src = assets[asset].path;
            Aud.onload = onload;
        }
     }
    return assets;
}

function LoadImages(assets, onloaded)
{
    let imagesToLoad = 0;
    
    const onload = () => --imagesToLoad === 0 && onloaded();

    // iterate through the object of assets and load every image
    for (let asset in assets)
    {
        if (assets.hasOwnProperty(asset))
        {
            imagesToLoad++; // one more image to load

            // create the new image and set its path and onload event
            const img = assets[asset].image = new Image;
            img.src = assets[asset].path;
            img.onload = onload;
        }
     }
    return assets;
}

function BodyLoaded()
{
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    SetupKeyboardEvents();
    SetupMouseEvents();

    LoadImages(graphicAssets, function() {
        // load audio

        // Start the game
        Start();

        // first loop call
        Loop();
    });

    LoadAudio(audioAssets, function() {
        // load audio

        // Start the game
        Start();

        // first loop call
        Loop();
    });
}

function Start()
{
    time = Date.now();

    world = CreateWorld(ctx);
    SetupPhysics();

    // Start the game
    game.Start();
}

function Loop ()
{
    // prepare the next loop
    requestAnimationFrame(Loop);

    //deltaTime
    const now = Date.now();
    let deltaTime = (now - time) / 1000;
    currentDeltaTime = deltaTime;
    
    time = now;

    // frames counter
    frames++;
    acumDelta += deltaTime;

    if (acumDelta > 1)
    {
        FPS = frames;
        frames = 0;
        acumDelta -= 1;
    }
    
    if (deltaTime > 0.1)
        deltaTime = 0.1;

    if (Input.IsKeyDown(KEY_PAUSE) || Input.IsKeyDown(KEY_ESCAPE))
    {
        pause = !pause;
    }

    // Game logic -------------------
    if (!pause)
        Update(deltaTime);

    // Draw the game ----------------
    Draw(ctx);
    
    Input.PostUpdate();
}

function Update(deltaTime)
{
    timeSinceBegining += deltaTime;

    // update the box2d physics simulation
    world.Step(deltaTime, 8, 3);
    world.ClearForces();

    // update the game level
    game.Update(deltaTime);
}

function Draw(ctx)
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw the game level
    game.Draw(ctx);

    // draw the box2d physics debug world
    // DrawWorldDebug(ctx);

    if (pause)
    {
        ctx.fillStyle = "white";
        ctx.font = "30px Arcade";
        ctx.textAlign = 'center';
        ctx.fillText('PAUSE', canvas.width / 2, (canvas.height / 2) + 40);
        ctx.textAlign = 'left';
    }
    
    /*
    // draw the FPS counter
    ctx.fillStyle = "white";
    ctx.font = "12px Arcade";
    ctx.textAlign = "start";
    ctx.fillText("FPS=" + FPS, 125, 90);
    ctx.fillText("currentFPS=" + (1/currentDeltaTime).toFixed(2), 65, 475);
    */
}
