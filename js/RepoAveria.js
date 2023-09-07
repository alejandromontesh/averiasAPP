RepoAveria = {

	ApiUrl: {
		Calidad: "https://pedidos.cef.com.mx/pagel/mp/",
		Local: "https://pedidos.cef.com.mx/pagel/mp/",
		Productivo: "https://pedidos.cef.com.mx/pagel/mp/"
	},

	EndPoint: {
		AgregaAveria: "RegistraAveria"
	},

	CapturaAveria: function (datoJSON) {
		console.log(datoJSON);

		$.post(RepoAveria.ApiUrl.Productivo + RepoAveria.EndPoint.AgregaAveria, datoJSON).then(function (response) {


			if (response == null || response == "") { return false; }

			/* Dentro del método se agregá la lógica para utilizar la información */
			//RepoAveria.CapturaExitosa(response);
			if (response == 1) {
				$('#txtEconomico').val('');
				$('#txtAveria').val('');
				$('#txtUbica').val('');
				$('#txtTelefono').val('');

				alert('Reporte avería enviado...');
			} else {
				alert('Error al enviar reporte de avería...');
			}
			$('.loading-overlay').hide();

			console.log(response);
			//alert(response);
			/* Fin */

		}, function (err) {
			//alert("No fue posible obtener la información.");
			console.log(err);
		});

	}
};


$(function () {

	$('.loading-overlay').hide();

	if (localStorage.NumeroEmpleado != undefined) {
		$('#txtEmpleado').val(localStorage.NumeroEmpleado + '-' + localStorage.NombreEmpleado);
	} else {
		window.location = 'index.html';
	}

	$("#btkRegistrar").click(function () {
		//e.preventDefault();
		$('.loading-overlay').show();

		//Validar se ingresen los datos...
		if ($("#txtEconomico").val() == '') {
			$("#txtEconomico").focus();
			$('.loading-overlay').hide();
			alert('Ingresar NoEco!');
			return;
		}

		if ($("#txtAveria").val() == '') {
			$("#txtAveria").focus();
			$('.loading-overlay').hide();
			alert('Ingresar avería!');
			return;
		}

		if ($("#txtUbica").val() == '') {
			$("#txtUbica").focus();
			$('.loading-overlay').hide();
			alert('Ingresar Ubicación!');
			return;
		}

		if ($("#txtTelefono").val() == '') {
			$("#txtTelefono").focus();
			$('.loading-overlay').hide();
			alert('Ingresar Teléfono!');
			return;
		}

		if (localStorage.NumeroEmpleado == undefined) {
			alert('Sesion expiro...');
			window.location = 'index.html';
		}

		var jsonAveria =
		{
			cveAveria: 0,
			cveEmpleado: localStorage.NumeroEmpleado,
			NumeroEconomico: $("#txtEconomico").val(),
			TextoAveria: $("#txtAveria").val(),
			Ubicacion: $("#txtUbica").val(),
			Telefono: $("#txtTelefono").val(),
			Estatus: 1
		}

		console.log(jsonAveria)

		RepoAveria.CapturaAveria(jsonAveria);

	});

	$('#btnCerrarSesion').on("click", function () {
		localStorage.clear();
		$(location).attr('href', 'index.html');
	});

});

function limitarInput(input, maxLength) {
	input.value = input.value.slice(0, maxLength); // Limitar longitud
	input.value = input.value.replace(/[^0-9]/g, ''); // Eliminar caracteres no numéricos
};
