function reverse(string) {
    return (string
        .split('')
        .reverse()
        .join('')
    );
}

function average(array) {

    function reducer(acc, value) {
        return(acc + value);
    }

    if(array.length === 0) {
        return 0;
    }

    return(array.reduce(reducer, 0) / array.length);
}

module.exports = {
    reverse, average
};

console.log(average([1, 2, 3.333333456]));