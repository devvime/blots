export class RouterInstance {
  instance = null;

  static set(obj) {
    this.instance = obj;
  }

  static get() {
    return this.instance;
  }
}
