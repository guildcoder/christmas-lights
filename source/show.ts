export type Beat = {time:number;strength:number};
export function analyze(samples:Float32Array, rate:number) {
 const hop=Math.max(1,Math.floor(rate*.02)), energy:number[]=[];
 for(let i=0;i<samples.length;i+=hop){let s=0;for(let j=i;j<Math.min(i+hop,samples.length);j++)s+=samples[j]*samples[j];energy.push(Math.sqrt(s/hop));}
 const max=Math.max(.000001,...energy.slice(0,50000));
 const normalized=energy.map(v=>v/max);const beats:Beat[]=[];
 for(let i=2;i<energy.length-2;i++){let sum=0;let n=0;for(let j=Math.max(0,i-20);j<i;j++){sum+=energy[j];n++;}const threshold=(sum/Math.max(1,n))*1.4;
 if(energy[i]>.015 && energy[i]>threshold && energy[i]>=energy[i-1] && energy[i]>energy[i+1] && (beats.length===0 || i*.02-beats[beats.length-1].time>.22)) beats.push({time:i*hop/rate,strength:Math.min(1,normalized[i])});}
 const gaps=beats.slice(1).map((b,i)=>b.time-beats[i].time).filter(v=>v>.3 && v<1.2).sort((a,b)=>a-b);
 return {beats,energy:normalized,bpm:gaps.length?Math.round(60/gaps[Math.floor(gaps.length/2)]):null};
}
export function logicalIndex(i:number,count:number,start:number,reverse:boolean){return ((reverse?start-i:start+i)%count+count)%count;}
export function warmthRGB(k:number):string{const t=k/100;const r=t<=66?255:329.698727446*Math.pow(t-60,-.1332047592);const g=t<=66?99.4708025861*Math.log(t)-161.1195681661:288.1221695283*Math.pow(t-60,-.0755148492);const b=t>=66?255:t<=19?0:138.5177312231*Math.log(t-10)-305.0447927307;return '#'+[r,g,b].map(v=>Math.round(Math.max(0,Math.min(255,v))).toString(16).padStart(2,'0')).join('');}
export function pointsOnPath(nodes:number[][],count:number){const lens=nodes.slice(1).map((p,i)=>Math.hypot(p[0]-nodes[i][0],p[1]-nodes[i][1]));const total=lens.reduce((a,b)=>a+b,0);return Array.from({length:count},(_,i)=>{let d=i/Math.max(1,count-1)*total;let n=0;while(n<lens.length-1&&d>lens[n]){d-=lens[n++];}const f=lens[n]?d/lens[n]:0;return [nodes[n][0]+(nodes[n+1][0]-nodes[n][0])*f,nodes[n][1]+(nodes[n+1][1]-nodes[n][1])*f];});}
