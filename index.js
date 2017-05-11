'use strict';

// YOU KNOW WHAT TO DO //

/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
 */
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}
module.exports.each = each;

/**
 * identity: Designed to return the value of a value unchanged.
 * @param {Value} value: a value that will be identified.
 * @return: {Value} will return value unchanged.
 */
function identity(value) {
    return value;
}
module.exports.identity = identity;

/**
* typeOf: Designed to see what you are dealing with. ie [] = array.
* @param {Value} value: value that will be inspected.
* @return {String}: what is it. ie {} = object.
*/
function typeOf(value) {
    if(Array.isArray(value)) return 'array';
    
    if(value === null) return 'null';
    
    if(value instanceof Date) return 'date';
    
    
    return typeof value;
}
module.exports.typeOf = typeOf;

/**
* first: Designed to return a certain amount of values in an array depending on <num>.
* If <array> is not an array, it returns an empty array.
* If <num> is undefined, it only returns the first element of an array.
* @param {Array} array: An array to look through.
* @param {Number} num: The number that tells us to stop looking through array.
* @return {Array[0]}: Returns the first element in <array> through <num>.
*/
function first(array, num) {
    if(!Array.isArray(array) || num < 0) return [];
    if(num === undefined) return array[0];
    return array.slice(0,num);
}
module.exports.first = first;

/**
* last: Designed to return the lasts elements of an array.
* If <array> is not an array, it returns an empty array.
* If <num> is undefined, it returns the last element of an array.
* @param {Array} array: The array to look through.
* @param {Number} num: To know how far from the end of the array to look at.
* @return {Array[-1, num]}: Return the last elements of an array from <num> to the end of <array>.
*/
function last(array,num) {
    if(!Array.isArray(array) || num < 0)  {
        return [];
    }
    else if(num === undefined) {
        return array.slice(-1).pop();
    }
    else if(num > array.length){
        return array;
         
    } else {
        return array.slice(array.length -num, array.length);
    }
    
}
module.exports.last = last;

/**
* indexOf: Designed to return the position of <value> in an array.
* @param {Array} array: The array to loop through.
* @param {String or Number} value: The value we are looking for while looping through <array>.
* @return {Number}: Returns the position of the value if it is there.
* If it is not there, returns -1.
*/
function indexOf(array,value) {
    for(let i = 0; i < array.length; i++) {
        if(array[i] === value) {
            return i;
        }
    }    
    return -1;
}
module.exports.indexOf = indexOf;

/**
* filter: Designed to return a new array containing the values that returned true in an Array.
* @param {Array} collection: The Array to loop through.
* @param {Function} test: The action we are applying on elements or values in <collection>.
* @return {Array}: Returns the new array containing all true values of <collection>.
*/
function filter(collection,test) {
   const filtered = [];
   each(collection,function(value, position, collection) {
       if(test(value, position,collection)) filtered.push(value);
   });
   return filtered;
}
module.exports.filter = filter;

/**
* reject: Designed to return a new array containing the values that returned false in an Array.
* @param {Array} collection: The Array to loop through.
* @param {Function} test: The action we are applying on elements in <collection>.
* @return: {Array} Returns the new array containing all false values of <collection>.
 */
function reject(collection,test) {
    const rejected = [];
    filter(collection,function(value, position, collection) {
       if(!test(value, position,collection)) {
           rejected.push(value);
       } 
    });
    return rejected;
}
module.exports.reject = reject;

/**
* partition: Designed to return an Array containing two arrays: one array contains truthy values and the
* other array containing falsey.
* @param {Array} collection: The array to loop through.
* @param {Function} test: Pulls out the elements of an array including its position and the entire array.
* @return {Array}: Returns an array containing two arrays with truthy and falsey values.
*/
function partition(collection, test) {
    return [filter(collection,test),reject(collection,test)];
}
module.exports.partition = partition;

/**
* unique: Designed to loop through an array and delete the duplicates in the array.
* @param {Array} arr: The array we loop through.
* @return {Array}: A new array containing <array> with no duplicates in it.
*/
function unique(arr) {
    const newArr = [];
    each(arr,function(value, position, arr){
       if (indexOf(newArr,value) === -1) {
           newArr.push(value);
       }
    });
    return newArr;
}
module.exports.unique = unique;

/**
* map: Designed to loop through a collection and return the values in a new array.
* @param {Array or Object} collection: The array or object to loop through.
* @param {Function} transform: The action we are applying on <collection>.
* @return {Array}: Returns the  new array.
*/
function map(collection,transform) {
    const transformed = [];
    each(collection, function(value, position, collection){
       transformed.push(transform(value,position,collection)); 
    });
    return transformed;
}
module.exports.map = map;

/**
* pluck: Designed to return an array containing value of a key of an object in an array.
* @param {Array of Objects} array: The array to loop through.
* @param {Key} key: A key in the object.
* @return {Object[key]}: Returns the value of <key>.
*/
function pluck(array,key) {
   return  map(array, function(object, position, array){
       return object[key];
    });
}
module.exports.pluck = pluck;

/**
* contains: Designed to loop through an array and see if it contains <value>.
* If <value> is undefined, returns false.
* @param {Array} array: The array we loop through.
* @param {Number or String} value: The value we are looking for in <array>
* @returns {Boolean}: Returns true if the value is there, false otherwise.
*/
function contains(array, value) {
    if(indexOf(array, value) > -1) {
        return true;
    } else if( value === undefined) {
        return false;
    } else {
        return false;
    }
}
module.exports.contains = contains;

/**
* every: Designed to loop through an array or objects and return true if all values in <collection> are
* true.
* If one value is false, automatically returns false.
* If <test> is undefined, returns true if all elements are true, false otherwise.
* @param {Array or Object} collection: The collection to loop through.
* @param {Function} test: The action applied to <collection>.
* @return {Boolean}: Returns true if all values are true, false otherwise.
*/
function every(collection, test) {
    if(test === undefined) {
        test = identity;
    }
  var output = true;
  each(collection, function(value, position, collection){
    if(!test(value, position, collection)) output = false;
  });
  return output;
}
module.exports.every = every;

/**
* some: Designed to loop through an array or object and return true if atleast one value is true. False 
* otherwise.
* If <collection> is undefined, return true if atleast one element is true, false otherwise.
* @param {Array or Object} collection: The array or object we loop through.
* @param {Function} test: The action applied to collection.
* @return {Boolean}: Returns true if atleast one value is true. False otherwise.
*/
function some(collection, test) {
    var output = false;
    if(test === undefined){
        test = identity;
    }
    each(collection, function(value, position, collection){
       if(test(value, position, collection)) output = true; 
    });
    return output;
}
module.exports.some = some;

/**
* reduce: Designed to loop through an array, and add the value of each element in an array.
* If <seed> is not given, it starts at the very first element of the array.
* @param {Array} array: An array to loop through.
* @param {Add/Concatnate} combine: Adds the previous iteration to the curret value.
* @param {Number} seed: The previous iteration.
* @return {Array}: Returns the value of the elements in <array> added together, or combined.
*/
function reduce(array,combine,seed){
    let
        combined = seed,
        i = 0;
    if(combined === undefined) {
        combined = array[0];
        i = 1;
    }
    for(; i < array.length; i++){
        combined = combine(combined, array[i], i, array);
    }
    return combined;
}
module.exports.reduce = reduce;

/** 
* extend: Designed to look through an object or more objects, and return a single object containing
* all the the key-value pairs in those objects.
* @param {Object} copyTo: The object in which we copy the key-value pairs of objects.
* @param {Object} ...objs: One or more objects.
* @return {Object}: Return a single object object containing all key-value pairs of many objects.
*/
function extend(copyTo) {
    const objs = Array.prototype.call.slice(arguments, 1);
    for(var i = 0; i < objs.length; i++){
        var obj = objs[i];
            for(var key in obj) {
                copyTo[key] = obj[key];
            }
    }
    return copyTo;
}
module.exports.extend = extend;