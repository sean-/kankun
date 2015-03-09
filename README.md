Installation
=======

99% of this work was borrowed from http://my.homedash.org/ .  The difference
is, I didn't want to rely on `jstorage` for the parameters and wanted to
store these files directly on my SSP-3's (and to make the instructions
Dad-proof).

Step 1
=======

Edit `src/index.html` and substitute the variables `MY-IP-1` and
`DEVICENAME-1` with your correct settings.  Repeat for every device in your
location.  Don't forget to increment the `switch-N` value in the `id`
attribute of the `li` tag.

For example:

```html
<ul id="switches">
  <li id="switch-1" data-ip="192.168.15.230"><span title="192.168.15.230"><i class="fa fa-power-off"></i>Bookshelf Lights</span></li>
  <li id="switch-2" data-ip="192.168.15.231"><span title="192.168.15.231"><i class="fa fa-power-off"></i>Diningroom</span></li>
  <li id="switch-3" data-ip="192.168.15.232"><span title="192.168.15.232"><i class="fa fa-power-off"></i>Kitchen Widget</span></li>
  <li id="switch-4" data-ip="192.168.15.233"><span title="192.168.15.233"><i class="fa fa-power-off"></i>Livingroom Lamp</span></li>
</ul>
```

Step 2
=======

`scp` the contents of `src/` to your device (default password is `p9z34c`):

```sh
scp -rp src/* root@MY-IP-1:/www/
```

Repeat this step as many times as you have devices.

Step 3
=======

Open your browser and type in: `http://MY-IP-1`.  The web page's JavaScript
will ping `/cgi-bin/json.cgi` script on every device for status, so it is
mandatory to copy at least `src/www/cgi-bin/json.cgi` to every device
(destination path: `/www/cgi-bin/json.cgi`).

Step 4
=======

Open the URL on your mobile device (e.g. Safari), click on the `Share`
button, then tap the `Add to Home Screen` icon.  Profit.
