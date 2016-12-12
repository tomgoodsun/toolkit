<?php
namespace Toolkit;

class ArrayUtility
{
    public static function findByPath(array $array, $path, $delim = '/')
    {
        $paths = explode($delim, $path);
        $temp = &$array;
        foreach($paths as $key) {
            $temp =& $temp[$key];
        }
        return $temp;
    }
}
