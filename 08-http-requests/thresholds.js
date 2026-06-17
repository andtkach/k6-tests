import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';

export const options = {
    vus: 10,
    duration: '10s',
    thresholds: {
        // http_req_duration: ['p(95)<100'],
        http_req_duration: ['p(95)<200'],
        http_req_duration: ['max<2000'],
        http_req_failed: ['rate<0.01'],
        http_reqs: ['count>200'],
        http_reqs: ['rate>5'],
        vus: ['value>5'],
    }
}

export default function () {
    const res = http.get("https://quickpizza.grafana.com/test.k6.io/");
    check(res, {
        'status is 200': (r) => r.status === 200,
        'app title': (r) => r.body.includes('QuickPizza Legacy')
    });
    sleep(2);
}