var winCond = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];

var pVC = false;

var boardActivated = false;

var posCond = [0,0,0,0,0,0,0,0,0,0];


var player1Pos = [];
var player2Pos = [];

var shiftImg = true;//X control info same time(whose turn)
var whoS = "";
var playerS = true;







$("button").click(function() {
  
          
           
            
          if($(this).html() == "1 Player") 
            {
             
              whoS = whoStart("Computer");
              //console.log(whoS);
              pVC = true;
              activateButtons();
              resetBoard();
            }
          else if ($(this).html() == "2 Players")
            {             
              
              whoS = whoStart("Player 2");
              pVC = false;
              activateButtons();
              resetBoard();
            }
          else
            {
              boardActivated = true;
              resetBoard();
              if($(this).html() == "X")
              {               
                playIt(whoS,true); //true:X false:O
                //console.log(whoS);
              }
              else if ($(this).html() == "O")
              {               
                playIt(whoS,false);
              }
            }   
          
        });

$("th").click(function(){
  if(boardActivated)
    {
      var posId = parseInt($(this).attr("id"),10);      
           
      
      if (posCond[posId] == 0)
          {
            //console.log(posCond);
            takePos(posId);
            if (pVC) 
            {
              player1Pos.push(posId);
              if(checkWin(player1Pos))
                {
                  $("#info").html("You Win!");
                  boardActivated = false;      
                  setTimeout(function(){restart();}, 3000);
                }
              else
                {
                  if (checkDraw())
                    {
                      $("#info").html("Draw!!!");
                      boardActivated = false;
                      setTimeout(function(){restart();}, 3000);
                    }
                  else
                    {
                      computerPlay();
                    }
                }
              
            }
          else
            {
              if (!playerS)
                {
                  player2Pos.push(posId);
                  
                  //console.log(player2Pos);
                  $("#info").html("Player 1's turn!");
                  result(player2Pos,"Player 2 Win!");
                }
              else
                {
                  player1Pos.push(posId);
                  
                  //console.log(player1Pos);
                  $("#info").html("Player 2's turn!");
                  result(player1Pos,"Player 1 Win!");
                }
              playerS = !playerS;//change turn, so many globle var....
            }
          }
        else
          {
              //someSound
          }
      //console.log(pVC);
      
      
   }
  
  //console.log(posCond);
  
});

function checkDraw()
{
  for (var i = 1; i<posCond.length;i++)
    {
      if (posCond[i] === 0) return false;
    }
  return true;
}

function whoStart(player)
{
  if(Math.random() >=0.5)
    {
      //player 1 start
      $("#info").html("Player 1 start, choose X or O!")
      
      return "Player 1";
    }
  else
    {
      $("#info").html(player +" start, choose X or O!")
      
      return player;
    }
  
}

function getPImg(shift)
{
  var pImg =["X","O"];
  if (shift)
    {
      return pImg[0];// true :x
    }
  else
    {
      return pImg[1];//false: O
    }
}

function getUnTaken()
{
  var unTaken = [];
  for (var i = 1; i<posCond.length;i++)
    {
      if (posCond[i] === 0)
        unTaken.push(i);
    }
  return unTaken;
}

function result(playerResult,winFlag)
{
  if (checkWin(playerResult))
  {
    $("#info").html(winFlag);
    boardActivated = false;
  }
  else
  {
    if (checkDraw())
    {
      $("#info").html("Draw!!!");
      boardActivated = false;
    }
  }
  
}

function playIt(player,posImg)
{
  
  if (player == "Player 1")
    {
      shiftImg = posImg; //decide the first Img on the board
      
      playerS = true;
      
    }
  else if (player == "Player 2")
    {
      playerS = false;
      shiftImg = posImg;
    }
  else if (player == "Computer")
    {
      
      shiftImg = !posImg;
      computerPlay();
    }
}

function resetBoard()
{
  for (var i = 1; i<=9;i++)
    {
      $("#"+ i.toString()).html("");
      posCond[i] = 0;
    }
  player1Pos = [];
  player2Pos = [];
  shiftImg = true;
  
}

function takePos(pId)
{
  $("#"+ pId.toString()).html(getPImg(shiftImg));
  shiftImg = !shiftImg;
  posCond[pId] = 1;
  //console.log(shiftImg);
  
}

function computerPlay()
{
  //console.log(getUnTaken());
  //console.log(getRandomInt(0,getUnTaken().length));
  var pos = getUnTaken()[getRandomInt(0,getUnTaken().length)]; //add max back;
  //console.log(pos);
  takePos(pos);
  //setTimeout(, 3000);
  
  player2Pos.push(pos);
  if (checkWin(player2Pos))
    {
      
      $("#info").html("Computer Win!");
      boardActivated = false;
      setTimeout(function(){restart();}, 3000);
      
    }
  else
    {
      if (checkDraw())
        {
          $("#info").html("Draw!!!");
          boardActivated = false;
          setTimeout(function(){restart();}, 3000);
        }
    }
 
  //console.log(player2Pos);
  //console.log(checkWin(player2Pos));
  //$("#info").html("Player's turn");
  
}

function restart()
{
  resetBoard();
  boardActivated = true;
  playIt(whoStart("Computer"),true);
  $("#info").html("Try agani!!!");
  
  
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}






function activateButtons()
{
  $("#xButton").removeAttr("disabled");
  $("#oButton").removeAttr("disabled");
}



function checkWin(pos)
{
  //console.log(winCond);
  for (var i = 0; i< winCond.length; i++)
    {
      var pass = 0;
      for(var j = 0; j<winCond[i].length;j++)
        {
          for (var k = 0; k<pos.length;k++)
            {
              if (pos[k] === winCond[i][j])
                {
                  pass++;
                  break;
                }
            }
        }
      if (pass ===3)
        {
          return true;
        }
      else if (pass ===2)
        {
          
        }
      else if (pass === 1)
        {
          
        }
    }
  return false;
}

//console.log(checkWin([3,5,7]));



