$(function() {
    function PowerCtrlViewModel(parameters) {
        var self = this;

        self.settings = parameters[0];

        // this will hold the URL currently displayed by the iframe
        self.currentUrl = ko.observable();

        // this will hold the URL entered in the text field
        self.newUrl_check = ko.observable();
        self.newUrl_on = ko.observable();
        self.newUrl_off = ko.observable();

        // this will be called when the user clicks the "Go" button and set the iframe's URL to
        // the entered URL
        self.goToUrl_check = function() {
            self.currentUrl(self.newUrl_check());
        };

        self.goToUrl_on = function() {
            self.currentUrl(self.newUrl_on());
        };
        self.goToUrl_off = function() {
            self.currentUrl(self.newUrl_off());
        };

        // This will get called before the HelloWorldViewModel gets bound to the DOM, but after its
        // dependencies have already been initialized. It is especially guaranteed that this method
        // gets called _after_ the settings have been retrieved from the OctoPrint backend and thus
        // the SettingsViewModel been properly populated.
        self.onBeforeBinding = function() {
            self.newUrl_check(self.settings.settings.plugins.power_ctrl.url_check());
            self.newUrl_on(self.settings.settings.plugins.power_ctrl.url_on());
            self.newUrl_off(self.settings.settings.plugins.power_ctrl.url_off());
            self.goToUrl_check();
        }
    }

    // This is how our plugin registers itself with the application, by adding some configuration
    // information to the global variable OCTOPRINT_VIEWMODELS
    OCTOPRINT_VIEWMODELS.push([
        // This is the constructor to call for instantiating the plugin
        PowerCtrlViewModel,

        // This is a list of dependencies to inject into the plugin, the order which you request
        // here is the order in which the dependencies will be injected into your view model upon
        // instantiation via the parameters argument
        ["settingsViewModel"],

        // Finally, this is the list of selectors for all elements we want this view model to be bound to.
        ["#tab_plugin_power_ctrl"]
    ]);
});
