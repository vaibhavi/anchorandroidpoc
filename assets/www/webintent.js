/**
 * Phonegap Web Intent plugin
 * Copyright (c) Boris Smus 2010
 *
 */
var WebIntent = function() { 

};

WebIntent.ACTION_SEND = "android.intent.action.SEND";
WebIntent.ACTION_COPY = "android.intent.action.SEND";
WebIntent.ACTION_VIEW = "android.intent.action.VIEW";
WebIntent.ACTION_EXTRA_STREAM = "Intent.EXTRA_STREAM";
WebIntent.EXTRA_TEXT = "android.intent.extra.TEXT";
WebIntent.EXTRA_SUBJECT = "android.intent.extra.SUBJECT";
WebIntent.DATA_TO_COPY = "stringData";

WebIntent.prototype.startActivity = function(params, success, fail) {
    return PhoneGap.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'startActivity', [params]);
};

WebIntent.prototype.hasExtra = function(params, success, fail) {
    return PhoneGap.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'hasExtra', [params]);
};

WebIntent.prototype.getExtra = function(params, success, fail) {
    return PhoneGap.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'getExtra', [params]);
};

WebIntent.prototype.getDataString = function(success, fail) {
    return PhoneGap.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'getDataString', []);
};

//WebIntent.prototype.copyToClipboard = function(success, fail) {
//return PhoneGap.exec(function(args) {
//success(args);
//}, function(args) {
//fail(args);
//}, 'WebIntent', 'copyData', []);
//};


WebIntent.prototype.copyToClipboard = function(params, success, fail) {
    return PhoneGap.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'copyData', [params]);
};

PhoneGap.addConstructor(function() {
    PhoneGap.addPlugin('webintent', new WebIntent());
});
