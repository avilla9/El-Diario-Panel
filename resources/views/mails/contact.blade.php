Hola,
<p>Este es un mensaje enviado desde el Buzón de la app El Diario</p>

<div>
  <p><b>Nombre: </b>&nbsp;{{ $email->name }}</p>
  <p><b>Correo: </b>&nbsp;{{ $email->email }}</p>
  <p><b>Código de agente: </b>&nbsp;{{ $email->agent_code }}</p>

  <p><b>Tipo de mensaje: </b>&nbsp;{{ $email->type }}</p>
  <p><b>Mensaje: </b>&nbsp;{{ $email->message }}</p>
</div>