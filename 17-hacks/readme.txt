
Allow self signed ssl certs
 k6 run .\insecure-request.js --insecure-skip-tls-verify

Output result to json
k6 run .\load-test.js --summary-export=summary.json

------------------------------------------------------------------
Local dashboard and HTML reports


1. Web dashboard

Windows Command Prompt (cmd.exe):
set "K6_WEB_DASHBOARD=true" & k6 run load-test.js

Windows PowerShell:
$env:K6_WEB_DASHBOARD = "true"; k6 run load-test.js

macOS/Linux: 
K6_WEB_DASHBOARD=true k6 run load-test.js

web dashboard: http://127.0.0.1:5665

2. HTML report

Windows Command Prompt (cmd.exe):
set "K6_WEB_DASHBOARD=true" & set "K6_WEB_DASHBOARD_EXPORT=k6-report.html" & k6 run load-test.js

Windows PowerShell:
$env:K6_WEB_DASHBOARD="true"; $env:K6_WEB_DASHBOARD_EXPORT="k6-report.html"; k6 run load-test.js

macOS/Linux: 
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=k6-report.html k6 run load-test.js