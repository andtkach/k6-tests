import http from 'k6/http';
import { sleep, group, check } from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<250']
    }
}

export default function () {

    group('Main page', function () {
        console.log('Main page');
        let res = http.get('https://quickpizza.grafana.com/test.k6.io/');
        check(res, { 'status is 200': (r) => r.status === 200 });
    
        group('Assets', function () {
            console.log('Main page - Assets');
            http.get('https://quickpizza.grafana.com/test.k6.io/static/css/site.css');
            http.get('https://quickpizza.grafana.com/test.k6.io/static/favicon.ico');
        });
    });


    group('News page', function () {
        console.log('News page');
        http.get('https://quickpizza.grafana.com/news.php');
    });

    sleep(1);
}
