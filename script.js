document.addEventListener('DOMContentLoaded', () => {

    const griddisplay = document.querySelector('.grid')
    const scoredisplay = document.querySelector('.scoreboard')
    const resultdisplay = document.querySelector('.result')

    let squares = []
    let previousMove =[]
    let totalscore = 0;
    function createboard() {
        
        for (i = 0; i < 16; i++) {
            let square = document.createElement('div')  //creating 16 div 
            square.innerHTML = 0
            square.classList.add('cell')   //adding cell class to each square
            griddisplay.appendChild(square)
            squares.push(square)         // pushed all the grids in square array
        }
        generaterandom()          // generating 2 random numbers at game start
        generaterandom()
        previousMove = [...squares]
        console.log(previousMove)
    }
    createboard()      // creating the board for the first time
    const cells = document.querySelectorAll('.cell')
    updatecolor() // updating colors after game initialization

    function generaterandom() {
        var randgrid = Math.floor(Math.random() * 16)
        var randnum = Math.random() > 0.3 ? 2 : 4;
        
        if (squares[randgrid].innerHTML == 0) {
            squares[randgrid].innerHTML = randnum  // generate a number and store it in an empty square otherwise choose another square
        }
        else
            generaterandom();    

    }


    function checklost() {
        let zeroremaining = 0 //check the number of empty boxes

        for (i = 0; i < 16; i++) {
            if (squares[i].innerHTML == 0)
                zeroremaining++
        }

        let nomovesleft = true;

        if (zeroremaining == 0 ) {

            for (i = 0; i < 15; i += 4) {
                for (j = i; j < i + 3; j++) {
                    if (squares[j].innerHTML == squares[j + 1].innerHTML) {
                      nomovesleft = false;
                    }
                }
            }
            for (i = 0; i < 4; i++) {
                for (j = i; j < 12; j += 4) {
                    if (squares[j].innerHTML == squares[j + 4].innerHTML) {
                       nomovesleft = false;
                    }
                }
            }
            if(nomovesleft)
            {
                $('#myModal').on('shown.bs.modal', function () {
                    $('#myInput').trigger('focus')
                  })
                resultdisplay.innerHTML = "You Lost"
            }
            
            // let newgame = document.createElement('button')
            // newgame.innerHTML = "new game"
        }

    }


    function move(direction) {

        let col = [0, 4, 8, 12]
        let row = [0, 1, 2, 3]
        let dir = []
        let totalchange = 0
        totalscore=0


        if (direction == 1 || direction == -1) {
            dir = [...col]
        }
        else
            dir = [...row]

        for (i = 0; i < 4; i++) {
            let row = []
            for (j = 0; j < 4; j++) {
                if (direction == 1 || direction == -1)
                    row.push(parseInt(squares[i + dir[j]].innerHTML))
                else
                    row.push(parseInt(squares[i * 4 + j].innerHTML))

            }

            let filrow = row.filter(num => num)
            let zeronumber = 4 - filrow.length
            let zeros = Array(zeronumber).fill(0)
            let newrow = [];
            if (direction == -1 || direction == -2) //down swipe and right swipe
                newrow = zeros.concat(filrow)
            else //up swipe and left swipe
                newrow = filrow.concat(zeros)


            for (j = 0; j < 4; j++) {
                totalscore += newrow[j]
                if (direction == 1 || direction == -1)
                    squares[i + dir[j]].innerHTML = newrow[j]
                else
                    squares[i * 4 + j].innerHTML = newrow[j]
            }
            if (JSON.stringify(row) != JSON.stringify(newrow)) {
                
                totalchange++
            }
        }
        scoredisplay.innerHTML = Math.floor(totalscore )
        return totalchange
    }


    function combineleft() {
        for (i = 0; i < 15; i += 4) {
            for (j = i; j < i + 3; j++) {
                if (squares[j].innerHTML == squares[j + 1].innerHTML) {
                    squares[j].innerHTML = 2 * parseInt(squares[j].innerHTML)
                    squares[j + 1].innerHTML = 0
                    j++
                }
            }
        }
    }
    function combineright() {
        for (i = 3; i < 16; i += 4) {
            for (j = i; j > i - 3; j--) {
                if (squares[j].innerHTML == squares[j - 1].innerHTML) {
                    squares[j].innerHTML = 2 * parseInt(squares[j].innerHTML)
                    squares[j - 1].innerHTML = 0
                    j--
                }
            }
        }
    }
    function combineup() {
        for (i = 0; i < 4; i++) {
            for (j = i; j < 12; j += 4) {
                if (squares[j].innerHTML == squares[j + 4].innerHTML) {
                    squares[j].innerHTML = 2 * parseInt(squares[j].innerHTML)
                    squares[j + 4].innerHTML = 0
                    j += 4
                }
            }
        }
    }
    function combinedown() {
        for (i = 12; i < 16; i++) {
            for (j = i; j > 3; j -= 4) {
                if (squares[j].innerHTML == squares[j - 4].innerHTML) {
                    squares[j].innerHTML = 2 * parseInt(squares[j].innerHTML)
                    squares[j - 4].innerHTML = 0
                    j -= 4
                }
            }
        }
    }
    let changes;

    function swipe(key) {
        changes = move(key)
        checklost()
        switch (key) {
            case -1:
                combinedown()
                break;
            case 1:
                combineup()
                break;
            case 2:
                combineleft()
                break;
            case -2:
                combineright()
                break;
        }
        move(key)
        if (changes)  //only generate new number iff there are any changes 
            generaterandom()
    }

    function updatecolor() {
        let cellarray = Array.from(cells)
        cellarray.forEach(cell => {
            let classname = parseInt(cell.innerHTML)
            let color;
            let font;
            switch (parseInt(cell.innerHTML)) {
                case 0:
                    color = "287271"
                    font = "287271"
                    break;
                case 2:
                    color = "8AB17D"
                    font = "003"
                    break;
                case 4:
                    color = "BABB74"
                    font = "000"
                    break;
                case 8:
                    color = "E9C46A"
                    font = "000"
                    break;
                case 16:
                    color = "EFB366"
                    font = "000"
                    break;
                case 32:
                    color = "F4A261"
                    font = "fff"
                    break;
                case 64:
                    color = "EE8959"
                    font = "fff"
                    break;
                case 128:
                    color = "E45C3A"
                    font = "fff"
                    break;
                case 256:
                    color = "E66B4C"
                    font = "fff"
                    break;
                case 512:
                    color = "E8785C"
                    font = "fff"
                    break;
                case 1024:
                    color = "B33819"
                    font = "fff"
                    break;
                case 2048:
                    color = "cc4e14"
                    font = "fff"
                default:
                    color = "776e65"
                    font = "fff"
            }
            cell.style.backgroundColor = `#${color}`
            cell.style.color = `#${font}`

        })
    }
    function keypress(e) {

        if (e.keyCode == 39) //right
            swipe(-2)
        if (e.keyCode == 37) //left
            swipe(2)
        if (e.keyCode == 38) //up key
            swipe(1)
        if (e.keyCode == 40) //down key
            swipe(-1)

        updatecolor()
    }


    document.addEventListener('keyup', keypress)

    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);

    var xDown = null;
    var yDown = null;

    function getTouches(evt) {
        return evt.touches ||             // browser API
            evt.originalEvent.touches; // jQuery
    }

    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    };

    function handleTouchMove(evt) {
        if (!xDown || !yDown) {
            return;
        }
        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
            if (xDiff > 0) {
                /* left swipe */
                swipe(2)
                updatecolor()
            } else {
                /* right swipe */
                swipe(-2)
                updatecolor()
            }
        } else {
            if (yDiff > 0) {
                /* up swipe */
                swipe(1)
                updatecolor()
            
            } else {
                /* down swipe */
                evt.preventDefault();
                swipe(-1)
                updatecolor()
            
            }
        }
        /* reset values */
        xDown = null;
        yDown = null;
    };

})
