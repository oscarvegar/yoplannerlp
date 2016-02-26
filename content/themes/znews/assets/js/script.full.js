var fb_hide_cover = true; // hide facebook cover
var fb_show_posts = false; // show recent posts
var znewsTheme = {
	facebook:function() {
		if ($('.fb-widget').length > 0 && fb_page_url) {
			var fb_page = '<div class="fb-page" data-href="'+fb_page_url+'" data-small-header="false" data-adapt-container-width="true" data-hide-cover='+fb_hide_cover+' data-show-facepile="true" data-show-posts='+fb_show_posts+'><div class="fb-xfbml-parse-ignore"></div></div>';	
			$('.fb-widget').append(fb_page);
		}
	},
	twitter: function() {
		if ($('.twitter-widget').length > 0 && twitter_url && twitter_widget_id && number_of_tweet) {
			var tweets = '<a class="twitter-timeline" href="'+twitter_url+'" data-widget-id="'+twitter_widget_id+'" data-chrome="nofooter noscrollbar" data-tweet-limit="'+number_of_tweet+'">Tweets</a>';
			$('.twitter-widget').append(tweets);
		}
	},
	highlighter: function() {
		$('pre code').each(function(i, block) {
		    hljs.highlightBlock(block);
		});
	},
	tagcloud:function(){
		if(tagCloudData.length > 0){
			var tag_list = "";
			for ( var i = 0; i < tagCloudData.length; i = i + 1 ) {
				tag_list += '<a href="'+tagCloudData[i].t+'">'+ tagCloudData[i].tl + '</a>';
			}
			$('.tags').append(tag_list);
		}
	},
	formatDate:function(dt){
		var d = new Date(dt);
		var month_name = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		var month = month_name[d.getMonth()];
		var date = d.getDate();
		var year = d.getFullYear();
		var formatted_dt = month+' '+date+','+' '+year;
		return formatted_dt;
	},
	parseFeedItem: function(item){
		var itemData = {};
		itemData.link = $(item).find('link').text();
		itemData.title = $(item).find('title').text();
		itemData.published_date = $(item).find('pubDate').text();
		itemData.image_link = $(item).find('media\\:content, content').attr('url');
		itemData.descriptionPost = $(item).find('description').text();
		itemData.descriptionParsed = removeHtmlTag($(item).find('description').text(),100);
		return itemData;
	},
	recentPost:function() {
		var feed_url = site_url+"/rss/";
		var code = String('');
		if ($('.recent-post').length > 0 && recent_post_count) {
			$.get(feed_url, function(data) {
				//console.log(data);
				$(data).find('item').slice(0,recent_post_count).each(function(){
					var itemDetails = znewsTheme.parseFeedItem(this);
					if (typeof itemDetails.image_link !== 'undefined') {
						var image = '<div class="post-img pull-left" style="background-image:url(' + itemDetails.image_link + ')"></div>';
						var helper_class = 'have-image';
					} else {
						var image ='<div class="post-img pull-left"><i class="fa fa-picture-o"></i></div>';
						var helper_class = '';
					}
					code += '<div class="recent-single-post clearfix ' +itemDetails.helper_class+ '"><a href="' + itemDetails.link + '" class="post-title">';
					code += image;
					code += '<div class="post-info"><div class="post-title">' + itemDetails.title + '</div><div class="date">' + znewsTheme.formatDate(itemDetails.published_date) + '</div></div>';
					code += '</a></div>';
					
				})
				$(".recent-post").html(code);
			});
		}
	},
	showWidgets: function(){
		if(homePosts && $("#main-widgets").length > 0){
			homePosts.forEach(function(entry, index) {
				var adJustPos = 'home_v_'+index;
				$("#main-widgets").append('<div class="'+adJustPos+'"></div>');
				$('.'+adJustPos).html('<img style="margin: 0 auto;display: block;padding:50px;" src="../assets/images/loading.svg">');
			    if(entry.type == 'single'){
			    	znewsTheme.showSimpleWidget(entry,adJustPos);
			    } else if(entry.type == 'twocol'){
			    	znewsTheme.showSimpleTopWidget(entry,adJustPos);
			    }
			});
		}
	},
	showSimpleWidget: function(entry,adJustPos){
		if(entry && entry.tag){
			var feed_url = site_url+"/tag/"+entry.tag+"/rss/";
			var widgetCode = String('');
			$.get(feed_url, function(data) {
				widgetCode += '<h3 class="title-widget-home"><a href="'+site_url+'/tag/'+entry.tag+'/"><span>'+entry.title+'</span></a></h3><div class="single-box znews-default">';
				var loopCount = 0;
				$(data).find('item').slice(0,entry.count).each(function(){
					var itemDetails = znewsTheme.parseFeedItem(this);
					if (typeof itemDetails.image_link !== 'undefined') {
						var image_single = '<div class="slider-image imgbg" style="background-image:url(' + itemDetails.image_link + ')"></div>';
					} else {
						var image_single ='<div class="slider-image"><i class="fa fa-picture-o"></i></div>';
					}
					if(0 == loopCount){
						widgetCode += '<div class="single-left"><a href="' + itemDetails.link + '" >'+image_single+'</a>';
						widgetCode += '<h2><a href="'+itemDetails.link+'">'+itemDetails.title+'</a></h2>';
						widgetCode += '<div class="post-meta"><i class="fa fa-calendar-o margin-5"></i><span class="margin-5">'+znewsTheme.formatDate(itemDetails.published_date)+'</span><span class="comment"><i class="fa fa-comment-o"></i><a class="margin-5" href="'+itemDetails.link+'#disqus_thread">0 Comments</a></span></div>';
						widgetCode += '<div class="entry">';
						widgetCode += itemDetails.descriptionParsed;
						widgetCode += '</div></div>';
					} else {
						widgetCode += '<div class="single-right"><a href="' + itemDetails.link + '">'+image_single+'</a>';
						widgetCode += '<h3 class="post-title"><a href="'+itemDetails.link+'">'+itemDetails.title+'</a></h2>';
						widgetCode += '<div class="post-meta"><i class="fa fa-calendar-o"></i><span class="margin-5">'+znewsTheme.formatDate(itemDetails.published_date)+'</span><span class="comment margin-5"><i class="fa fa-comment-o"></i><a class="margin-5" href="'+itemDetails.link+'#disqus_thread">0 Comments</a></span></div>';
						widgetCode += '</div>';
					}
					loopCount++
				})
				widgetCode += '</div>';
				$('.'+adJustPos).html(widgetCode);
			});
		}
	},
	showSimpleTopWidget: function(entry,adJustPos){
		if(entry && entry.tag){
			var feed_url = site_url+"/tag/"+entry.tag+"/rss/";
			var widgetCode = String('');
			$.get(feed_url, function(data) {
				widgetCode += '<h3 class="title-widget-home"><a href="'+site_url+'/tag/'+entry.tag+'/"><span>'+entry.title+'</span></a></h3><div class="single-box single-top-box znews-default">';
				$(data).find('item').slice(0,entry.count).each(function(){
					var itemDetails = znewsTheme.parseFeedItem(this);
					if (typeof itemDetails.image_link !== 'undefined') {
						var image_single = '<div class="slider-image imgbg" style="background-image:url(' + itemDetails.image_link + ')"></div>';
						
					} else {
						var image_single ='<div class="slider-image"><i class="fa fa-picture-o"></i></div>';
						
					}
					widgetCode += '<div class="single-right"><a href="' + itemDetails.link + '">'+image_single+'</a>';
					widgetCode += '<h3 class="post-title"><a href="'+itemDetails.link+'">'+itemDetails.title+'</a></h2>';
					widgetCode += '<div class="post-meta"><i class="fa fa-calendar-o"></i><span class="margin-5">'+znewsTheme.formatDate(itemDetails.published_date)+'</span><span class="comment margin-5"><i class="fa fa-comment-o"></i><a class="margin-5" href="'+itemDetails.link+'#disqus_thread">0 Comments</a></span></div>';
					widgetCode += '</div>';
				})
				widgetCode += '</div>';
				$('.'+adJustPos).html(widgetCode);
			});
		}
	},
	topStoryWidget: function(){
		if(typeof topStoryTag != 'undefined'){
			if(topStoryTag){
				var feed_url = site_url+"/tag/"+topStoryTag+"/rss/";
			}else {
				var feed_url = site_url+"/rss/";
			}
			var widgetCode = String('');
			$('#top-widget').html('<img style="margin: 0 auto;display: block;padding:50px;" src="../assets/images/loading.svg">');
			$.get(feed_url, function(data) {
				widgetCode += '<div class="single-box single-top-box top-box">';
				var loopCount = 0;
				$(data).find('item').slice(0,5).each(function(){
					var itemDetails = znewsTheme.parseFeedItem(this);
					if (typeof itemDetails.image_link !== 'undefined') {
						var image_single = '<div class="slider-image imgbg" style="background-image:url(' + itemDetails.image_link + ')"><h3>'+itemDetails.title+'</h3></div>';
					} else {
						var image_single ='<div class="slider-image"><i class="fa fa-picture-o"></i></div>';
					}
					if(0 == loopCount){
						widgetCode += '<div class="single-left"><a href="' + itemDetails.link + '" >'+image_single+'</a>';
						widgetCode += '</div>';
					} else if(1 == loopCount || 3 == loopCount){
						widgetCode += '<div class="single-right"><a href="' + itemDetails.link + '">'+image_single+'</a>';
						widgetCode += '</div>';
					} else {
						widgetCode += '<div class="single-right single-r-right"><a href="' + itemDetails.link + '">'+image_single+'</a>';
						widgetCode += '</div>';
					}
					loopCount++
				})
				widgetCode += '</div>';
				$('#top-widget').html(widgetCode);
			});
		}
	},
	searchForm: function() {
		$(".search-ghost").ghostHunter({
		    results         : ".znews-search-results",
		    onKeyUp         : true,
		    zeroResultsInfo : false,
		    info_template   : "<div class=\"search-info\">{{amount}} posts found</div>",
		    result_template : "<div class=\"result-info\"><a href='{{link}}'>{{title}}</a></div>"
		});
	},
	newsTicker:function() {
		var feed_url = "/rss/";
		var code = String('');
		$.get(feed_url, function(data) {
			code += '<ul>';
			$(data).find('item').slice(0,news_ticker_count).each(function(){
				var posturl = $(this).find('link').text();
				var posttitle = $(this).find('title').text();
				code += '<li><a href="' + posturl + '" target="_blank">' + posttitle + '</a></li>';
			})
			code += '</ul>';
			$(".news-ticker").append(code);
			function newsTickTick(){
            	$('.news-ticker li:first').slideUp( function () { 
            		$(this).appendTo($('.news_ticker ul')).slideDown(); 
            	});
            }
        	setInterval(function(){ 
        		newsTickTick (); 
        	}, 5000);
		});
	}
}
$(document).ready(function(){
	znewsTheme.facebook();
	znewsTheme.twitter();
	znewsTheme.highlighter();
	znewsTheme.tagcloud();
	znewsTheme.recentPost();
	znewsTheme.showWidgets();
	znewsTheme.searchForm();
	znewsTheme.newsTicker();
	znewsTheme.topStoryWidget();
	$('.related-posts').ghostRelated({
        titleClass: '.post-title',
        tagsClass: '.post-tags-post',
        limit: 3,
    });
	$('.znews-search').click(function(){
		$('.znews-search-awesome').show();
	})
	$('.search-close-btn').click(function(){
		$('.znews-search-awesome').hide();
	})
	$('.spinnerBg').hide();
    $('.spinner').hide();
});
