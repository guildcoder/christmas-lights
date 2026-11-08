export function due(r:{enabled:boolean;time:string;days:string},now:Date){
 const time=String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0');
 const weekend=now.getDay()===0||now.getDay()===6;
 return r.enabled&&r.time===time&&(r.days==='Every day'||r.days==='Weekdays'&&!weekend||r.days==='Weekends'&&weekend);
}
