myApp.service('commonService', function () {

    /**
     * Remove list of array from an array. Array should have an ID attribute for this to work
     * @param {Array} The array to filter
     * @param {Array} The array contating the objects to remove
     * @return {Array} Filtred Array
     */
    
    this.removeFormArray = function (arrayList, removeList) {

        var newList = [];
        var addToList = true;
        arrayList.forEach(function (arrayObj) {
            addToList = true;
            removeList.forEach(function (removeObj) {
                if (arrayObj.id == removeObj.id) {
                    addToList = false;
                    return;
                }
            });
            if (addToList) {
                newList.push(arrayObj);
            }
        });

        return newList;
    }

});