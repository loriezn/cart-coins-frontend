angular.module('app').service('ModalService', ModalService);


ModalService.$inject = [
    '$modal',
    '$log',
];
function ModalService(
    $modal,
    $log
) {

    $log.info('ModalService');

    var modalDefaults = {
        backdrop: true,
        keyboard: true,
        modalFade: true,
        templateUrl: 'assets/templates/partials/layout/modal.partial.html'
    };

    var modalOptions = {
        closeButtonText: null,
        actionButtonText: 'OK',
        headerText: null,
    };

    function showModal (customModalDefaults, customModalOptions) {
        if (!customModalDefaults) customModalDefaults = {};
        customModalDefaults.backdrop = 'static';
        return this.show(customModalDefaults, customModalOptions);
    };

    function show (customModalDefaults, customModalOptions) {
        //Create temp objects to work with since we're in a singleton service
        var tempModalDefaults = {};
        var tempModalOptions = {};

        //Map angular-ui modal custom defaults to modal defaults defined in service
        angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

        //Map modal.html $scope custom properties to defaults defined in service
        angular.extend(tempModalOptions, modalOptions, customModalOptions);

        if (!tempModalDefaults.controller) {

            tempModalDefaults.controller = ['$scope', '$modalInstance' ,function ($scope, $modalInstance) {
                $scope.modalOptions = tempModalOptions;
                $scope.modalOptions.ok = function (result) {
                    $modalInstance.close(result);
                };
                $scope.modalOptions.close = function (result) {
                    $modalInstance.dismiss('cancel');
                };
            }];
        }

        return $modal.open(tempModalDefaults).result;
    };

    return {
        showModal: showModal,
        show: show
    }

}
