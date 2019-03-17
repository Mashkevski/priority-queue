class Node {
  constructor(data, priority) {
    this.data = data;
    this.priority = priority;
    this.parent = null;
    this.left = null;
    this.right = null;
  }

  appendChild(node) {
    if (this.left === null) {
      this.left = node;
      node.parent = this;
    } else if (this.right === null) {
      this.right = node;
      node.parent = this;
    }
  }

  removeChild(node) {
    if (this.left === node) {
      this.left = null;
      node.parent = null;
    } else if (this.right === node) {
      this.right = null;
      node.parent = null;
    } else {
      throw new Error(`Passed node is not a child of this node`);
    }
  }

  remove() {
    if (this.parent !== null) {
      this.parent.removeChild(this);
    }
  }

  swapWithParent() {
    if (this.parent !== null) {
      const t = {
        parent: this.parent,
        parentParent: this.parent.parent || null,
        parentLeft: this.parent.left,
        parentRight: this.parent.right
      };

      this.parent.left = this.left;
      if (this.left !== null) {
        this.parent.left.parent = this.parent;
      }
      this.parent.right = this.right;
      if (this.right !== null) {
        this.parent.right.parent = this.parent;
      }
      this.parent.parent = this;

      if (t.parentLeft === this) {
        this.left = t.parent;
      } else {
        this.left = t.parentLeft;
        if (this.left !== null) {
          this.left.parent = this;
        }
      }
      if (t.parentRight === this) {
        this.right = t.parent;
      } else {
        this.right = t.parentRight;
        if (this.right !== null) {
          this.right.parent = this;
        }
      }
      this.parent = t.parentParent;

      if (t.parentParent !== null && t.parentParent.left === t.parent) {
        t.parentParent.left = this;
      } else {
        if (t.parentParent !== null && t.parentParent.right === t.parent) {
          t.parentParent.right = this;
        }
      }

    }
  }
}

module.exports = Node;

const parent = new Node(15, 42);
const child = new Node(42, 15);

parent.appendChild(child);
child.swapWithParent();