import assert from 'node:assert/strict';
import {liveEffects,spatialEffects,showFrame,pixelFrame,onsetBand} from './effects.ts';
for(const effect of liveEffects)for(const t of [0,.25,1,8,60])for(const band of [0,1,2]){const f=showFrame(effect,t,.7,band,3,'#ffe6ad');assert.match(f.hex,/^#[0-9a-f]{6}$/i);assert.ok(f.level>=0&&f.level<=1);}
for(const effect of spatialEffects)for(let i=0;i<100;i++)assert.match(pixelFrame(effect,i,100,1,.7,2,0,50,false,'#ffe6ad'),/^#[0-9a-f]{6}$/i);
for(const [hz,want] of [[60,0],[800,1],[8000,2]]){const rate=44100,a=Float32Array.from({length:4410},(_,i)=>Math.sin(i*2*Math.PI*hz/rate));assert.equal(onsetBand(a,rate,0),want);}
console.log('PASS: all effects bounded; spatial frames valid; bass/mid/treble separation');
