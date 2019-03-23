const Node = require('./node');
// class Node {
//   constructor(data, priority) {
//     this.data = data;
//     this.priority = priority;
//     this.parent = null;
//     this.left = null;
//     this.right = null;
//   }

//   appendChild(node) {
//     if (this.left === null) {
//       this.left = node;
//       node.parent = this;
//     } else if (this.right === null) {
//       this.right = node;
//       node.parent = this;
//     }
//   }

//   removeChild(node) {
//     if (this.left === node) {
//       this.left = null;
//       node.parent = null;
//     } else if (this.right === node) {
//       this.right = null;
//       node.parent = null;
//     } else {
//       throw new Error(`Passed node is not a child of this node`);
//     }
//   }

//   remove() {
//     if (this.parent) {
//       this.parent.removeChild(this);
//     }
//   }

//   swapWithParent() {
//     if (this.parent) {
//       const temp = {
//         parent: this.parent,
//         parentParent: this.parent.parent || null,
//         parentLeft: this.parent.left,
//         parentRight: this.parent.right
//       };

//       // parent to child
//       this.parent.left = this.left;
//       if (this.left) {
//         this.parent.left.parent = this.parent;
//       }
//       this.parent.right = this.right;
//       if (this.right) {
//         this.parent.right.parent = this.parent;
//       }
//       this.parent.parent = this;

//       // child to parent
//       if (temp.parentLeft === this) {
//         this.left = temp.parent;
//       } else {
//         this.left = temp.parentLeft;
//         if (this.left) {
//           this.left.parent = this;
//         }
//       }
//       if (temp.parentRight === this) {
//         this.right = temp.parent;
//       } else {
//         this.right = temp.parentRight;
//         if (this.right) {
//           this.right.parent = this;
//         }
//       }
//       this.parent = temp.parentParent;

//       // parent of parent
//       if (temp.parentParent && temp.parentParent.left === temp.parent) {
//         temp.parentParent.left = this;
//       } else {
//         if (temp.parentParent && temp.parentParent.right === temp.parent) {
//           temp.parentParent.right = this;
//         }
//       }
//     }
//   }
// }

class MaxHeap {
  constructor() {
    this.parentNodes = [];
    this.root = null;
  }

  push(data, priority) {
    const node = new Node(data, priority);
    // let b = node instanceof Node;
    this.insertNode(node);
    this. shiftNodeUp(node);
    // console.log(b);
  }

  pop() {
    if (!this.isEmpty()) {
      const detachedRoot = this.detachRoot();
      this.restoreRootFromLastInsertedNode(detachedRoot);
      /**
       * ? shiftNodeDown(?);
       */
      shiftNodeDown();
      return this.root.data;
    }
  }

  detachRoot() {
    const detachedRoot = this.root;
    this.root = null;
    if (detachedRoot.left) {
      detachedRoot.left.parent = null;
    }
    if (detachedRoot.right) {
      detachedRoot.right.parent = null;
    }
    const i = this.parentNodes.indexOf(detachedRoot);
    if (i > -1) {
      this.parentNodes.shift();
    }
    return detachedRoot;
  }

  restoreRootFromLastInsertedNode(detached) {
    let i = this.parentNodes.length - 1;

    if (i === 0) {
      this.root = this.parentNodes[i];
      this.root.parent = null;
      return;
    }

    if (i > 0) {
      this.root = this.parentNodes[i];
      this.root.appendChild(detached.left);
      this.root.appendChild(detached.right);

      if (this.root.right === this.root) {
        this.root.right = null;
        this.root.parent = null;
        this.parentNodes.unshift(this.root);
        this.parentNodes.pop();
        return;
      }

      const lastNodeParent = this.parentNodes[i].parent;
      const lastNodeParentRight = this.parentNodes[i].parent.right;

      if (this.parentNodes[i] === lastNodeParentRight) {
        this.parentNodes.unshift(lastNodeParent);
        i = this.parentNodes.length - 1;
      }

      lastNodeParent.removeChild(this.parentNodes[i]);
      this.parentNodes.pop();
    }
  }

  size() {
    let i = 0;
    if (this.root === null) {
      return 0;
    }

    function nodeCount(node) {
      if (node.left) {
        nodeCount(node.left);
      }
      if (node.right) {
        nodeCount(node.right);
      }
      i++;
    }

    nodeCount(this.root);
    return i;
  }

  isEmpty() {
    return this.root === null;
  }

  clear() {
    this.parentNodes = [];
    this.root = null;
  }

  insertNode(node) {
    if (this.parentNodes.length === 0) {
      this.parentNodes[0] = node;
      this.root = node;
    } else {
      this.parentNodes.push(node);
      this.parentNodes[0].appendChild(node);
      if (this.parentNodes[0].left && this.parentNodes[0].right) {
        this.parentNodes.shift();
      }
    }
  }

  shiftNodeUp(node) {
    if (node.parent && node.priority > node.parent.priority) {
      const i = this.parentNodes.indexOf(node);
      const j = this.parentNodes.indexOf(node.parent);
      if (i > -1) {
        this.parentNodes[i] = node.parent;
      }
      if (j > -1) {
        this.parentNodes[j] = node;
      }
      node.swapWithParent();
    } else {
      return;
    }

    if (node.parent === null) {
      this.root = node;
    }

    this.shiftNodeUp(node);
  }

  shiftNodeDown(node) {
    if (node.left === null) {
      return;
    }

    if (node.right === null || node.left.priority > node.right.priority) {
      node.left.swapWithParent();
    } else if (node.left.priority < node.right.priority) {
      node.right.swapWithParent();
    }

    const i = this.parentNodes.indexOf(node);
    const j = this.parentNodes.indexOf(node.parent);
    if (i > -1) {
      this.parentNodes[i] = node.parent;
    }
    if (j > -1) {
      this.parentNodes[j] = node;
    }

    if (node.parent.parent === null) {
      this.root = node.parent;
    }

    this.shiftNodeDown(node);
  }
}

module.exports = MaxHeap;

// const h = new MaxHeap();

// h.push(42, 15);
// h.push(15, 42);
// h.push(12, 10);
// h.push(77, 50);
// h.push(14, 30);
// h.push(19, 44);
// h.push(3, 11);
// h.size();

// const lastInsertedNode = h.root.right;
// const left = h.root.left;

// const detached = h.detachRoot();
// h.restoreRootFromLastInsertedNode(detached);

// h.restoreRootFromLastInsertedNode(h.detachRoot());
// h.shiftNodeDown(h.root);
// console.log(h.root);

