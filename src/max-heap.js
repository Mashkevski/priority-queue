const Node = require('./node');
class MaxHeap {
  constructor() {
    this.parentNodes = [];
    this.root = null;
  }

  push(data, priority) {
    const node = new Node(data, priority);
    this.insertNode(node);
    this. shiftNodeUp(node);
  }

  pop() {
    if (this.root !== null) {
      const detachedRoot = this.detachRoot();
      this.restoreRootFromLastInsertedNode(detachedRoot);
      if (this.root) {
        this.shiftNodeDown(this.root);
      }
      return detachedRoot.data;
    } else {
      return null;
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

    if (i === -1) {
      return;
    }

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
    return this.parentNodes.length === 0 && this.root === null;
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
    if (node.left === null || node.priority > node.left.priority) {
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
