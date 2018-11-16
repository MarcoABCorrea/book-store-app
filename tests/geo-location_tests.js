/*global describe, beforeEach, it, browser, expect */
'use strict';
describe('Geo Location page', function() {

  // Components
  var btnSiteLocation = element(by.id('btnSiteLocation')),
    btnResetLocation = element(by.id('btnResetLocation')),
    btnMyLocation = element(by.id('btnMyLocation')),
    iptSite = element(by.model('site')),
    tblResult = element(by.tagName('table')),
    map = element(by.id('map')),
    tblRow = element.all(by.css('.field_name')),
    tblRowLocation = element.all(by.css('.location_value')),
    markers = element.all(by.repeater('marker in markers'));

  // Tests Variables
  var rowNames = ["IP", "Country", "Region", "City", "Time Zone", "Latitude", "Longitude"],
    tblRowLength = 0,
    tblRowLocationLength = 0;

  beforeEach(function () {
    browser.get('http://127.0.0.1:9000/#/');
    tblRow.count().then(function(count){
      tblRowLength = count;
    });
    tblRowLocation.count().then(function(count){
      tblRowLocationLength = count;
    });
  });

  it('should have 3 buttons, 1 input, 1 table, 1 map', function () {
    expect(btnSiteLocation.isPresent()).toBe(true);
    expect(btnResetLocation.isPresent()).toBe(true);
    expect(btnMyLocation.isPresent()).toBe(true);
    expect(iptSite.isPresent()).toBe(true);
    expect(tblResult.isPresent()).toBe(true);
    expect(map.isPresent()).toBe(true);
  });

  it('should have 3 buttons with names "Locate", "My Location", "Reset Location"', function () {
    expect(btnSiteLocation.getText()).toEqual('Locate');
    expect(btnMyLocation.getText()).toEqual('My location');
    expect(btnResetLocation.getText()).toEqual('Reset location');
  });

  it('should have 1 table with rows names "IP", "Country", "Region", "City", "Time Zone", "Latitude", "Longitude"', function () {
    expect(tblRow.count()).toBe(7);
    for (var i = tblRowLength -1; i >= 0; i--) {
      expect(tblRow.get(i).getText()).toEqual(rowNames[i]);
    };
  });

  it('should show your location when you click the "My Location" button', function () {
    btnMyLocation.click();
    setTimeout(function() {
      expect(tblRowLocation.count()).toBe(7);
      for (var i = tblRowLocationLength - 1; i >= 0; i--) {
        expect(tblRowLocation.get(i).getText().isPresent()).toBe(true);
      };
    }, 10);
  });

  it('should add a mark on map when you click the "My Location" button', function () {
    btnMyLocation.click().then(function(){
      expect(markers.count()).toBe(1);
    });
  });

  it('should remove the "My Location" mark when click the "Reset location" button', function () {
    btnMyLocation.click().then(function(){
      expect(markers.count()).toBe(1);
      btnResetLocation.click();
      expect(markers.count()).toBe(0);
    });
  });

  it('should add a mark on map when you insert an URL and click the "Locate" button', function () {
    iptSite.sendKeys('www.google.com');
    btnSiteLocation.click().then(function(){
      expect(markers.count()).toBe(1);
    });
  });

  it('should remove only the "My Location" mark when added my location and a site location and click the "Reset location" button', function () {
    iptSite.sendKeys('www.google.com');
    btnSiteLocation.click().then(function(){
      expect(markers.count()).toBe(1);
    });
    iptSite.sendKeys('avenuecode.com');
    btnSiteLocation.click().then(function(){
      expect(markers.count()).toBe(2);
    });
    btnMyLocation.click().then(function(){
      expect(markers.count()).toBe(3);
      btnResetLocation.click();
      expect(markers.count()).toBe(2);
    });
  });

});