var gleInited = false;
var gleTried = false;
var gleInitFuns = [];

function gleInit() {
    console.log('goole init');
    var url = 'https://maps.googleapis.com/maps/api/timezone/json?location=39.509805,116.4083129&timestamp=1593076517&key=AIzaSyD9mzj4sfSNhPUOmfp605SpbSMmip6TtD4';
    // var url = 'https://maps.googleapiscom/maps/api/timezone/json?location=39.509805,116.4083129&timestamp=1593076517&key=AIzaSyD9mzj4sfSNhPUOmfp605SpbSMmip6TtD4'; // BAD URL for testing
    rest.get('test google maps api', url,
        data => {
            console.log('yes, we have google maps api', data);

            gleInited = true;
            gleTried = true;
            gleInitFuns.forEach(fun => {
                fun();
            });
        },
        data => {
            console.log('no, no access to google maps api', data);
            gleTried = true;
            gleInitFuns.forEach(fun => {
                fun();
            });
        }
    );
}

function gleInitAdd(fun) {
    if (gleTried) {
        fun();
    } else {
        gleInitFuns.push(fun);
    }
}

{
    window.initAutocomplete = gleInit;
    gleElm = elmOfId('gle');
    if (gleElm) {
        gleCloneElm = gleElm.cloneNode(true);
        gleCloneElm.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD9mzj4sfSNhPUOmfp605SpbSMmip6TtD4&libraries=places&callback=initAutocomplete";
        gleElm.parentElement.insertBefore(gleCloneElm, gleElm);
        gleCloneElm.onerror = function() {
            gleTried = true;
            console.log('gle clone errlr');
            gleInitFuns.forEach(fun => {
                fun();
            });
        }
    }
}



// moved from e.js
var service = undefined;
var placeService = undefined;

function getPlaceService() {
    if (!placeService) {
        placeService = new google.maps.places.PlacesService(map);
    }
    return placeService;
}

function gleInit() {

    // console.log('goole init');
    // var url = 'https://maps.googleapis.com/maps/api/timezone/json?location=39.509805,116.4083129&timestamp=1593076517&key=AIzaSyD9mzj4sfSNhPUOmfp605SpbSMmip6TtD4';
    // // var url = 'https://maps.googleapiscom/maps/api/timezone/json?location=39.509805,116.4083129&timestamp=1593076517&key=AIzaSyD9mzj4sfSNhPUOmfp605SpbSMmip6TtD4'; // BAD URL for testing
    // rest.get('test google maps api', url,
    //     data => {
    //         console.log('yes, we have google maps api', data);

    gleInited = true;
    gleTried = true;
    gleInitFuns.forEach(fun => {
        fun();
    });
    //     },
    //     data => {
    //         console.log('no, no access to google maps api', data);
    //         gleTried = true;
    //         gleInitFuns.forEach(fun => {
    //             fun();
    //         });
    //     }
    // );
}

function gleInitAdd(fun) {
    if (gleInited) {
        fun();
    } else {
        gleInitFuns.push(fun);
    }
}

{
    window.initAutocomplete = gleInit;
    gleElm = elmOfId('gle');
    if (gleElm) {
        gleCloneElm = gleElm.cloneNode(true);
        gleCloneElm.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD9mzj4sfSNhPUOmfp605SpbSMmip6TtD4&libraries=places&callback=initAutocomplete";
        gleElm.parentElement.insertBefore(gleCloneElm, gleElm);
        // gleCloneElm.onerror = function() {
        gleTried = true;
        //     console.log('gle clone errlr');
        //     gleInitFuns.forEach(fun => {
        //         fun();
        //     });
        // }
    }
}

// utc in seconds, not milli-seconds 
function utcTimezoneByLoc(lat, lng, utc, fun) {
    if (gleInited) {
        // var url = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + lat + ',' + lng + '&timestamp=' + utc + '&key=AIzaSyD9mzj4sfSNhPUOmfp605SpbSMmip6TtD4';
        // console.log('gooogle utc url', url);
        // $.ajax({
        //     type: 'GET',
        //     url: url,
        //     success: (data, status, jqXHR) => {
        //         console.log('gooogle utc', status, data);
        //         if (fun) {
        //             fun(data);
        //         }
        //     },
        //     error: (data, status, jqXHR) => {
        //         console.log('gooogle utc', status, data);
        //     }
        // });
        rest.get('gle utc loc',
            'https://maps.googleapis.com/maps/api/timezone/json?location=' + lat + ',' + lng + '&timestamp=' + utc + '&key=AIzaSyD9mzj4sfSNhPUOmfp605SpbSMmip6TtD4',
            result => {
                if (fun) {
                    fun(result);
                }
            }
        );
    } else {
        if (fun) {
            fun({
                dstOffset: 0,
                rawOffset: 28800,
                status: "OK",
                timeZoneId: "Asia/Shanghai",
                timeZoneName: "China Standard Time"
            });
        }
    }
}