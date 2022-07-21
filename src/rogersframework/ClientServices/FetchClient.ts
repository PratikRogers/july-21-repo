export default class FetchClient {
    constructor() { this.getApiResponse = this.getApiResponse.bind(this); }
   
    public status(response:any) {
        if (response.status >= 200 && response.status < 300) {
          return Promise.resolve(response)
        } else {
          return Promise.reject(new Error(response.statusText))
        }
      }
      
    public json(response:any) {
        return response.json()
    }
    
    public getApiResponse(url:any) {
        return new Promise(function(resolve, reject) {
            fetch(url)
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                  return response.json();
                }
               else {
                const error = new Error(response.statusText);
                throw error;
              }
              }).then((jsonResult) => {
                  return jsonResult;
              })
              .catch(error => { alert('request failed'+ error); });
            });
    }

    public async getResponse(url:any) {
        await this.getApiResponse(url);
    }
    

    public createClient(url:any,options: any) {
        return new Promise((resolve:any, reject:any) => {
            let requestTimedOut = false;
            let timeout: any;
            if (options.timeout && options.timeout > 0) {
              timeout = setTimeout(() => {
                requestTimedOut = true;
                const error = "Request timed out after " + Math.floor(options.timeout! / 1000) + "s";
                reject({error});
              }, options.timeout);
            }
      
            fetch(url, options)
              .then(
                (response: Response) => {
                  clearTimeout(timeout); // it will do nothing if timeout isn't set, extra checks aren't needed
                  if (!requestTimedOut) {
                    if (response.ok) {
                      // console.log("1 Response" + JSON.stringify(response));
                      return response.json();
                    } else {
                      return "Error";
                    }
                  }
                  return response;
                },
                (error) => {
                  if (requestTimedOut) return;
                  reject({error});
                }).then((jsonResult) => {
                    // console.log("2" + jsonResult);
                    resolve(jsonResult);
                    // return jsonResult;
                  });
          });
    }
    public get<T>(url: string, data?: any) { return this.createClient(url, data); }
}