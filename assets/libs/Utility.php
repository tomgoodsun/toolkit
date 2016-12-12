<?php
namespace Toolkit;

class Utility
{
    public static function createClassName(array $list)
    {
        $class_name_parsts = array();
        foreach ($list as $item) {
            $namespace = '';
            foreach (explode('_', $item) as $word) {
                $namespace .= ucfirst($word);
            }
            $class_name_parsts[] = $namespace;
        }
        return '\\' . implode('\\', $class_name_parsts);
    }
}
