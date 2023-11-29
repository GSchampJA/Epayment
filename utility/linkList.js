class Node {
    // constructor
    constructor(element)
    {
        this.element = element;
        this.next = null
    }
}
class LinkedList {
    constructor()
    {
        this.head = null;
        this.size = 0;
    }

    add(element)
        {
        // creates a new node
        var node = new Node(element);
    
        // to store current node
        var current;
    
        // if list is Empty add the
        // element and make it head
        if (this.head == null)
            this.head = node;
        else {
            current = this.head;
    
            // iterate to the end of the
            // list
            while (current.next) {
                current = current.next;
            }
    
            // add node
            current.next = node;
        }
        this.size++;
    }
    removeElement(element)
    {
    var current = this.head;
    var prev = null;
 
    // iterate over the list
    while (current != null) {
        // comparing element with current
        // element if found then remove the
        // and return true
        if (current.element === element) {
            if (prev == null) {
                this.head = current.next;
            } else {
                prev.next = current.next;
            }
            this.size--;
            return current.element;
        }
        prev = current;
        current = current.next;
        }
        return -1;
    }
    isEmpty()
    {
        return this.size == 0;
    }
    size_of_list()
    {
        console.log(this.size);
    }
    printList()
    {
        var curr = this.head;
        var str = "";
        while (curr) {
            str += curr.element + " ";
            curr = curr.next;
        }
        console.log(str);
    }
}

module.exports= {Node,LinkedList}