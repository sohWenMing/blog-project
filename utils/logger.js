function info(...parens) {
    console.log(...parens);
}

function error(...parens) {
    console.error(...parens);
}

module.exports = { info, error };