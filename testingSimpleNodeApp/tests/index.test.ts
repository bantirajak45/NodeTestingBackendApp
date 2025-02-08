import {describe, expect, test} from '@jest/globals';
import {sum} from "../src/";

// jest is library for testing node js program
describe('sum module', () => {
    test('positive number test case', () => {
        expect(sum(1, 2)).toBe(3);
    });

    test('first negative no test case', () => {
        expect(sum(-1, 2)).toBe(1);
    });

    test('second negative no test case', () => {
        expect(sum(1, -2)).toBe(-1);
    });

    test('both negative no test case', () => {
        expect(sum(-1, -2)).toBe(-3);
    });
})