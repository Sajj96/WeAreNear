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

  var table =  $('#hospitalTable').DataTable({
    "pageLength": 5,
    "dom": '<"top">rt<"bottom"ip><"clear">'
  });

  $('#mySearchButton').on('keyup click', function () {
    table.search($('#mySearchText').val()).draw();
  } );

})(jQuery);
