# Date invitation

Static HTML, CSS and JavaScript. Serve this folder with any static web host.

## Selection emails

1. Set `window.DATE_NOTIFICATION_RECIPIENT` in `notification-config.js` to your receiving email address.
2. Open the hosted site and pick an activity and a dinner cuisine to trigger FormSubmit activation.
3. Check your inbox/spam folder and click the activation link from FormSubmit.
4. Pick another activity/cuisine combination and verify the notification arrives before sharing the invitation.

The email is sent after both an activity and dinner cuisine are selected, without waiting for a calendar date. Both choices appear in the confirmation, email, and calendar exports.
Changing the choice sends a new update. Repeated clicks on the last successfully
submitted choice are suppressed within the current page session. Reloading can
send another notification. Failed requests show a retry button; the site does not
claim success for a failed request. A successful API response means the provider
accepted the submission, not that inbox delivery has been verified.

The recipient is public client configuration. After activation, you can replace
it with the opaque endpoint token supplied by FormSubmit to hide the raw address.
Do not add private mail credentials to this repository. Notifications require an
internet connection and FormSubmit availability. Use an HTTP(S) host, not a file URL.

Provider documentation: https://formsubmit.co/ajax-documentation
Activation help: https://formsubmit.co/help

## Troubleshooting

If FormSubmit returns HTTP 521, its service is unavailable; retry after it recovers.
The app logs provider errors in the browser console and offers a prefilled email
link after a failure. This fallback requires a configured email app and the visitor
must press Send; it does not provide automatic delivery. Opening index.html as a
file also shows this fallback. Serve the folder over HTTP(S) for automatic sending.
A different automatic provider requires its own configured endpoint/account.
