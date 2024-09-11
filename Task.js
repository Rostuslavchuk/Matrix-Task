

/* 
    я мав досвід з розробки такого функціоналу створюючи шахмати 
    спосіб полягає в тому, шо я використовую matrix з кординатами 
    x,y, і ми через direction(-1, 1) вказуємо рух від вказаної клітинки 
    перевіряючи на схожість і чи ми не виходимо за матрицю і так рухаємо допоки 
    не перевіримо всі ті які в одному кроці від потрібного

    Приклад поля, його можна динамічно змінювати 
    [
        [1, 2, 0, 5, 6, 2],
        [3, 9, 0, 7, 6, 1],
        [7, 0, 0, 9, 7, 0],
        [2, 0, 0, 0, 0, 8],
        [3, 0, 0, 0, 5, 6],
        [9, 7, 0, 0, 1, 2],
        [1, 1, 1, 6, 7, 8],
    ]


    я планую задавати кординати потрібної клітинки і отримувати всі які є схожі і в відстані на 1 від заданої 
    рухаючись по наступним які будуть задовіл
*/ 


const board = 
[
    [1, 2, 0, 5, 6, 2],
    [3, 9, 0, 7, 6, 1],
    [7, 0, 0, 9, 7, 0],
    [2, 0, 0, 0, 0, 8],
    [3, 0, 0, 0, 5, 6],
    [9, 7, 0, 0, 1, 2],
    [1, 1, 1, 6, 7, 8],
]
const cordinates = {x: 2, y: 3};


class CompareAndFindCeils {

    board = null; 
    cordinates = {x: 0, y: 0};
    ceils = [];

    #STEP = 1;
    #DIRECTIONS = [ // тут тільки вперед-назад, ліво-право
        {x: 0, y: -1}, 
        {x: 0, y: 1}, 
        {x: 1, y: 0}, 
        {x: -1, y: 0}
    ];

    constructor(board, cordinates){ // задаємо для пошуку
        this.board = board; 
        this.cordinates = cordinates;
    }

    findSimilar(){
        const valueToCompare = this.board[this.cordinates.y][this.cordinates.x]; // тут невелика примітка я написав [y][x] бо в матриці працює це так, шо 1 кордината 
        // це висота
    
        const startCeils = this.ceils.length ? this.ceils : [{x: this.cordinates.x, y: this.cordinates.y}];
        // тут просто якшо ми 1-ий раз заходимо тобто для заданої кординати ми біжимо по ній, а якшо є в масиві
        // this.ceils то ми біжимо далі і знаходимо наступні 
    
        let foundNewCeils = false;
    
        for (let i = 0; i < startCeils.length; i++) {
            for (const direction of this.#DIRECTIONS) {
                let nX = startCeils[i].x + direction.x * this.#STEP;
                let nY = startCeils[i].y + direction.y * this.#STEP;
    
                if (nX >= 0 && nX < this.board[0].length && nY >= 0 && nY < this.board.length) { // перевірка чи ми знаходимися в межах матриці
                    if (this.board[nY][nX] === valueToCompare) { // перевірка значення 
                        
                        if (!this.ceils.some(ceil => ceil.x === nX && ceil.y === nY)) { // перевіока на унікальність
                            this.ceils.push({x: nX, y: nY});
                            foundNewCeils = true; 
                        }

                    }
                }
            }
        }
    
        if (foundNewCeils) { // якщо є ше однакові і які задовіл умови ми використовуємо рекурсію
            this.findSimilar();
        }
    
        return this.ceils;
    }
    
}

const compareAndFindCeils = new CompareAndFindCeils(board, cordinates);
console.log(compareAndFindCeils.findSimilar());

