import assert from 'node:assert/strict';
import {analyze,logicalIndex,pointsOnPath,warmthRGB} from './show.ts';
assert.equal(analyze(new Float32Array(48000),48000).beats.length,0);
const rate=8000, audio=new Float32Array(rate*12);
for(let t=.5;t<12;t+=.5){for(let j=0;j<160;j++)audio[Math.round(t*rate)+j]=Math.sin(j*.3)*Math.exp(-j/60);}
const result=analyze(audio,rate);assert.ok(result.beats.length>=20);assert.ok(Math.abs(result.bpm-120)<4);
for(const reverse of [true,false]){const order=Array.from({length:100},(_,i)=>logicalIndex(i,100,37,reverse));assert.equal(new Set(order).size,100);assert.equal(order[0],37);}
const points=pointsOnPath([[0,0],[10,0],[10,10]],5);assert.deepEqual(points,[[0,0],[5,0],[10,0],[10,5],[10,10]]);
for(let k=1800;k<=6500;k+=50)assert.match(warmthRGB(k),/^#[0-9a-f]{6}$/);
console.log('PASS: silence, 120 BPM onset detection, reverse/start mapping, path spacing, warmth range');
