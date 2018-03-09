# Query Testing Website

This folder contains an *index.php* file which can serve as a basic interface to send queries to a local Hestia Server instance. To use this, host a local apache2 webserver, with php and curl enabled, and either copy these files into /var/www/html, or redirect apache to start using this directory instead of its default. Once that's done, you should be able to go to "localhost" in your browser, and you should see two input boxes and a submit button. You simply need to fill out the relevant data and submit. For example,

Query to send:
`plugins/`
Request Method:
`get`

This should return something like:

`array(2) { [0]=> string(7) "philips" [1]=> string(4) "mock" } `