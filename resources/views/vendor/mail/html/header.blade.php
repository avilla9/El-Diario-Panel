<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
@if (trim($slot) === 'Laravel')
<img src="{{ asset('file/logo.jpg') }}" class="logo" alt="El Diario">
@else
{{ $slot }}
@endif
</a>
</td>
</tr>
