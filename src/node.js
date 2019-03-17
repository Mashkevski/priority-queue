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
    if (this.parent) {
      this.parent.removeChild(this);
    }
  }

  swapWithParent() {
    if (this.parent) {
      const temp = {
        parent: this.parent,
        parentParent: this.parent.parent || null,
        parentLeft: this.parent.left,
        parentRight: this.parent.right
      };

      // parent to child
      this.parent.left = this.left;
      if (this.left) {
        this.parent.left.parent = this.parent;
      }
      this.parent.right = this.right;
      if (this.right) {
        this.parent.right.parent = this.parent;
      }
      this.parent.parent = this;

      // child to parent
      if (temp.parentLeft === this) {
        this.left = temp.parent;
      } else {
        this.left = temp.parentLeft;
        if (this.left) {
          this.left.parent = this;
        }
      }
      if (temp.parentRight === this) {
        this.right = temp.parent;
      } else {
        this.right = temp.parentRight;
        if (this.right) {
          this.right.parent = this;
        }
      }
      this.parent = temp.parentParent;

      // parent of parent
      if (temp.parentParent && temp.parentParent.left === temp.parent) {
        temp.parentParent.left = this;
      } else {
        if (temp.parentParent && temp.parentParent.right === temp.parent) {
          temp.parentParent.right = this;
        }
      }
    }
  }
}

module.exports = Node;
