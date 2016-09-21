(function(jQuery, Firebase, Path) {
    "use strict";
    document.getElementById('logout_link').style.display = 'none';
    document.getElementById('profile_link').style.display = 'none';
    // pair our routes to our form elements and controller
    var routeMap = {
        '#/': {
            form: 'home',
            controller: 'home'
        },
        '#/login': {
            form: 'login',
            controller: 'login'
        },
        '#/logout': {
            form: 'logout',
            controller: 'logout'
        },
        '#/login-redirect': {
            form: 'login-redirect',
            controller: 'oops'
        },
        '#/profile': {
            form: 'profile',
            controller: 'profile',
            authRequired: true
        },
        '#/about': {
            form: 'about',
            controller: 'about',
        }
    };

    // create the object to store our controllers
    var controllers = {};

    // store the active form shown on the page
    var activeForm = null;

    function routeTo(route) {
        window.location.href = '#/' + route;
    }

    /// Controllers
    ////////////////////////////////////////

    controllers.home = function(form) {
        document.title = "Home | Welcome";
        document.getElementById('title').innerHTML = 'Home';
    };

    controllers.oops = function(form) {
        document.title = "Lost | Opps?";
        document.getElementById('title').innerHTML = 'Oops';
    };

    controllers.about = function(form) {
        document.title = "The End | K.I.T";
        document.getElementById('title').innerHTML = 'About';
    };

    controllers.login = function(form) {
        document.title = "Login | Go Firebase";
        document.getElementById('title').innerHTML = 'Login';

        // Social buttons
        document.getElementById('googleBtn').onclick = function(e) {
            //GITHUB AUTH CODE HERE
        };
        document.getElementById('githubBtn').onclick = function(e) {
            //GITHUB AUTH CODE HERE
        };

        document.getElementById('facebookBtn').onclick = function(e) {
           //GITHUB AUTH CODE HERE

    };

    controllers.logout = function(form) {
        document.title = "Logout | Bye-Bye";
        document.getElementById('title').innerHTML = 'Logout';
        // LOGOUT CODE HERE
    }
    controllers.profile = function(form) {
        document.title = "Profile | Information";
        var form = document.getElementById("profileUpdate");
        document.getElementById('title').innerHTML = 'Profile Update';
        // PROFILE CODE HERE - RETRIEVE DATA
    };

    function validation(user) {
        
        var userName = document.getElementById('name-input').value;
        var userEmail = document.getElementById('email-input').value;
        var userPhone = document.getElementById('phone-input').value;
        // PROFILE UPDATE DATA
        
    }
    /// Routing
    ////////////////////////////////////////

    // Handle transitions between routes
    function transitionRoute(path) {
        // grab the config object to get the form element and controller
        var formRoute = routeMap[path];

        // wrap the upcoming form in jQuery
        var upcomingForm = $('#' + formRoute.form);

        // if there is no active form then make the current one active
        if (!activeForm) {
            activeForm = upcomingForm;
        }
        // hide old form and show new form
        activeForm.hide();
        upcomingForm.show().hide().fadeIn(200);
        // remove any listeners on the soon to be switched form
        activeForm.off();
        // set the new form as the active form
        activeForm = upcomingForm;

        // invoke the controller
        controllers[formRoute.controller](activeForm);
    }
    // Set up the transitioning of the route
    function prepRoute() {
        transitionRoute(this.path);
    }


    /// Routes
    ///  #/         - Login
    //   #/logout   - Logut
    //   #/register - Register
    //   #/profile  - Profile

    Path.map("#/").to(prepRoute);
    Path.map("#/login").to(prepRoute);
    Path.map("#/logout").to(prepRoute);
    Path.map("#/login-redirect").to(prepRoute);
    Path.map("#/about").to(prepRoute);
    Path.map("#/profile").to(prepRoute);
    Path.map("#/contact").to(prepRoute);
    Path.root("#/");

    /// Initialize
    ////////////////////////////////////////

    $(function() {

        // Start the router
        Path.listen();

    });

}(window.jQuery, window.Firebase, window.Path))
