import Config from './config.js'
export function setupFullUrl(action, params) {
  let realUrl = "";
  let isUseCdnDomain=0;
  if (params == undefined || params.domainType == undefined || params.domainType == "") {
    isUseCdnDomain == 0;
  }
  else{
	  isUseCdnDomain =1;
  }
  
  if (isUseCdnDomain == 0 && localStorage.getItem('cdndomain') != "" && localStorage.getItem('cdndomain') !=
    undefined) {
    realUrl = localStorage.getItem('cdndomain') + "/api.php?method=" + action;
  } else if (isUseCdnDomain == 1 && params.domain != undefined && params.domain != "") {
    realUrl = params.domain + "/api.php?method=" + action;
  } else {
    realUrl = Config.baseUrl + "/api.php?method=" + action;
  }
  return realUrl;
}