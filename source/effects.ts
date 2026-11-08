export const liveEffects=['Golden pulse','Candle swell','Holly & berry','Carol colors','Bass glow','Treble bells','Melody colors','Alternating verse','Snowfall glow','Vintage fade','Christmas heartbeat','Silent night','Chorus bloom','Golden twinkle','Peppermint pop','Evergreen shimmer'];
export const spatialEffects=['Notes apart','Piano keys','Comet trail','Center burst','Split harmony','Ribbon wave','Garland chase','Snow sparkles'];
const palette=['#b52b35','#206647','#ffe6ad','#fff5d6'];
export function showFrame(effect:string,t:number,pulse:number,band:number,accent:number,color:string){
 const wave=(Math.sin(t*1.4)+1)/2,slow=(Math.sin(t*.35)+1)/2;let hex=color,level=.25+.75*pulse;
 switch(effect){
 case 'Candle swell':level=.35+.65*wave;break;
 case 'Holly & berry':hex=palette[accent%2];break;
 case 'Carol colors':hex=palette[accent%4];break;
 case 'Bass glow':hex=palette[2];level=band===0?.25+.75*pulse:.18;break;
 case 'Treble bells':hex=palette[3];level=band===2?.3+.7*pulse:.2;break;
 case 'Melody colors':hex=palette[[0,1,2][band]??2];break;
 case 'Alternating verse':hex=palette[Math.floor(t/8)%2];level=.45+.55*pulse;break;
 case 'Snowfall glow':hex=palette[3];level=.55+.45*wave;break;
 case 'Vintage fade':hex=palette[Math.floor(t/4)%4];level=.35+.65*slow;break;
 case 'Christmas heartbeat':hex=palette[0];level=.2+.8*Math.max(pulse,Math.max(0,Math.sin(t*7))*.5);break;
 case 'Silent night':hex=palette[2];level=.4+.2*slow;break;
 case 'Chorus bloom':hex=palette[accent%4];level=.3+.7*Math.max(pulse,wave*.5);break;
 case 'Golden twinkle':hex=palette[2];level=.35+.65*Math.abs(Math.sin(t*4.3)*Math.cos(t*2.1));break;
 case 'Peppermint pop':hex=palette[accent%2?3:0];level=.5+.5*pulse;break;
 case 'Evergreen shimmer':hex=palette[1];level=.35+.65*wave;break;
 }
 return {hex,level:Math.max(0,Math.min(1,level))};
}
export function pixelFrame(effect:string,i:number,n:number,t:number,pulse:number,band:number,start:number,center:number,reverse:boolean,color:string){
 const x=((reverse?start-i:start+i)%n+n)%n,c=((reverse?start-center:start+center)%n+n)%n;const head=t*18%n;
 switch(effect){
 case 'Notes apart':return Math.abs(Math.abs(x-c)-(t%1)*n/2)<5?palette[band%3]:color;
 case 'Piano keys':return Math.floor(x/7)%3===band?palette[band]: '#233c31';
 case 'Comet trail':return ((head-x+n)%n)<14?palette[2]:'#233c31';
 case 'Center burst':return Math.abs(x-c)<pulse*n/2?palette[band]:color;
 case 'Split harmony':return palette[x<c?0:1];
 case 'Ribbon wave':return palette[Math.floor(x/8+t*3)%4];
 case 'Garland chase':return ((x+Math.floor(t*10))%12)<4?palette[0]:palette[1];
 case 'Snow sparkles':return Math.sin(x*97+t*4)>.85?palette[3]:color;
 default:return showFrame(effect,t,pulse,band,Math.floor(t*2),color).hex;
 }
}
// Coarse bass/mid/treble energy near each onset, not musical note transcription.
export function onsetBand(samples:Float32Array,rate:number,time:number):number{
 const from=Math.max(0,Math.floor(time*rate)),end=Math.min(samples.length,from+Math.floor(rate*.07));let low=0,mid=0;const energy=[0,0,0],a=1-Math.exp(-2*Math.PI*250/rate),b=1-Math.exp(-2*Math.PI*2200/rate);
 for(let i=from;i<end;i++){low+=a*(samples[i]-low);mid+=b*(samples[i]-mid);energy[0]+=low*low;energy[1]+=(mid-low)**2;energy[2]+=(samples[i]-mid)**2;}
 return energy.indexOf(Math.max(...energy));
}
