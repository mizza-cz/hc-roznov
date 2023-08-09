iframesWrap();

// IFRAME youtube/google (wysiwyg editor) responsive
function iframesWrap() {
  var contentIframes = document.querySelectorAll(".o-content iframe"),
    i;

  for (i = 0; i < contentIframes.length; ++i) {
    contentIframes[i].removeAttribute("height");
    contentIframes[i].removeAttribute("width");

    var iframeWrap = document.createElement("div");
    iframeWrap.classList.add("ratio");
    iframeWrap.classList.add("ratio-16x9");

    contentIframes[i].parentNode.insertBefore(iframeWrap, contentIframes[i]);

    iframeWrap.appendChild(contentIframes[i]);
  }
}
