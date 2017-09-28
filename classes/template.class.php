<?php
class template {
	
	public $editor = false;
	
	public function load ($id) {
		if ( !is_numeric ($id) ) {return false;} else {
			
			if ( !file_exists ( ROOT . SITEURL . '/tpl/lp/' . $id . '/main.tpl' ) ) {
				return false;
			} else {
				$this->editor = true;
				$load = file_get_contents (ROOT . SITEURL . '/tpl/lp/' . $id . '/main.tpl');
				return $load;
			}
			
		}
	}
	
}

$template = new template;
?>