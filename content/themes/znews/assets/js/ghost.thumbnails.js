function removeHtmlTag(strx, chop) {
  if (strx.indexOf("<") != -1) {
    var s = strx.split("<");
    for (var i = 0; i < s.length; i++) {
      if (s[i].indexOf(">") != -1) {
        s[i] = s[i].substring(s[i].indexOf(">") + 1, s[i].length);
      }
    }
    strx = s.join("");
  }
  chop = (chop < strx.length - 1) ? chop : strx.length - 2;
  while (strx.charAt(chop - 1) != ' ' && strx.indexOf(' ', chop) != -1) chop++;
  strx = strx.substring(0, chop - 1);
  return strx;
}
function createSummaryAndThumb(pID,slug) {

  var summ = 100;
  var imgthumb = "";
  var imgtag = "";

  var div = document.getElementById(pID);
  var divNewImage = document.getElementById('me'+pID);
  var mainPostDiv = document.getElementById('post-'+pID);
  var img = div.getElementsByTagName("img");
  var idataframe = div.getElementsByTagName("iframe");

  if (img.length >= 1) {
    imgthumb = img[0].src;
    divNewImage.className += 'col-lg-5 col-md-5 col-sm-6 recent-post-image';
    var ImageContent = '<a href="'+slug+'"><div style="background-image: url('+imgthumb+');" class="featured-post-img"></div></a>';
    divNewImage.innerHTML = ImageContent;
    // changing post div class
    mainPostDiv.className = 'post-content col-lg-7 col-md-7 col-sm-6';
  } else {
    if (idataframe.length >= 1){
      iframeSrc = idataframe[0].src;
      divNewImage.className += 'col-lg-5 col-md-5 col-sm-6 recent-post-image';
      iframeContent = '<div class="responsive-vid"><iframe class="image-home-pop" src="' + iframeSrc + '" ></iframe></div>';
      divNewImage.innerHTML = iframeContent;
      mainPostDiv.className = 'post-content col-lg-7 col-md-7 col-sm-6';
    }  
  }
  var summary = removeHtmlTag(div.innerHTML, summ);
  div.innerHTML = summary;
}