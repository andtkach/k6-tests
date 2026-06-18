import http from 'k6/http';
import { sleep, group, check } from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        'http_req_duration{expected_response:true}': ['p(95)<1000'],
        'group_duration{group:::Main page}': ['p(95)<3000'],
        'group_duration{group:::Main page::Assets}': ['p(95)<1000'],
        'group_duration{group:::News page}': ['p(95)<1000'],
    }
}

export default function () {

    group('Main page', function () {
        let res = http.get('http://localhost:3000/delay?ms=900');
        check(res, { 'status is 200': (r) => r.status === 200 });
    
        group('Assets', function () {
            http.get('http://localhost:3000/delay?ms=900');
            http.get('http://localhost:3000/delay?ms=900');
        });
    });


    group('News page', function () {
        http.get('http://localhost:3000/delay?ms=900');
    });

    sleep(1);
}
