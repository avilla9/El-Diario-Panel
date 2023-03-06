<?php

namespace App\Imports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class DeleteUsersImport implements ToModel, WithHeadingRow {
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row) {
        if (strlen($row['email'])) {
            User::where('email', $row['email'])->delete();
        } elseif (strlen($row['user_code'])) {
            User::where('user_code', $row['user_code'])->delete();
        }
    }
}
