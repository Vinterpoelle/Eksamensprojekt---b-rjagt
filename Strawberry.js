class Strawberry {
  constructor(x,y) {
    this.size = 15;
    this.x = random(rectX + sizeX , width - this.size);
    this.y = random(rectY + sizeY, height - this.size);
  }
  
  Show() {
    image(strawberryImage, this.x, this.y, this.size, this.size);
  }
}
