class Player {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.size = 20;
    this.speed = 1.5;
    this.score = 0;
    this.hp = 3;
    this.maxHP = 3;
    this.cooldown = false;
    this.lastTimeHit = 0;
    this.cooldownDuration = 1000; //Cooldown på 1 sekund
    this.opacity = 255;
    this.strawberriesCount = 0;
    this.strawberriesToHP = 5;
    this.hpGained = false; //Klar til at samle liv
    this.lastTimeHpGained = 0;
    this.showHpTextDuration = 1000; //Tid +1 HP tekst vil vises
  }
  
  Update() {
    //Tjekker om cooldown er aktiveret og der lang nok tid ift. hit
    if(this.cooldown === true && millis() - this.lastTimeHit >   this.cooldownDuration) {
      
      //Cooldown deaktiveres, så den kan rammes igen
      this.cooldown = false;
    }
    
    //Tjekker om der er samlet nok jordbær til et liv mere
    if(this.strawberriesCount === this.strawberriesToHP) {
      this.hp++;
      this.hpGained = true;
      this.strawberriesCount = 0;
      this.lastTimeHpGained = millis();
    }
    
    //Tjekker om der er skaffet et nyt liv
    if(this.hpGained === true && millis() - this.lastTimeHpGained > this.showHpTextDuration) {
      
      this.hpGained = false; //Nulstiller, så der kan skaffes flere liv
    }
  }
  
  Move() {
    if(keyIsDown(87) === true) {
      this.position.y = this.position.y - this.speed; //W-tasten kører opad
    }
    if(keyIsDown(65) === true) {
      this.position.x = this.position.x - this.speed; //A-tasten kører til venstre
    }
    if(keyIsDown(83) === true) {
      this.position.y = this.position.y + this.speed; //S-tasten kører nedad
    }
    if(keyIsDown(68) === true) {
      this.position.x = this.position.x + this.speed; //D-tasten kører til højre
    }
  }
  
  Show() {
    push(); //Sørger for at kende alle andre indstillinger
    
    //Dette sørger for at den ikke kan køre ud af højre og venstre       side
    let X = this.position.x;
    let constrainX = constrain(X, 0, width - this.size); 
    
    //Dette sørger for at den ikke kan køre ud af toppen og bunden
    let Y = this.position.y;
    let constrainY = constrain(Y, 0, height - this.size);
    
    fill(0, 0, 255, this.opacity);
    rect(constrainX, constrainY, this.size, this.size);
    
    
    //Ændrer opacity for at vise cooldown er aktiv
    if(this.cooldown === true) {
      this.opacity = 150;
    } else {
      this.opacity = 255;
    }
    
    //Viser når man har fået et liv mere
    if(this.hpGained === true) {
      textSize(18);
      fill(255, 165, 0);
      text("+1 HP", this.position.x, this.position.y);
    }
    
    pop(); //Sørger for at kunne gendanne alle andre indstillinger, hvis de er rodet med, da der er brugt push()
  }
  
  Collision() {
    //For-loop der sørger for at den tjekker collsion for alle           strawberries
    for(let i = strawberries.length - 1; i >= 0; i--) {
      let strawberry = strawberries[i];
      
      if(this.position.y < strawberry.y + strawberry.size && 
         this.position.x + this.size > strawberry.x && 
         this.position.y + this.size > strawberry.y && 
         this.position.x < strawberry.x + strawberry.size) {
        
        //Jordbæret forsvinder og popper op igen
        strawberries.splice(i,1);
        strawberries.push(new Strawberry())
        
        this.score++;
        
        //Hvis man ikke har alle liv, så starter tælleren mod et nyt
        if(this.hp < this.maxHP) {
          this.strawberriesCount++;
        }
        
        //Spytter partikler 16 partikler ud for hver spist jordbær
        for(let j = 0; j <= 15; j++) {
          particles.push(new Particle(player.position.x, player.position.y));
        }
      }
    }
  }
}
