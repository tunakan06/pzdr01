const fs=require('fs'),vm=require('vm'),assert=require('assert');let code=fs.readFileSync('dist/game.js','utf8');code=code.slice(0,code.indexOf("$('#board').addEventListener"));const el={style:{},classList:{toggle(){}},innerHTML:'',textContent:''};const ctx=vm.createContext({document:{querySelector:()=>el,querySelectorAll:()=>[]},localStorage:{getItem:()=>0},setTimeout:()=>{},setInterval:()=>{},clearInterval(){},performance:{now:()=>0}});vm.runInContext(code,ctx);vm.runInContext(`
for(let n=0;n<100;n++){let b=fresh();if(b.length!==30||matches(b).length)throw Error('Invalid fresh board')}
let b=Array.from({length:30},(_,i)=>(i+Math.floor(i/6))%6);b[0]=b[1]=b[2]=5;if(matches(b).length!==1)throw Error('Horizontal match');
b=Array.from({length:30},(_,i)=>(i+Math.floor(i/6))%6);b[0]=b[6]=b[12]=5;if(matches(b).length!==1)throw Error('Vertical match');
reset();if(hp!==5000||stage!==1||enemy!==3000)throw Error('Reset');begin(0);move(1);if(!moved||selected!==1)throw Error('Drag');let before=board.join();move(8);if(board.join()!==before)throw Error('Nonadjacent move');
`,ctx);console.log('PASS: fresh boards, horizontal/vertical matching, reset, drag and adjacency');
