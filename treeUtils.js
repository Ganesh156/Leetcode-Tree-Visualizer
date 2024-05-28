import { BinaryTreeNode } from "./BinaryTreeNode.js";

export const DEFAULT_CONFIG = {
    radius:20,
    nodeWidthSpacing:50,
    nodeHeightSpacing:90,
    fontSize:10
}

export const getRequiredHeightAndWidth=(root)=>{
    const heightOfTree = root.getHeight();
    const maxLeafNodes = Math.pow(2, heightOfTree);

    const requiredCanvasHeight = heightOfTree * DEFAULT_CONFIG.nodeHeightSpacing;

    const requiredCanvasWidth = maxLeafNodes * DEFAULT_CONFIG.nodeWidthSpacing;

    return {requiredCanvasHeight, requiredCanvasWidth};
}

export const drawNode=(value, canvasElement, x, y)=>{
    const context = canvasElement.getContext("2d"); // tool to draw

    //Draw Circle
    context.beginPath();
    context.arc(x,y,DEFAULT_CONFIG.radius,0,Math.PI*2,false);
    context.fillStyle = 'lightsalmon';
    context.fill()

    //Draw Circle border
    context.beginPath();
    context.arc(x,y,DEFAULT_CONFIG.radius,0,Math.PI*2,false);
    context.strokeStyle = 'brown';
    context.stroke()

    // Write text
    context.font = `${DEFAULT_CONFIG.fontSize}pt serif`;
    context.fillStyle = 'brown';
    context.textAlign = 'center';
    context.fillText(value,x,y + DEFAULT_CONFIG.fontSize /2)
}

export const connectEdges = (canvasElement, xCoordinates, yCoordinates) =>{
    const {xStart, xEnd} = xCoordinates;
    const {yStart, yEnd} = yCoordinates;

    const xHalf = (xStart + xEnd) / 2;
    const yHalf = (yStart + yEnd) / 2;

    const start = {x:xStart, y:yStart};
    const cPoint1 = {x:xHalf, y:yHalf};
    const cPoint2 = {x:xEnd, y:xHalf};
    const end = {x:xEnd, y:yEnd};

    // Draw curve
    const context = canvasElement.getContext('2d');
    context.beginPath();
    context.strokeStyle = 'brown';
    context.moveTo(start.x,start.y);
    // context.bezierCurveTo(cPoint1.x, cPoint1.y, cPoint2.x, cPoint2.y, end.x,end.y)
    context.lineTo(end.x, end.y);
    context.stroke();
}

export function treeConstructor(input) {
    input = parseInput(input);

    const queue = [];

    let idx = 0;
    const root = new BinaryTreeNode(input[idx++]);

    queue.push(root);

    while (queue.length > 0 && idx < input.length) {
        const node = queue.shift();

        // Left child
        if (idx < input.length) {
            if (input[idx] !== null) {
                const leftNode = new BinaryTreeNode(input[idx]);
                node.setLeft(leftNode);
                queue.push(leftNode);
            }
            idx++;
        }

        // Right child
        if (idx < input.length) {
            if (input[idx] !== null) {
                const rightNode = new BinaryTreeNode(input[idx]);
                node.setRight(rightNode);
                queue.push(rightNode);
            }
            idx++;
        }
    }

    return root;
}

function parseInput(value){
    let parsedInput = '';

    for(let i=0; i< value.length;i++){
        const ch = value.charAt(i);
        if(ch !== ' ') parsedInput += ch;
    }

    return parsedInput.split(',')
    .map(ele=>{
        if(ele === 'null') return null;
        else return ele;
    })
}