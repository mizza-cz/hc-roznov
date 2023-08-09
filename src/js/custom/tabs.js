$(function () {
  var hash = window.location.hash;
  hash && $('ul.nav a[href="' + hash + '"]').tab("show");

  $(".nav-tabs a").click(function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    $(this).tab("show");
  });
});
