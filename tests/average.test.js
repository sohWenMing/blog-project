const { test, describe } = require('node:test');
const assert = require('node:assert');


const average = require('../utils/for_testing').average;

describe('suite of tests for average', () => {
    test('testing for one value', () => {
        assert.strictEqual(average([1]), 1);
    });
    test('testing for multuple values', () => {
        assert.strictEqual(average([1, 2, 3]), 2);
    });
    test('testing for 0 values', () => {
        assert.strictEqual(average([]), 0);
    });
});

