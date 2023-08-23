// crawl.test.js
const  { normalizeUrl, getURLsFromHTML } = require('./crawl.js') // Use the '.js' extension here

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


test('getURLsFromHTML absolute', () => {
    const input = `
    <html>
        <body>
            <a href="https://blog.google.com/path/">
            Google blog
            </a>
        </body>
    </html>`;
    const baseURL="https://blog.google.com";
    const actual = getURLsFromHTML(input,baseURL);
    const expected = ['https://blog.google.com/path/']
    expect(actual).toEqual(expected);
});




test('getURLsFromHTML relative', () => {
    const input = `
    <html>
        <body>
            <a href="/path/">
            Google blog
            </a>
        </body>
    </html>`;
    const baseURL="https://blog.google.com";
    const actual = getURLsFromHTML(input,baseURL);
    const expected = ['https://blog.google.com/path/']
    expect(actual).toEqual(expected);
});



test('getURLsFromHTML both absoulte and relative', () => {
    const input = `
    <html>
        <body>
            <a href="https://blog.google.com/path/">
            Google blog
            </a>
            <a href="/about/">
            Google blog
            </a>
            <a href="/path/">
            Google blog
            </a>
        </body>
    </html>`;
    const baseURL="https://blog.google.com";
    const actual = getURLsFromHTML(input,baseURL);
    const expected = ['https://blog.google.com/path/','https://blog.google.com/about/','https://blog.google.com/path/']
    expect(actual).toEqual(expected);
});




test('getURLsFromHTML invalid url', () => {
    const input = `
    <html>
        <body>
            <a href="invalid url">
            Google blog
            </a>
        </body>
    </html>`;
    const baseURL="https://blog.google.com";
    const actual = getURLsFromHTML(input,baseURL);
    const expected = []
    expect(actual).toEqual(expected);
});