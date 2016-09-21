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
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                firebase.auth().signOut().then(function() {
                    var snackbarContainer = document.querySelector('#status-check');
                    var data = {
                        message: 'Logged Out Successfully',
                        timeout: 2000,
                    };
                    snackbarContainer.MaterialSnackbar.showSnackbar(data);
                    document.getElementById('logout_link').style.display = 'none';
                    document.getElementById('profile_link').style.display = 'none';
                    document.getElementById('login_link').style.display = 'block';
                    routeTo('profile');
                }, function(error) {
                    // An error happened.
                });
            } else {
                routeTo('logout-redirect');
            };
        });
    }
    controllers.profile = function(form) {
        document.title = "Profile | Information";
        var form = document.getElementById("profileUpdate");
        document.getElementById('title').innerHTML = 'Profile Update';
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // Load user info
                document.getElementById('profile_link').style.display = 'block';
                document.getElementById('login_link').style.display = 'none';
                console.log(user);
                document.getElementById('logout_link').style.display = 'block';
                firebase.database().ref('users/' + user.uid).once('value').then(function(snap) {
                    var user = snap.val();
                    if (!user) {
                        // document.getElementById('logout_link').style.display = 'none';
                        // routeTo('login-redirect');
                        return;
                    }
                    // set the fields
                    if ((document.getElementById('name-input').value != null) || (document.getElementById('name-input').value != "")) {
                        document.getElementById('name-input').value = user.name;
                        document.getElementById('email-input').value = user.email;
                        document.getElementById('phone-input').value = user.phone;
                    } else {

                    }
                });

                document.getElementById("updateBtn").addEventListener("click", function(e) {

                    e.preventDefault();
                    validation(user);

                });
            } else if (!user) {
                routeTo('login-redirect');
            }
        });
    };

    function validation(user) {
        
        var userName = document.getElementById('name-input').value;
        var userEmail = document.getElementById('email-input').value;
        var userPhone = document.getElementById('phone-input').value;
        firebase.database().ref('users/' + user.uid).update({
            name: userName,
            email: userEmail,
            phone: userPhone
        }, function onComplete() {
            var snackbarContainer = document.querySelector('#profile-check');
            var data = {
                message: 'Successfully Saved',
                timeout: 1500
            };
            snackbarContainer.MaterialSnackbar.showSnackbar(data);
            document.getElementById('error-name').innerHTML = "";
            document.getElementById('error-name').style.visibility = "hidden";
            document.getElementById('error-email').innerHTML = "";
            document.getElementById('error-email').style.visibility = "hidden";
            document.getElementById('error-phone').innerHTML = "";
            document.getElementById('error-phone').style.visibility = "hidden";
        });
        
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
