
class coreGame {
    constructor(grilleComplete, grilleJoueur, definitionsH, definitionsV) {
        this.grilleComplete = [
            ['P','A','R','A','S','O','L','S'],
            ['U','P','E','R','I','S','E','E'],
            ['A','I','M','A','N','T','E','R'],
            ['N',0,'U','S','E','E',0,'F'],
            ['T','E','E',0,'C','N','R','S'],
            ['E','N',0,'B','U','T','E',0],
            [0,'S','A','U','R','A','G','E'],
            ['S','I','G','N','E','T',0,'P'],
            ['A','L','I',0,'S','O','L','I'],
            ['B','E','T','A',0,'I','O','N'],
            ['O',0,'A','C','C','R','U','E'],
            ['T','A',0,'E','P','E','E','S']
        ];
        this.definitionsH = [
            "Il nous font de l'ombre.",
            "Stérilisée à la vapeur.",
            "Magnétiser",
            "Abimée, rapée",
            "Instrument de golfeur. Groupe de chercheurs.",
            "Indique la manière ou la matière. Obstiné dans son refus",
            "Séchage du hareng.",
            "Marque-page.",
            "Baba dans un conte. Morceaux exécutés non accompagné.",
            "Ballot, et souvent gros. Atome chargé.",
            "Amplifiée.",
            "A toi. Armes de fleurettistes."
        ];
        this.definitionsV = [
            "Nauséabonde. Galoche",
            "Variété de pomme (d'). Stocke des fourrages verts.",
            "Ne tient pas en place. Secoua.",
            "Grands oiseaux exotiques. Petit pain Anglais. Coup au tennis.",
            "Emplois convoités. Cours après la maternelle.",
            "Qui se voit trop.",
            "Général orienté au sud. Désert de cailloux. Pris à bail.",
            "Paysans du Moyen Age. Attributs de roses"
        ];
        
        var arr = [];
        var rows = 12;
        var columns = 8;
        for (var i = 0; i < rows; i++) {
            arr.push([0])
            for (var j = 0; j < columns; j++) {
                if (this.grilleComplete[i][j] == 0)
                arr[i][j] = ['', 'b'];
                else
                arr[i][j] = ['', 'w'];
            }
        }
        this.grilleJoueur = arr;
        this.grilleSelect = ['Nan', 'Nan'];
        this.currentDirection = 'h';
        
    }
    
    checkGridLimitH(Pos) {
        if (Pos < 8 && Pos >= 0 )
        return true;
        else
        return false;
    }
    
    checkGridLimitV(Pos) {
        if (Pos < 12 && Pos >= 0 )
        return true;
        else
        return false;
    }
    
    decouvrirCase () {
        if (this.grilleSelect[1] != 'Nan') {
            let keyPress = '';
            keyPress = this.grilleComplete[this.grilleSelect[0]][this.grilleSelect[1]];
            this.majGrilleJoueur(keyPress);
        }
        
    }
    
    majGrilleSelect (x, y) {
        if (this.grilleSelect[1] != 'Nan')
        this.grilleJoueur[this.grilleSelect[0]][this.grilleSelect[1]][1] = 'w';
        if (this.grilleComplete[y][x] == 0)
        return;
        if (this.grilleSelect[0] == y && this.grilleSelect[1] == x && this.currentDirection == 'h'){
            this.currentDirection = 'v';
        }
        else
        this.currentDirection = 'h';
        this.grilleSelect  = [y, x];
        this.grilleJoueur[y][x][1] = 'r';
        jeuDraw.drawMouseSelect(this.grilleJoueur);
        jeuDraw.drawDef(this.definitionsH, this.definitionsV);
    }
    
    
    moveCursorH(cursor) {
        if (this.checkGridLimitH([this.grilleSelect[1] + cursor])) {
            if (this.grilleComplete[this.grilleSelect[0]][this.grilleSelect[1] + cursor] == 0){
                this.moveCursorH(cursor*2);
            }
            else {
                this.grilleJoueur[this.grilleSelect[0]][this.grilleSelect[1]][1] = 'w';
                this.grilleSelect[1] = this.grilleSelect[1] + cursor;
                this.grilleJoueur[this.grilleSelect[0]][this.grilleSelect[1]][1] = 'r';
                jeuDraw.drawMouseSelect(this.grilleJoueur);
            }
        }
        else {
            jeuDraw.drawMouseSelect(this.grilleJoueur);
        }
    }
    
    moveCursorV(cursor) {
        if (this.checkGridLimitV([this.grilleSelect[0] + cursor])) {
            if (this.grilleComplete[this.grilleSelect[0] + cursor][this.grilleSelect[1]] == 0){
                this.moveCursorV(cursor*2);
            }
            else {
                this.grilleJoueur[this.grilleSelect[0]][this.grilleSelect[1]][1] = 'w';
                this.grilleSelect[0] = this.grilleSelect[0] + cursor;
                this.grilleJoueur[this.grilleSelect[0]][this.grilleSelect[1]][1] = 'r';
                jeuDraw.drawMouseSelect(this.grilleJoueur);
            }
        }
        else {
            jeuDraw.drawMouseSelect(this.grilleJoueur);
        }
    }
    
    majGrilleJoueur (keyPressed) {
        let cursor = 1;
        if(keyPressed == 'Backspace'){
            this.grilleJoueur[this.grilleSelect[0]][this.grilleSelect[1]][0] = '';
            if (this.currentDirection == 'h' && this.checkGridLimitH([this.grilleSelect[1] - 1])) {
                this.grilleJoueur[this.grilleSelect[0]][this.grilleSelect[1] - 1][0] = '';
            }
            else if (this.currentDirection == 'v' && this.checkGridLimitV([this.grilleSelect[0] - 1])) {
                this.grilleJoueur[this.grilleSelect[0] - 1][this.grilleSelect[1]][0] = '';
            }
            cursor = -1;
        }
        else
        this.grilleJoueur[this.grilleSelect[0]][this.grilleSelect[1]][0] = keyPressed;
        if (this.currentDirection == 'h')
        this.moveCursorH(cursor);
        else if (this.currentDirection == 'v')
        this.moveCursorV(cursor);
    }
    
    checkVictory () {
        let win = 1;
        for (var i = 0; i < this.grilleComplete.length; i++) {
            for (var j = 0; j < this.grilleComplete[0].length; j++) {
                if (this.grilleComplete[i][j] != this.grilleJoueur[i][j][0] && this.grilleComplete[i][j] != 0){
                    win = 0;
                }
            }
        }
        if (win)
        alert('Grille complétée');
    }
    
    start () {
        jeuDraw.drawGrid();
        jeuListener.mouseListener();
        jeuListener.keyListener();
        jeuDraw.drawMouseSelect(this.grilleJoueur);
    }
    
}

let jeu = new coreGame();
let jeuListener = new Listener();
let jeuDraw = new Paint(80, 80, 12, 8, 60);
jeu.start();
