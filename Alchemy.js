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
      $http.get('/combine', {params: {el1: this.selected[0], el2: this.selected[1]}})
      .then(SuccessResponse => {
        if (SuccessResponse.status === 200) {
          console.log(SuccessResponse.data);
          if (!this.elements.includes(SuccessResponse.data)) {
            this.elements.push(SuccessResponse.data);
            this.checkWin();
          }
        }
      }, FailResponse => {

      });
      this.selected = [];
    }
  }
  this.checkWin = () => {
    $http.get('/winCheck', {params: {elements: this.elements}})
    .then(SuccessResponse => {
      let userName = prompt('you won, what is your name?');
      $interval.cancel(intervalRef);
      $http.get('win', {params: {elements: this.elements, name: userName, time: this.time}})
      .then(SuccessResponse => {

      }, FailResponse => {

      });
    }, FailResponse => {

    });
  }
  var tick = () => {
    this.time = Math.trunc((Date.now()/1000) - this.startTime);
  }
  tick();
  const intervalRef = $interval(tick, 1000);
}
