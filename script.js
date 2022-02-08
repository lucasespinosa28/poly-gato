import { parse } from 'node-html-parser';
import randomColor from 'randomcolor';
import fs from 'fs';

const data = fs.readFileSync('./images/default.svg', 'utf8');

function getColors(){
    let arr = [];
    const colors = [ "orange", "yellow", "blue", "purple", "pink"]
    colors.forEach(color => {
        const listColor = randomColor({count:10, hue: color});
        arr.push(listColor);
    })
    return [].concat(arr[0],arr[1], arr[2], arr[3], arr[4]);
}

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
let nfts = [];
let ids = [];
async function base(){
    getColors().forEach((color, index) => {
        const root = parse(data);
        root.querySelector(`#Camada1`).remove();
        nfts.push(root.toString().replace(/#ebebeb/g, `${color}`));
        ids.push(index);
    })
}
async function items(){
    const numberItens = [0,1,2,3,4];
    for (let i = 50; i <= 99; i++) {
        ids.push(i);
        const root = parse(data);
        const itemId = randomNumber(0,4);
        numberItens.forEach((item, index) => {
            if(itemId != index){
                root.querySelector(`#item${index+1}`).remove();
            }
        })
        root.querySelector(`#base`).remove();
        nfts.push(root.toString().replace(/#0f8/g, `${randomColor()}`));;
    }
}
await base();
await items();
async function combine(){
    // loop 0 to 50
    for (let i = 0; i < 50; i++) {
        //loop 51 to 99
        const baseSvg = parse(nfts[i]);
        for (let j = 50; j < 100; j++) {
            ids.push(Number(`${j}${i}`));
            const itemSvg = parse(nfts[j]).querySelector("#Camada1");
            nfts.push(baseSvg.toString().replace("</rect>", "</rect>"+itemSvg.toString()));
        }
    }

}

await combine();

async function write(){
    nfts.forEach((nft, index) => {
        fs.writeFileSync(`./images/${ids[index]}.svg`, nft);
    })
}
await write();