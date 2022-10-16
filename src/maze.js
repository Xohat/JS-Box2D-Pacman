 
class Maze
{
    constructor()
    {
        this.GhostScapeBox = null;
        this.test = null;
        this.test2 = null;
        this.pelletMap = null;
        this.pellet = null;
        this.powerPellet = null;
        this.actualPelletMap = null;
        this.pelletArray = [];
        this.powerPelletArray = [];
    }

    Start()
    {
        // initialize the physics colliders
        CreateBox(world, 1.625, 3.3, 2.3, .1, { type : b2Body.b2_staticBody });
        CreateBox(world, 1.625, 0.82, 2.3, .1, { type : b2Body.b2_staticBody });
        CreateBox(world, 0.51, 2.05, .1, 2.4, { type : b2Body.b2_staticBody });
        CreateBox(world, 2.75, 2.05, .1, 2.4, { type : b2Body.b2_staticBody });

        CreateBox(world, .83, 3.02, .24, .16, { type : b2Body.b2_staticBody });
        CreateBox(world, 1.26, 3.02, .31, .16, { type : b2Body.b2_staticBody });
        CreateBox(world, 1.62, 3.12, .1, .35, { type : b2Body.b2_staticBody });
        CreateBox(world, 1.98, 3.02, .31, .16, { type : b2Body.b2_staticBody });
        CreateBox(world, 2.42, 3.02, .24, .16, { type : b2Body.b2_staticBody });

        CreateBox(world, .83, 2.74, .24, .08, { type : b2Body.b2_staticBody });
        CreateBox(world, 1.62, 2.74, .54, .08, { type : b2Body.b2_staticBody });
        CreateBox(world, 2.42, 2.74, .24, .08, { type : b2Body.b2_staticBody });
        
        CreateBox(world, 1.29, 2.5, .24, .08, { type : b2Body.b2_staticBody });
        CreateBox(world, 1.95, 2.5, .24, .08, { type : b2Body.b2_staticBody });

        CreateBox(world, 1.15, 2.5, .08, .55, { type : b2Body.b2_staticBody });
        CreateBox(world, 1.62, 2.58, .08, .25, { type : b2Body.b2_staticBody });
        CreateBox(world, 2.1, 2.5, .08, .55, { type : b2Body.b2_staticBody });
        
        CreateBox(world, .7, 2.38, .49, .32, { type : b2Body.b2_staticBody });
        CreateBox(world, 2.55, 2.38, .49, .32, { type : b2Body.b2_staticBody });

        CreateBox(world, .7, 1.9, .49, .32, { type : b2Body.b2_staticBody });
        CreateBox(world, 1.15, 1.9, .08, .30, { type : b2Body.b2_staticBody });
        CreateBox(world, 2.1, 1.9, .08, .30, { type : b2Body.b2_staticBody });
        CreateBox(world, 2.55, 1.9, .49, .32, { type : b2Body.b2_staticBody });

        //Ghost box
        CreateBox(world, 1.62, 2, .54, .06, { type : b2Body.b2_staticBody });
        CreateBox(world, 1.44, 2.28, .19, .06, { type : b2Body.b2_staticBody });
        //Way out ghosts
        this.GhostScapeBox = CreateBox(world, 1.62, 2.28, .19, .06, { type : b2Body.b2_staticBody });

        CreateBox(world, 1.37, 2.14, .06, .3, { type : b2Body.b2_staticBody });
        CreateBox(world, 1.87, 2.14, .06, .3, { type : b2Body.b2_staticBody });
        CreateBox(world, 1.8, 2.28, .19, .06, { type : b2Body.b2_staticBody });

        CreateBox(world, 1.62, 1.78, .54, .08, { type : b2Body.b2_staticBody });
        CreateBox(world, 1.62, 1.62, .08, .25, { type : b2Body.b2_staticBody });

        CreateBox(world, 1.62, 1.3, .54, .08, { type : b2Body.b2_staticBody });
        CreateBox(world, 1.62, 1.155, .08, .25, { type : b2Body.b2_staticBody });

        CreateBox(world, .83, 1.55, .24, .08, { type : b2Body.b2_staticBody });
        CreateBox(world, .91, 1.4, .08, .30, { type : b2Body.b2_staticBody });

        CreateBox(world, 1.26, 1.55, .3, .08, { type : b2Body.b2_staticBody });
        CreateBox(world, 1.98, 1.55, .3, .08, { type : b2Body.b2_staticBody });

        CreateBox(world, 2.42, 1.55, .24, .08, { type : b2Body.b2_staticBody });
        CreateBox(world, 2.34, 1.4, .08, .30, { type : b2Body.b2_staticBody });

        CreateBox(world, .58, 1.3, .24, .08, { type : b2Body.b2_staticBody });
        CreateBox(world, 2.65, 1.3, .24, .08, { type : b2Body.b2_staticBody });

        CreateBox(world, 2.1, 1.2, .08, .30, { type : b2Body.b2_staticBody });
        CreateBox(world, 2.18, 1.06, .7, .08, { type : b2Body.b2_staticBody });
        CreateBox(world, 1.14, 1.2, .08, .30, { type : b2Body.b2_staticBody });
        CreateBox(world, 1.06, 1.06, .7, .08, { type : b2Body.b2_staticBody });

        //PELLET COLLIDERS
        this.test = 0.8;
        this.test2 = 3.18;       

        for(let Xaxis = 0; Xaxis < 26; ++Xaxis)
        {
            for(let Yaxis = 0; Yaxis < 29; ++Yaxis)
            {     
                if(Yaxis == 0 || Yaxis == 19)
                {                    
                    if(Xaxis == 12 || Xaxis == 13)
                    {
                        
                    }

                    else
                    {
                        this.pellet = new Pellet(graphicAssets.pellet, new Vector2(.62 + this.test * Xaxis * .1, 3.18 - this.test * Yaxis * .1));
                        this.pelletArray.push(this.pellet);
                    }
                }

                if(Yaxis == 1 || Yaxis == 3 || Yaxis == 20 || Yaxis == 21)
                {
                    if(Xaxis == 0 || Xaxis == 5 || Xaxis == 11 || Xaxis == 14 ||  Xaxis == 20 ||  Xaxis == 25)
                    {
                        this.pellet = new Pellet(graphicAssets.pellet, new Vector2(.62 + this.test * Xaxis * .1, 3.18 - this.test * Yaxis * .1));
                        this.pelletArray.push(this.pellet);
                    }
                }

                if(Yaxis == 2)
                {
                    if(Xaxis == 0 || Xaxis == 25)
                    {
                        this.powerPellet = new PowerPellet(graphicAssets.pellet, new Vector2(.62 + this.test * Xaxis * .1, 3.18 - this.test * Yaxis * .1));
                        this.powerPelletArray.push(this.powerPellet);
                    }

                    if(Xaxis == 0 || Xaxis == 5 || Xaxis == 11 || Xaxis == 14 ||  Xaxis == 20 ||  Xaxis == 25)
                    {
                        this.pellet = new Pellet(graphicAssets.pellet, new Vector2(.62 + this.test * Xaxis * .1, 3.18 - this.test * Yaxis * .1));
                        this.pelletArray.push(this.pellet);
                    }
                }

                if(Yaxis == 4)
                {
                    this.pellet = new Pellet(graphicAssets.pellet, new Vector2(.62 + this.test * Xaxis * .1, 3.18 - this.test * Yaxis * .1));
                    this.pelletArray.push(this.pellet);

                    if(Xaxis == 12 || Xaxis == 13)
                    {
                        this.pellet = new Pellet(graphicAssets.pellet, new Vector2(.62 + this.test * Xaxis * .1, 3.18 - this.test * Yaxis * .1));
                        this.pelletArray.push(this.pellet);
                    }
                }

                if(Yaxis == 5 || Yaxis == 6)
                {
                    if(Xaxis == 0 || Xaxis == 5 || Xaxis == 8 || Xaxis == 17 || Xaxis == 20 || Xaxis == 25)
                    {
                        this.pellet = new Pellet(graphicAssets.pellet, new Vector2(.62 + this.test * Xaxis * .1, 3.18 - this.test * Yaxis * .1));
                        this.pelletArray.push(this.pellet);
                    }
                }

                if(Yaxis == 7)
                {
                    if(Xaxis == 6 || Xaxis == 7 || Xaxis == 12 || Xaxis == 13 || Xaxis == 18 || Xaxis == 19)
                    {
                        
                    }

                    else
                    {
                        this.pellet = new Pellet(graphicAssets.pellet, new Vector2(.62 + this.test * Xaxis * .1, 3.18 - this.test * Yaxis * .1));
                        this.pelletArray.push(this.pellet);
                    }
                }

                if(Yaxis == 8 || Yaxis == 9 || Yaxis == 10 || Yaxis == 11 || Yaxis == 12 || Yaxis == 13 || Yaxis == 14 || Yaxis == 15 || Yaxis == 16 || Yaxis == 17 || Yaxis == 18)
                {
                    if(Xaxis == 5 || Xaxis == 20)
                    {
                        this.pellet = new Pellet(graphicAssets.pellet, new Vector2(.62 + this.test * Xaxis * .1, 3.18 - this.test * Yaxis * .1));
                        this.pelletArray.push(this.pellet);
                    }
                }              

                if(Yaxis == 22)
                {
                    if(Xaxis == 0 || Xaxis == 25)
                    {
                        //sprite, initialPosition, pacman
                        this.powerPellet = new PowerPellet(graphicAssets.pellet, new Vector2(.62 + this.test * Xaxis * .1, 3.18 - this.test * Yaxis * .1));
                        this.powerPelletArray.push(this.powerPellet);
                    }

                    if(Xaxis == 3 || Xaxis == 4 || Xaxis == 21 || Xaxis == 22)
                    {

                    }
                    
                    else
                    {
                        this.pellet = new Pellet(graphicAssets.pellet, new Vector2(.62 + this.test * Xaxis * .1, 3.18 - this.test * Yaxis * .1));
                        this.pelletArray.push(this.pellet);

                        if(Xaxis == 11)
                        {
                            Xaxis += 2;
                        }
                    }
                }

                if(Yaxis == 23 || Yaxis == 24)
                {
                    if(Xaxis == 2 || Xaxis == 5 || Xaxis == 8 || Xaxis == 17 || Xaxis == 20 || Xaxis == 23)
                    {
                        //sprite, initialPosition, pacman
                        this.pellet = new Pellet(graphicAssets.pellet, new Vector2(.62 + this.test * Xaxis * .1, 3.18 - this.test * Yaxis * .1));
                        this.pelletArray.push(this.pellet);
                    }
                } 

                if(Yaxis == 25)
                {
                    if(Xaxis == 6 || Xaxis == 7 || Xaxis == 12 || Xaxis == 13 || Xaxis == 18 || Xaxis == 19)
                    {
 
                    }

                    else
                    {
                        this.pellet = new Pellet(graphicAssets.pellet, new Vector2(.62 + this.test * Xaxis * .1, 3.18 - this.test * Yaxis * .1));
                        this.pelletArray.push(this.pellet);
                    }
                }

                if(Yaxis == 26 || Yaxis == 27)
                { 
                    if(Xaxis == 0 || Xaxis == 12 || Xaxis == 14 || Xaxis == 25)
                    {
                        this.pellet = new Pellet(graphicAssets.pellet, new Vector2(.62 + this.test * Xaxis * .1, 3.18 - this.test * Yaxis * .1));
                        this.pelletArray.push(this.pellet);
                    }
                }

                if(Yaxis == 28)
                {                    
                    this.pellet = new Pellet(graphicAssets.pellet, new Vector2(.62 + this.test * Xaxis * .1, 3.18 - this.test * Yaxis * .1));
                    this.pelletArray.push(this.pellet);
                }                   
            }
        }       
    }

    Update(deltaTime)
    {
        for(let counterDelete = 0; counterDelete < this.pelletArray.length; ++counterDelete)
        {
            if(this.pelletArray[counterDelete].toDelete)
            {
                this.pelletArray[counterDelete].RemovePellet();
                this.pelletArray.splice(counterDelete, 1);
            }
        }

        for(let counterDeletePower = 0; counterDeletePower < this.powerPelletArray.length; ++counterDeletePower)
        {
            if(this.powerPelletArray[counterDeletePower].toDeletePower)
            {
                this.powerPelletArray[counterDeletePower].RemovePowerPellet();
                this.powerPelletArray.splice(counterDeletePower, 1);
            }
        }

    }

    Draw(ctx)
    {
        //background pixel scaled with score at top
        ctx.drawImage(graphicAssets.general.image, 228, 0, 228, 248, 50, 150, 228, 248);

        for(let counterDraw = 0; counterDraw < this.pelletArray.length; ++counterDraw)
        {
            this.pelletArray[counterDraw].Draw(ctx);
        }

        for(let counterDrawPower = 0; counterDrawPower < this.powerPelletArray.length; ++counterDrawPower)
        {
            this.powerPelletArray[counterDrawPower].Draw(ctx);
        }
    }
}