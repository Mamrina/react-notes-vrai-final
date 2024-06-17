export class Category {
  constructor(id, text) {
    this.id = id;
    this.text = text;
  }

  length() {
    return this.text.length;
  }
}