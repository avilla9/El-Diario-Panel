<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableUsersLenght extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->longText('territorial', 255)->change();
            $table->longText('user_code', 255)->change();
            $table->longText('name', 255)->change();
            $table->longText('last_name', 255)->change();
            $table->longText('email', 255)->change();
            $table->longText('delegation_code', 255)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
