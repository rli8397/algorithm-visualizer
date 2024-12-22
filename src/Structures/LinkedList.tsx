//linked list page
import { useState } from 'react'
import RemoveElement from '../Components/RemoveElement'
import Add from '../Components/Add';
import RemoveIndex from '../Components/RemoveIndex';
/*
LinkedList function will receive an any type array
this is how we will pass in data.
*/

class Node<T> {
    constructor(public data: T, public next: Node<T> | null) {}
}
class SinglyLinkedList<T> {
    private head: Node<T> | null = null;

    public copy(): SinglyLinkedList<T> {
        let newList = new SinglyLinkedList<T>();
        if (this.head != null) {
            newList.head = this.head
            let newNode: Node<T> | null = newList.head
            let thisNode: Node<T> | null = this.head
            while (thisNode != null) {
                thisNode = thisNode.next
                if (thisNode != null) {
                    newNode!.next = new Node(thisNode.data, null)
                }
                newNode = newNode!.next
            }
        }

        return newList;
    }
    
    public insertAtBeginning (data: T): SinglyLinkedList<T> {
        this.head = new Node(data, this.head)
        return this
    }
    
    public insertAtEnd(data: T): SinglyLinkedList<T> {
        if (this.head === null) {
            this.head = new Node(data, null)
        } else {
            let node: Node<T> = this.head
            while (node.next != null){
                node = node.next
            }
            node.next = new Node(data, null)
        }
        return this
    }
    public deleteBeginning (): SinglyLinkedList<T>{
        if (this.head != null){
            this.head = this.head.next
        }
        return this
    }
    public deleteElement(element: T): SinglyLinkedList<T>{
        if (this.head != null) {
            if (element === this.head.data) {
                this.head = this.head.next
            } else {
                let prev = this.head
                let node = this.head
                while(node.next != null && node.data != element) {
                    prev = node
                    node = node.next
                }
                if (node.data == element) {
                    prev.next = node.next
                }
            }
        }
        return this
    }
    public deleteAtIndex(index:number): SinglyLinkedList<T>{
        if (this.head != null){
            if (index == 0) {
                this.head = this.head.next
            } else {
                let prev = this.head
                let node = this.head
                while(node.next != null && index > 0) {
                    index--
                    prev = node
                    node = node.next
                }
                if (index == 0) {
                    prev.next = node.next
                }
            }
            
        }
        
        return this
    }
    public iterate(action:(item: Node<T>)=> void): void {
        if (this.head != null) {
            let node: Node<T> = this.head
            action(node)
        }
    }

    public getArr(): any[] {
        let arr = [] 
        let node: Node<T> | null = this.head
        while (node != null){
            arr.push(node.data)
            node = node.next
        }
        return arr
    }

    public translate(): JSX.Element[] {
        let node: Node<T> | null = this.head
        let arr = []
        if (node != null) {
            while (node !== null) {
                arr.push(
                    <div className='linkedlist-node'>
                        <div className="element-box">
                            {node.data?.toString()}
                        </div>

                        <div className="element-box">
                            {node.next ? node.next.data?.toString(): 'null'}
                        </div>

                        <big>→</big>
                    </div>
                )

                node = node.next
            }
        }
        arr.push(<div className="element-box">null</div>)
        return arr
    }

}
export default function LinkedList(){
    //this puts each element into a div
    const [linkedlist, setLinkedList] = useState<SinglyLinkedList<string>>(new SinglyLinkedList<string>())
    let data = linkedlist.getArr()
    let visualList = linkedlist.translate()
    return (
        <>
            <div className="main-content linkedlist-node">
                {visualList}
            </div>

            <div className="right-menu">

                <div className='data-div right-child'>
                    <h2>Data: </h2>
                    {data.map((element)=> <p className='data'>{element}, </p>)}
                </div>

                <Add
                    handleAdd = {(e)=> setLinkedList(linkedlist.insertAtEnd(e.currentTarget.value).copy())}
                    handleUndo = {()=> setLinkedList(linkedlist.deleteBeginning().copy())}
                    handleReset = {()=> setLinkedList(new SinglyLinkedList())}
                />

                <RemoveIndex
                    handleRemove = {(index)=> setLinkedList(linkedlist.deleteAtIndex(index).copy())}
                />

                <RemoveElement
                    handleRemove = {(e)=>setLinkedList(linkedlist.deleteElement(e.currentTarget.value).copy())}
                />
            </div>

        </>
    )
}