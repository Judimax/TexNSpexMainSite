
<img src="cover.png" style="width:1000px"/>

# Issues
* Greetings all I need some help with this Spotify API  integration.  has anyone put an add to spotify playlist button on their website. Basically there is a song playing on the website and when you hit the add to playlist button a window opens giving you access to spotify and from there you can add song to whichever playlist you choose


# Resources
* [Add item to playlist](https://developer.spotify.com/console/post-playlist-tracks/)

# Notes
* we may need a spotify account for the organization
* 
# Info
* app name - nibls_spotify_app_0

# Steps
* log in with the NIBLS developer acct in the [dashboard](https://developer.spotify.com/dashboard/applications)


## Questions
* In a multi user application is the  state meant to ensure the user does not get the credentials for a different account
```js
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
```