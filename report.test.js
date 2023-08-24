const {sortPages}=require('./report.js')

const {test,expect}=require('@jest/globals');


test("sortPages",()=>{
    input={
        "https://www.google.com":5
    }
    const actual=sortPages(input)
    const expected=[
    ["https://www.google.com",5]
    ]
    expect(actual).toEqual(expected)
})

test("sortPages 2 urls",()=>{
    input={
        "https://www.google.com":5,
        "https://www.google.com/path":1

    }
    const actual=sortPages(input)
    const expected=[
    ["https://www.google.com",5],
    ["https://www.google.com/path",1]
    ]
    expect(actual).toEqual(expected)
})

test("sortPages multiple urls",()=>{
    input={
        "https://www.blog.google.com":19,

        "https://www.google.com":25,
        "https://www.google.com/path":1

    }
    const actual=sortPages(input)
    const expected=[
    ["https://www.google.com",25],
    ["https://www.blog.google.com",19],
    ["https://www.google.com/path",1]
    ]
    expect(actual).toEqual(expected)
})