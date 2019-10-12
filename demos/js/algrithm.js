function LinkNode(value){
this.value = value;
this.next = null;
}
function theKthNode(headNode, k){
    var stack = [], len = 0;
    while(headNode){
        stack.push(headNode);
        headNode = headNode.next;
        len++;
    }
    return stack[len-k];
}


//• 二叉树的深度
function TreeNode (value, left, right) {
  this.value = value;
  this.left = left;
  this.right = right;
};
function depth(rootNode){
    if (rootNode === null) {
        return 0;
    } else {
        var ld = depth(rootNode.left),
            rd = depth(rootNode.right);
        var max = ld >= rd? ld : rd;
        return 1 + max;
    }
}

//•   有一个二叉树，每个节点的值是一个整数。写一个函数，判断这颗树中是否存在从根到叶子节点的一个路径，这个路径上所有节点之和为某一个值。存在返回true，否则返回false。
function TreeNode (value, left, right) {
this.value = value;
this.left = left;
this.right = right;
}
function haspath(rootNode, value){


}







// 在数组中找到第K大的元素
// 给出数组 [9,3,2,4,8]，第三大的元素是 4
// 给出数组 [1,2,3,4,5]，第一大的元素是 5，第二大的元素是 4，第三大的元素是 3，以此类推
function findtheKthLargest(nums, k){
    quick(nums,0,nums.length-1);
    return nums[nums.length-k];
}

function quick(arr,left,right){
    let index;
    if(arr.length>1){
        index = partition(arr,left,right);
        if(left<index-1) quick(arr,left,index-1);
        if(index<right) quick(arr,index,right);
    }
    return arr;
}

function partition(arr,left,right){
    let pivot = arr[Math.floor((left+right)/2)],
        l = left,
        r = right;
    
    while(l<=r){
        while(arr[l] < pivot) l++;
        while(arr[r] > pivot) r--;
        if(l <= r) swap(arr,l++,r--);
    }
    return l;

}

function swap(arr,i,j){
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}






//•   求一个一维整数数组中的最长递增子序列的长度
//比如在序列1，-1，2，-3，4，-5，6，-7中，最长递增子序列长度为4，可以是1，2，4，6，也可以是-1，2，4，6
function getLIS(nums){
    var obj=[1];
    for (var i = 1; i < nums.length; i++) {
        if (nums[i]>nums[i-1]) {
            obj.map(function(a){
                return a+1;
            });
        }else if (nums[i]<nums[i-1]){
            obj.push(1);
        }
    }
}





























