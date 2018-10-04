class API{

	constructor(){

		this.URL 			= 'https://mattheuszcabal.000webhostapp.com/';
		this.controlador 	= 'user';
		this.action 		= 'all';
		this.method 		= 'POST';
		this.token 			= 'Maydana';
		this.mode 			= 'cors';
		this.user_id		= null;

		this.objeto 		= [];
	}

	set setControlador(controlador){
		this.controlador = controlador;
	}
	set setAction(action){
		this.action = action;
	}
	set setToken(token){
		this.token = token;
	}
	set setMethod(method){
		this.method = method;
	}
	set setMode(mode){
		this.mode = mode;
	}
	set setHeader(header){
		this.header = header;
	}
	set setData(data){
		this.objeto = data;
	}
	set setData(data){
		this.objeto = data;
	}
	get setId(){
		return this.user_id;
	}

	get delUser(){

		$('#btn-submit').prop("disabled",true);
		$.ajax({
			url: this.URL+this.controlador+'/'+this.action+'?t='+this.token,
			type: 'POST',
			data: {
				id: this.user_id
			},
			success: function( data, textStatus, jQxhr ){

				$('#btn-submit').prop("disabled",false);
				$('#respostaAjax').html( data.data);
				render_users();
			},
			error: function( jqXhr, textStatus, errorThrown ){
				console.log( errorThrown );
			}
		});
	}

	get getUsers(){

		fetch(this.URL+this.controlador+'/'+this.action+'?t='+this.token, {
			method: this.method,
			mode: this.mode
		}).then(
			function(response){

				if (response.status !== 200){
					console.log('Looks like there was a problem. Status Code: ' +response.status);
					return;
				}

				response.json().then(function(data){

					for(var x in data){
						users = data[x];
					}
					render_users();
				});
			}
		)
		.catch(function(err) {
			console.log('Fetch Error :-S', err);
		});
	}

	addUser(){
		$('#btn-submit').prop("disabled",true);
		$.ajax({
			url: this.URL+this.controlador+'/'+this.action+'?t='+this.token,
			type: 'POST',
			data: {
				nome: $('#nome').val(),
				idade: $('#idade').val()
			},
			success: function( data, textStatus, jQxhr ){

				$('#btn-submit').prop("disabled",false);
				$('#respostaAjax').html( data.data);
				render_users();
			},
			error: function( jqXhr, textStatus, errorThrown ){
				console.log( errorThrown );
			}
		});
	}

}
window.api = new API;
window.users = [];

function addUser(){

	api.action = 'add';
	api.addUser();
}

function delUser(id){

	api.action = 'del';
	api.user_id = id;
	api.delUser;
}

function refreshFetch(){
	api.getUsers;
}

function render_users(){

	var html = '';
	for(var x in users){

		if(users[x].nome){

			html += '<p>'+users[x].nome+'<button onclick="delUser('+users[x].id+')">X</button></p>';
		}else{
			html = 'Nenhuma informação para você ver.. :(';
		}
	}

	$('#users-all').html(html);
}


$(document).ready(function(){
	refreshFetch();
	render_users();
});