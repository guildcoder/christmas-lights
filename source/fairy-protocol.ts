// Derived from Hello Fairy 3.3.3 DEX; see research/PHONE-ONLY.md.
export const SERVICE='49535343-fe7d-4ae5-8fa9-9fafd205e455';
export const WRITE='49535343-8841-43f4-a8d4-ecbe34729bb3';
export const NOTIFY='49535343-1e4d-4bd9-ba61-23c647249616';
const uint=(n:number,max:number)=>{if(!Number.isInteger(n)||n<0||n>max)throw Error('Value outside protocol range');return n;};
export function frame(op:number,payload:number[]=[]){uint(op,255);if(payload.length>255)throw Error('Payload too long');payload.forEach(n=>uint(n,255));const bytes=[170,op,payload.length,...payload];return new Uint8Array([...bytes,bytes.reduce((a,b)=>(a+b)&255,0)]);}
const be16=(n:number)=>[uint(n,65535)>>8,n&255];
export const powerPacket=(on:boolean)=>frame(2,[on?1:0]);
export function hsvPacket(h:number,s:number,v:number){uint(h,360);uint(s,1000);uint(v,1000);return frame(3,[1,...be16(h),...be16(s),...be16(v)]);}
export function colorPacket(hex:string,brightness:number){if(!/^#[0-9a-f]{6}$/i.test(hex)||!Number.isFinite(brightness)||brightness<0||brightness>100)throw Error('Invalid color');const rgb=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255);const[r,g,b]=rgb,max=Math.max(...rgb),min=Math.min(...rgb),delta=max-min;let h=0;if(delta)h=(max===r?(g-b)/delta+(g<b?6:0):max===g?(b-r)/delta+2:(r-g)/delta+4)*60;return hsvPacket(Math.floor(h),Math.floor(max?delta/max*1000:0),Math.floor(max*brightness*10));}
export class FrameReader{
 bytes:number[]=[];
 push(chunk:Uint8Array){this.bytes.push(...chunk);const out:{op:number,payload:Uint8Array}[]=[];while(this.bytes.length>=4){if(this.bytes[0]!==170){this.bytes.shift();continue;}const len=this.bytes[2]+4;if(this.bytes.length<len)break;const packet=this.bytes.slice(0,len);if((packet.slice(0,-1).reduce((a,b)=>a+b,0)&255)!==packet[len-1]){this.bytes.shift();continue;}this.bytes.splice(0,len);out.push({op:packet[1],payload:new Uint8Array(packet.slice(3,-1))});}if(this.bytes.length>1024)this.bytes=[];return out;}
}
export function deviceInfo(p:Uint8Array){if(p.length<5)throw Error('Device info is too short');const text=new TextDecoder().decode(p);const end=p.indexOf(0,5);return{firmware:text.slice(0,5).replace(/[^ -~]/g,''),model:text.slice(5,end>=5?end:Math.min(20,p.length)).replace(/[^ -~]/g,''),bulbs:p.length>=22?(p[20]<<8)|p[21]:null};}
export function deviceStatus(p:Uint8Array){if(p.length<5||p[3]>1||p[4]>3)throw Error('Unrecognized status response');return{on:p[3]===1,mode:p[4]};}
