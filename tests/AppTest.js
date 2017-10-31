'use strict';
console.log('Testing started');

var webdriver = require('selenium-webdriver'),
    username = process.env.SAUCE_USERNAME,
    accessKey = process.env.SAUCE_ACCESS_KEY,
    SauceLabs = require("saucelabs"),
    saucelabs = new SauceLabs({
      username: username,
      password: accessKey});
    
var driver;

var url = process.env.APP_URL;

console.log('Testing of the deployed url [' + url + '] is not possible since stage1 is not public');

driver = new webdriver.Builder().
  withCapabilities({
    'browserName': 'firefox',
    'platform': 'Windows 7',
    'version': '43.0',
    'username': username,
    'accessKey': accessKey,
    'name': 'OTC Deployed App Test',
    'build': process.env.BUILD_DATE
  }).
  usingServer("http://" + username + ":" + accessKey + "@ondemand.saucelabs.com:80/wd/hub").build();


console.log('Testing will be performed using deployed page ' + process.env.TEST_URL);
driver.get(process.env.TEST_URL);
driver.getTitle().then(function (title) {
    console.log("title is: " + title);
    console.log('Testing done');
});


driver.getSession().then(function (sessionid){
    var sessionId = sessionid.id_;
    console.log("Sauce Labs Session ID: " + sessionId);
    driver.quit();
    saucelabs.updateJob(sessionId, {'passed': 'true'}, function (err, res) {
    console.log("Sauce Labs Test Job updated to SUCCESS");
    });
});
