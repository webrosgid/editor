<?
define ('_ROSGID', true);
require_once ($_SERVER['DOCUMENT_ROOT'] . '/db.php');
echo '
  <head>
<meta charset="UTF-8">
<title>Rosgid Engine 2.0 - Landing Page Editor</title>
<meta name="author" content="D.Creator">
<meta name="author" content="MegaBrain">


<link href="/editor/css/style.css" rel="stylesheet" type="text/css">

<link href="/editor/css/bootstrap.min.css" rel="stylesheet" type="text/css">
<link href="/editor/css/bootstrap-theme.min.css" rel="stylesheet" type="text/css">
<link href="/editor/css/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="/editor/library/jquery-ui/jquery-ui.min.css" rel="stylesheet" type="text/css">
<link href="/editor/css/template.css" rel="stylesheet" type="text/css">
<link href="/editor/css/setting.css" rel="stylesheet" type="text/css">

<script src="/editor/js/jquery-3.1.1.min.js" type="text/javascript" charset="UTF-8"></script>
<script src="/editor/library/jquery-ui/jquery-ui.min.js" type="text/javascript" charset="UTF-8"></script>
<script src="/editor/js/bootstrap.min.js" type="text/javascript" charset="UTF-8"></script>

<script src="/editor/library/ckeditor/ckeditor.js" type="text/javascript" charset="UTF-8"></script>
<script src="/editor/js/ajaxupload.3.5.js" type="text/javascript" charset="UTF-8"></script>

<script src="/editor/js/functions.js" type="text/javascript" charset="UTF-8"></script>
<script src="/editor/js/editor.js" type="text/javascript" charset="UTF-8"></script>



</head>


';
$test = $web->query("SELECT * FROM module_lp WHERE title='Главная'");
$row = $test->fetch_assoc();
echo $row['content_html'];



?>