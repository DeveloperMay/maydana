class API{

	constructor(){
		//https://mattheuszcabal.000webhostapp.com/
		this.URL 			= 'https://mattheuszcabal.000webhostapp.com/';
		this.controlador 	= 'user';
		this.action 		= '';
		this.headers		= new Headers();
		this.method 		= 'GET';
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
		(async () => {
			const rawResponse = await fetch(this.URL+this.controlador+'/'+this.action+'?t='+this.token, {
				method: this.method,
				body: JSON.stringify({id: this.user_id})
			});

			const data = await rawResponse.json();

			for(var x in data){
				users = data[x];
			}
			render_users();
		})();
	}

	get getUser(){

	  let resStatus = 0
	  this.headers.append('Accept', 'application/json');

		(async () => {
			const rawResponse = await fetch(this.URL+this.controlador+this.action, {
				method: this.method,
			});

			const data = await rawResponse.json();

			console.log(data);
		})();

	  /*let resStatus = 0
	  this.headers.append('Accept', 'application/json');
	  let endpoint = this.URL+this.controlador+'/'+this.action;
	  
	  fetch(endpoint, {
	    method: this.method,
	    headers: this.headers
	  })
	  .then((res) => {
	    if(res.ok){
	    	return res.json()
	    }else{
	    	throw new Error('BAD REQUEST :(');
	    }
	  })
	  .then((jsonData) => {
	   		console.log(jsonData);
	  })
	  .catch((err) => {
	    console.error(err);
	  });*/

		/*(async () => {

			let endpoint = this.URL+this.controlador+'/'+this.action+'?t='+this.token;

			const promise = await fetch(endpoint, {
					method: this.method,
					mode: this.mode
				})
				.then( res => {

					if(!res.ok){
						throw res
					}

					return res.json()
				})
				.then( json => {
					if(json.res == 'ok'){

					}
				})
				.catch( err => {
					console.log(err);
				})

			const data = await promise;

			for(var x in data){
				users = data[x];
			}
			
			render_users();

		})();*/
	}

	altUser(){
		$('#btn-submit').prop("disabled",true);

		let resStatus = 0
	  this.headers.append('Accept', 'application/json');

		(async () => {
			const rawResponse = await fetch(this.URL+this.controlador+this.action, {
				method: this.method,
				body: JSON.stringify({

			    	pes_codigo: "1",
			    	t: this.token,
			    	pes_nome: $('#pes_nome').val(),
					pes_telefone: $('#pes_telefone').val()
				})
			});

			const data = await rawResponse.json();

			console.log(data);
		})();
	}
	
	addUser(){
		$('#btn-submit').prop("disabled",true);

		let resStatus = 0
	  this.headers.append('Accept', 'application/json');

		(async () => {
			const rawResponse = await fetch(this.URL+this.controlador+this.action, {
				method: this.method,
				body: JSON.stringify({
			    	t: this.token,
			    	pes_nome: $('#pes_nome').val(),
					pes_telefone: $('#pes_telefone').val()
				})
			});

			const data = await rawResponse.json();

			console.log(data);
		})();


	  /*fetch(this.URL+this.controlador+this.action+'?t='+this.token, {
	    method: this.method,
	    mode: this.mode,
	    body: {
	    	pes_nome: $('#pes_nome').val(),
			pes_telefone: $('#pes_telefone').val()
		}
	  })
	  .then((res) => {
	    if(res.ok){
	    	return res.json()
	    }else{
	    	throw new Error('BAD REQUEST :(');
	    }
	  })
	  .then((jsonData) => {
	   		console.log(jsonData);
	  })
	  .catch((err) => {
	    console.error(err);
	  });*/


		/*$.ajax({
			url: this.URL+this.controlador+this.action+'?t='+this.token,
			type: 'POST',
			data: {
				pes_nome: $('#pes_nome').val(),
				pes_telefone: $('#pes_telefone').val()
			},
			success: function( data, textStatus, jQxhr ){

				$('#btn-submit').prop("disabled",false);
				$('#respostaAjax').html( data.data);
				render_users();
			},
			error: function( jqXhr, textStatus, errorThrown ){
				console.log( errorThrown );
			}
		});*/
	}

}
window.api = new API;
window.users = [];

function addUser(){

	api.controlador = 'pessoa';
	api.action = '/add';
	api.method = 'POST';
	api.addUser();
}

function altUser(){

	api.controlador = 'pessoa';
	api.action = '/alt';
	api.method = 'POST';
	api.altUser();
}

function delUser(id){

	api.action = 'del';
	api.method = 'POST';
	api.user_id = id;
	api.delUser;
}

function refreshFetch(){
	api.action = '';
	api.controlador = 'pessoa';
	api.method = 'GET';
	api.getUser;
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