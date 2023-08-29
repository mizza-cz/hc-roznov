$(function () {
  var hash = window.location.hash;
  hash && $('juniors-menu a[href="' + hash + '"]').tab("show");

  $("body").on("click", ".juniors-menu a", function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    $(this).tab("show");
  });
});
