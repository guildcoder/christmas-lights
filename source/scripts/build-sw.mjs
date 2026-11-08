import{readdir,readFile,writeFile}from'node:fs/promises';
import{createHash}from'node:crypto';
const files=[];async function walk(dir){for(const e of await readdir('dist/'+dir,{withFileTypes:true})){const p=dir+e.name;if(e.isDirectory())await walk(p+'/');else if(p!=='sw.js')files.push(p);}}await walk('');
const hash=createHash('sha256');for(const f of files.sort())hash.update(await readFile('dist/'+f));
const version='cross-lights-'+hash.digest('hex').slice(0,12);
await writeFile('dist/sw.js',`const CACHE=${JSON.stringify(version)},FILES=${JSON.stringify(files.map(f=>'./'+f))};
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('cross-lights-')&&k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==self.location.origin)return;
if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).catch(()=>caches.open(CACHE).then(c=>c.match('./index.html'))));return;}
if(FILES.some(f=>new URL(f,self.registration.scope).href===u.href))e.respondWith(caches.open(CACHE).then(async c=>(await c.match(e.request))||fetch(e.request)));
});`);
console.log('Offline shell:',files.length,'files',version);
