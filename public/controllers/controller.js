var contactListApp = angular.module('contactListApp', []);

contactListApp.controller('AppCtrl', function($scope, $http) {

    // Check to make sure that controller is loading properly
    console.log('Hello world form controller');

    // Refresh the view
    var refresh = function() {

        // Get all contacts from the server
        $http.get('/contactlist').success(function(response) {
            // Check to make sure that response from the server is received
            console.log("I get the data I requested");

            // Attach response to $scope
            $scope.contactlist = response;

            // Clear input fields
            $scope.contact = "";
        });
    };

    refresh();

    // Post contact to DB
    $scope.addContact = function() {

        // Make sure that the form information is captured and attached to $scope
        console.log($scope.contact);

        // Post the new contact object to the server where it will be written to the database
        $http.post('/contactlist', $scope.contact).success(function(response) {

            // Check to make sure that the server returns the newly created db object
            console.log(response);

            // Call the refresh function to see the newly added contact in contact list
            refresh();
        });
    };

    // Remove contact from DB
    $scope.remove = function(id) {
        console.log(id);

        // Send a delete request to server with object id
        $http.delete('/contactlist/' + id).success(function(response) {
            // Refresh the view to reflect the deleted contact
            refresh();
        });

    };

    // Edit contact
    $scope.edit = function(id) {
        console.log(id);

        // Look up the object and display it in the input fields
        $http.get('/contactlist/' + id).success(function(response) {
            $scope.contact = response;
        });
    };

    // Update a contact in DB
    $scope.update = function() {
        console.log($scope.contact._id);
        // Make a put request to the server to update the contact by id.
        $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
            // Refresh the new to show the updated contact
            refresh();
        })
    };


    $scope.deselect = function() {
        $scope.contact = "";
    }

});