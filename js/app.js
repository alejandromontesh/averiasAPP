if (navigator.serviceWorker) {
	navigator.serviceWorker.register('/sw.js');
};

Principal = {

	ApiUrl: {
		Calidad: "https://pedidos.cef.com.mx/pagel/mp/",
		Local: "https://pedidos.cef.com.mx/pagel/mp/",
		Productivo: "https://pedidos.cef.com.mx/pagel/mp/"
	},

	EndPoint: {
		NombreEmpleado: "NombreEmpleado?Empleado="
	},

	Login: function () {
		var strEmpleado = $("#txtEmpleado").val();
		var urlAccion = Principal.ApiUrl.Productivo + Principal.EndPoint.NombreEmpleado + strEmpleado;

		//revisar endpoint si es un empleado existente
		jQuery.ajax({

			url: urlAccion,
			type: "GET",
			crossDomain: true,
			contentType: "application/json; charset=utf-8",
			dataType: "json",

			success: function (msg) {

				console.log(msg);
				$('.loading-overlay').hide();

				if (msg != 'falso') {
					window.location = 'RepoAveria.html';
					localStorage.NumeroEmpleado = strEmpleado;
					localStorage.NombreEmpleado = msg;
				} else {
					alert('Usuario inválido');
				}

			},
			error: function (err) {
				$('.loading-overlay').hide();
				console.log(err);
			}
		});

	}

};


$(function () {

	$('.loading-overlay').hide();

	$("#btkOK").click(function () {
		$('.loading-overlay').show();

		if ($("#txtEmpleado").val() == '' || $("#txtClave").val() == '') {
			$('.loading-overlay').hide();
			alert('Ingrese todos los campos!');

			return;
		}

		if ($("#txtClave").val() != '123abc') {
			$('.loading-overlay').hide();
			$("#txtClave").select();
			alert('Contraseña incorrecta!');

			return;
		}

		Principal.Login();

	});

	$('#txtClave').keypress(function (e) {

		if (e.which == 13) {

			if ($("#txtEmpleado").val() == '' || $("#txtClave").val() == '') {
				alert('Ingrese todos los campos!');
				return;
			}

			if ($("#txtClave").val() != '123abc') {
				$("#txtClave").select();
				alert('Contraseña incorrecta!');
				return;
			}

			Principal.Login();

		}

	});

	$('#txtEmpleado').keypress(function (e) {

		if (e.which == 13) {

			if ($("#txtEmpleado").val() == '' || $("#txtClave").val() == '') {
				alert('Ingrese todos los campos!');
				return;
			}

			if ($("#txtClave").val() != '123abc') {
				$("#txtClave").select();
				alert('Contraseña incorrecta!');
				return;
			}

			Principal.Login();

		}

	});

});