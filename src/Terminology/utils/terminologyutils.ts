/* eslint-disable */
export function getTermTopPos(index:any) {
     const isItMobile = ( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    ) ? true : false;
   
    if (!isItMobile) {
         return 0;
    }
    const topArr = [0,100,130,130,0,180,130,0,0,0,0];
    return topArr[index];
} 