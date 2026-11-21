// Regions are normalized canvas coordinates; generous radii keep every discovery fair.
const sets=[
 [[.17,.38,'color'],[.35,.57,'missing'],[.53,.32,'move'],[.72,.48,'shape'],[.86,.25,'count']],
 [[.13,.42,'missing'],[.28,.58,'color'],[.43,.31,'flip'],[.58,.61,'move'],[.76,.38,'shape'],[.88,.21,'count']],
 [[.12,.28,'color'],[.27,.57,'missing'],[.4,.36,'move'],[.53,.62,'count'],[.66,.29,'flip'],[.79,.53,'shape'],[.9,.25,'add']],
 [[.12,.46,'missing'],[.26,.27,'color'],[.4,.55,'flip'],[.53,.34,'move'],[.66,.6,'shape'],[.79,.28,'count'],[.9,.47,'add']],
 [[.1,.32,'missing'],[.2,.58,'color'],[.3,.25,'move'],[.4,.49,'shape'],[.5,.3,'flip'],[.6,.61,'count'],[.7,.35,'add'],[.8,.53,'missing'],[.91,.27,'color']],
 [[.1,.4,'color'],[.2,.25,'missing'],[.3,.56,'move'],[.4,.34,'shape'],[.5,.6,'count'],[.6,.27,'flip'],[.7,.48,'add'],[.8,.3,'missing'],[.91,.55,'color']]
];
export function differencesFor(level){return sets[level].map(([x,y,kind],i)=>({id:`${level}-${i}`,x,y,r:.047,kind,index:i}));}
export function pointDifference(level,x,y){return differencesFor(level).find(d=>Math.hypot(d.x-x,d.y-y)<d.r);}
export function rightChanges(level){return differencesFor(level);}
