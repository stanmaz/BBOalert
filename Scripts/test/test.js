//ExecScript
url = "https://github.com/stanmaz/BBOalert/blob/master/Systems/TrefleRouge/System/RCbase.tex";
fetchWebData(url, function() {
  console.log("fetchWebData ", data.length);
  success(data);
}, failure);
