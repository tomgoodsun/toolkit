<?php
namespace Toolkit;

class Application
{
    const COMPONENT_DIR = 'contents';
    const DEFAULT_SCRIPT_NAME = 'index.php';
    const COMPONENT_EXTENSION = '.php';

    private $root_dir;
    private $root_uri;
    private $content_path;
    private $content_root;
    private $content_uri;
    private $content_script;

    private $component_dir;
    private $default_script_name;
    private $component_extension;

    public function __construct($path)
    {
        $this->root_dir = $path;
        $this->component_dir = self::COMPONENT_DIR;
        $this->default_script_name = self::DEFAULT_SCRIPT_NAME;
        $this->component_extension = self::COMPONENT_EXTENSION;
        $this->init();
    }

    public function getSiteTitle()
    {
        return '';
    }

    private function init()
    {
        $this->root_uri = '//' . Sgv::getServer('SERVER_NAME') . dirname(Sgv::getServer('SCRIPT_NAME'));
        $this->content_path = str_replace(dirname(Sgv::getServer('SCRIPT_NAME')), '', Sgv::getServer('REQUEST_URI'));
        $this->content_path = preg_replace('/\/$/', '', $this->content_path);
        $this->content_root = $this->root_dir . '/' . $this->component_dir . $this->content_path;
        $this->content_uri = $this->root_uri . '/' . $this->component_dir . $this->content_path;
        
        $this->content_script = $this->content_root . '/' . $this->default_script_name;
        if (!file_exists($this->content_script)) {
            $this->content_script = $this->content_root . $this->component_extension;
            $this->content_root = dirname($this->content_root);
            $this->content_uri = dirname($this->content_uri);
        }
        //Utility::createClassName(array(
        //    'Toolkit',
        //    $this->component_dir,
        //    $this->content_path
        //));
    }

    public function main()
    {
        $site_title = $this->getSiteTitle();
        $root_dir = $this->root_dir;
        $root_uri = $this->root_uri;
        $content_path = $this->content_path;
        $content_root = $this->content_root;
        $content_uri = $this->content_uri;
        $content_script = $this->content_script;
        require_once($this->content_script);
    }
}
