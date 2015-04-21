// (function(){
//   /*HTML5 Countdown Timer by Braden Best aka B1KMusic*/
//   /*You can use this script anywhere and it will work*/
//   var cvs,ctx,W,H,mem,Timer,Button,mouse,input,br,div;
//   mem = {};
//   mouse = {x:-10,y:-10,down:false};
//   input = document.createElement('input');
//   var centerCalc = (240/2)-(56/2);//half canvas - half textfield
//   input.style.position = 'relative';input.style.left = centerCalc+'px';
//   input.style.width = '55px';
//   input.style.border = '1px solid #eee';
//   input.style.padding = '0px 2px';
//   input.style.font = '10px monospace';
//   input.style.textAlign = 'center';
//   input.placeholder = input.value = '00:00:00';
//   input.maxlength = '8';
//   cvs = document.createElement('canvas');
//   cvs.width = W = 240;
//   cvs.height = H = 80;
//   (function appendElements(){
//     if(document.body){
//       div = document.createElement('div');
//       br = document.createElement('br');
//       div.appendChild(cvs);
//       div.appendChild(br);
//       div.appendChild(input);
//       document.body.appendChild(div);
//     }
//     else setTimeout(appendElements,100);
//   })();
//   ctx = cvs.getContext('2d');
//   function add(o){
//     o.id = Math.floor(Math.random()*10000).toString(36);
//     for(var i in mem){
//       if(mem.hasOwnProperty(i) && i == o.id){
//         add(o);
//         return false;
//       }
//     }
//     mem[o.id] = o;
//   };
//   function remove(o){
//     delete mem[o.id];
//   };
//   function Timer(_time){
//     var started = false,
//     time = _time,
//     original_time = JSON.parse(JSON.stringify(_time)),
//     h,m,s,output = '00:00:00';
//     this.run = function(){
//       h = time[0];
//       m = time[1];
//       s = time[2];
//       if(started){
//         s[1]--;
//         if(s[1]<0){s[1]=9;s[0]--;}
//           if(s[0]<0){s[0]=5;m[1]--;}
//             if(m[1]<0){m[1]=9;m[0]--;}
//               if(m[0]<0){m[0]=5;h[1]--;}
//                 if(h[1]<0){h[1]=9;h[0]--;}
//                   if(h[0]<0){h[0]=0;}
//                     if(h[0]==0&&h[1]==0&&m[0]==0&&m[1]==0&&s[0]==0&&s[1]==0){
//                       mem = {};
//                       alert('Time up!');
//                       new InitText();
//                     }
//                   }
//                   output = ''+h[0]+h[1]+':'+m[0]+m[1]+':'+s[0]+s[1];
//                 };
//                 this.display = function(){
//                   ctx.font = 'bold 36px monospace';
//                   ctx.textAlign = 'center';
//                   ctx.textBaseline = 'middle';
//                   ctx.fillStyle = '#000';
//                   ctx.fillText(output,W/2,20);
//                   window.document.title = output;
//                 };
//                 this.start = function(){
//                   started = true;
//                 };
//                 this.stop = function(){
//                   started = false;
//                 };
//                 this.reset = function(){
//                   remove(this);
//                   new Timer(original_time);
//                 }
//                 add(this);
//               };
//               function Button(x,y,t){
//                 var x = x, y = y, w = 60, h = 30, t = t;
//                 this.run = function(){
//                   ctx.font = 'bold 16px monospace';
//                   ctx.textBaseline = 'middle';
//                   ctx.textAlign = 'center';
//                   ctx.beginPath();//begin mouse detection
//                   ctx.rect(x,y,w,h);
//                   if(ctx.isPointInPath(mouse.x,mouse.y)){
//                     ctx.fillStyle = '#eee';
//                     if(mouse.down){
//                       for(var i in mem){
//                         if(mem[i].constructor.name == 'Timer'){
//                           if(t == 'START')mem[i].start();
//                           if(t == 'STOP')mem[i].stop();
//                           if(t == 'RESET')mem[i].reset();
//                           if(t == 'CLOSE'){
//                             document.body.removeChild(div);
//                           }
//                         }
//                       }
//                     }
//                   }else{
//                     ctx.fillStyle = '#fff';
//                   }
//                   ctx.closePath();//end mouse detection
//                   ctx.fillRect(x,y,w,h);
//                   ctx.fillStyle = '#000';
//                   ctx.fillText(t,x+w/2,y+h/2);
//                 };
//                 add(this);
//               };
//               function InitText(){
//                 this.run = function(){
//                   var txt = [
//                   'Type the time into the textbox below',
//                   'then hit enter'
//                   ];
//                   ctx.font = '10px monospace';
//                   ctx.textAlign = 'center';
//                   ctx.textBaseline = 'middle';
//                   ctx.fillText(txt[0],W/2,H/2-5);
//                   ctx.fillText(txt[1],W/2,H/2+5);
//                 };
//                 add(this);
//               }
//               function init(time){
//                 mem = {};
//                 new Timer(time);
//                 new Button(0,50,'START');
//                 new Button(60,50,'STOP');
//                 new Button(120,50,'RESET');
//                 new Button(180,50,'CLOSE');
//               };
//               new InitText();
//               (function loop(){
//                 var a;
//                 ctx.clearRect(0,0,W,H);
//                 for(a in mem){
//                   if(mem.hasOwnProperty(a)){
//                     if(mem[a].constructor.name!='Timer'){
//                       mem[a].run();
//                     }else{
//                       mem[a].display();
//                     }
//                   }
//                 }
//                 setTimeout(loop,1000/100);
//               })();
//               (function loop(){//exclusive to Timer to separate logic from display
//                 var a, b;
//                 for(a in mem){
//                   if(mem.hasOwnProperty(a)){
//                     b = mem[a].constructor.name;
//                     if(b=='Timer')mem[a].run();
//                   }
//                 }
//                 setTimeout(loop,1000);
//               })();
//               cvs.onmousemove = function(e){
//                 mouse.x = (e.pageX||e.clientX||e.offsetX) - cvs.offsetLeft;
//                 mouse.y = (e.pageY||e.clientY||e.offsetY) - cvs.offsetTop;
//                 return false;
//               };
//               cvs.onmousedown = cvs.onmouseup = function(e){
//                 mouse.down = e.type == 'mousedown';
//                 return false;
//               };
//               input.onkeyup = function(e){
//                 var arr = input.value.split(':'),
//                 a0 = arr[0],a1 = arr[1],a2 = arr[2],
//                 a3 = [[a0[0],a0[1]],[a1[0],a1[1]],[a2[0],a2[1]]];
//                 if (e.keyCode == 0xD)init(a3);
//               };
//             })();
