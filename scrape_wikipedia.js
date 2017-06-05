var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var downloadimages = true; 
var saveimageinfo = true;

var base_url = 'https://en.wikipedia.org/wiki/20th-century_Western_painting';

app.get('/scrape', function(req, res){

request(base_url, function(error, response, html){
    var $ = cheerio.load(html);

    var urls = [];
    var img_urls = []; 

    var imgs_link = $('.thumb');
    var img_index = 0;

    imgs_link.each(function(){ 
            var div = $(this);
            url =  div.find('.image').attr('href'); 
            info =  div.parent().find('.gallerytext').text().trim(); 
            if (info.length > 200) {
                info = div.find('.thumbcaption').text().trim(); 
            } 
            var filename = info
            filename = filename.replace(/\s+/g, '');
            filename = filename.replace(/,/g, '')
            filename = filename.replace(/[^\x00-\x7F]/g, "_");
            filename = filename.replace(/[^A-Za-z0-9\s!?]/g,'');
            if (filename.length > 40) {
                filename = filename.substring(0, 40);
            }
            var obj = 
                { url: url, 
                  filename : filename,
                  info: info };
            img_urls.push(obj);
        img_index = img_index + 1; 

    })
    if (saveimageinfo == true){
        fs.writeFile("/home/palle/Project/Node/scrape/hist.json", JSON.stringify(img_urls, null, 2), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        }); 
    }
   
    // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
    res.send('Check your console!')

    });
})


app.get('/download', function(req, res){

    var download = function(uri, filename, callback){
      request.head(uri, function(err, res, body){
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };

    var init_download = function(url, filename){
         
        var temp_url = "https://en.wikipedia.org"+url
        console.log(temp_url); 
        request(temp_url, function(error, response, html){
            var $ = cheerio.load(html);        
            
            var img_div = $('.fullMedia .internal');
            var img_title = img_div['0'].attribs.title;
            console.log(img_title); 
            var img_link = img_div['0'].attribs.href;
            img_link = 'https:'+img_link; 
      
            download(img_link, "/home/palle/Project/Node/scrape/images/"+filename+".jpg", function(){
                console.log('done : ', filename);
            });  
        })
    };


    fs.readFile("/home/palle/Project/Node/scrape/hist.json", 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        var i = 0; 
        while (i < obj.length) {
             
                var url = obj[i].url;
                var filename = obj[i].filename;
                init_download(url, filename);
                i++;
                console.log("staring : ", filename);           
            
        }

    });

    res.send('Check your console!')

});

 
app.listen('8081')

console.log('Magic happens on port 8081');
exports = module.exports = app;
