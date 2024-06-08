type Crop = {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  
  const setCanvasPreview = (
    image: HTMLImageElement,
    canvas: HTMLCanvasElement,
    crop: Crop
  ): void => {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error("No 2d Context");
    }
  
    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
  
    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);
  
    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = "high";
    ctx.save();
  
    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;
  
    ctx.translate(-cropX, -cropY);
    ctx.drawImage(
      image,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight
    );
    ctx.restore();
  };
  
  export default setCanvasPreview;
  