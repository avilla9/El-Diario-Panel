@extends('../layout/' . $layout)

@section('subhead')
<title>Crear usuarios</title>
@endsection

@section('subcontent')
<div class="intro-y flex items-center mt-8">
  <h2 class="text-lg font-medium mr-auto">Formulario para la creación de usuarios</h2>
</div>
@if ($errors->any())
<div class="alert alert-danger">
  <strong>Whoops!</strong> Hubo algunos problemas con la información ingresada.<br><br>
  <ul>
    @foreach ($errors->all() as $error)
    <li>{{ $error }}</li>
    @endforeach
  </ul>
</div>
@endif
@if ($message = Session::get('success'))
<div class="alert alert-success">
  <p>{{ $message }}</p>
</div>
@endif
<div class="grid grid-cols-12 gap-6 mt-5">
  <div class="intro-y col-span-12 lg:col-span-12">
    <form action="{{ route('user.store') }}" method="POST">
      @csrf
      <!-- BEGIN: Input -->
      <div class="intro-y box">
        <div id="input" class="p-5">
          <div class="preview">
            <div>
              <label for="regular-form-1" class="form-label">DNI</label>
              <input id="regular-form-1" name="dni" type="number" class="form-control" placeholder="DNI" value="{{ old('dni') }}">
            </div>
            <div class="mt-3">
              <label for="regular-form-1" class="form-label">Código de usuario</label>
              <input id="regular-form-1" name="user_code" type="text" class="form-control" placeholder="Código de usuario" value="{{ old('user_code') }}">
            </div>
            <div class="mt-3">
              <label for="regular-form-1" class="form-label">Nombre</label>
              <input id="regular-form-1" name="name" type="text" class="form-control" placeholder="Nombres" value="{{ old('name') }}">
            </div>
            <div class="mt-3">
              <label for="regular-form-1" class="form-label">Apellido</label>
              <input id="regular-form-1" name="last_name" type="text" class="form-control" placeholder="Apellido" value="{{ old('last_name') }}">
            </div>
            <div class="mt-3">
              <label for="regular-form-1" class="form-label">Correo</label>
              <input id="regular-form-1" type="email" class="form-control" name="email" placeholder="Correo" value="{{ old('email') }}">
            </div>
            <div class="mt-3">
              <label for="regular-form-1" class="form-label">Territorial</label>
              <input id="regular-form-1" type="text" class="form-control" name="territorial" placeholder="Territorial" value="{{ old('territorial') }}">
            </div>
            <div class="mt-3">
              <label for="regular-form-1" class="form-label">SECI Coins</label>
              <input id="regular-form-1" type="number" class="form-control" name="secicoins" placeholder="SECI Coins">
            </div>
            <div class="mt-3">
              <label for="regular-form-4" class="form-label" style="width: 100%;">Contraseña</label>
              <div class="input-group mt-2">
                <input id="password" name="password" type="password" class="form-control" placeholder="Contraseña" aria-label="password" aria-describedby="togglePassword">
                <div id="togglePassword" class="input-group-text cursor-pointer"><i class="open" data-feather="eye"></i><i class="closed" data-feather="eye-off"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-3">
            <label>Codigo de Rol del usuario</label>
            <div class="mt-2">
              <select data-placeholder="Seleccione un rol para el usuario" name="role_id" class="tom-select w-full">
                <option disabled selected>Seleccione un rol para el usuario</option>
                @foreach ($roles as $role)
                <option value="{{ $role->id }}">{{ $role->name }}</option>
                @endforeach
              </select>
            </div>
          </div>

          <div class="mt-3">
            <label>Delegación</label>
            <div class="mt-2">
              <select data-placeholder="Seleccione una delegación para el usuario" name="delegation_id" class="tom-select w-full">
                <option disabled selected>Seleccione una delegación para el usuario</option>
                @foreach ($delegations as $delegation)
                <option value="{{ $delegation->id }}">
                  {{ $delegation->code }} - {{ $delegation->name }}
                </option>
                @endforeach
              </select>
            </div>
          </div>

          <div class="mt-3">
            <label>Grupo del usuario</label>
            <div class="mt-2">
              <select data-placeholder="Seleccione un rol para el usuario" name="group_id" class="tom-select w-full">
                <option disabled selected>Seleccione un grupo para el usuario</option>
                @foreach ($groups as $group)
                <option value="{{ $group->id }}">{{ $group->name }}</option>
                @endforeach
              </select>
            </div>
          </div>

          <div class="mt-3">
            <label>Cuartil del usuario</label>
            <div class="mt-2">
              <select data-placeholder="Seleccione un rol para el usuario" name="quartile_id" class="tom-select w-full">
                <option disabled selected>Seleccione un cuartil para el usuario</option>
                @foreach ($quartiles as $quartile)
                <option value="{{ $quartile->id }}">{{ $quartile->name }}</option>
                @endforeach
              </select>
            </div>
          </div>
          <div class="sm:ml-20 sm:pl-5 mt-5">
            <button type="submit" class="btn btn-primary">Crear Usuario</button>
          </div>
        </div>
      </div>
      <!-- END: Input -->
    </form>
  </div>
</div>
@endsection