//对传入对象进行了浅复制  为什么不直接 new 父类呢？
function object(o){
    function F(){} //临时性构造函数
	F.prototype = o; //将传入函数作为该构造函数的原型
    return new F(); //返回该临时类型的一个新实例
}
SubType.prototype = new SuperType(); // 原型链继承

var person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};

var anotherPerson = object(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

var yetAnotherPerson = object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");
alert(person.friends); //"Shelby,Court,Van,Rob,Barbie"
