class Listener {

    constructor() {
        this.mouseX = 0;
        this.mouseY = 0;
        this.keyPressed = '';
    }

    mouseListener () {
        canvas.addEventListener('mousedown', e => {
            var BB=canvas.getBoundingClientRect();
            let mouseXpos = Math.floor((e.clientX-BB.left - jeuDraw.emplacementHorizontal) / jeuDraw.tailleCase);
            let mouseYpos = Math.floor((e.clientY-BB.top - jeuDraw.emplacementVertical) / jeuDraw.tailleCase);
            if(e.clientX-BB.left >= 0 && e.clientX-BB.left  <= jeuDraw.tailleCase && e.clientY-BB.top >= 0 && e.clientY-BB.top <= jeuDraw.tailleCase) {
            jeu.decouvrirCase();
            console.log('ok');
            }
            if (mouseXpos >= 0 && mouseXpos < jeuDraw.nbColonnes && mouseYpos >= 0 && mouseYpos < jeuDraw.nbLignes) {
            jeu.majGrilleSelect(mouseXpos, mouseYpos);
            }
          });
    }
    

    keyListener () {
        window.addEventListener('keydown', e => {
            if(e.keyCode >= 65 && e.keyCode <= 90) {
            this.keyPressed = e.key.toUpperCase();
            jeu.majGrilleJoueur(this.keyPressed);
            }
            if(e.keyCode == 8) {
                jeu.majGrilleJoueur(e.key);
            }
        });
    }

    
}