import {BinaryTreeNode} from './BinaryTreeNode.js';

import { DEFAULT_CONFIG, getRequiredHeightAndWidth,drawNode,connectEdges,treeConstructor } from './treeUtils.js';

import {inOrderTraversal, preOrderTraversal, postOrderTraversal} from './Algorithm.js';

const canvas = document.querySelector('canvas');

function drawBinaryTree(root, canvasElement){
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;

    // Initialize canvas dimensions
    canvasElement.width = maxWidth;
    canvasElement.height = maxHeight;

    const {requiredCanvasHeight, requiredCanvasWidth} =getRequiredHeightAndWidth(root);

    const windowWidthCenter = maxWidth/2;
    const requiredWidthCenter = requiredCanvasWidth/2;

    const xStart = windowWidthCenter - requiredWidthCenter;
    const xEnd = windowWidthCenter + requiredWidthCenter;

    const horizontalConfig = {xStart, xEnd};

    recursivelyDrawNodes(root, canvasElement, 0.5, horizontalConfig)
}

function recursivelyDrawNodes(root, canvasElement, currentLine, horizontalConfig){
    const {xStart, xEnd} = horizontalConfig;

    const xPos = (xStart + xEnd)/2;

    const yPos = currentLine * DEFAULT_CONFIG.nodeHeightSpacing;

    drawNode(root.value, canvasElement, xPos, yPos);

    if(root.left != null){
        const leftNodeHorizontalConfig = {xStart, xEnd: xPos};
        recursivelyDrawNodes(root.left, canvasElement, currentLine + 1, leftNodeHorizontalConfig);

        connectEdges(canvasElement,
            {
                xStart: xPos,
                xEnd: (xStart + xPos)/2
            },
            {
                yStart: yPos + DEFAULT_CONFIG.radius,
                yEnd: ((currentLine + 1) * DEFAULT_CONFIG.nodeHeightSpacing) - DEFAULT_CONFIG.radius
            }
            )
    }

    if(root.right != null){
        const rightNodeHorizontalConfig = {xStart: xPos, xEnd};
        recursivelyDrawNodes(root.right, canvasElement, currentLine + 1, rightNodeHorizontalConfig);

        connectEdges(canvasElement,
            {
                xStart: xPos,
                xEnd: (xPos + xEnd)/2
            },
            {
                yStart: yPos + DEFAULT_CONFIG.radius,
                yEnd: ((currentLine + 1) * DEFAULT_CONFIG.nodeHeightSpacing) - DEFAULT_CONFIG.radius
            }
            )
    }
}


let prevValue = ''
function init(value){
    prevValue = value;

    clearCanvas();
    const root = treeConstructor(value);
    
    drawBinaryTree(root, canvas);
}

function clearCanvas() {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}

const textArea = document.querySelector('textarea')
const applyBtn = document.querySelector('.apply-btn');
const clearBtn = document.querySelector('.clear-btn');

const inOrderBtn = document.querySelector('.in-order-btn');
const preOrderBtn = document.querySelector('.pre-order-btn');
const postOrderBtn = document.querySelector('.post-order-btn');


applyBtn.addEventListener('click', ()=>{
    if(textArea.value === '') return;

    init(textArea.value)
})

clearBtn.addEventListener('click', () => {
    textArea.value = '';
    document.querySelector('.in-order-algo-result').innerHTML = "";
    document.querySelector('.pre-order-algo-result').innerHTML = "";
    document.querySelector('.post-order-algo-result').innerHTML = "";
    clearCanvas()
})


inOrderBtn.addEventListener('click', ()=>{
    if(textArea.value === '') return;

    const inOrderTraversedArray = [];
    const rootNode = treeConstructor(textArea.value);
    const result = inOrderTraversal(rootNode,inOrderTraversedArray)

    const inOrderDiv = document.querySelector('.in-order-algo-result')

    inOrderDiv.innerHTML = result
})

preOrderBtn.addEventListener('click', ()=>{
    if(textArea.value === '') return;

    const preOrderTraversedArray = [];
    const rootNode = treeConstructor(textArea.value);
    const result = preOrderTraversal(rootNode, preOrderTraversedArray);

    const preOrderDiv = document.querySelector('.pre-order-algo-result')

    preOrderDiv.innerHTML = result
})

postOrderBtn.addEventListener('click', ()=>{
    if(textArea.value === '') return;

    const postOrderTraversedArray = [];
    const rootNode = treeConstructor(textArea.value);
    const result = postOrderTraversal(rootNode,postOrderTraversedArray)

    const postOrderDiv = document.querySelector('.post-order-algo-result')

    postOrderDiv.innerHTML = result
})

window.addEventListener('resize', () => {
    init(prevValue)
    if(textArea.value == ''){
        clearCanvas()
    }
})