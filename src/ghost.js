
class Ghost
{
    constructor(sprite, initialPosition, pacman)
    {
        this.sprite = sprite;
        this.powerSprite = graphicAssets.GhostPellet.image;
        this.position = initialPosition;
        this.pacman = pacman;

        this.animation = new SSAnimation(sprite, this.position, 16, 16, [2, 2, 2, 2], 1 / 12);
        this.animation.PlayAnimationLoop(0);

        this.direction = -1;

        this.movementForce = .05;
        this.toDelete = false;
        this.toDelete = false;

        this.behaviour = false;

        this.body = CreateCircle(world, (initialPosition.x + 8) / scale, (canvas.height - (initialPosition.y + 7)) / scale, .06, {linearDamping: 5, userData: this});
    }

    Update(deltaTime)
    {
        if(this.toDelete)
        {
            this.RemoveGhost();
        }

        //No power pellet mode
        if(this.behaviour == false)
        {                    
            const difX = this.pacman.position.x - this.position.x;
            const difY = this.pacman.position.y - this.position.y;
            let directionVector = new b2Vec2(difX, -difY);
            directionVector.Normalize();
            directionVector.Multiply(this.movementForce);
    
            this.body.ApplyForce(directionVector, this.body.GetWorldCenter());
    
            const currentPosition = this.body.GetPosition();
            this.animation.position.x = (currentPosition.x * scale) - 8;
            this.animation.position.y = canvas.height - (currentPosition.y * scale) - 7;
    
            this.animation.Update(deltaTime);
        }

        //Power pellet mode
        else if(this.behaviour == true)
        {
            this.animation = new SSAnimation(this.powerSprite, this.position, 14, 14, [2, 2], 1 / 12);
            this.animation.PlayAnimationLoop(0);

            const difX = this.pacman.position.x + this.position.x;
            const difY = this.pacman.position.y + this.position.y;
            let directionVector = new b2Vec2(difX, -difY);
            directionVector.Normalize();
            directionVector.Multiply(this.movementForce);
    
            this.body.ApplyForce(directionVector, this.body.GetWorldCenter());
    
            const currentPosition = this.body.GetPosition();
            this.animation.position.x = (currentPosition.x * scale) - 8;
            this.animation.position.y = canvas.height - (currentPosition.y * scale) - 7;
    
            this.animation.Update(deltaTime);
        }
    }

    Draw(ctx)
    {
        this.animation.Draw(ctx);        
    }

    RemoveGhost()
    {
        world.DestroyBody(this.body);
        this.body = null;
    }
}