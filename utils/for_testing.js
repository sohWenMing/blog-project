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

    return(array.reduce(reducer, 0) / array.length).toFixed(2);
}

module.exports = {
    reverse, average
};

console.log(average([1, 2, 3.333333456]));