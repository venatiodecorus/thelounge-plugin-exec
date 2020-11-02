# thelounge-plugin-exec

Recreates irssi's `/exec` command for [thelounge](https://thelounge.chat), which allows you to run arbitrary commands on your host and send the output to IRC. Useful for playing ASCII art, cowsay, etc. Thank you to MiniDigger's shortcuts [plugin](https://github.com/venatiodecorus/thelounge-plugin-exec) for the inspiration and guide.

# Installation

- If you have installed thelounge via NPM/Yarn:

   `thelounge install thelounge-plugin-exec`
- If you have installed thelounge via source:

   `node index.js install thelounge-plugin-exec`

# Usage

Just run `/exec <command>` to run a command on your host. Obviously this plugin is only recommended for private instances. If you want to use it on a public instance please make sure your permissions are set properly so users can't run harmful commands.

If a command is running too long you can use `/exec --stop`.

To set the flood protection rates use `/exec --set-rate <burst> <per-second>` where the first value is a number and the burst flood rate (number of commands to send instantly) and the second value is the delay in milliseconds between messages after that. These default to a value of 5 for the burst and a value of 200 for per-second.