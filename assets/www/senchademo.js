var cfg = {
        fullscreen : true,
        dockedItems : [
                       {
                           dock : 'top',
                           xtype : 'toolbar',
                           title : 'Sencha Touch With PhoneGap Plug-in'
                       }],

                       layout : {
                           type : 'vbox',
                           pack : 'center',
                           align : 'stretch'
                       },
                       cls : 'card1',
                       scroll : 'vertical',
                       defaults : {
                           layout : {
                               type : 'hbox'
                           },
                           padding : 15,
                           flex : 1,
                           defaults : {
                               xtype : 'button',
                               cls : 'demobtn',
                               flex : 1

                           }
                       }
};

cfg.items = [
             {
                 items : [ {
                     ui : 'round',
                     text : 'Open PDF Document',
                     handler : function() {
                         openFileOnDevice('pdf_test.pdf');
                     }
                 } ]
             },
             {
                 items : [ {
                     ui : 'round',
                     text : 'Open MPG Video',
                     handler : function() {
                         openFileOnDevice('mpg_test.mpg');
                     }
                 } ]
             },

             {
                 items : [ {
                     ui : 'round',
                     text : 'Open MP4 Video',
                     handler : function() {
                         openFileOnDevice('mp4_test.mp4');
                     }
                 } ]
             },
             {
                 items : [ {
                     ui : 'round',
                     text : 'Open Online MP4 Video',
                     handler : function() {
                         streamVideo('http://podcast.20min-tv.ch/podcast/20min/199752.mp4');
                     }
                 } ]
             },
             {
                 items : [ {
                     ui : 'round',
                     text : 'Open 3GP Video',
                     handler : function() {
                         openFileOnDevice('gp3_test.3gp');
                     }
                 } ]
             },
             {
                 items : [ {
                     ui : 'round',
                     text : 'Open Word Document',
                     handler : function() {
                         
                         openFileOnDevice('word_test.docx');
                     }
                 } ]
             },
             {
                 items : [ {
                     ui : 'round',
                     text : 'Open PPt Document',
                     handler : function() {
                         openFileOnDevice('ppt_test.ppt');
                     }
                 } ]
             },
             {
                 items : [ {
                     ui : 'round',
                     text : 'Send Email',
                     handler : function() {
                         sendEmail();
                     }
                 } ]
             },
             {
                 items : [ {
                     ui : 'round',
                     text : 'Open Online PDF File',
                     handler : function() {
                         openOnlineDoc('http://inkwelleditorial.com/pdfSample.pdf');
//                       openOnlineDoc(' http://67.169.109.188/DropBox/php/index.php?method=getFile&file=BlueHills.jpg')
                     }
                 } ]
             },
             {
                 items : [ {
                     ui : 'round',
                     text : 'Open Online Word File',
                     handler : function() {
                         openOnlineDoc('http://xmlw.ie/aboutxml/wordsample2.doc');

                     }
                 } ]
             },
             {
                 items : [ {
                     ui : 'round',
                     text : 'Create Directory',
                     handler : function() {

                         createDirectory();
                     }
                 } ]
             },
             {
                 items : [ {
                     ui : 'round',
                     text : 'Remove Directory',
                     handler : function() {
                         removeDirectory();
                     }
                 } ]
             },
             {
                 items : [ {
                     ui : 'round',
                     text : 'Create File',
                     handler : function() {
                         createFile();
                     }
                 } ]
             },
             {
                 items : [ {
                     ui : 'round',
                     text : 'Remove File',
                     handler : function() {
                         removeFile();
                     }
                 } ]
             },
             {
                 items : [ {
                     ui : 'round',
                     text : 'Create Dummy Storage',
                     handler : function() {
                         createDummyLocalStorage();
                     }
                 } ]
             },
             {
                 items : [ {
                     ui : 'round',
                     text : 'GetFileMetaData',
                     handler : function() {
                         getFileMetaData();
                     }
                 } ]
             },
             {
                 items : [ {
                     ui : 'round',
                     text : 'Child Browser Open PDF',
                     handler : function() {
                         childBrowserOpenFile('http://samplepdf.com/sample.pdf');
                     }
                 } ]
             },
             {
                 items : [ {
                     ui : 'round',
                     text : 'Child Browser Open Word Doc',
                     handler : function() {
                         childBrowserOpenFile('http://clearwisdom.net/emh/works/2011_DC_FINAL.doc');
                     }
                 } ]
             },
             {
                 items : [ {
                     ui : 'round',
                     text : 'Child Browser Open Google',
                     handler : function() {
                         childBrowserOpenFile('http://google.com');
                     }
                 } ]
             },
             {
                 items : [ {
                     ui : 'round',
                     text : 'Upload',
                     handler : function() {
                         uploadFromGallery();
                     }
                 } ]
             },
             {
                 items : [ {
                     ui : 'round',
                     text : 'Download From Dropbox',
                     handler : function() {
//                       openOnlineDoc('http://67.169.109.188/DropBox/php_x/download_file.php');
                         openOnlineDoc('http://67.169.109.188/dropbox/php/index.php?method=getFile&file=BlueHills.jpg');
                     }
                 } ]
             },
             {
                 items : [ {
                     ui : 'round',
                     text : 'Copy To ClipBoard',
                     handler : function() {
                         copyToClipBoard("Test Copying Data From Sench/PhoneGap App");
                     }
                 } ]
             },
             {
                 items : [ {
                     ui : 'round',
                     text : 'Upload Using Plugin',
                     handler : function() {
                         uploadUsingPlugin_GetGalleryPicture();
                     }
                 } ]
             }
             ];

new Ext.Application({
    launch : function() {
        var panel = new Ext.Panel(cfg);
    }
});
