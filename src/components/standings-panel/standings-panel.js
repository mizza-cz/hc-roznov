$(document).ready(function () {
  var itemsPerPage = 3;
  var visibleItems = itemsPerPage;

  $(".season-list li").hide();

  $(".season-list li:lt(" + visibleItems + ")").show();

  $("#loadMoreBtn").click(function (e) {
    e.preventDefault();
    $(".season-list li:hidden:lt(" + itemsPerPage + ")").show();

    if ($(".season-list li:hidden").length === 0) {
      $("#loadMoreBtn").hide();
    }
  });
});
