(function(){
'use strict';

angular.module("NarrowItDownApp", [])
.controller("NarrowItDownController", NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems',foundItems);

NarrowItDownController.$inject = ['MenuSearchService'];

function NarrowItDownController(MenuSearchService){
var controller = this;
controller.getMatchedMenuItems = function(){
	if(controller.searchTerm!=''){
	MenuSearchService.getMatchedMenuItems(controller.searchTerm).then(function (result) {
	controller.found = 	result;
	if(result.length==0){
	controller.error='error';
	controller.found =[];	
	}
	else{
	controller.error='';		
	}

	
	})	
	}
	else
	{
	controller.found =[];	
	controller.error='Error'	
	}
	
	
}
controller.removeItem = function(index){
 MenuSearchService.removeItem(index);
}

}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http){
var service = this;
var foundItems=[];
service.getMatchedMenuItems = function(searchTerm){ 
foundItems=[];	
if(searchTerm!=''){
return $http.get('https://davids-restaurant.herokuapp.com/menu_items.json').then(function (result) {
	for (var i = 0; i < result.data.menu_items.length; i++) {	
    if (result.data.menu_items[i].description.toLowerCase().indexOf(searchTerm) !== -1) {
    foundItems.push(result.data.menu_items[i]);
    }
    }

    return foundItems;
});
}
else
{
foundItems=[];	
}


}
service.removeItem= function(index){
foundItems.splice(index, 1);	
}

}

function foundItems(){
 var ddo = {
 	template: '<ul><li ng-repeat="item in ctrl.items">{{ item.name }}, {{ item.short_name }}, {{ item.description }} <button ng-click="ctrl.onRemove({index: $index});">Dont want this one!</button></li></ul>',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: DirectiveController,
    controllerAs: 'ctrl',
    bindToController: true
}

return ddo;
}

function DirectiveController(){

}


})();