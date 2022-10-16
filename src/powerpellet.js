class PowerPellet
{
    constructor(sprite, initialPosition)
    {
        this.sprite = sprite.image;
        this.pickState = false;
        this.positionX = initialPosition.x;
        this.positionY = initialPosition.y;
        this.body = CreateBox(world, this.positionX, this.positionY, .09, .09, { type : b2Body.b2_kinematicBody, isSensor: true, userData: this });
        this.toDeletePower = false;
        this.timerPowerPellet = 0;
        this.powerUpStatus = false;
    }

    Update(deltaTime)
    {
        if(this.powerUpStatus)
        {
            this.powerUpTimer += deltaTime;
        }
    }

    Draw(ctx)
    {
        ctx.drawImage(this.sprite, 5, 0, 12, 12, this.positionX * scale - 3, canvas.height - this.positionY * scale - 4, 12, 12);
    }

    RemovePowerPellet()
    {
        world.DestroyBody(this.body);
        this.body = null;
    }
}