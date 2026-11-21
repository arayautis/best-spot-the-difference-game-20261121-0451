import { createReadStream, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=resolve(fileURLToPath(new URL('./game',import.meta.url)));const args=process.argv.slice(2);const at=args.indexOf('--port');const requested=at<0?8080:Number(args[at+1]);const port=Number.isInteger(requested)&&requested>0&&requested<65536?requested:8080;
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8'};
createServer((req,res)=>{const url=new URL(req.url??'/','http://localhost');let path;try{path=decodeURIComponent(url.pathname)}catch{res.writeHead(400).end();return}if(path.endsWith('/'))path+='index.html';const file=resolve(join(root,normalize(path)));if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403).end();return}let size;try{const st=statSync(file);if(!st.isFile())throw Error();size=st.size}catch{res.writeHead(404).end();return}res.writeHead(200,{'content-type':mime[extname(file)]??'application/octet-stream','content-length':size,'cache-control':'no-store'});createReadStream(file).pipe(res)}).listen(port,'127.0.0.1',()=>console.log(`game/ is on http://localhost:${port}`));
