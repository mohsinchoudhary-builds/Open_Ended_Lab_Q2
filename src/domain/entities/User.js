// DOMAIN LAYER: pure business object, no framework / database code here.
class User {
  constructor({ id = null, name, address, email } = {}) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.email = email;
  }
}

module.exports = User;