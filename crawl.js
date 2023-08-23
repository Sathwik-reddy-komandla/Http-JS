const { createTestScheduler } = require('jest')
const {JSDOM}=require('jsdom')



async function crawlPage(currentURL){
    console.log(`crawling ${currentURL}`)
    try{
        const resp=await fetch(currentURL)
        if(resp.status>399){
            console.log(`error in fetch with status code ${resp.status} on page ${currentURL}`)
            return
        } const contentType=resp.headers.get("content-type")
        if(!contentType.includes('text/html')){
            console.log(`non html response with content type: ${contentType} on page ${currentURL}`)
            return
        }
        console.log(await resp.text())
        
    }catch(err){
        console.log(`theres an error ${err.name} in the page ${currentURL}`)
    }
    }



function getURLsFromHTML(htmlBody,baseURL){
    const urls=[]
    const dom=new JSDOM(htmlBody)
    const linkElements=dom.window.document.querySelectorAll('a');
    for (const linkElement of linkElements){
        console.log(linkElement.href)
        if(linkElement.href.slice(0,1)=='/'){
            //relative
            try{
                const urlObj=new URL(`${baseURL}${linkElement}`)
                urls.push(`${baseURL}${linkElement}`)
            }catch(err){
                console.log("invlaid url ",err.name)
            }
        }else{
        // absoulte
        try{
            const urlObj=new URL(linkElement.href)
            urls.push(urlObj.href)
        }catch(err){
            console.log("invlaid url ",err.name)
        }
        }

    }
    return urls;

}


// crawl.js
const normalizeUrl = urlString => {
    const urlObj=new URL(urlString)
    const hostPath=`${urlObj.hostname}${urlObj.pathname}`
   
    if(hostPath.length>0 && hostPath.slice(-1)=='/'){
        return hostPath.slice(0,-1)
    }else{
        return hostPath
    }
};

module.exports= { normalizeUrl, getURLsFromHTML ,crawlPage};
