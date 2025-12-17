/**
 * Inject this into the geoguessr console.
 */

let _0x320200 = new WebSocket("ws://127.0.0.1:7779"), _0x350900 = "0", _0x3501000 = "0";
_0x320200.onerror = () => {
    console.log("Failed to connect. Is the backend server running?");
    window.location.reload(true);
}
_0x320200.onclose = () => {
    console.log("Connection unexpectedly closed. Reloading...");
    window.location.reload(true);
}
_0x320200.onopen = () => {
    (function _0x7() {
        if (document.getElementsByClassName("guess-map__guess-button").length > 0) {
            let _0x777200, _0x777300, _0x321200, _0x319100;
            if (document.getElementsByClassName("game-panorama_panorama__rdhFg").length > 0){
                _0x777200 = document.getElementsByClassName("game-panorama_panorama__rdhFg")[0] // element for competitive
                _0x777300 = Object.keys(_0x777200) // all keys
                _0x321200 = _0x777300.find(_0x321200 => _0x321200.startsWith("__reactFiber$")) // needed key
                _0x319100 = _0x777200[_0x321200].return.memoizedProps.panorama // location of coords
            } else {
                _0x777200 = document.querySelectorAll('[data-qa="panorama"]')[0] // finding the html element where "data-qa = panorama" this should hold the correct coordinates in ALL game modes.
                _0x777300 = Object.keys(_0x777200) // getting the keys of this html element.
                _0x321200 = _0x777300.find(_0x321200 => _0x321200.startsWith("__reactFiber$")) // finding the reactFiber key in this element. This will contain the props we need.
                _0x319100 = _0x777200[_0x321200].return.memoizedProps // accessing the props containing co-ordinates.
            }
            if (_0x319100.lat!==undefined && _0x319100.lng!==undefined) {
                if (_0x319100.lat!==_0x350900 && _0x319100.lng!==_0x3501000 && _0x320200.OPEN) {
                    _0x350900 = _0x319100.lat;
                    _0x3501000 =_0x319100.lng;
                    _0x320200.send(JSON.stringify([_0x319100.lat,_0x319100.lng]));
                }
            }
        }
        setTimeout(_0x7, 250);
    })();
}