<?

define ('_ROSGID', true);
require_once ($_SERVER['DOCUMENT_ROOT'] . '/db.php');
$s =  $web->query ("select * from module_lp_temp as t where t.date = '".date('Y-m-d')."'");
$row = $s->fetch_assoc();
echo $row['content_html'];
?>