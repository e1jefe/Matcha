<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="
		width=device-width,
		height=device-height,
		initial-scale=1,
		minimum-scale=1,
		maximum-scale=1,
		user-scalable=0"/>
	<link rel="icon" type="image/png" href="application/templates/img/favicon.ico">
    <link rel="stylesheet" type="text/css" href="/application/templates/css/font.css">
    <link href="https://fonts.googleapis.com/css?family=Ubuntu:400,700&amp;subset=cyrillic-ext" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,500,500i,700,700i,900,900i&amp;subset=cyrillic-ext" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Lato:400,700,900" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="/application/templates/css/style2.css">
	<link rel="stylesheet" type="text/css" href="/application/templates/css/home.css">
	<link rel="stylesheet" type="text/css" href="/application/templates/css/about.css">
	<link rel="stylesheet" type="text/css" href="/application/templates/css/feed.css">
	<link rel="stylesheet" type="text/css" href="/application/templates/css/cabinet.css">
	<link rel="stylesheet" type="text/css" href="/application/templates/css/noAuthor.css">
	<link rel="stylesheet" type="text/css" href="/application/templates/css/singlePhoto.css">
	<link rel="stylesheet" type="text/css" href="/application/templates/css/camera.css">
    <link rel="stylesheet" type="text/css" href="/application/templates/css/authorization.css">

	<title>Matcha</title>
</head>
<body>
	<?php 
		require 'application/views/layouts/header.php';
		echo $content; 
		require 'application/views/layouts/footer.php';
	?>
</body>
</html>