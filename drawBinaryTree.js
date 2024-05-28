import {BinaryTreeNode} from './BinaryTreeNode.js';

import { DEFAULT_CONFIG, getRequiredHeightAndWidth,drawNode,connectEdges,treeConstructor } from './treeUtils.js';

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

applyBtn.addEventListener('click', ()=>{
    if(textArea.value === '') return;

    init(textArea.value)
})

clearBtn.addEventListener('click', () => {
    textArea.value = '';
    clearCanvas()
})

window.addEventListener('resize', () => init(prevValue))