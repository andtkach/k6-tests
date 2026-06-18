import http from 'k6/http';
import { check } from 'k6';

export default function () {
    let res = http.get('http://localhost:8000/public/crocodiles/');

    res = http.get('http://localhost:8000/public/crocodiles/7/');

    console.log(res.json().name);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'Crocodile is Sobek': (r) => r.json().name === 'Sobek'
    });

}