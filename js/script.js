/**
 * 步骤：
 *     1.设置赢法数组[三维]，计算赢法数；
 *     2.设置赢法统计数组[一维]，计算机赢法和人赢法；
 *     3.落子过程中，判断己方赢的情况,遍历赢法数，如果可落子，己方赢法自增，同时对方设为异常；
 *     4.计算机落子坐标,得分数组[二维]--myScore,computerScore。
 */



//存放棋盘的落子坐标二维数组
var chessBoard = [];

//控制轮流下棋,true为己方，false为计算机
var me = true;

//赢法数
var count = 0;

//赢法数组
var wins = [];

//赢法统计数组 
var myWin = [];
var computerWin = [];

//游戏结束标志
var over = false;

//赢法数组初始化
for (var i = 0; i < 15; i++) {
    wins[i] = [];
    for (var j = 0; j < 15; j++) {
        wins[i][j] = [];
    }
}

//横165
for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            wins[i][j + k][count] = true;
        }
        count++;
    }
}
for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            wins[j + k][i][count] = true;
        }
        count++;
    }
}

for (var i = 0; i < 11; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            wins[i + k][j + k][count] = true;
        }
        count++;
    }
}
for (var i = 0; i < 11; i++) {
    for (var j = 14; j > 3; j--) {
        for (var k = 0; k < 5; k++) {
            wins[i + k][j - k][count] = true;
        }
        count++;
    }
}

//初始化赢法统计数组
for (var i = 0; i < count; i++) {
    myWin[i] = 0;
    computerWin[i] = 0;
}

console.log(count);
//棋盘坐标位置数组初始化
for (var i = 0; i < 15; i++) {
    chessBoard[i] = [];
    for (var j = 0; j < 15; j++) {
        chessBoard[i][j] = 0;
    }
}

var chess = document.getElementById("chess");
var context = chess.getContext('2d');
context.strokeStyle = "#bfbfbf";
//画出棋盘
for (var i = 0; i < 15; i++) {

    //moveto把路径移动到画布中的指定点，不创建线条
    //lineTo添加一个新点，然后在画布中创建从该点到最后指定点的线条
    //x轴-横线
    context.moveTo(15 + i * 30, 15);
    context.lineTo(15 + i * 30, 435);
    context.stroke();

    //y轴-竖线
    context.moveTo(15, 15 + i * 30);
    context.lineTo(435, 15 + i * 30);
    context.stroke();

}



/**
 * 走一步棋
 * @param  {Number} i  圆心坐标x
 * @param  {Number} j  圆心坐标y
 * @param  {Boolean} me 棋子颜色,true黑色，false,白色
 * @return
 */
var oneStep = function(i, j, me) {
    context.beginPath();
    //画圆：圆心x,y,半径,起始弧度，终止弧度
    context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI)
    context.closePath();
    //渐环行变，前三个参数表示第一个圆的圆心和半径，同理第二个圆，+2和-2的目的是有偏移
    var gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0); //圆心偏移
    if (me) {
        //设置黑棋渐变颜色和停止位置
        gradient.addColorStop(0, "#0a0a0a");
        gradient.addColorStop(1, "#636766");
    } else {
        //设置白棋渐变颜色和停止位置
        gradient.addColorStop(0, "#D1D1D1");
        gradient.addColorStop(1, "#F9F9F9");
    }
    context.fillStyle = gradient;
    //填充
    context.fill();
}

/**
 * 人为棋盘落子函数
 * @param  {Object} e event对象
 * @return 
 */
chess.onclick = function(e) {

    if (over) {
        return;
    }

    var e = e || window.event;
    var x = e.offsetX;
    var y = e.offsetY;
    //棋子的坐标
    var i = Math.floor(x / 30);
    var j = Math.floor(y / 30);
    //原交叉点无棋子才可以落子
    if (chessBoard[i][j] == 0) {
        oneStep(i, j, me);

        //存储黑棋[已方]
        chessBoard[i][j] = 1;
        for (k = 0; k < count; k++) {
            if (wins[i][j][k]) {
                myWin[k]++;
                computerWin[k] = 6;
                if (myWin[k] == 5) {
                    alert("你赢了");
                    location.reload();
                    over = true;
                }
            }
        }
        if (!over) {
            //成功落子后交换棋子颜色
            me = !me;
            computerAI();
        }
    }
}

/**
 * 电脑下子
 * @return {[type]} [description]
 */
var computerAI = function() {

    //得分数组
    var myScore = [];
    var computerScore = [];
    //最高分
    var max = 0;
    //最高分坐标
    var u = 0,
        v = 0;

    for (var i = 0; i < 15; i++) {
        myScore[i] = [];
        computerScore[i] = [];
        for (var j = 0; j < 15; j++) {
            myScore[i][j] = 0;
            computerScore[i][j] = 0;
        }
    }

    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            if (chessBoard[i][j] == 0) {
                for (var k = 0; k < count; k++) {
                    if (wins[i][j][k]) {
                        if (myWin[k] == 1) {
                            myScore[i][j] += 200;
                        } else if (myWin[k] == 2) {
                            myScore[i][j] += 400;
                        } else if (myWin[k] == 3) {
                            myScore[i][j] += 2000;
                        } else if (myWin[k] == 4) {
                            myScore[i][j] += 10000;
                        }

                        if (computerWin[k] == 1) {
                            computerScore[i][j] += 220;
                        } else if (computerWin[k] == 2) {
                            computerScore[i][j] += 420;
                        } else if (computerWin[k] == 3) {
                            computerScore[i][j] += 2200;
                        } else if (computerWin[k] == 4) {
                            computerScore[i][j] += 20000;
                        }
                    }
                }
                if (myScore[i][j] > max) {
                    max = myScore[i][j];
                    u = i;
                    v = j;
                } else if (myScore[i][j] == max) {
                    if (computerScore[i][j] > computerScore[u][v]) {
                        u = i;
                        v = j;
                    }
                }

                if (computerScore[i][j] > max) {
                    max = computerScore[i][j];
                    u = i;
                    v = j;
                } else if (computerScore[i][j] == max) {
                    if (myScore[i][j] > myScore[u][v]) {
                        u = i;
                        v = j;
                    }
                }

            }
        }
    }
    oneStep(u, v, false);
    chessBoard[u][v] = 2;

    for (k = 0; k < count; k++) {
        if (wins[u][v][k]) {
            computerWin[k]++;
            myWin[k] = 6;
            if (computerWin[k] == 5) {
                alert("计算机，赢了");
                location.reload();
                over = true;
            }
        }
    }
    if (!over) {
        //成功落子后交换棋子颜色
        me = !me;
    }
}
