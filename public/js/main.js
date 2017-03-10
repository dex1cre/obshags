$(function() {
	$(".f1-ready").click(function() {
		$(this).parents(".col-md-6").fadeOut(300);
		$(".right-form").parents(".col-md-6").css({
			"position": "relative"
		});
		$(".right-form").css({
			"position": "absolute"
		}).animate({
			"left": "60%"
		}, 600);

		$(".ready-to-send").show().css("display", "block");
		$("body").css("padding-bottom", "500px")
	});

	$(".ready-to-send").click(function() {
		$.ajax({
			type: "POST",
			url: "/new-tov",
			data: {
				name: $(".tovar2").text(),
				count: $(".count2").text(),
				number_home: $(".number2").text(),
				id_of_vk: $(".id_vk2").text()
			},
			success: function(data) {
				if (data.data == "Okay")
					document.location.href = "/";
				else if (data.data == "=(")
					document.location.href = "https://vk.com";
			}
		});
	});
});