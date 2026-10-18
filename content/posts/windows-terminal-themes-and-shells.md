---
title: Customizing your Windows Terminal with themes and different Shells
description: Add Git Bash and other shells to Windows Terminal, and give each its own colour scheme.
date: 2020-07-10
tags: [windowsterminal, terminal, colors, customization]
archive:
  site: dev.to
  url: https://dev.to/wapenshaw/guide-customizing-your-windows-terminal-with-themes-and-different-shells-27d2
---

## Settings

### Opening the Settings File

By Default the Windows terminal comes with Powershell and Commandline enabled, however if you want your own shell to be added to the list, you have to add it to the list in the `settings.json` of Windows Terminal.

You can find the file in `C:\Users\<username>\AppData\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json`

Or you simply can click on Settings in the Terminal Menu which will open up the JSON file

![TerminalSettings](/blog/windows-terminal-themes-and-shells/3y1zfj0n3u0z0re37gmb.png)

### Understanding the settings

The JSON file is well documented on its own and you can tinker some settings before you get the hang of it.

If you have the terminal open while changing the settings, the terminal will update on the fly as you change the settings, of if you have an error in the settings it will show you the error the moment you save the file, So keep it open while you are experimenting.

[Generate a GUID for your shells here](https://www.guidgenerator.com/online-guid-generator.aspx)

1. `"defaultProfile":` points to the profile with the same `"guid":`. Whenever you open the terminal this is the profile that starts up
2. `copyOnSelect": true,` makes it work like in linux, ie, you have have to press Ctrl+C to copy the text.
3. `"profiles": {` This is where you configure all your different shells
4. `"schemes": [` This is where you add your color schemas for use with your profiles.

### Adding a different shell

To add a different shell or a different starting profile for PS/CMD, you need to add entries to the `"profiles": {` section

Lets add the git bash shell. Make sure git is working by checking `git --version`in command and this to your settings.json

```json
{
	"tabTitle": "Git Bash",
	"closeOnExit": true,
	"colorScheme": "Blazer",
	"commandline": "C:/Program Files/Git/bin/bash.exe --cd=/",
	"cursorColor": "#FFFFFF",
	"cursorShape": "bar",
	"fontFace": "Consolas",
	"fontSize": 12,
	"guid": "{14ad203f-52cc-4110-90d6-d96e0f41b64d}",
	"icon": "ms-appdata:///roaming/git-for-windows.ico",
	"name": "Git Bash",
	"padding": "0, 0, 0, 0",
	"snapOnInput": true
}
```

Of course you have to make sure you have the `"commandline":` parameter pointing to your bash.exe.

for the `"icon":` the best way is to find the git-for-windows.ico in your git bash installation folder and copy it to `%LOCALAPPDATA%\packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\RoamingState`

### Adding color schemes

There are already very well designed color schemes available here [iTerm2-ColorSchemes](https://github.com/mbadolato/iTerm2-Color-Schemes/tree/master/windowsterminal) just copy the ones you like and paste them in the schemes section under `"schemes": [`

For example :

```jsonc
"schemes": [
	{
		"name": "Argonaut",
		"black": "#232323",
		"red": "#ff000f",
		"green": "#8ce10b",
		"yellow": "#ffb900",
		"blue": "#008df8",
		"purple": "#6d43a6",
		"cyan": "#00d8eb",
		"white": "#ffffff",
		"brightBlack": "#444444",
		"brightRed": "#ff2740",
		"brightGreen": "#abe15b",
		"brightYellow": "#ffd242",
		"brightBlue": "#0092ff",
		"brightPurple": "#9a5feb",
		"brightCyan": "#67fff0",
		"brightWhite": "#ffffff",
		"background": "#0e1019",
        "foreground": "#fffaf4"
    },
]
```

Now that you have added all the color schemes you like into the settings, you can apply them to your shell profiles, you can apply different styles to different shells.

`"colorScheme": "Argonaut",` in the profile will use color scheme we just added.

All done!

Anwyay here is my complete setup, just color changes some minor tweaks

```jsonc
{
	"$schema": "https://aka.ms/terminal-profiles-schema",

	"defaultProfile": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",

	// You can add more global application settings here.
	// To learn more about global settings, visit https://aka.ms/terminal-global-settings

	// If enabled, selections are automatically copied to your clipboard.
	"copyOnSelect": true,

	// If enabled, formatted data is also copied to your clipboard
	"copyFormatting": false,

	// A profile specifies a command to execute paired with information about how it should look and feel.
	// Each one of them will appear in the 'New Tab' dropdown,
	//   and can be invoked from the commandline with `wt.exe -p xxx`
	// To learn more about profiles, visit https://aka.ms/terminal-profile-settings
	"profiles": {
		"defaults": {
			// Put settings here that you want to apply to all profiles.
		},
		"list": [
			{
				// Make changes here to the powershell.exe profile.
				"guid": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",
				"name": "Windows PowerShell",
				"commandline": "powershell.exe",
				"hidden": false,
				"acrylicOpacity": 0.75,
				"closeOnExit": true,
				"colorScheme": "Rebecca",
				"cursorShape": "bar",
				"fontFace": "Consolas",
				"fontSize": 12,
				"padding": "0, 0, 0, 0",
				"snapOnInput": true,
				"useAcrylic": true
			},
			{
				// Make changes here to the cmd.exe profile.
				"guid": "{0caa0dad-35be-5f56-a8ff-afceeeaa6101}",
				"name": "Command Prompt",
				"commandline": "cmd.exe",
				"acrylicOpacity": 0.75,
				"closeOnExit": true,
				"colorScheme": "Argonaut",
				"hidden": false,
				"cursorShape": "bar",
				"fontFace": "Consolas",
				"fontSize": 12,
				"padding": "0, 0, 0, 0",
				"snapOnInput": true,
				"useAcrylic": true
			},
			{
				"guid": "{b453ae62-4e3d-5e58-b989-0a998ec441b8}",
				"hidden": true,
				"name": "Azure Cloud Shell",
				"source": "Windows.Terminal.Azure"
			},
			{
				"tabTitle": "Git Bash",
				"closeOnExit": true,
				"colorScheme": "Blazer",
				"commandline": "C:/Program Files/Git/bin/bash.exe --cd=/",
				"cursorColor": "#FFFFFF",
				"cursorShape": "filledBox",
				"fontFace": "Cascadia Code",
				"fontSize": 12,
				"guid": "{14ad203f-52cc-4110-90d6-d96e0f41b64d}",
				"historySize": 9001,
				"icon": "ms-appdata:///roaming/git-for-windows.ico",
				"name": "Git Bash",
				"padding": "0, 0, 0, 0",
				"snapOnInput": true,
				"acrylicOpacity": 0.75,
				"useAcrylic": true
			}
		]
	},

	// Add custom color schemes to this array.
	// To learn more about color schemes, visit https://aka.ms/terminal-color-schemes
	"schemes": [
		{
			"name": "Argonaut",
			"black": "#232323",
			"red": "#ff000f",
			"green": "#8ce10b",
			"yellow": "#ffb900",
			"blue": "#008df8",
			"purple": "#6d43a6",
			"cyan": "#00d8eb",
			"white": "#ffffff",
			"brightBlack": "#444444",
			"brightRed": "#ff2740",
			"brightGreen": "#abe15b",
			"brightYellow": "#ffd242",
			"brightBlue": "#0092ff",
			"brightPurple": "#9a5feb",
			"brightCyan": "#67fff0",
			"brightWhite": "#ffffff",
			"background": "#0e1019",
			"foreground": "#fffaf4"
		},
		{
			"name": "Blazer",
			"black": "#000000",
			"red": "#b87a7a",
			"green": "#7ab87a",
			"yellow": "#b8b87a",
			"blue": "#7a7ab8",
			"purple": "#b87ab8",
			"cyan": "#7ab8b8",
			"white": "#d9d9d9",
			"brightBlack": "#262626",
			"brightRed": "#dbbdbd",
			"brightGreen": "#bddbbd",
			"brightYellow": "#dbdbbd",
			"brightBlue": "#bdbddb",
			"brightPurple": "#dbbddb",
			"brightCyan": "#bddbdb",
			"brightWhite": "#ffffff",
			"background": "#0d1926",
			"foreground": "#d9e6f2"
		},
		{
			"name": "Rebecca",
			"black": "#12131e",
			"red": "#dd7755",
			"green": "#04dbb5",
			"yellow": "#f2e7b7",
			"blue": "#7aa5ff",
			"purple": "#bf9cf9",
			"cyan": "#56d3c2",
			"white": "#e4e3e9",
			"brightBlack": "#666699",
			"brightRed": "#ff92cd",
			"brightGreen": "#01eac0",
			"brightYellow": "#fffca8",
			"brightBlue": "#69c0fa",
			"brightPurple": "#c17ff8",
			"brightCyan": "#8bfde1",
			"brightWhite": "#f4f2f9",
			"background": "#292a44",
			"foreground": "#e8e6ed"
		}
	],

	// Add custom keybindings to this array.
	// To unbind a key combination from your defaults.json, set the command to "unbound".
	// To learn more about keybindings, visit https://aka.ms/terminal-keybindings
	"keybindings": [
		// Copy and paste are bound to Ctrl+Shift+C and Ctrl+Shift+V in your defaults.json.
		// These two lines additionally bind them to Ctrl+C and Ctrl+V.
		// To learn more about selection, visit https://aka.ms/terminal-selection
		{
			"command": {
				"action": "copy",
				"singleLine": false
			},
			"keys": "ctrl+c"
		},
		{ "command": "paste", "keys": "ctrl+v" },

		// Press Ctrl+Shift+F to open the search box
		{ "command": "find", "keys": "ctrl+shift+f" },

		// Press Alt+Shift+D to open a new pane.
		// - "split": "auto" makes this pane open in the direction that provides the most surface area.
		// - "splitMode": "duplicate" makes the new pane use the focused pane's profile.
		// To learn more about panes, visit https://aka.ms/terminal-panes
		{
			"command": {
				"action": "splitPane",
				"split": "auto",
				"splitMode": "duplicate"
			},
			"keys": "alt+shift+d"
		}
	]
}
```
