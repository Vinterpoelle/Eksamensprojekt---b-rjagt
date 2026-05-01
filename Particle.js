class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(1, 5));
    this.diameter = 5;
    this.life = 255;
    this.lifeLost = 5;
  }
  
  Update() {
    this.position.add(this.velocity);
    
    this.life = this.life - this.lifeLost;
  }
  
  Show() {
    push(); //Sørger for at kende alle andre indstillinger
    
    noStroke()
    fill(255, 0, 0, this.life);
    circle(this.position.x, this.position.y, this.diameter);
    
    pop(); //Sørger for at kunne gendanne alle andre indstillinger, hvis de er rodet med, da der er brugt push()
  }
  
  Burnedout() {
    return this.life <= 0;
  }
}
