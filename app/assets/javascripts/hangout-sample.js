getParameters = function(){
  var ret = {};

  var queryString = window.location.search.substring(1);
  var params = queryString.split('&');
  for(var co=0; co<params.length; co++){
    var keyValue = params[co].split("=");
    ret[keyValue[0]] = unescape(keyValue[1]);
  }
  return ret;
};

onClientReady = function(){
  gapi.hangout.onApiReady.add(function(e){
    if(e.isApiReady){
      onApiReady();
    }
  });
};

onApiReady = function(){
  var param = getParameters();
  var now = new Date();

  var hangoutUrl = gapi.hangout.getHangoutUrl();
  console.log("HNAGOUT URL");
  console.log(hangoutUrl);

  var callbackUrl = 'register_hangout.json';
}

// $.ajax({
//   url: callbackUrl,
//   dataType: 'json',
//   data: {
//     "hangoutUrl": hangoutUrl,
//     "topic": param["gd"]
//   }
// }).done(function(data, status, xhr){
//   $('#msg').html(data.msg);
// }).fail(function(xhr, status, error){
//   //$('#msg').html('therwe was a prblemmmmmmmmmmmmmmmmmmmmm.try again.("+textStatus+")");
//   console.log("there was a problem")
// });
