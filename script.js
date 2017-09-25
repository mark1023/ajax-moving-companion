
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $guardianHeaderElem = $('#guardian-header');
    var $guardianElem = $('#guardian-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $guardianElem.text("");

    // Google streetview request

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;
    $greeting.text('So, you want to live at ' + address + '?');
    var streetViewUrl = "https://maps.googleapis.com/maps/api/streetview?size=600x400&location=" + address;
    $body.append('<img class="bgimg" src="' + streetViewUrl + '">');

    // Guardian request
    
    var guardianURL = 'https://content.guardianapis.com/search?q="' + cityStr + '"&orderBy=newest&api-key=3ae3997e-3d03-4657-80e5-fa0523752a94';
    
    $.getJSON(guardianURL, function(data) {
    		$guardianHeaderElem.text('Articles from The Guardian about: ' + cityStr);
    		
    		for(var i = 0; i < data.response.results.length; i++) {
    			$guardianElem.append('<li class="article"><a href="' + data.response.results[i].webUrl +'">' + data.response.results[i].webTitle + '</a></li>');
    		};
    }).error(function(e) {
    		$guardianHeaderElem.text('Oops, unfortunately something went wrong! Articles could not be loaded');
    })
    
    // Wikipedia request
    
    var wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';
    
    $.ajax(wikiURL, {
    		dataType: "jsonp",
    		success: function(response) {
    			var articleList = response[1];
    			
    			for(var i = 0; i < articleList.length; i++) {
    				articleStr = articleList[i];
    				var url = 'http://en.wikipedia.org/wiki/' + articleStr;
    				$wikiElem.append('<li style="padding:5px"><a href="' + url + '">' + articleStr + '</a></li>');
    			};
    		}
    });


    return false;
};

$('#form-container').submit(loadData);
