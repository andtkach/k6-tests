import http from 'k6/http';
import { sleep, group, check } from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<250'],
        'group_duration{group:::Main page}': ['p(95)<8000'],
        'group_duration{group:::News page}': ['p(95)<6000'],
        'group_duration{group:::Main page::Assets}': ['p(95)<3000'],
    }
}

export default function () {

    group('Main page', function () {
        let res = http.get('http://localhost:3000/delay?ms=5000');
        check(res, { 'status is 200': (r) => r.status === 200 });
    
        group('Assets', function () {
            http.get('http://localhost:3000/delay?ms=1000');
            http.get('http://localhost:3000/delay?ms=1000');
        });
    });


    group('News page', function () {
        http.get('http://localhost:3000/delay?ms=5000');
    });

    sleep(1);
}
