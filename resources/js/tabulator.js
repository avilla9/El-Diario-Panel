import xlsx from "xlsx";
import feather from "feather-icons";
import Tabulator from "tabulator-tables";
import { isNull } from "lodash";

(function () {
	"use strict";

	// User List
	if ($("#user-tabulator").length) {
		// Setup Tabulator
		let table = new Tabulator("#user-tabulator", {
			ajaxURL: "/api/users/getAllUsers",
			ajaxFiltering: true,
			ajaxSorting: true,
			printAsHtml: true,
			printStyled: true,
			pagination: 'local',
			paginationSize: 10,
			/* paginationSizeSelector: [10, 25, 50, 100], */
			layout: "fitColumns",
			responsiveLayout: "collapse",
			placeholder: "No matching records found",
			reactiveData: true,
			responsiveLayoutCollapseStartOpen: false,
			columns: [{
				formatter: "responsiveCollapse",
				width: 40,
				minWidth: 30,
				hozAlign: "center",
				resizable: false,
				headerSort: false,
			},

			// For HTML table
			{
				title: `<input id="checkAllUsers" type="checkbox" class="form-check-input">`,
				maxWidth: 100,
				headerSort: false,
				responsive: 0,
				field: "id",
				vertAlign: "center",
				headerHozAlign: "center",
				hozAlign: "center",
				print: false,
				download: false,
				formatter(cell, formatterParams) {
					return `<div>
													<input itemId= "${cell.getData().id
						}" type="checkbox" class="checkElement form-check-input"></
											</div>`;
				},
			},
			{
				title: "Código",
				minWidth: 100,
				responsive: 0,
				field: "user_code",
				vertAlign: "left",
				print: false,
				download: false,
				formatter(cell, formatterParams) {
					return `<div>
                            <div class="font-medium whitespace-nowrap">${cell.getData().user_code
						}</div>
                        </div>`;
				},
			},
			{
				title: "Nombre completo",
				minWidth: 200,
				responsive: 0,
				field: "name",
				vertAlign: "right",
				print: false,
				download: false,
				formatter(cell, formatterParams) {
					return `<div>
                            <div class="font-medium whitespace-nowrap">${cell.getData().name
						}</div>
                        </div>`;
				},
			},
			{
				title: "Email",
				minWidth: 250,
				field: "email",
				hozAlign: "right",
				vertAlign: "middle",
				print: false,
				download: false,
				formatter(cell, formatterParams) {
					return `<div>
                            <div class="font-medium whitespace-nowrap">${cell.getData().email
						}</div>
                        </div>`;
				},
			},
			{
				title: "Rol",
				minWidth: 200,
				field: "role_name",
				hozAlign: "right",
				vertAlign: "middle",
				print: false,
				download: false,
				formatter(cell, formatterParams) {
					return `<div>
                            <div class="font-medium whitespace-nowrap">${cell.getData().role_name
						}</div>
                        </div>`;
				},
			},
			{
				title: "Funciones",
				minWidth: 200,
				field: "actions",
				responsive: 1,
				hozAlign: "center",
				vertAlign: "middle",
				print: false,
				download: false,
				formatter(cell, formatterParams) {
					let a =
						$(`<div class="flex lg:justify-center items-center">
                    <button data-tw-target="#superlarge-modal-size-preview" data-tw-toggle="modal" class="view flex items-center mr-3" href="javascript:;">
                        <i data-feather="eye" class="w-4 h-4 mr-1"></i> Ver
                    </button>
                    <a data-tw-target="#edit-user" data-tw-toggle="modal" data-backdrop="static" data-keyboard="false" class="edit flex items-center mr-3" href="javascript:;">
                        <i data-feather="check-square" class="w-4 h-4 mr-1"></i> Editar
                    </a>
                    <a class="delete flex items-center text-danger" href="javascript:;">
                        <i data-feather="trash-2" class="w-4 h-4 mr-1"></i> Eliminar
                    </a>
                </div>`);
					$(a)
						.find(".view")
						.on("click", function () {
							$('#table-content').html('');
							table = '';
							table += `<tr class="whitespace-nowrap"><th>Activo</th><td>${cell.getData().active == 1 ? 'Si' : 'No'}</td></tr>`;
							let table = `<tr class="whitespace-nowrap"><th>Código de usuario</th><td>${cell.getData().user_code}</td></tr>`;
							table += `<tr class="whitespace-nowrap"><th>Nombre</th><td>${cell.getData().name}</td></tr>`
							table += `<tr class="whitespace-nowrap"><th>Apellido</th><td>${cell.getData().last_name}</td></tr>`;
							table += `<tr class="whitespace-nowrap"><th>Email</th><td>${cell.getData().email}</td></tr>`;
							table += `<tr class="whitespace-nowrap"><th>SECI Coins</th><td>${cell.getData().secicoins}</td></tr>`;
							table += `<tr class="whitespace-nowrap"><th>Rol</th><td>${cell.getData().role_name}</td></tr>`;
							table += `<tr class="whitespace-nowrap"><th>Cuartil</th><td>${cell.getData().quartile}</td></tr>`;
							table += `<tr class="whitespace-nowrap"><th>Grupo</th><td>${cell.getData().group}</td></tr>`;
							table += `<tr class="whitespace-nowrap"><th>Delegación</th><td>${cell.getData().delegation_name}</td></tr>`;
							table += `<tr class="whitespace-nowrap"><th>Código Delegación</th><td>${cell.getData().delegation_code}</td></tr>`;
							$('#table-content').html(table);
						});

					$(a)
						.find(".edit")
						.on("click", function () {
							$('#id').val(cell.getData().id);
							$('#dni').val(cell.getData().dni);
							$('#dni').attr("placeholder", cell.getData().dni);

							$('#user_code').val(cell.getData().user_code);
							$('#user_code').attr("placeholder", cell.getData().user_code);

							$('#name').val(cell.getData().name);
							$('#name').attr("placeholder", cell.getData().name);

							$('#last_name').val(cell.getData().last_name);
							$('#last_name').attr("placeholder", cell.getData().last_name);

							$('#email').val(cell.getData().email);
							$('#email').attr("placeholder", cell.getData().email);

							$('#territorial').val(cell.getData().territorial);
							$('#territorial').attr("placeholder", cell.getData().territorial);

							$('#secicoins').val(cell.getData().secicoins);
							$('#secicoins').attr("placeholder", cell.getData().secicoins);

							$('#role_id').val(cell.getData().role_id).attr("selected", "selected");

							$('#delegation_id').val(cell.getData().delegation_id).attr("selected", "selected");

							$('#group_id').val(cell.getData().group_id).attr("selected", "selected");

							$('#quartile_id').val(cell.getData().quartile_id).attr("selected", "selected");
						});

					$(a)
						.find(".delete")
						.on("click", function () {
							Swal.fire({
								title: '¿Desea eliminar esta seleccion?',
								text: "¡Esta accion es irreversible!",
								icon: 'warning',
								showCancelButton: true,
								confirmButtonColor: '#3085d6',
								cancelButtonColor: '#d33',
								confirmButtonText: 'Si, seguro',
								cancelButtonText: 'No, cancelar'
							}).then((result) => {
								if (result.isConfirmed) {
									fetch('/api/users/delete', {
										method: 'POST',
										headers: { "Content-type": "application/json;charset=UTF-8" },
										body: JSON.stringify({
											id: cell.getData().id
										}),
									}).then(function (response) {
										if (response) {
											cell.getRow().delete();
											table.redraw(true);
										} else {
											throw "Error en la llamada Ajax";
										}
									});
								}
							})
						});

					return a[0];
				},
			},

				// For print format
				/* {
						title: "PRODUCT NAME",
						field: "name",
						visible: false,
						print: true,
						download: true,
				},
				{
						title: "CATEGORY",
						field: "category",
						visible: false,
						print: true,
						download: true,
				},
				{
						title: "Estatus",
						field: "status",
						visible: false,
						print: true,
						download: true,
						formatterPrint(cell) {
								return cell.getValue() ? "Active" : "Inactive";
						},
				},
				{
						title: "IMAGE 1",
						field: "images",
						visible: false,
						print: true,
						download: true,
						formatterPrint(cell) {
								return cell.getValue()[0];
						},
				},
				{
						title: "IMAGE 2",
						field: "images",
						visible: false,
						print: true,
						download: true,
						formatterPrint(cell) {
								return cell.getValue()[1];
						},
				},
				{
						title: "IMAGE 3",
						field: "images",
						visible: false,
						print: true,
						download: true,
						formatterPrint(cell) {
								return cell.getValue()[2];
						},
				}, */
			],
			renderComplete() {
				feather.replace({
					"stroke-width": 1.5,
				});
			},
		});

		// Redraw table onresize
		window.addEventListener("resize", () => {
			table.redraw();
			feather.replace({
				"stroke-width": 1.5,
			});
		});

		// Filter function
		function filterHTMLForm() {
			let field = $("#tabulator-html-filter-field").val();
			let type = $("#tabulator-html-filter-type").val();
			let value = $("#tabulator-html-filter-value").val();
			table.setFilter(field, type, value);
		}

		// On submit filter form
		$("#tabulator-html-filter-form")[0].addEventListener(
			"keypress",
			function (event) {
				let keycode = event.keyCode ? event.keyCode : event.which;
				if (keycode == "13") {
					event.preventDefault();
					filterHTMLForm();
				}
			}
		);

		// On click go button
		$("#tabulator-html-filter-go").on("click", function (event) {
			filterHTMLForm();
		});

		// On reset filter form
		$("#tabulator-html-filter-reset").on("click", function (event) {
			$("#tabulator-html-filter-field").val("name");
			$("#tabulator-html-filter-type").val("like");
			$("#tabulator-html-filter-value").val("");
			filterHTMLForm();
		});

		// Export
		$("#tabulator-export-csv").on("click", function (event) {
			table.download("csv", "data.csv");
		});

		$("#tabulator-export-json").on("click", function (event) {
			table.download("json", "data.json");
		});

		$("#tabulator-export-xlsx").on("click", function (event) {
			window.XLSX = xlsx;
			table.download("xlsx", "data.xlsx", {
				sheetName: "Products",
			});
		});

		$("#tabulator-export-html").on("click", function (event) {
			table.download("html", "data.html", {
				style: true,
			});
		});

		// Print
		$("#tabulator-print").on("click", function (event) {
			table.print();
		});

		$('#deleteUserId').on("click", function () {
			if ($('.checkElement:checkbox:checked').length) {
				Swal.fire({
					title: '¿Desea eliminar esta seleccion?',
					text: "¡Esta accion es irreversible!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Si, seguro',
					cancelButtonText: 'No, cancelar'
				}).then((result) => {
					if (result.isConfirmed) {
						$('.checkElement:checkbox:checked').map(function () {
							console.log($(this).attr("itemid"));
							$.ajax({
								type: "POST",
								url: '/api/users/delete',
								data: { "id": $(this).attr("itemid") },
								success: function (data) {
									console.log("response", data);
								}
							});
						});
						table.replaceData();
					};
				});
			}
		});


		function updateUser(data) {
			$.ajax({
				type: "PUT",
				url: '/usuarios/update',
				data: data,
				success: function (data) {
					table.replaceData();
					$('#alertUpdateSuccess').css({
						'display': 'flex',
						'align-items': 'center',
						'justify-content': 'center'
					});
					setTimeout(function () {
						$('#alertUpdateSuccess').fadeOut(4000);
					}, 2000);
				},
				error: function (error) {
					console.log(error.responseJSON.password);
					// console.log(error);
					let errors = error.responseJSON.password[0];

					if (errors === undefined) {
						$("#alertUpdateFailed").html("Ha ocurrido un error al actualizar la contraseña, por favor intente de nuevo.");
						$('#alertUpdateFailed').css({
							'display': 'flex',
							'align-items': 'center',
							'justify-content': 'center'
						});

					} else {
						$("#alertUpdateFailed").html(errors);
						$('#alertUpdateFailed').css({
							'display': 'flex',
							'align-items': 'center',
							'justify-content': 'center'
						});
					}
					setTimeout(function () {
						$('#alertUpdateFailed').fadeOut(4000);
					}, 2000);
				},
			});
		}

		$('#SubmitForm').on('submit', function (e) {
			e.preventDefault();
			let data = {
				"_token": $('meta[name="csrf-token"]').attr('content'),
				id: $('#id').val(),
				dni: $('#dni').attr('placeholder'),
				name: $('#name').val(),
				user_code: $('#user_code').val(),
				last_name: $('#last_name').val(),
				email: $('#email').val(),
				territorial: $('#territorial').val(),
				secicoins: $('#secicoins').val(),
				password: $('#password').val(),
				role_id: $('#role_id').val(),
				delegation_id: $('#delegation_id').val(),
				group_id: $('#group_id').val(),
				quartile_id: $('#quartile_id').val(),
			};
			if (!data.password) {
				updateUser(data);
			} else {
				Swal.fire({
					title: '¿Desea actualizar la contraseña del usuario?',
					text: "El campo password contiene información",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Si, actualizar toda la información',
					cancelButtonText: 'Cerrar'
				}).then((result) => {
					if (result.isConfirmed) {
						updateUser(data)
					} else {
						data.password = $('#password').val("");
					}
				});
			}
		});
	}

	// Role List
	if ($("#role-tabulator").length) {
		// Setup Tabulator
		let table = new Tabulator("#role-tabulator", {
			ajaxURL: "/api/roles/all-roles",
			ajaxFiltering: true,
			ajaxSorting: true,
			printAsHtml: true,
			printStyled: true,
			pagination: 'local',
			paginationSize: 10,
			/* paginationSizeSelector: [10, 25, 50, 100], */
			layout: "fitColumns",
			responsiveLayout: "collapse",
			placeholder: "No matching records found",
			reactiveData: true,
			responsiveLayoutCollapseStartOpen: false,
			columns: [{
				formatter: "responsiveCollapse",
				width: 40,
				minWidth: 30,
				hozAlign: "center",
				resizable: false,
				headerSort: false,
			},

			// For HTML table
			{
				title: "Código de rol",
				minWidth: 200,
				responsive: 0,
				field: "name",
				vertAlign: "middle",
				print: false,
				download: false,
				formatter(cell, formatterParams) {
					return `<div><div class="font-medium whitespace-nowrap">${cell.getData().name}</div></div > `;
				},
			},
			{
				title: "Descripción",
				minWidth: 200,
				field: "description",
				hozAlign: "right",
				vertAlign: "middle",
				print: false,
				download: false,
				formatter(cell, formatterParams) {
					return `<div><div class="font-medium whitespace-nowrap">${cell.getData().description}</div></div > `;
				},
			},
			{
				title: "Funciones",
				minWidth: 200,
				field: "actions",
				responsive: 1,
				hozAlign: "center",
				vertAlign: "middle",
				print: false,
				download: false,
				formatter(cell, formatterParams) {
					let a =
						$(`<div class="flex lg:justify-center items-center" ><a class="edit flex items-center mr-3" href="javascript:;"><i data-feather="check-square" class="w-4 h-4 mr-1"></i> Editar</a><a class="delete flex items-center text-danger" href="javascript:;"><i data-feather="trash-2" class="w-4 h-4 mr-1"></i> Eliminar</a></div > `);
					$(a)
						.find(".edit")
						.on("click", function () {
							alert("EDIT");
						});

					$(a)
						.find(".delete")
						.on("click", function () {
							Swal.fire({
								title: '¿Desea eliminar esta seleccion?',
								text: "¡Esta accion es irreversible!",
								icon: 'warning',
								showCancelButton: true,
								confirmButtonColor: '#3085d6',
								cancelButtonColor: '#d33',
								confirmButtonText: 'Si, seguro',
								cancelButtonText: 'No, cancelar'
							}).then((result) => {
								if (result.isConfirmed) {
									fetch('/api/roles/delete', {
										method: 'POST',
										headers: { "Content-type": "application/json;charset=UTF-8" },
										body: JSON.stringify({
											id: cell.getData().id
										}),
									}).then(function (response) {
										if (response) {
											$.ajax({
												type: "GET",
												url: '/api/roles/all-roles',
												data: {
													"_token": $('meta[name="csrf-token"]').attr('content')
												},
												success: function (data) {
													table.replaceData();
												},
											});
										} else {
											throw "Error en la llamada Ajax";
										}
									});
								}
							})
						});

					return a[0];
				},
			},

			// For print format
			{
				title: "Código de rol",
				field: "name",
				hozAlign: "center",
				visible: false,
				print: true,
				download: true,
			},
			{
				title: "Descripción",
				field: "description",
				hozAlign: "center",
				visible: false,
				print: true,
				download: true,
			},
			],
			renderComplete() {
				feather.replace({
					"stroke-width": 1.5,
				});
			},
		});

		// Redraw table onresize
		window.addEventListener("resize", () => {
			table.redraw();
			feather.replace({
				"stroke-width": 1.5,
			});
		});

		// Filter function
		function filterHTMLForm() {
			let field = $("#tabulator-html-filter-field").val();
			let type = $("#tabulator-html-filter-type").val();
			let value = $("#tabulator-html-filter-value").val();
			table.setFilter(field, type, value);
		}

		// On submit filter form
		$("#tabulator-html-filter-form")[0].addEventListener(
			"keypress",
			function (event) {
				let keycode = event.keyCode ? event.keyCode : event.which;
				if (keycode == "13") {
					event.preventDefault();
					filterHTMLForm();
				}
			}
		);

		// On click go button
		$("#tabulator-html-filter-go").on("click", function (event) {
			filterHTMLForm();
		});

		// On reset filter form
		$("#tabulator-html-filter-reset").on("click", function (event) {
			$("#tabulator-html-filter-field").val("name");
			$("#tabulator-html-filter-type").val("like");
			$("#tabulator-html-filter-value").val("");
			filterHTMLForm();
		});

		// Export
		$("#tabulator-export-csv").on("click", function (event) {
			table.download("csv", "data.csv");
		});

		$("#tabulator-export-json").on("click", function (event) {
			table.download("json", "data.json");
		});

		$("#tabulator-export-xlsx").on("click", function (event) {
			window.XLSX = xlsx;
			table.download("xlsx", "data.xlsx", {
				sheetName: "Products",
			});
		});

		$("#tabulator-export-html").on("click", function (event) {
			table.download("html", "data.html", {
				style: true,
			});
		});

		// Print
		$("#tabulator-print").on("click", function (event) {
			table.print();
		});
	}
})();