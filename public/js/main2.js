$(function() {
	$(".ready").click(function() {
		var i = $(this).next("span").text();
		$.ajax({
			url: "/delete",
			type: "POST",
			data: {
				id: i
			},
			success: function(data) {
				if (data.data == "Okay") {
					alert("Готово!");
				} else {
					alert("Возникла не предвиденная ошибка!\n" + data.data);
				}
			}
		});
	})
});