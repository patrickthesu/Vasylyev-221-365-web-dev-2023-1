function getSortedArray(array,  key) { 
    for (var i = 0; i < array.length; i++) { 
        for (var j = 0; j < (array.length - i - 1); j++) { 
            if (array[j][key] > array[j + 1][key]) { 
                var temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            } 
        } 
    } 
    return array;
}

let array = [{name: 'Макар', age: 20}, {name: 'Роберт', age: 32}, {name: 'Екатерина', age: 50}, {name: 'Оксана', age: 24}, {name: 'Святослав', age: 43}];
array = getSortedArray(array, 'age');
console.log(array);
array = getSortedArray(array, 'name');
console.log(array);