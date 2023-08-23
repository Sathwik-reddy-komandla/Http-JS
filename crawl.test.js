// crawl.test.js
const  { normalizeUrl } = require('./crawl.js') // Use the '.js' extension here

const { test, expect } =require('@jest/globals');

test('normalizeUrl', () => {
    const input = 'https://blog.google.com/path';
    const actual = normalizeUrl(input);
    const expected = 'blog.google.com/path';
    expect(actual).toEqual(expected);
});

test('normalizeUrl strip trailing slash', () => {
    const input = 'https://blog.google.com/path/';
    const actual = normalizeUrl(input);
    const expected = 'blog.google.com/path';
    expect(actual).toEqual(expected);
});


test('normalizeUrl capitals', () => {
    const input = 'https://BLOG.GOOGLE.com/path/';
    const actual = normalizeUrl(input);
    const expected = 'blog.google.com/path';
    expect(actual).toEqual(expected);
});

test('normalizeUrl strip http', () => {
    const input = 'http://blog.GOOGLE.com/path/';
    const actual = normalizeUrl(input);
    const expected = 'blog.google.com/path';
    expect(actual).toEqual(expected);
});