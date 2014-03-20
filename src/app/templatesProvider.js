app.provider('templates', function () {
    'use strict';
    var _this = this;
    angular.extend(this, {
        get:function (template) {
            return '/views/' + template + '.ng';
        }
    });
    this.$get = function () {
        return _this;
    };

});
