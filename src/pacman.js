class PacMan
{
    constructor(sprite, initialPosition)
    {
        this.sprite = sprite;
        this.deathSprite = graphicAssets.deathAnimation;
        this.position = initialPosition;

        this.animation = new SSAnimation(sprite, this.position, 16, 16, [3, 3, 3, 3], 1 / 12);
        this.animation.PlayAnimationLoop(0);

        this.direction = -1;
        this.lastDir = 1;
        this.speed = 50; // 50 pixels per second (original game runs at 25fps and moves 2 pixels each step)

        this.movementForce = .05;

        this.playerLife = 3;

        this.powerpelletTimer = 5;
        this.powerpelletActivation = false;

        this.body = CreateCircle(world, (initialPosition.x + 7) / scale, (canvas.height - (initialPosition.y + 7)) / scale, .06, {linearDamping: 5, userData: this});

        this.playerScore = 0;
    }

    Update(deltaTime)
    {
        if(this.powerpelletActivation == true)
        {
            this.powerpelletTimer -= deltaTime;
            if(this.powerpelletTimer <= 0)
            {
                this.powerpelletTimer = 5;
                this.powerpelletActivation = false;
            }
        }

        this.direction = -1;

        if (Input.IsKeyPressed(KEY_W) || Input.IsKeyPressed(KEY_UP))
            this.direction = 0;
        if (Input.IsKeyPressed(KEY_S) || Input.IsKeyPressed(KEY_DOWN))
            this.direction = 2;
        if (Input.IsKeyPressed(KEY_A) || Input.IsKeyPressed(KEY_LEFT))
            this.direction = 3;
        if (Input.IsKeyPressed(KEY_D) || Input.IsKeyPressed(KEY_RIGHT))
            this.direction = 1;

        this.lastDir = this.direction;

        switch (this.direction)
        {
            case 0:
                //this.position.y -= this.speed * deltaTime;
                this.body.ApplyForce(new b2Vec2(0, this.movementForce), this.body.GetWorldCenter());
                this.animation.PlayAnimationLoop(2, false);
                break;
            case 1:
                //this.position.x += this.speed * deltaTime;
                this.body.ApplyForce(new b2Vec2(this.movementForce, 0), this.body.GetWorldCenter());
                this.animation.PlayAnimationLoop(0, false);
                break;
            case 2:
                //this.position.y += this.speed * deltaTime;
                this.body.ApplyForce(new b2Vec2(0, -this.movementForce), this.body.GetWorldCenter());
                this.animation.PlayAnimationLoop(3, false);
                break;
            case 3:
                //this.position.x -= this.speed * deltaTime;
                this.body.ApplyForce(new b2Vec2(-this.movementForce, 0), this.body.GetWorldCenter());
                this.animation.PlayAnimationLoop(1, false);
                break;
        }

        const currentPosition = this.body.GetPosition();
        this.animation.position.x = (currentPosition.x * scale) - 7;
        this.animation.position.y = canvas.height - (currentPosition.y * scale) - 7;

        this.animation.Update(deltaTime);
    }

    Draw(ctx)
    {
        this.animation.Draw(ctx);        
    }

    CollideWithGhost()
    {
        this.playerLife -= 1;
        console.log(this.playerLife);
    }

    PowerPelletPowerup()
    {
        this.powerpelletActivation = true;
    }
}