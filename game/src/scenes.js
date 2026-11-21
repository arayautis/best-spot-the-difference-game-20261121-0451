import {LEVELS} from './config.js';
const palettes=[['#122a3a','#245366','#ddad64'],['#f0a96c','#ffe0a0','#527d82'],['#20392f','#45634a','#dcaa68'],['#f0cc8c','#e78355','#775048'],['#101b3b','#343f70','#f7ce78'],['#234a44','#527b68','#e9bb69']];
function poly(c,pts,fill){c.fillStyle=fill;c.beginPath();c.moveTo(...pts[0]);pts.slice(1).forEach(p=>c.lineTo(...p));c.closePath();c.fill()}
function circle(c,x,y,r,color){c.fillStyle=color;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill()}
function lantern(c,x,y,s,color){c.save();c.strokeStyle='#493b36';c.lineWidth=2;c.beginPath();c.moveTo(x,y-s*1.5);c.lineTo(x,y-s*.8);c.stroke();c.fillStyle=color;c.beginPath();c.ellipse(x,y,s*.72,s,0,0,Math.PI*2);c.fill();c.strokeStyle='#f5dd9b';c.lineWidth=1.5;c.beginPath();c.moveTo(x-s*.5,y);c.lineTo(x+s*.5,y);c.moveTo(x,y-s*.65);c.lineTo(x,y+s*.65);c.stroke();circle(c,x,y,s*.35,'#fff0b0');c.restore()}
function tree(c,x,y,s,color){poly(c,[[x-s*.12,y],[x+s*.12,y],[x+s*.12,y+s*.8],[x-s*.12,y+s*.8]],'#604b3b');for(let k=0;k<3;k++)poly(c,[[x,y-s*(1-k*.34)],[x-s*(.6-k*.12),y+s*(.12+k*.1)],[x+s*(.6-k*.12),y+s*(.12+k*.1)]],color)}
function boat(c,x,y,s,color){c.fillStyle=color;c.beginPath();c.moveTo(x-s,y);c.lineTo(x+s,y);c.lineTo(x+s*.65,y+s*.4);c.lineTo(x-s*.6,y+s*.4);c.closePath();c.fill();c.strokeStyle='#f4d79c';c.lineWidth=1;c.beginPath();c.moveTo(x,y);c.lineTo(x,y-s*.9);c.lineTo(x+s*.48,y-s*.12);c.closePath();c.fillStyle='#f2e4c3';c.fill()}
function building(c,x,y,w,h,color,accent){c.fillStyle=color;c.fillRect(x,y,w,h);poly(c,[[x-8,y],[x+w/2,y-h*.36],[x+w+8,y]],accent);for(let a=x+12;a<x+w-8;a+=30){c.fillStyle='#f5d98c';c.fillRect(a,y+18,11,17)}}
function sceneBase(c,n){let [sky,mid,gold]=palettes[n];let g=c.createLinearGradient(0,0,0,390);g.addColorStop(0,sky);g.addColorStop(.67,mid);g.addColorStop(1,'#1a393b');c.fillStyle=g;c.fillRect(0,0,600,390);
 // distant moon, clouds and layered rooflines
 circle(c,490,58,25,n===4?'#f3e5bd':'#f5d693');circle(c,480,50,24,sky);
 for(let k=0;k<5;k++){c.globalAlpha=.12;c.fillStyle='#e9e2c8';c.beginPath();c.ellipse(66+k*119,65+(k%2)*19,36,8,0,0,7);c.fill()}c.globalAlpha=1;
 c.fillStyle=n===4?'#182541':'#244148';c.fillRect(0,242,600,148);
 if(n===0||n===3){building(c,10,155,115,100,'#8f5748','#d18d5a');building(c,450,145,130,110,'#76534b','#d39a63');building(c,142,190,88,65,'#65756e','#c99461');building(c,355,185,85,70,'#526d68','#bf8d61')}
 if(n===1){for(let i=0;i<6;i++)boat(c,38+i*105,270+(i%2)*24,32+i%3*3,i%2?'#8d5b45':'#bd8151');c.fillStyle='#346d79';c.fillRect(0,295,600,95);for(let i=0;i<12;i++){c.strokeStyle='#8fc1bd55';c.beginPath();c.moveTo(i*53,315+(i%3)*20);c.lineTo(i*53+34,315+(i%3)*20);c.stroke()}}
 if(n===2){for(let i=0;i<8;i++)tree(c,22+i*82,225,50+(i%3)*5,i%2?'#456c4e':'#31563f');c.fillStyle='#8a6847';c.fillRect(0,292,600,98)}
 if(n===4){for(let i=0;i<36;i++){let x=(i*97+41)%600,y=(i*47+17)%210;circle(c,x,y,i%4===0?2:1,'#fff1c2')}}
 if(n===5){for(let i=0;i<6;i++)tree(c,i*122+20,235,47,'#376951');c.fillStyle='#386c69';c.fillRect(0,275,600,115);for(let i=0;i<8;i++){circle(c,30+i*76,310+(i%2)*24,13,'#e5a5b0');circle(c,30+i*76,310+(i%2)*24,4,'#e7cd72')}}
 // grounded foreground, stepping stones, crates, pots, signs, windows, market awnings
 c.fillStyle=n===1?'#315e65':'#344e45';c.fillRect(0,315,600,75);
 for(let i=0;i<5;i++){c.fillStyle=i%2?'#a16a45':'#c18752';c.fillRect(30+i*117,286-(i%2)*22,55,36);c.fillStyle='#d2ae77';c.fillRect(35+i*117,292-(i%2)*22,45,5)}
 for(let i=0;i<6;i++){let x=47+i*100;circle(c,x,350,12,'#b66f51');c.fillStyle='#d5a170';c.fillRect(x-14,344,28,4);if(i%2===0)circle(c,x,328,6,'#7dab72')}
 for(let i=0;i<8;i++){c.fillStyle='#e3d1a5';c.fillRect(20+i*76,373,38,4)}
 // place-specific illustrated props, about two dozen distinguishable shapes
 if(n===0){for(let i=0;i<6;i++)lantern(c,35+i*105,128+(i%2)*30,13,i%2?'#e7a748':'#f0c96b');for(let i=0;i<4;i++){c.fillStyle='#c58d54';c.fillRect(50+i*145,260,68,12);c.fillStyle=i%2?'#d96650':'#78a787';c.fillRect(58+i*145,238,17,22);circle(c,94+i*145,235,10,'#efd190')}}
 else if(n===1){for(let i=0;i<5;i++){lantern(c,70+i*116,112+(i%2)*24,11,'#f2bc68');circle(c,45+i*119,328,5,'#edd78f')}boat(c,300,248,55,'#9b583f');poly(c,[[292,233],[304,181],[315,233]],'#f2e5c4');}
 else if(n===2){for(let i=0;i<4;i++)lantern(c,83+i*145,161+(i%2)*25,12,'#e2a94f');c.fillStyle='#9c6f48';c.fillRect(242,268,116,46);poly(c,[[232,269],[300,227],[367,269]],'#ba7651');c.fillStyle='#f4c56e';c.fillRect(281,279,34,35);circle(c,198,301,10,'#eee0c4');circle(c,208,301,10,'#e17952')}
 else if(n===3){for(let i=0;i<5;i++)lantern(c,70+i*114,100,10,'#f7d28a');for(let i=0;i<4;i++){circle(c,85+i*140,258,19,'#d98e65');circle(c,85+i*140,253,10,'#f3d188');c.fillStyle='#855348';c.fillRect(67+i*140,272,36,6)}c.fillStyle='#f0d99e';c.fillRect(270,153,65,72);c.fillStyle='#805348';c.fillRect(282,163,41,36)}
 else if(n===4){for(let i=0;i<4;i++)lantern(c,78+i*145,190+(i%2)*28,10,'#ebbd62');c.strokeStyle='#d6d5ca';c.lineWidth=6;c.beginPath();c.arc(302,197,75,Math.PI,Math.PI*2);c.stroke();c.fillStyle='#7281a0';c.fillRect(257,195,90,32);c.fillStyle='#cab88c';c.fillRect(288,227,27,65);}
 else {for(let i=0;i<6;i++)lantern(c,42+i*103,150+(i%2)*27,10,'#f1c66c');for(let i=0;i<5;i++){circle(c,93+i*102,270,17,'#df95a5');for(let k=0;k<5;k++)circle(c,93+i*102+Math.cos(k*1.25)*9,270+Math.sin(k*1.25)*9,5,'#f5c5c6');circle(c,93+i*102,270,4,'#e8c66d')}}
 // tiny hanging bunting and birds
 for(let i=0;i<9;i++){circle(c,26+i*70,212+Math.sin(i)*9,3,i%2?'#eed28e':'#d88e70')}
}
export function paintScene(ctx,level){sceneBase(ctx,level);}
