angular.module('app').value('mvToastr', toastr);

angular.module('app').factory('mvNotifier', function (mvToastr) {
	toastr.options = {
	  "closeButton": false,
	  "debug": false,
	  "newestOnTop": false,
	  "progressBar": true,
	  "positionClass": "toast-top-right",
	  "preventDuplicates": true,
	  "onclick": null,
	  "showDuration": "150",
	  "hideDuration": "1000",
	  "timeOut": "2000",
	  "extendedTimeOut": "1000",
	  "showEasing": "swing",
	  "hideEasing": "linear",
	  "showMethod": "fadeIn",
	  "hideMethod": "fadeOut"
	};
	return {
		login: function(msg) {
			mvToastr.success(msg);
			console.log(msg);
		},
		logFail: function(msg) {
			mvToastr.warning(msg);
			console.log(msg);
		},
		notify: function(msg) {
			mvToastr.success(msg);
			console.log(msg);
		},
		error: function (msg) {
			mvToastr.error(msg);
			console.log(msg);
		}
	};
});