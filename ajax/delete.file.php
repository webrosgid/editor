<?php

if($_POST['file']){
	@unlink($_POST['file']);
}