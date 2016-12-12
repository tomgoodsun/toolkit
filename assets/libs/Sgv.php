<?php
namespace Toolkit;

class Sgv
{
    public static function getServer($key)
    {
        return ArrayUtility::findByPath($_SERVER, $key);
    }

    public static function getPost($key)
    {
        return ArrayUtility::findByPath($_POST, $key);
    }

    public static function getGet($key)
    {
        return ArrayUtility::findByPath($_GET, $key);
    }
}
