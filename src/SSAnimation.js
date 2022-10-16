class SSAnimation
{
    constructor(image, position, frameWidth, frameHeight, frameCount, framesDuration)
    {
        this.image = image;
        this.position = position;

        this.framesDuration = framesDuration;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.frameCount = frameCount;
        this.actualAnimation = 0;
        this.actualFrame = 0;
        this.actualFrameCountTime = 0;

        this.loop = false;
        this.active = false;
        this.audioTimer = 0.0;
        this.clickedState = false;
    }

    Update(deltaTime)
    {
        if (this.active)
        {
            this.actualFrameCountTime += deltaTime;
            if (this.actualFrameCountTime >= this.framesDuration)
            {
                // update the animation with the new frame
                this.actualFrame = (this.actualFrame + 1) % this.frameCount[this.actualAnimation];
    
                this.actualFrameCountTime = 0;
            }
        }
    }

    Draw(ctx)
    {
        ctx.drawImage(this.image, this.actualFrame * this.frameWidth, this.actualAnimation * this.frameHeight, this.frameWidth, this.frameHeight, this.position.x, this.position.y, this.frameWidth, this.frameHeight);
    }

    PlayAnimationLoop(animationId, reset = true)
    {        
        this.actualAnimation = animationId;

        this.loop = true;
        this.active = true;

        if (reset)
        {
            // reset the frame count
            this.actualFrame = 0;
            this.actualFrameCountTime = 0;
        }
    }

    PlayFullSS(loop)
    {
        // reset the frame count
        this.actualFrame = 0;
        this.actualFrameCountTime = 0;
        this.actualAnimation = 0;

        this.loop = loop;
        this.active = true;
    }
}