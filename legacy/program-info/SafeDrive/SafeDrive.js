const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("mousemove", handleMouseMove);
});

function handleMouseMove(e) {
  const rect = this.getBoundingClientRect();
  const mouseX = e.clientX - rect.left - rect.width / 2;
  const mouseY = e.clientY - rect.top - rect.height / 2;

  let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);

  angle = (angle + 360) % 360;

  this.style.setProperty("--start", angle + 60);
}

let cursorEl = document.getElementById("cursor")
let glowEl = document.getElementById("cursor-glow");
document.addEventListener('mousemove', (e) => {
    cursorEl.style.top = e.clientY + 'px'
    cursorEl.style.left = e.clientX + 'px'
   

})

let c = 0

function switchTheme(event) {
  let bodyEl = document.body
  let cardEl = document.getElementsByClassName("card")
  let pEl = document.querySelectorAll("p")
  console.log(c)
  if (c===0) {
      bodyEl.style.backgroundColor = "#ffffff"
     
      c = 1
  }
  else {
    bodyEl.style.backgroundColor = "#0f0f0f"
    c= 0
  }    
}







