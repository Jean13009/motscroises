var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

class Paint {
    constructor(emplacementHorizontal, emplacementVertical, nbLignes, nbColonnes, tailleCase) {
        this.emplacementHorizontal = emplacementHorizontal;
        this.emplacementVertical = emplacementVertical;
        this.nbLignes = nbLignes;
        this.nbColonnes = nbColonnes;
        this.tailleCase = tailleCase;
    }
    drawMouseSelect(grilleJoueur) {
        for (var i = 0; i < grilleJoueur.length; i++) {
           for (var j = 0; j < grilleJoueur[0].length; j++) {
              if (grilleJoueur[i][j][1] == 'r') {
                   ctx.fillStyle = 'red';
                   ctx.fillStyle = 1;
                   ctx.fillRect(this.emplacementHorizontal + j*this.tailleCase + ctx.lineWidth / 2, this.emplacementVertical + i*this.tailleCase + ctx.lineWidth / 2, this.tailleCase - ctx.lineWidth, this.tailleCase - ctx.lineWidth);
               }
             else if (grilleJoueur[i][j][1] == 'b') {
                ctx.fillStyle = 'black';
                ctx.fillRect(this.emplacementHorizontal + j*this.tailleCase + ctx.lineWidth / 2, this.emplacementVertical + i*this.tailleCase + ctx.lineWidth / 2, this.tailleCase - ctx.lineWidth, this.tailleCase - ctx.lineWidth);
             }
             else if (jeu.grilleSelect[0] == i && jeu.currentDirection == 'h') {
                ctx.fillStyle = 'pink';
                ctx.fillRect(this.emplacementHorizontal + j*this.tailleCase + ctx.lineWidth / 2, this.emplacementVertical + i*this.tailleCase + ctx.lineWidth / 2, this.tailleCase - ctx.lineWidth, this.tailleCase - ctx.lineWidth);
             }
             else if (jeu.grilleSelect[1] == j && jeu.currentDirection == 'v') {
                ctx.fillStyle = 'pink';
                ctx.fillRect(this.emplacementHorizontal + j*this.tailleCase + ctx.lineWidth / 2, this.emplacementVertical + i*this.tailleCase + ctx.lineWidth / 2, this.tailleCase - ctx.lineWidth, this.tailleCase - ctx.lineWidth);
             }
             else {
                ctx.fillStyle = 'white';
                ctx.fillRect(this.emplacementHorizontal + j*this.tailleCase + ctx.lineWidth / 2, this.emplacementVertical + i*this.tailleCase + ctx.lineWidth / 2, this.tailleCase - ctx.lineWidth, this.tailleCase - ctx.lineWidth);
             }   
            }
        }
        this.drawLetter(grilleJoueur);
    }

    drawLetter(grilleJoueur) {
        ctx.fillStyle = 'black';
        ctx.font = '44px serif';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        for (var i = 0; i < grilleJoueur[0].length; i++) {
            for (var j = 0; j < grilleJoueur.length; j++) {
                ctx.fillText(grilleJoueur[j][i][0], this.emplacementHorizontal + this.tailleCase / 2 + i*this.tailleCase, this.emplacementVertical + this.tailleCase / 1.9 + j*this.tailleCase);
             }
         }
         jeu.checkVictory();
    }

    drawDef(definitionsH, definitionsV) {
        let lettre;
        let chiffre = 0;
        ctx.clearRect ( this.emplacementHorizontal + 50 + this.nbColonnes*this.tailleCase , 0, 1000, 1000);
        ctx.fillStyle = 'black';
        ctx.font = 'bold 18px serif';
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText('HORIZONTALEMENT', this.emplacementHorizontal + 100 + this.nbColonnes*this.tailleCase, this.emplacementVertical - this.tailleCase/2);
        ctx.font = '16px serif';
        for (let i=0; i<this.nbLignes; i++) {
            if (jeu.grilleSelect[0] == i && jeu.currentDirection == 'h')
            ctx.font = 'bold 16px serif';
            chiffre++;
            ctx.fillText(chiffre+'. '+definitionsH[i], this.emplacementHorizontal + 100 + this.nbColonnes*this.tailleCase, this.emplacementVertical + i*(this.tailleCase/2));
            if (jeu.grilleSelect[0] == i)
            ctx.font = '16px serif';
        }

        ctx.fillStyle = 'black';
        ctx.font = 'bold 18px serif';
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText('VERTICALEMENT', this.emplacementHorizontal + 100 + this.nbColonnes*this.tailleCase, this.emplacementVertical + 10 + (definitionsH.length+1)*this.tailleCase/2 - this.tailleCase/2);
        ctx.font = '16px serif';
        for (let i=0; i<this.nbColonnes; i++) {
            if (jeu.grilleSelect[1] == i && jeu.currentDirection == 'v')
            ctx.font = 'bold 16px serif';
            lettre = String.fromCharCode('A'.charCodeAt(0)+i);
            ctx.fillText(lettre+'. '+definitionsV[i], this.emplacementHorizontal + 100 + this.nbColonnes*this.tailleCase, this.emplacementVertical + 10 + (definitionsH.length+1)*this.tailleCase/2 + i*(this.tailleCase/2));
            if (jeu.grilleSelect[1] == i)
            ctx.font = '16px serif';
        }
    }

    drawGrid() {

        ctx.fillStyle = 'black';
        ctx.lineWidth = 2;
        let chiffre = 0;
        let lettre;
        ctx.strokeRect(this.emplacementHorizontal, this.emplacementVertical, this.nbColonnes*this.tailleCase, this.nbLignes*this.tailleCase);
        for (let i=0; i<this.nbColonnes; i++) {
            ctx.beginPath();
            ctx.moveTo(this.emplacementHorizontal + this.tailleCase*(i+1), this.emplacementVertical);
            ctx.lineTo(this.emplacementHorizontal + this.tailleCase*(i+1), this.emplacementVertical + (this.nbLignes*this.tailleCase));
            ctx.closePath();
            ctx.stroke();
        }
        for (let i=0; i<this.nbLignes; i++) {
            ctx.beginPath();
            ctx.moveTo(this.emplacementHorizontal, this.emplacementVertical + this.tailleCase*(i+1));
            ctx.lineTo(this.emplacementHorizontal + (this.nbColonnes*this.tailleCase), this.emplacementVertical + this.tailleCase*(i+1));
            ctx.closePath();
            ctx.stroke();
        }
        for (let i=0; i<this.nbColonnes; i++) {
            lettre = String.fromCharCode('A'.charCodeAt(0)+i);
            ctx.fillStyle = 'grey';
            ctx.font = '24px serif';
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(lettre, this.emplacementHorizontal + (i*this.tailleCase) + this.tailleCase/2, this.emplacementVertical - 20);
        }
        for (let i=0; i<this.nbLignes; i++) {
            chiffre++;
            ctx.fillStyle = 'grey';
            ctx.font = '24px serif';
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(chiffre, this.emplacementHorizontal - 20, this.emplacementVertical + (i*this.tailleCase) + this.tailleCase/2);
        }
        this.drawDef(jeu.definitionsH, jeu.definitionsV);
    }


}

