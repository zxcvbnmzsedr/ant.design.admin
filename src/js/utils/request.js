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
            if(res.status === 400){
                return Promise.reject(res.json());
            }
            if(res.status === 500){
                return Promise.reject(res.json());
            }
            if(res.status === 204){
                return Promise.resolve("成功");
            }
            return res.json();

        });
}

