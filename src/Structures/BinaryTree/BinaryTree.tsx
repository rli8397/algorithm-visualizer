import { useState } from 'react'
import './BinaryTree.css'
class Node<T> {
    constructor (
        public data: T, 
        public left: Node<T> | null, 
        public right: Node<T> | null
    ){}
}
class BST<T>{
    private root: Node<T> | null = null
    
    public copy(): BST<T> {
        let newTree: BST<T> = new BST<T>
        if (this.root != null){
            newTree.root = new Node<T>(this.root.data, this.root.left, this.root.right)
        }
        return newTree
    }
    public remove(data: T): BST<T> {
        this.root = this.removeHelper(data, this.root)
        return this
    }
    private removeHelper(data:T, node: Node<T> | null): Node<T> | null{
        if (node != null) {
            if (node.data == data) {
                if (node.right != null){
                    let minRight = this.findMin(node.right)
                    node.data = minRight.data
                    this.removeHelper(minRight.data, node.right)
                } else if (node.left != null) {
                    let maxLeft = this.findMax(node.left)
                    node.data = maxLeft.data
                    this.removeHelper(maxLeft.data, node.left)
                } else {
                    return null
                }
            } else if (data < node.data) {
                node.left = this.removeHelper(data, node.left)
            } else {
                node.right = this.removeHelper(data, node.right)
            }
        }
        return node; 
    }

    public findMax(node: Node<T>): Node<T> {
        while (node.right != null) {
            node = node.right
        }
        return node
    }
    public findMin(node: Node<T>): Node<T> {
        while (node.left != null) {
            node = node.left
        }
        return node
    }
    public add(data: T): BST<T> {
        this.root = this.addHelper(this.root, data)
        return this
    }

    private addHelper(node: Node<T> | null, data: T): Node<T> {
        if (node == null) {
            return new Node<T>(data, null, null) 
        } 
        if (data < node.data) {
            node.left = this.addHelper(node.left, data)
        } else if (data > node.data) {
            node.right = this.addHelper(node.right, data)
        }
        return node
    }

    public translate(): JSX.Element {
        let container: JSX.Element[] = [];
        // BFS
        if (this.root != null) {
            let q: any = [this.root];
            let levelCount = 0;
            let qFront = 0;
            let elementInLevel: boolean = true

            while (qFront < q.length && elementInLevel) {
                let levelSize = Math.pow(2, levelCount);
                let currLevel: JSX.Element[] = [];
                elementInLevel = false

                for (let i = 0; i < levelSize; i++) {
                    let curr = null;

                    if (qFront < q.length) {
                        curr = q[qFront++]

                        if (curr != null && curr.left != null) {
                            elementInLevel = true
                            q.push(curr.left)
                            if (curr.right != null){
                                q.push(curr.right)
                            } else {
                                q.push(null)
                            }
                        } else if (curr != null && curr.right != null){
                            elementInLevel = true
                            q.push(null)
                            q.push(curr.right)
                        } else {
                            q.push(null)
                            q.push(null)
                        }
                        
                    }

                    currLevel.push(
                        
                        <div key={`node-${i}-${levelCount}`}>
                            {curr != null ? 
                                <p  className="element-box">
                                    {curr.data?.toString()}
                                </p>
                                
                            : 
                                <p  className="empty-node">
                                    {''}
                                </p>
                            }
                        </div>
                    );
                    
                }
    
                container.push(
                    <div key={levelCount} className='tree-level'>
                        {currLevel}
                    </div>
                );
                levelCount++;
            }
        }
    
        return <>{container}</>;
    }    
}
export default function BinaryTree(){
    const [tree, setTree] = useState<BST<number>>(new BST<number>())
    let test = tree.translate()
    return (
        <>
            <div className='tree-content'>
                {test}
            </div>
            <div className='right-menu'>
                <div className="add-div right child">
                    <input className='input-box' type="number" placeholder='Enter data (press enter to submit)'
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && e.currentTarget.value != '') {
                                    setTree(tree.add(Number(e.currentTarget.value)).copy())
                                    e.currentTarget.value = ''
                                }
                    }} />
                </div>
            </div>
            
        </>
    )
}