class Enemy {
  constructor(x, y) {
    //Tilfældig position
    this.position = createVector(random(0, width), random(0, height));
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.diameter = 20;
    this.maxSpeed = 1;
    this.maxForce = 0.1;
    this.desiredSeperation = 50;
  }
  
  ApplyForce(force) {
    this.acceleration.add(force);
  }
  
  Update() {    
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    
    this.position.add(this.velocity);
    
    this.acceleration.mult(0); //Nulstil hver kræft for hver frame
    
    //Første sværhedsgradsstigning
    if(player.score >= 10) {
      this.maxSpeed = 1.2; //0,2 mere i fart
      this.maxForce = 0.2; //0,1 mere i svingfart
    }
    
    //Anden sværhedsgradsstigning
    if(player.score >= 25) {
      this.maxSpeed = 1.4; //0,2 mere i fart
      this.maxForce = 0.3; //0,1 mere i svingfart
    }
  }
  
  Move() {
    //Sikre en tilfældig acceleration vha. en tilfædlig enhedsvektor
    let randomMovement = p5.Vector.random2D();
    randomMovement.mult(0.1);
    
    this.ApplyForce(randomMovement)
  }
  
  Seek(target) {
    let desired = p5.Vector.sub(target.position, this.position);
    desired.setMag(this.maxSpeed);
    
    let steering = p5.Vector.sub(desired, this.velocity);
    steering.limit(this.maxForce);
    
    this.ApplyForce(steering);
  }
  
  Seperate(others) {
    let steering = createVector(0, 0);
    
    for(let other of others) {
      let distance = p5.Vector.dist(this.position, other.position);
      
      if(other != this && distance < this.desiredSeperation) {
        let desired = p5.Vector.sub(this.position, other.position);
        desired.div(distance);
        
        steering.add(desired);
        steering.limit(this.maxForce);
      }
    }
    
    this.ApplyForce(steering);
  }
  
  Show() {
    push(); //Sørger for at kende alle andre indstillinger
    
    //Dette sørger for at den ikke kan køre ud af højre og venstre side
    let X = this.position.x;
    let constrainX = constrain(X, 0, width - this.diameter / 2); 
    
    //Dette sørger for at den ikke kan køre ud af toppen og bunden
    let Y = this.position.y;
    let constrainY = constrain(Y, 0, height - this.diameter / 2);
    
    fill(255, 255, 0);
    circle(constrainX, constrainY, this.diameter);
    
    pop(); //Sørger for at kunne gendanne alle andre indstillinger, hvis de er rodet med, da der er brugt push()
  }
  
  Collision() {
    //Distance mellem figurernes centrum findes 
    let distance = 
    dist(this.position.x, this.position.y, player.position.x + player.size / 2, player.position.y + player.size / 2);
    
    //Collision ved figurernes kanter tjekkes
    if(distance <= this.diameter + player.size / 2 && player.cooldown === false) {
      player.cooldown = true; //Cooldown aktiveres
      player.lastTimeHit = millis(); //Gemmer tid for hit
      
      player.hp--;
    }
  }
}
