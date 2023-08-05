<?php

namespace PortfolioTheme;

use stdClass;

use eftec\bladeone\BladeOne;

$views = __DIR__ . '/../';
$cache = WP_CONTENT_DIR . '/cache';

$blade = new BladeOne($views, $cache, BladeOne::MODE_DEBUG); // MODE_DEBUG allows to pinpoint troubles.

$blade->directive('svg', function ($expression) {
	$src = collect(explode('/', __DIR__))
		->slice(0, -1)
		->join('/');
	$res = '<?php $__var = "' . $src . '" . "/" . ' . $expression . ';';
	$res .= ' echo file_get_contents($__var) ?>';
	return $res;
});

$blade->directive('reactComponent', function ($expression) {
	return <<<HTML
		<div class="w-full overflow-hidden" data-portfolio-theme-component=$expression></div>
	HTML;
});

class NewView
{
	private $controllerPath = null;
	private string $name;

	public function __construct(string $name)
	{
		$fullPath = __DIR__ . '/../../src/' . $name . '/controller.php';
		if (file_exists($fullPath)) {
			$this->controllerPath = $fullPath;
		}
		$this->name = $name;
	}

	public function render(...$args)
	{
		echo $this->getRendered(...$args);
	}

	public function renderWithCustomData($data)
	{
		echo $this->getRenderedWithCustomData($data);
	}

	public function getRenderedWithCustomData($data)
	{
		global $blade;

		$global      = new stdClass;
		$global->src = collect(explode('/', __DIR__))
			->slice(0, -1)
			->join('/');

		return $blade->run(
			"$this->name/template.blade.php",
			array_merge(
				$data,
				['global' => $global]
			)
		);
	}

	public function getRendered(...$args)
	{
		$data = [];
		if ($this->controllerPath) {
			require $this->controllerPath;
			if (isset($controller)) {
				$data = $controller(...$args);
			}
		}
		return $this->getRenderedWithCustomData($data);
	}
}
