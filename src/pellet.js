class Pellet
{
    constructor(sprite, initialPosition)
    {
        this.sprite = sprite.image;
        this.pickState = false;
        this.positionX = initialPosition.x;
        this.positionY = initialPosition.y;
        this.body = CreateBox(world, this.positionX, this.positionY, .03, .03, { type : b2Body.b2_kinematicBody, isSensor: true, userData: this });
        this.toDelete = false;
    }

    Update(deltaTime)
    {

    }

    Draw(ctx)
    {
        console.log();
        ctx.drawImage(this.sprite, 0, 0, 5, 8, this.positionX * scale, canvas.height - this.positionY * scale - 4, 5, 8);
    }

    RemovePellet()
    {
        world.DestroyBody(this.body);
        this.body = null;
    }
}