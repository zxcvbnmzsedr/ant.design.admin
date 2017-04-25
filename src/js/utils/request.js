import 'whatwg-fetch';
export default function request(url, options) {
    url = "/api" + url;
    console.log(options)
    var body;

        body = JSON.stringify(options.data);
    console.log(body)
    return fetch(url, {
        method: options.method || 'get',
        headers: {'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Access-Token': sessionStorage.getItem('token') || '' // 从sessionStorage中获取access token
             },
        body:options.data
    })
        .then((res) => {
            // delete status success
            if (res.status === 204) {
                return Promise.resolve(new Object(204));
            }
            if(res.status === 400){
                return Promise.reject(new Object(204));
            }
            if(res.status === 404){
                return Promise.reject(new Object(204));
            }
            return res.json();

        });
}

