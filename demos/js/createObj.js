//1.Object()构造函数
var per = new Object();
per.name = 'wy';

//2.对象字面量
var per = {name:'wy'}

//3. 工厂模式：用函数来封装以特定接口创建对象的细节
//缺点：不知道对象的类型
function createPer(name,age){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.sayName = function(){
        alert(this.naem);
    }
    return o;
}
var per1 = createPer('wy',20);
var per2 = createPer('yq',21);
// 寄生模式
function Person(name, age, job){
    var o = new Object(); //创建对象
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        alert(this.name);
    };
    return o; //返回创建对象
}
var friend = new Person("Nicholas", 29, "Software Engineer");
friend.sayName();  //"Nicholas"
// 稳妥构造函数模式
function Person(name, age, job){
    var o = new Object(); //创建要返回的对象
    o.sayName = function(){
        alert(name);
    };
    return o; //返回对象
}	
var friend = Person("Nicholas", 29, "Software Engineer");
friend.sayName();  //"Nicholas"

//4.构造函数模式
//优点：识别对象类型
//缺点：方法不能复用
function Per(name,age){
    this.name = name;
    this.age = age;
    this.sayName = function(){
        alert(this.name);
    }
}

var per1 = new Per('wy',20);
var per2 = new Per('yq',21);

//5.原型模式
function Per(){
}
Per.prototype.name = 'wy';
Per.prototype.age = 20;
Per.prototype.sayName = function(){
    alert(this.name);
};
var per1 = new Per();
var per2 = new Per();

// 组合使用构造函数模式和原型模式：定义引用类型

// 构造函数模式用于定义实例属性
function Person(name, age, job){
    this.name = name; 3
    this.age = age;
    this.job = job;
    this.friends = ["Shelby", "Court"];
}
//原型模式用于定义方法和共享的属性
Person.prototype = {
    constructor : Person,
    sayName : function(){
        alert(this.name);
    }
}

var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");
			
person1.friends.push("Van");
alert(person1.friends);    //"Shelby,Count,Van"
alert(person2.friends);    //"Shelby,Count"
alert(person1.friends === person2.friends);//false
alert(person1.sayName === person2.sayName);//true


// 动态原型模式 
// 解决独立的构造函数和原型问题
function Person(name, age, job){
    //属性
    this.name = name; 
    this.age = age; 
    this.job = job;
    //方法
    //这段代码只会在初次调用构造函数时才会执行
    if (typeof this.sayName != "function"){
        Person.prototype.sayName = function(){
            alert(this.name);
        }; 
    }
}

var friend = new Person("Nicholas", 29, "Software Engineer");
friend.sayName();



//继承
