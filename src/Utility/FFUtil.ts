 
export function getFF() {
    let isFF = false;
    if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
        isFF = true;
   }   
   return isFF;
}

export function initMailClient() {
    
}