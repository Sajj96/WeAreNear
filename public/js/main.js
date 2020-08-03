/* eslint-disable no-undef */
(function ($) {
  var runSelect2 = function () {
    $(".search-select").select2({
      placeholder: "Select an Item",
      allowClear: false,
    });
  };

  runSelect2();

  $("#regions").on("change", function () {
    var region = $(this).val();
    $.ajax({
      url: "/district/" + region,
      method: "GET",
      data: {
        Region: region,
      },
      dataType: "json",
      success: function (data) {
        var optionsAsString = "";
        for (var i = 0; i < data.length; i++) {
          optionsAsString +="<option value='" + data[i].Districts + "'>" + data[i].Districts + "</option>";
        }
        $('select[name="districts"]').html(optionsAsString);
      },
    });
  });

  $("#search-box").on("keyup", function () {
    var keyword = $(this).val();
    $.ajax({
      url: "/hospitals/search",
      method: "GET",
      data: { keyword: keyword },
      success: function () {},
    });
  });
})(jQuery);
