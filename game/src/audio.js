let ctx=null,muted=false;
export function toggleMute(){muted=!muted;return muted}
export function isMuted(){return muted}
export function chime(type='find'){if(muted)return;try{ctx??=new AudioContext();const now=ctx.currentTime;const notes=type==='find'?[660,880,1180]:type==='hint'?[500,760]:[180,130];notes.forEach((hz,i)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.setValueAtTime(hz,now+i*.07);g.gain.setValueAtTime(.0001,now+i*.07);g.gain.exponentialRampToValueAtTime(.12,now+i*.07+.015);g.gain.exponentialRampToValueAtTime(.0001,now+i*.07+.18);o.connect(g);g.connect(ctx.destination);o.start(now+i*.07);o.stop(now+i*.07+.2)})}catch{}}
