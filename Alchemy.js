/* global angular */
angular.module('app', []).controller('mainCtrl', mainCtrl)
//.directive('avatar', avatarDirective);
;
function mainCtrl($scope, $interval, $http) {

  this.elements = ['air', 'fire', 'earth', 'water'];
  this.startTime = (Date.now() / 1000);
  this.selected = [];
  this.time = 0;
  this.select = (el) => {
    if (!this.selected.includes(el)) {
      this.selected.push(el);
    }
    if (this.selected.length == 2) {
      $http.get('/', {data: {el1: this.selected[0], el2: this.selected[1]}})
      .then(SuccessResponse => {
        if (SuccessResponse.status === 200) {

        }
      }, FailResponse => {

      });
      this.selected = [];
    }
  }
  var tick = () => {
    this.time = Math.trunc((Date.now()/1000) - this.startTime);
  }
  tick();
  const intervalRef = $interval(tick, 1000);
}
