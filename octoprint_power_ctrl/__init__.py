# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

import octoprint.plugin

class IpPowerPlugin(octoprint.plugin.StartupPlugin,
                    octoprint.plugin.TemplatePlugin,
                    octoprint.plugin.SettingsPlugin,
                    octoprint.plugin.AssetPlugin):
	def on_after_startup(self):
        	self._logger.info("Hello There! (more: %s)" % self._settings.get(["url_home"]))

	def get_settings_defaults(self):
        	return dict(url_home="http://192.168.8.100/index.asp",
			url_check="http://admin:12345678@192.168.8.100/set.cmd?cmd=getpower",
                        url_on="http://admin:12345678@192.168.8.100/set.cmd?cmd=setpower&p61=1",
                        url_off="http://admin:12345678@192.168.8.100/set.cmd?cmd=setpower&p61=0")

	def get_template_configs(self):
	    return [
	        dict(type="navbar", custom_bindings=False),
	        dict(type="settings", custom_bindings=False)
	    ]

	def get_assets(self):
	     return dict(
	         js=["js/power_ctrl.js"],
	         css=["css/power_ctrl.css"],
       		 less=["less/power_ctrl.less"]
	    ) 

__plugin_name__ = "PowerControl"
__plugin_pythoncompat__ = ">=3,<4"
__plugin_implementation__ = IpPowerPlugin()
