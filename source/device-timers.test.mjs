import assert from 'node:assert/strict';
import {timerPayload,decodeTimers,toLocal,clockPacket} from './device-timers.ts';
import {FairyConnection} from './fairy-ble.ts';
// Monday 18:00 at UTC-6 becomes Tuesday 08:00 in the APK's UTC+8 schedule.
const payload=timerPayload(2,18,0,[1],true,true,360);
assert.deepEqual(payload,[5,8,0,35]);
const raw=new Uint8Array([...payload,...payload,...payload,...payload]);
const decoded=decodeTimers(raw,0)[0],local=toLocal(decoded,360);
assert.equal(local.hour,18);assert.equal(local.minute,0);assert.deepEqual(local.days,[1]);
// Fractional offsets and Sunday rollover.
assert.deepEqual(timerPayload(7,23,50,[7],false,true,-330),[3,2,20,114]);
assert.throws(()=>timerPayload(8,18,0,[1],true));assert.throws(()=>timerPayload(0,18,0,[],true));assert.throws(()=>decodeTimers(new Uint8Array(15),0));
const d=new Date(0);d.getTimezoneOffset=()=>360;
assert.deepEqual(Array.from(clockPacket(d)).slice(0,-1),[170,5,7,0,0,0,0,0,1,104]);
const f=new FairyConnection();f.verified=true;let writes=[];f.writeBytes=async p=>{writes.push([...p]);};f.request=async op=>{assert.equal(op,6);return raw;};
await f.saveTimer(payload);assert.equal(writes[0][1],5);assert.equal(writes[1][1],6);assert.equal(f.busy,false);
f.request=async()=>new Uint8Array(16);await assert.rejects(()=>f.saveTimer(payload),/Readback differs/);assert.equal(f.busy,false);
f.verified=false;await assert.rejects(()=>f.saveTimer(payload),/Pause live/);
console.log('PASS: timer bits, timezone/day rollover, fractional timezone, clock vector, readback match and mismatch, gating');
