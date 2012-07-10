var openFileOnDevice = function(url){
    window.plugins.webintent.startActivity({ 
        action: WebIntent.ACTION_VIEW,
        type: 'application', 
        url: url 
    }, 
    function() {}, 
    function() {
        alert('No Application Found to open this file');
    }
    ); 
}

var streamVideo = function(url){
    window.plugins.webintent.startActivity({ 
        action: WebIntent.ACTION_VIEW,
        type: 'stream', 
        url: url 
    }, 
    function() {}, 
    function() {
        alert('No Application Found to open this file');
    }
    ); 
}

var sendEmail = function(){

    PhoneGap.exec(null, null, "Notification", "activityStart", ["Processing","Please wait..."]);
    window.plugins.downloader.downloadFile("http://67.169.109.188/dropbox/php/index.php?method=getFile&file=BlueHills.jpg","/","temp_file", true,   
            function(data){

        var extras = {};
        extras[WebIntent.EXTRA_SUBJECT] = "Test_Subject";
        extras[WebIntent.EXTRA_TEXT] = "Hi,\n\tThis is test Body";
        extras[WebIntent.ACTION_EXTRA_STREAM] = "";
        window.plugins.webintent.startActivity({ 
            action: WebIntent.ACTION_SEND,
            type: 'email', 
            extras: extras,
            url: data
        }, 
        function() {navigator.notification.activityStop();}, 
        function() {
            navigator.notification.activityStop();
            alert('Failed to send email via Android Intent');
        }
        );  
    },
    function(data)
    { 
        alert("error: " + data); 
        navigator.notification.activityStop();
        return false;}
    ); 






//  var extras = {};
//  extras[WebIntent.EXTRA_SUBJECT] = "Test_Subject";
//  extras[WebIntent.EXTRA_TEXT] = "Hi,\n\tThis is test Body";
//  window.plugins.webintent.startActivity({ 
//  action: WebIntent.ACTION_SEND,
//  type: 'text/plain', 
//  extras: extras 
//  }, 
//  function() {}, 
//  function() {
//  alert('Failed to send email via Android Intent');
//  }
//  ); 
};


var copyToClipBoard = function(data)
{
    var extras = {};
    extras[WebIntent.DATA_TO_COPY] = data;
    window.plugins.webintent.copyToClipboard({ 
        action: WebIntent.ACTION_SEND,
        extras: extras 
    }, 
    function() {}, 
    function() {
        alert('Failed To Copy Data');
    }
    ); 
}

var openMap = function(){
    window.plugins.webintent.startActivity({
        action: WebIntent.ACTION_VIEW,
        url: 'geo:0,0?q=India'}, 
        function() {}, 
        function() {alert('Failed to open URL via Android Intent');}
    );
};


var openOnlineDoc = function(url)
{
    PhoneGap.exec(null, null, "Notification", "activityStart", ["Downloading","Please wait..."]);
    window.plugins.downloader.downloadFile(url,"/","temp_file", true,   
            function(data){
//      alert(JSON.stringify(data));
        navigator.notification.activityStop();
        window.plugins.webintent.startActivity({ 
            action: WebIntent.ACTION_VIEW,
            type: 'application', 
            url: data 
        }, 
        function() { navigator.notification.activityStop(); }, 
        function() {
            alert('No Application Found to open this file');
            navigator.notification.activityStop();
        }
        ); 
    },
    function(data) //vb..failure callback
    { 
        alert("error: " + data); 
        navigator.notification.activityStop();
        return false;}
    ); 
}


createDummyLocalStorage = function()
{  
    Ext.regModel('Note', {
        idProperty: 'id',
        fields: [
                 { name: 'id', type: 'int' },
                 { name: 'date', type: 'date', dateFormat: 'c' },
                 { name: 'title', type: 'string' },
                 { name: 'narrative', type: 'string' }
                 ]
    });


    var localStore = new Ext.data.Store({
        model: "Note",
        proxy: {
            type: 'localstorage',
            id: 'Notes-local-storage'
        },
        root: 'people',
        autoLoad: true
    });

    localStore.add( { id: 1, date: new Date(), title: 'Test Note_1', narrative: 'This is simply a test note_1' });
    localStore.add( { id: 2, date: new Date(), title: 'Test Note_2', narrative: 'This is simply a test note_2' });
    localStore.sync();
}    




var getFileMetaData = function() {
    Ext.util.JSONP.request({
        url: 'http://67.169.109.188/dropbox/php/index.php',
        params: {
            method: 'accountInfo',
//          path: 'd1',
            format: 'json'
        },

        callback: function(result) {
            // Output result to console (Firebug/Chrome/Safari)
//          console.log(result);
            // Handle error logic
            if (result.error) {
                alert(result.error)
                return;
            }
        }
    });
}




var childBrowserOpenFile = function(url)
{
    window.plugins.childBrowser.showWebPage(url, { showLocationBar: true });
}

var createDirectory = function ()
{
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
            function (fileSystem) {
        var entry = fileSystem.root;
        entry.getDirectory("example_dir", {create: true, exclusive: false},
                function (dir) { 
            alert("Created dir "+ dir.name); 
            dir.getFile("test.txt", {create: true}, gotFileEntry, fail);
        } ,
        onGetDirectoryFail);  
    }, fail);
}



var removeDirectory = function()
{
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
            function (fileSystem) {
        var entry = fileSystem.root;
        entry.getDirectory("example_dir", {create: true, exclusive: false},
                function (dir) { 
            dir.removeRecursively(function(){alert("Directory Delete Sucess")},function(){alert("Directory Deletion Failed")});
        },
        onGetDirectoryFail);  
    }, fail);
}

var createFile = function()
{
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
            function (fileSystem) {
        fileSystem.root.getFile("test.txt", {create: true}, gotFileEntry, fail);
    }, fail);
}

var removeFile = function()
{
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
            function (fileSystem) {
        fileSystem.root.getFile("test.txt", {create: true},
                function gotFileEntry(fileEntry) {
            fileEntry.remove(function(){alert("File Delete Sucess")},function(){alert("File Deletion Failed")});
        },
        fail);
    }, fail);
}


var createResourceDirectory = function ()
{
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
            function (fileSystem) {
        var entry = fileSystem.root;
//      console.log("fileSystem Name" + fileSystem.name);
//      console.log("fileSystem Root" + fileSystem.root.name);
    }, fail);
}


function gotFileEntry(fileEntry) {
    alert("Created File "+ fileEntry.name); 
    fileEntry.createWriter(gotFileWriter, fail);
}

function gotFileWriter(writer) {
    writer.onwrite = function(evt) {
//      console.log("write success");
    };
    writer.write("some sample text");
    // contents of file now 'some sample text'
    writer.truncate(11);
    // contents of file now 'some sample'
    writer.seek(4);
    // contents of file still 'some sample' but file pointer is after the 'e' in 'some'
    writer.write(" different text");
    // contents of file now 'some different text'
}

function fail(error) {
//  console.log(error.code);
}

//function onGetDirectorySuccess(dir) { 
//console.log("Created dir "+ dir.name); 
//} 

function onGetDirectoryFail(error) { 
//  console.log("Error creating directory "+error.code); 
} 

function uploadFromGallery() {

    // Retrieve image file location from specified source
    navigator.camera.getPicture(uploadPhoto, function(message) {
        alert('get picture failed');
    },{
        quality: 50, 
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
    }
    );

}

function uploadUsingPlugin_GetGalleryPicture() {
    navigator.camera.getPicture(uploadUsingPlugin, function(message) {
        alert('get picture failed');
    },{
        quality: 50, 
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
    }
    );
}

//TODO path is required as 2nd param to save the file at appropriate location
function uploadUsingPlugin(imageURI){
    var params = new Object();
    params.path = "test/path/";
    window.plugins.fileUploader.uploadByUri("http://67.169.109.188/dropbox/php/index.php?method=putFile",
            imageURI,
            params,
            {},
            "filename",
            "mime/type",
            win,
            fail,function(data){
                console.log("Data " + data);
            }
    );


//  window.plugins.FileUploader.uploadByUri("http://67.169.109.188/dropbox/php/index.php?method=putFile?test/path/=", your_actual_image, null, "image", "my_image.jpg", "image/jpg", uploadSuccess, uploadFail, uploadProgress);

}


function uploadFile(URI) {
    PhoneGap.exec(null, null, "Notification", "activityStart", ["Uploading","Please wait..."]);
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = URI.substr(URI.lastIndexOf('/')+1);
//  console.log("fileName " + URI.substr(URI.lastIndexOf('/')+1));
    options.mimeType="image/jpeg";

    var params = new Object();
    params.path = "test/path/";

    options.params = params;
    options.chunkedMode = false;

    var ft = new FileTransfer();    
//  console.log("ImageUri " + URI);
    ft.upload(URI, "http://67.169.109.188/dropbox/php/index.php?method=putFile", win, fail, options);

}

function uploadPhoto(imageURI) {
    PhoneGap.exec(null, null, "Notification", "activityStart", ["Uploading","Please wait..."]);
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);

    options.mimeType="image/jpeg";

    var params = new Object();
    params.path = "test/path/";

    options.params = params;
    options.chunkedMode = false;

    var ft = new FileTransfer();    

    ft.upload(imageURI, "http://67.169.109.188/dropbox/php/index.php?method=putFile", win, fail, options);
}

function win(r) {
//  console.log("Code = " + r.responseCode);
//  console.log("Response = " + r.response);
//  console.log("Sent = " + r.bytesSent);
    navigator.notification.activityStop();
    alert('File Uploaded Sucessfully');
}

function fail(error) {
    navigator.notification.activityStop();
    alert("An error has occurred: Code = " + error.code);
}



