export function addDays(date:Date, days:number){const d=new Date(date);d.setDate(d.getDate()+days);return d}
export function dateKey(d:Date){return new Date(d).toISOString().slice(0,10)}
export function predictNext(start:Date, cycleLength:number){return addDays(start,cycleLength)}
export function fertileWindow(nextPeriod:Date){const ov=addDays(nextPeriod,-14);return {start:addDays(ov,-5),end:addDays(ov,1)}}
export function cycleDay(lastStart:Date, today=new Date()){return Math.max(1,Math.floor((today.getTime()-lastStart.getTime())/86400000)+1)}
