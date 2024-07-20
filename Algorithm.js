export const inOrderTraversal = (root,inOrderTraversedArray) => {
    if(root == null) return;
    
    inOrderTraversal(root.left)
    inOrderTraversedArray.push(root.value)
    inOrderTraversal(root.right)
    
    return inOrderTraversedArray;
}

export const preOrderTraversal = (root, preOrderTraversedArray) => {
    if(root == null) return;

    preOrderTraversedArray.push(root.value)
    preOrderTraversal(root.left)
    preOrderTraversal(root.right)

    return preOrderTraversedArray;
}

export const postOrderTraversal = (root, postOrderTraversedArray) => {
    if(root == null) return;

    postOrderTraversal(root.left)
    postOrderTraversal(root.right)
    postOrderTraversedArray.push(root.value)

    return postOrderTraversedArray;
}