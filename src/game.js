var game = {
    
    //Base game data
    maze: null,
    pacMan: null,
    blinky: null,

    backgroundMusic: null,   
    doOnce: null,
    doOnce2: null,
    clickedState: null,

    gameState: null,

    gameStates: {
        initialMenu: 0,
        game: 1,
        gameOver: 2
    },

    //Decoration
    pacManLogo: null,
    pacManSideRight: null,
    pacManSideLeft: null,

    //Powerups / life
    pacManLife1: null,
    pacManLife2: null,
    pacManLife3: null,
    pacManCherry1: null,
    pacManCherry2: null,
    pacManCherry3: null,
    lifeImageArray: [],
    lifeImage: null,

    //Timer for ghost free
    timer:0,
    score:0,
    highscore:0,

    Start: function() {

        this.doOnce2 = false;
        this.gameState = this.gameStates.initialMenu;
        this.maze = new Maze();
        this.maze.Start();
        this.pacMan = new PacMan(graphicAssets.pacman.image, new Vector2(58, 259));
        this.blinky = new Ghost(graphicAssets.blinky.image, new Vector2(150, 258), this.pacMan);

        this.pacManLogo = graphicAssets.pacmanlogo.image;
        this.pacManSideRight = graphicAssets.pacmansideright.image;
        this.pacManSideLeft = graphicAssets.pacmansideleft.image;

        this.pacManSideRightAugment = 42;
        this.pacManSideLeftAugment = 42;

        this.backgroundMusic = new Audio("/assets/Audio/background-theme.wav");
        this.myAudio = new Audio("/assets/Audio/chompFinal.wav");
        this.menuMusic = new Audio("/assets/Audio/menumusic.mp3");
        this.powerPelletMusic = new Audio("/assets/Audio/powerpellet.mp3");
        window.onclick = this.ClickStart();
    },

    Update: function(deltaTime) {

        switch(this.gameState) 
        {
            case 0:
                this.PlayMenuMusic();
                if(Input.IsKeyDown(KEY_SPACE))
                    this.SetGameScene();
            break;

            // Game
            case 1:
                this.AssignPlayerScore();
                this.PlayChompSound();
                this.PlayBackGroundMusic();
                this.menuMusic.pause();
                this.maze.Update(deltaTime);
                this.pacMan.anima;
                this.pacMan.Update(deltaTime);
                this.blinky.Update(deltaTime);
                this.timer += deltaTime;
        
                if(this.timer >= 5 && this.maze.GhostScapeBox != null)
                {
                    this.FreeGhost();
                }

                if(Input.IsKeyDown(KEY_Q))
                {
                    this.backgroundMusic.pause();
                    this.myAudio.pause();
                    this.SetGameOverScene();
                }

                if(this.pacMan.powerpelletActivation)
                {                 
                    this.powerPelletMusic.play();  
                    this.blinky.behaviour = true;
                }
                else
                {
                    this.powerPelletMusic.pause(); 
                    this.blinky.behaviour = false;
                }

                if(this.pacMan.playerScore == 100 && !this.doOnce2)
                {
                    this.pacMan.playerLife += 1;
                    this.doOnce2 = true;
                }
               
                if(this.pacMan.playerLife <= 0 || this.pacMan.playerScore == 200)
                {
                    this.time = 0;
                    this.highscore = this.score;
                    this.SetGameOverScene();
                }
            break;

            case 2:
                this.GameOverUpdate();
            break;
        }
    },

    Draw: function(ctx) {

        switch(this.gameState)
        {
            // Menu
            case 0:
                this.MenuSceneDraw(ctx);
            break;

            // Game
            case 1:
                // Background
                this.DrawBackground(ctx);

            break;

            case 2:
                this.GameOverSceneDraw(ctx);
            break;
        }
    },

    ClickStart()
    {
        this.clickedState = true;
    },

    PlayMenuMusic()
    {
        if(this.clickedState)
        {
            if(typeof this.menuMusic.loop == "boolean")
            {
                this.menuMusic.loop = true;
            }
            else
            {
                this.menuMusic.addEventListener("ended", function()
                {
                    this.currentTime = 0;
                    this.play();
                }, false)
            }
            this.menuMusic.play();
        }
    },
    
    PlayBackGroundMusic()
    {
        if(this.clickedState && !this.doOnce)
        {
            this.backgroundMusic.play();
            this.doOnce = true;
        }
    },

    PlayChompSound()
    {
        if(this.clickedState)
        {
            if(typeof this.myAudio.loop == "boolean")
            {
                this.myAudio.loop = true;
            }
            else
            {
                this.myAudio.addEventListener("ended", function()
                {
                    this.currentTime = 0;
                    this.play();
                }, false)
            }
            this.myAudio.play();
        }
    },

    FreeGhost()
    {
        world.DestroyBody(this.maze.GhostScapeBox);
        this.maze.GhostScapeBox = null;
    },

    PlayerPointUp()
    {
        this.score += 1;
    },

    PlayerDeath()
    {
        this.highscore = this.score;
        this.score = 0;
    },

    AssignPlayerScore()
    {
        this.pacMan.playerScore = this.score;
    },

    // Manage scenes
    SetGameScene: function()
    {
        this.gameState = this.gameStates.game;
    },

    DrawBackground: function(ctx)
    {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        this.maze.Draw(ctx);
        this.pacMan.Draw(ctx);
        this.blinky.Draw(ctx);

        ctx.drawImage(graphicAssets.pacmansideright.image, 100, 0, 80, 380, canvas.width - 42, 40, 80, canvas.height - 40);
        ctx.drawImage(graphicAssets.pacmansideleft.image, 100, 0, 80, 380, -32, 40, 80, canvas.height - 40);

        for(let i = 0; i < this.pacMan.playerLife; i++)
        {
            this.lifeImage = ctx.drawImage(graphicAssets.pacman.image, 16, 16, 16, 16, 60 + (20 * i), 430, 16, 16);
            this.lifeImageArray.push(this.lifeImage);
            console.log(this.pacMan.playerLife);
        }

        ctx.drawImage(graphicAssets.general.image, 490, 50, 12, 12, 190, 430, 12, 12);
        ctx.drawImage(graphicAssets.general.image, 490, 50, 12, 12, 210, 430, 12, 12);
        ctx.drawImage(graphicAssets.general.image, 490, 50, 12, 12, 230, 430, 12, 12);

        ctx.drawImage(graphicAssets.pacmansideright.image, 100, 0, 80, 380, canvas.width - 43, 40, 80, canvas.height - 40);
        ctx.drawImage(graphicAssets.pacmansideleft.image, 100, 0, 80, 380, -32, 40, 80, canvas.height - 40);

        ctx.drawImage(graphicAssets.pacmanlogo.image, 0, 0);

        // draw the FPS counter
        ctx.fillStyle = "white";
        ctx.font = "12px Arcade";
        ctx.textAlign = "start";
        ctx.fillText("SCORE", 60, 115);
        ctx.fillText(this.score, 80, 135);
        ctx.fillText("HIGH SCORE", 145, 115);
        ctx.fillText(this.highscore, 195, 135);
        
        if(this.score > 100)
        {
            ctx.fillText("1UP", 100, 90);
            ctx.fillText("Obtained", 155, 90);
        }
        else
        {
            ctx.fillText("1UP", 125, 90);
            ctx.fillText(100 - this.score, 175, 90);
        }

        ctx.fillText("CHERRYS", 180, 425);
        ctx.fillText("LIFES", 60, 425);
    },

    SetGameOverScene: function()
    {
        this.gameState = this.gameStates.gameOver;
    },

    SetMenuScene: function()
    {
        this.gameState = this.gameStates.initialMenu;

        this.maze = new Maze();
        this.maze.Start();
        this.pacMan = new PacMan(graphicAssets.pacman.image, new Vector2(58, 259));
        this.blinky = new Ghost(graphicAssets.blinky.image, new Vector2(150, 258), this.pacMan);
    },

    // Menu Scene
    MenuSceneDraw: function(ctx)
    {
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#fdff00";
        ctx.font = "10px Arcade";
        ctx.textAlign = "center";
        ctx.fillText("WELCOME TO PHYSICS PAC MAN!", canvas.width / 2, 75);

        ctx.fillStyle = "#46bfee";
        ctx.font = "8px Arcade";
        ctx.textAlign = "center";

        ctx.fillText("HOW TO PLAY:", canvas.width / 4.75, 150);
        ctx.fillText("WASD TO MOVE", canvas.width / 1.8, 180);

        ctx.fillStyle = "#db851c";
        ctx.textAlign = "left";
        ctx.fillText("GET THE PELLETS FOR POINTS", canvas.width / 18, 220);
        ctx.fillText("BEWARE OF THE GHOSTS", canvas.width / 18, 270);
        ctx.fillText("GET THE POWER PELLETS", canvas.width / 18, 320);
        ctx.fillText("FOR KILLING THE GHOSTS", canvas.width / 18, 340);

        ctx.fillStyle = "#d03e19";
        ctx.textAlign = "center";
        ctx.fillText("PRESS SPACE", canvas.width / 2, 430);
        ctx.fillText("TO PLAY!", canvas.width / 2, 445);

        ctx.drawImage(graphicAssets.WASD.image, 150, 110, 60, 60);
        ctx.drawImage(graphicAssets.pellet.image, 0, 2, 3, 3, 240, 209, 10, 10);
        ctx.drawImage(graphicAssets.pellet.image, 5, 0, 12, 12, 210, 315, 24, 24);
        ctx.drawImage(graphicAssets.general.image, 585, 65, 15, 15, 100, 365, 15, 15);
        ctx.drawImage(graphicAssets.general.image, 585, 65, 15, 15, 120, 365, 15, 15);
        ctx.drawImage(graphicAssets.general.image, 585, 65, 15, 15, 140, 365, 15, 15);
        ctx.drawImage(graphicAssets.general.image, 585, 65, 15, 15, 160, 365, 15, 15);
        ctx.drawImage(graphicAssets.general.image, 585, 65, 15, 15, 180, 365, 15, 15);
        ctx.drawImage(graphicAssets.general.image, 585, 65, 15, 15, 200, 365, 15, 15);
        ctx.drawImage(graphicAssets.blinky.image, 0, 0, 15, 15, 190, 257, 15, 15);
        ctx.drawImage(graphicAssets.blinky.image, 0, 0, 15, 15, 210, 257, 15, 15);
        ctx.drawImage(graphicAssets.blinky.image, 0, 0, 15, 15, 230, 257, 15, 15);

        ctx.fillText("GOOD LUCK", canvas.width / 2, 405);

        //ctx.drawImage(graphicAssets.blinky.image, 60, 60, 150, 110, 60, 60);
    },

    // Game Over Scene
    GameOverSceneDraw: function(ctx)
    {
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "white";
        ctx.font = "10px Arcade";
        ctx.textAlign = "center";
        ctx.fillText("THANKS FOR PLAYING!", canvas.width / 2, 75);
        ctx.fillText("YOUR SCORE: " + this.score, canvas.width / 2, 150);

        ctx.font = "10px Arcade";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";

        ctx.fillText("PRESS E TO GO TO THE MENU", canvas.width / 2, canvas.height / 2 + 30);
    },

    GameOverUpdate: function()
    {
        //Menu
        if(Input.IsKeyDown(KEY_E))
        {
            this.score = 0;
            this.SetMenuScene();
        } 
    },
}
