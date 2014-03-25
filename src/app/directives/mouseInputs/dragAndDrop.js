app.directive('ngDrag', function () {
	'use strict';
	return {
		restrict: 'A',

		link: function (scope, elem, attrs) {
			var $this = angular.element(elem);
			$this.attr('draggable', true);
			$this.on('dragstart', function (event) {
				event.target.style.opacity = 0.2;
				event.originalEvent.dataTransfer.setData('text/plain', true);
				app.dragged_id = $this.attr('drag-id');
				if ($this.attr('reorder')) {
					app.dragged_reorder_key = $this.attr('reorder');
				} else {
					app.dragged_reorder_key = false;
				}
			});
			$this.on('dragend', function (event) {
				event.target.style.opacity = '';
			});
		}
	};
});

app.directive('ngDrop', function () {
	'use strict';
	return {
		restrict: 'A',
		link: function (scope, elem, attrs) {
			var $this = angular.element(elem);
			$this.on('dragover', function (event) {
				event.preventDefault();
			});
			$this.on('dragenter', function (event) {
				event.preventDefault();
				$this.addClass('dragging');
			});
			$this.on('dragleave', function () {
				$this.removeClass('dragging');
			});
			$this.on('drop', function (event) {
				event.preventDefault();
				$this.removeClass('dragging');
				var callback = attrs.ngDrop;
				scope.$apply(callback);
			});
		}
	};
});
