export const inOrderTraversal = (root,inOrderTraversedArray) => {
    if(root == null) return;
    
    inOrderTraversal(root.left, inOrderTraversedArray)
    inOrderTraversedArray.push(root.value)
    inOrderTraversal(root.right, inOrderTraversedArray)
    
    return inOrderTraversedArray;
}

export const preOrderTraversal = (root, preOrderTraversedArray) => {
    if(root == null) return;

    preOrderTraversedArray.push(root.value)
    preOrderTraversal(root.left, preOrderTraversedArray)
    preOrderTraversal(root.right, preOrderTraversedArray)

    return preOrderTraversedArray;
}

export const postOrderTraversal = (root, postOrderTraversedArray) => {
    if(root == null) return;

    postOrderTraversal(root.left, postOrderTraversedArray)
    postOrderTraversal(root.right, postOrderTraversedArray)
    postOrderTraversedArray.push(root.value)

    return postOrderTraversedArray;
}