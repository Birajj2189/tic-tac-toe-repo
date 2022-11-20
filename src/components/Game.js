import React, { useState } from 'react'

export default function Game(){

          const [turn,setTurn] = useState("X"); 
          const [cells,setCells] = useState(Array(9).fill(""));
          const [color,setColor] = useState(Array(9).fill(""));
          const [count,setCount] = useState(1);
          const [ player1 , setPlayer1 ]  = useState(0);
          const [ player2 , setPlayer2 ]  = useState(0);
          const [ draw , setDraw ]  = useState(0);
          const [ player,setPlayer ]  = useState(1);
          

          let square3 = ["","","","","","","","",""];
          let square1 = [...cells];
          let square2 = [...color];

          const checkDraw = () =>{
               if(count===9)
               {
                    document.getElementById('winner').innerText = "Match is drawn !!!";
                    setTimeout(function(){
                         document.getElementById('winText').classList.remove('hidden');
                    },3000);
                    document.getElementById('winText').classList.add('hidden');
                    setDraw(draw+1);
                    document.getElementById('p3').innerText = draw;
                    setTimeout(function(){
                         square1 = square2 = square3;
                         setCells(square3);
                         setColor(square3);
                         setCount(1);
                         player = 1;
                    },2000);
               }
          }

          const checkWin = ()=>{
               let wins = [
                    [0,1,2],
                    [3,4,5],
                    [6,7,8],
                    [0,3,6],
                    [1,4,7],
                    [2,5,8], 
                    [0,4,8],  
                    [2,4,6]
               ]
               wins.forEach(e => {
                    if( (square1[e[0]]===square1[e[1]]) && (square1[e[1]]===square1[e[2]]) && square1[e[0]]!=="")
                    {
                         let box = document.getElementsByClassName('box');
                         if(square1[e[0]]==="X")
                         {
                              document.getElementById('winner').innerText = "Player 1 won !!!";
                              setTimeout(function(){
                                   document.getElementById('winText').classList.add('hidden');
                              },5000);
                              document.getElementById('winText').classList.remove('hidden');
                              setPlayer1(player1+1);
                              document.getElementById('p1').innerText = player1;
                              
                         }
                         else{
                              document.getElementById('winner').innerText = "Player 2 won !!!";
                              setTimeout(function(){
                                   document.getElementById('winText').classList.add('hidden')},5000);
                              document.getElementById('winText').classList.remove('hidden');
                              setPlayer2(player2+1);
                              document.getElementById('p2').innerText = player2;
                         }
                         setTimeout(function(){
                              square1 = square2 = square3;
                              setCells(square3);
                              setColor(square3);
                              setCount(1);
                              setPlayer(1);
                         },2000)
                    }
               })
          }

          const changeTurn = (num,square1) => {
               if(turn === "X"){
                    square2[num] = "red-700";
                    setPlayer(2);
                    document.getElementById('pTurn').innerText = player;
                    square1[num] = "X";
                    setTurn("O"); 
               } 
               else{
                    square2[num] = "green-500";
                    setPlayer(1);
                    document.getElementById('pTurn').innerText = player;
                    square1[num] = "O";
                    setTurn("X");
               }  
          }
          
          const handleOnClick = (num)=>{
               if(cells[num]!="")
               {
                    return;
               }
               setCount(count+1);
               console.log(count);
               changeTurn(num,square1);
               setColor(square2);
               setCells(square1);
               checkWin();
               checkDraw();
               console.log(square1, cells);
          }
          
          const Cell = ({num}) => {
               return <div onClick={()=> handleOnClick(num)} className={`text-${color[num]} head text-3xl box p-4 shadow-2xl border`}>{cells[num]}</div>
          }
          
          return (
               <div className='main-container h-full w-[100vw]'>
          <header className="header-box flex justify-center items-center w-[100vw] p-10">
               <span className='head px-4 font-bold text-6xl text-red-700'>X</span>
               <span className='head px-2 text-5xl text-white'>TIC TAC TOE</span>
               <span className='head px-4 font-bold text-6xl text-green-500'>O</span>
          </header>  
          <div className="game-container flex flex-col md:flex-row justify-center items-center w-full h-full"> 
               <div className="relative l-container w-full h-full md:w-[50%] p-10 ">
                    <div className="grid w-full h-full sm:p-12 lg:p-24 grid-rows-3 grid-cols-3 gap-x-2 gap-y-2 ">
                         <Cell num={0}></Cell>
                         <Cell num={1}></Cell>
                         <Cell num={2}></Cell>
                         <Cell num={3}></Cell>
                         <Cell num={4}></Cell>
                         <Cell num={5}></Cell>
                         <Cell num={6}></Cell>
                         <Cell num={7}></Cell>
                         <Cell num={8}></Cell>
                    </div> 
                    <div className=' head text-xl'>
                         Player <span id='pTurn'>{player}</span> turn  
                    </div>
               </div>
               <div className="r-container head p-10 sm:px-16 lg:px-24 text-3xl w-full md:w-[50%]">
                    <div className='w-full sm:px-8 lg:px-10 bg-slate-300 opacity-75 rounded-lg shadow-2xl'>
                         <p className='py-4 font-bold'>Game Data</p>
                         <p className='py-4'>Player 1 :<span className='text-red-700'> X</span></p>
                         <p className='py-4'>Player 2 :<span className='text-green-500'> O</span></p>
                         <p className='py-4 font-bold'>Game Result</p>
                         <p className='py-4'>Player 1 : <span id="p1" className='text-red-700'>{player1}</span></p>
                         <p className='py-4'>Player 2 : <span id="p2" className='text-green-500'>{player2}</span></p>
                         <p className='py-4'>Draw : <span id="p3" className='text-black'>{draw}</span></p>
                    </div>
               </div>
          </div>
     <div id="winText" className={`bg-blue-600  hidden flex justify-center items-center absolute head w-[70%] md:w-[50%] md:h-[40%] text-center p-4 text-6xl rounded-lg shadow-2xl text-white z-3`}><span id="winner">PLayer 2 won !!</span></div>
    </div>
)}