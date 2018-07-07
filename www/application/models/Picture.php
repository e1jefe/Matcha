<?php

namespace application\models;

use application\components\Model;
use application\models\User;


class Picture extends Model
{
	public function insertLink($user_id, $link)
	{
		$this->db->query("INSERT INTO pics (user_id,link,likes) VALUES ($user_id,'$link', 0)");
	}

	public function extractPics()
	{
		return ($this->db->row("SELECT * FROM pics ORDER BY id_pic DESC"));
	}

}