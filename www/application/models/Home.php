<?php

namespace application\models;

use application\components\Model;

class Home extends Model
{
	
	public function getPics()
	{
		$res = $this->db->row('SELECT id, pic FROM random_pic');
		return $res;
	}


}