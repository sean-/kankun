#!/bin/sh
echo "Content-Type: text/html"
echo "Cache-Control: no-cache, must-revalidate"
echo "Expires: Sat, 26 Jul 1997 05:00:00 GMT"
echo

RELAY_CTRL=/sys/class/leds/tp-link:blue:relay/brightness

echo "<html><body><h1>SmartPlug (SSP-3)</h1>"

echo "Action: <a href='?on'>On</a> or <a href='?off'>Off</a>"

print_state() {
	case "`cat $RELAY_CTRL`" in
		0) echo "<p>State: OFF</p>"
		;;
		1) echo "<p>State: ON</p>"
		;;
	esac
}

case "$QUERY_STRING" in
	state)
		case "`cat $RELAY_CTRL`" in
			0) echo "<p>State: OFF</p>"
			;;
			1) echo "<p>State: ON</p>"
			;;
		esac
	;;
	on)
		echo 1 > $RELAY_CTRL
		print_state
	;;
	off)
		echo 0 > $RELAY_CTRL
		print_state
	;;
	*)
		print_state
	;;
esac

echo "<ul>"
echo "<li><a href='http://192.168.15.230/cgi-bin/relay.cgi'>Bookshelf Lamp</a></li>"
echo "<li><a href='http://192.168.15.231/cgi-bin/relay.cgi'>Livingroom Lamp</a></li>"
echo "</ul>"
echo "</body></html>"
