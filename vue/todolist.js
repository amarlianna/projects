function A() {
	this.name = 'wy';
	return this.name;
}

var a = new A();
var b = A();

console.log(a instanceof A);
console.log(b instanceof A);