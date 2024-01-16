var ancho = 0
var altura = 500
var contador_de_saltos = 0
var vidas = 3
var respawn =""
var estado_juego="jugando"
function preload() {
    flecha = loadAnimation("frame_00_delay-0.05s (1).gif", "frame_01_delay-0.05s.gif", "frame_02_delay-0.05s.gif", "frame_03_delay-0.05s.gif", "frame_04_delay-0.05s.gif", "frame_05_delay-0.05s.gif", "frame_05_delay-0.05s.gif", "frame_06_delay-0.05s.gif", "frame_07_delay-0.05s.gif", "frame_08_delay-0.05s.gif", "frame_09_delay-0.05s.gif", "frame_10_delay-0.05s.gif", "frame_11_delay-0.05s.gif", "frame_12_delay-0.05s.gif", "frame_13_delay-0.05s.gif", "frame_14_delay-0.05s.gif", "frame_15_delay-0.05s.gif", "frame_16_delay-0.05s.gif", "frame_17_delay-0.05s.gif", "frame_18_delay-0.05s.gif")
    creeperCaminando = loadAnimation("creeper1.png", "creeper2.png")
    creeper_chiquito = loadAnimation("cc1.png", "cc2.png")
    fondo = loadImage("Minecraft-video-games-2197039-wallhere.com.jpg")
    cactusdecactus = loadImage("Cactus_BE3.webp")
    nopal = loadImage("nopal.png")
    corazones = loadImage("vidas.png")
    explosion = loadAnimation("explosion0.png", "explosion1.png", "explosion2.png", "explosion3.png", "explosion4.png", "explosion5.png", "explosion6.png", "explosion7.png")
    respawnimg = loadImage("respawn.png")
}
function setup() {
    ancho = windowWidth
    Canvas = createCanvas(ancho, altura)
    backroom = createSprite(ancho / 2, altura / 2, ancho, altura)
    backroom.velocityX = -4
    backroom.addImage(fondo)
    backroom2 = createSprite(ancho + ancho / 2, altura / 2, ancho, altura)
    backroom2.addImage(fondo)
    backroom2.velocityX = -4
    backroom2.mirrorX(-1)
    fondo.resize(ancho, altura)
    jugador = createSprite(200, 265, 50, 50)
    jugador.shapeColor = "red"
    jugador.addAnimation("creeperCaminando", creeperCaminando)
    jugador.addAnimation("creeper_chiquito", creeper_chiquito)
    jugador.addAnimation("creeper_explosion", explosion)
    grupoCactus = createGroup()
    grupoFlechas = createGroup()
    grupoCorazones = createGroup()
    suelo = createSprite(ancho / 2, 370, ancho * 3, 15)
    suelo.visible = 0
    jugador.debug = 0
    bordes = createEdgeSprites()
    for (let index = 0; index < vidas; index++) {
        corazon = createSprite(index * 100 + 100, 50, 50)
        corazon.addAnimation("corazones", corazones)
        corazon.scale = 0.2
        grupoCorazones.add(corazon)
    }
  
}
function draw() {
    drawSprites()
    jugador.velocityY = jugador.velocityY + 0.6
    jugador.collide(suelo, reinicio_salto)
    if (keyWentUp("UP_ARROW") && contador_de_saltos <= 1) {
        contador_de_saltos++
        jugador.velocityY = -12
    }
    if (keyDown("RIGHT_ARROW")) {
        jugador.x = jugador.x + 20
        jugador.mirrorX(1)
        jugador.changeAnimation("creeperCaminando", creeperCaminando)
    }
    if (keyDown("LEFT_ARROW")) {
        jugador.x = jugador.x - 20
        jugador.changeAnimation("creeperCaminando", creeperCaminando)
        jugador.mirrorX(-1)
    }
    if (keyDown("DOWN_ARROW")) {
        jugador.changeAnimation("creeper_chiquito")
    }
    if (backroom.x < -ancho / 2) {
        backroom.x = ancho + ancho / 2
    } if (backroom2.x < -ancho / 2) {
        backroom2.x = ancho + ancho / 2
    }
    if (frameCount % 100 == 0) {
        cactus = createSprite(random(ancho, ancho * 2), 330, 20, 20)
        cactus.velocityX = random(-2, -10)
        cactus.lifetime = 500
        r = random(1, 3)
        cactus.debug = 0
        if (r < 2) {
            cactus.addImage(cactusdecactus)
            cactus.scale = 0.4
            cactus.setCollider("circle", 0, 0, 120)
            cactus.depth=2
        } else {
            cactus.addImage(nopal)
            cactus.scale = 0.3
            cactus.y = 300
            cactus.depth=4
        }
        grupoCactus.add(cactus)
    }
    if (frameCount % 200 == 0) {
        aguas_con_la_flecha = createSprite(random(ancho, ancho * 2), 200, 20, 20)
        aguas_con_la_flecha.velocityX = random(-8, -15)
        aguas_con_la_flecha.addAnimation("flecha", flecha)
        aguas_con_la_flecha.scale = 0.7
        aguas_con_la_flecha.lifetime = 400
        grupoFlechas.add(aguas_con_la_flecha)
        aguas_con_la_flecha.debug = 0
        aguas_con_la_flecha.setCollider("rectangle", 0, 0, 130, 30)
        aguas_con_la_flecha.depth=3
    }
    jugador.collide(bordes)
    jugador.overlap(grupoFlechas, headshot)
    jugador.overlap(grupoCactus, astilla)
    if (estado_juego=="jugando"&&jugador.getAnimationLabel() == "creeper_explosion" && jugador.animation.getFrame() == jugador.animation.getLastFrame()) {
        jugador.destroy()
        respawn=createSprite(ancho/2,altura/2,100,50)
        respawn.addImage(respawnimg)
        respawn.scale=0.5
        console.log("=(")
        estado_juego="gameover"

    }
    if (estado_juego=="gameover"&&mousePressedOver(respawn)) {
       respawn.destroy()
        jugador = createSprite(200, 265, 50, 50)
    jugador.addAnimation("creeperCaminando", creeperCaminando)
    jugador.addAnimation("creeper_chiquito", creeper_chiquito)
    jugador.addAnimation("creeper_explosion", explosion)
    vidas=3
    for (let index = 0; index < vidas; index++) {
        corazon = createSprite(index * 100 + 100, 50, 50)
        corazon.addAnimation("corazones", corazones)
        corazon.scale = 0.2
        grupoCorazones.add(corazon)
    }
    estado_juego="jugando"
    }

}
function reinicio_salto() {
    contador_de_saltos = 0
}
function astilla(jugador, cactus) {
    cactus.destroy()
    vidas--
    if (vidas <= 0) {
        jugador.changeAnimation("creeper_explosion")
        jugador.animation.looping = false
    }
    if (grupoCorazones.length > 0) {
        grupoCorazones.get(grupoCorazones.length - 1).destroy()

    }

}
function headshot(jugador, flecha) {
    flecha.destroy()
    vidas--
    if (vidas <= 0) {
        jugador.changeAnimation("creeper_explosion")
        jugador.animation.looping = false
        
    }
    if (grupoCorazones.length > 0) {
        grupoCorazones.get(0).destroy()

    }

}
function perdiste() {
    fill("red")
    rect(0,0,ancho,altura)
}