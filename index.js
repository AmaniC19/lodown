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
/*
identity: Designed to return the value of a value unchanged.
@param {Value} value: a value that will be identified.
return: will return value unchanged.
*/

function identity(value) {
    return value;
}
module.exports.identity = identity;
/*
typeOf: Designed to see what you are dealing with. ie [] = array.
@param {Value} value: value that will be inspected.
return: what is it. ie {} = object.
*/
function typeOf(value) {
    if(Array.isArray(value)) return 'array';
    
    if(value === null) return 'null';
    
    if(value instanceof Date) return 'date';
    
    
    return typeof value;
}
module.exports.typeOf = typeOf;
/*
first: Designed to return a certain amount of values in an array depending on <num>.
If <array> is not an array, it returns an empty array.
If <num> does not exist, it only returns the first element of an array.
@param {Array} array: An array to look through.
@param {Number} num: The number that tells us to stop looking through array.
return: Returns the first element in an array through <num>.
*/
function first(array, num) {
    if(!Array.isArray(array) || num < 0) return [];
    if(num === undefined) return array[0];
    return array.slice(0,num);
}
module.exports.first = first;
/*
last: Designed to return 
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

function indexOf(array,value) {
    for(let i = 0; i < array.length; i++) {
        if(array[i] === value) {
            return i;
        }
    }    
    return -1;
}
module.exports.indexOf = indexOf;

function filter(collection,test) {
   const filtered = [];
   each(collection,function(value, position, collection) {
       if(test(value, position,collection)) filtered.push(value);
   });
   return filtered;
}
module.exports.filter = filter;

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

function partition(collection, test) {
    return [filter(collection,test),reject(collection,test)];
}
module.exports.partition = partition;

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

function map(collection,transform) {
    const transformed = [];
    each(collection, function(value, position, collection){
       transformed.push(transform(value,position,collection)); 
    });
    return transformed;
}
module.exports.map = map;

function pluck(array,key) {
   return  map(array, function(object, position, array){
       return object[key];
    });
}
module.exports.pluck = pluck;

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

function extend(copyTo, ...objs) {
    for(var i = 0; i < objs.length; i++){
        var obj = objs[i];
            for(var key in obj) {
                copyTo[key] = obj[key];
            }
    }
    return copyTo;
}
module.exports.extend = extend;