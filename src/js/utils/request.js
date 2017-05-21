import 'whatwg-fetch';
export default function request(url, options) {
    url = "/api/v1.0" + url;
    console.log(options)
    var body;

        body = JSON.stringify(options.data);
    console.log(body)
    return fetch(url, {
        method: options.method || 'get',
        headers: {'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Access-Token': (sessionStorage.getItem('userId')+','+sessionStorage.getItem('token'))||''
             },
        body:options.data
    })
        .then((res) => {
            if(res.status.toString().startsWith("4")){
                return Promise.reject(res.json());
            }
            if(res.status.toString().startsWith("5")){
                return Promise.reject(res.json());
            }
            if(res.status.toString().startsWith("2")){
                if(res.status === 204){
                    return Promise.resolve();
                }
                return Promise.resolve(res.json());
            }
            return res.json();

        });
}

