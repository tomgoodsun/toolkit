<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title><?php echo $site_title; ?> | tom-gs.com Tookit</title>

    <link rel="stylesheet" href="<?php echo $root_uri; ?>/assets/mdl/material.min.css">
    <script type="text/javascript" src="<?php echo $root_uri; ?>/assets/mdl/material.min.js"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

    <link rel="stylesheet" href="<?php echo $root_uri; ?>/assets/css/default.css" />

    <script type="text/javascript" src="<?php echo $root_uri; ?>/assets/scripts/dialog-polyfill/dialog-polyfill.js"></script>
    <link rel="stylesheet" href="<?php echo $root_uri; ?>/assets/scripts/dialog-polyfill/dialog-polyfill.css" />
  </head>
  <body>
    <!-- Always shows a header, even in smaller screens. -->
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <header class="mdl-layout__header">
        <div class="mdl-layout__header-row">
          <!-- Title -->
          <span class="mdl-layout-title">Tookit: <?php echo $site_title; ?></span>
          <!-- Add spacer, to align navigation to the right -->
          <div class="mdl-layout-spacer"></div>
          <!-- Navigation. We hide it in small screens. -->
          <nav class="mdl-navigation mdl-layout--large-screen-only">
            <a class="mdl-navigation__link" href="">Link</a>
            <a class="mdl-navigation__link" href="">Link</a>
            <a class="mdl-navigation__link" href="">Link</a>
            <a class="mdl-navigation__link" href="">Link</a>
          </nav>
        </div>
      </header>
      <div class="mdl-layout__drawer">
        <span class="mdl-layout-title">Toolkit</span>
        <nav class="mdl-navigation">
          <a class="mdl-navigation__link" href="<?php echo $root_uri; ?>/">Home</a>
          <a class="mdl-navigation__link" href="<?php echo $root_uri; ?>/db">MySQL Initial Query Generator</a>
          <a class="mdl-navigation__link" href="<?php echo $root_uri; ?>/password">Password Generator</a>
          <a class="mdl-navigation__link" href="<?php echo $root_uri; ?>/">Home</a>
        </nav>
      </div>
      <main class="mdl-layout__content">
        <div class="mdl-grid">
