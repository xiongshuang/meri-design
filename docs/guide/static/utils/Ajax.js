function ajax () {
	var ajaxData = {
		type: (arguments[0].type || "GET").toUpperCase(),
		url: arguments[0].url || "",
		async: arguments[0].async || "true",
		data: arguments[0].data || null,
		dataType: arguments[0].dataType || "json",
		// contentType: arguments[0].contentType || "application/x-www-form-urlencoded; charset=utf-8",
		beforeSend: arguments[0].beforeSend || function () { },
		success: arguments[0].success || function () { },
		error: arguments[0].error || function () { },
		onprogress: arguments[0].onprogress || function () { }
	}

	ajaxData.beforeSend()
	var xhr = createxmlHttpRequest();
	xhr.responseType = ajaxData.dataType;
	xhr.upload.onprogress = ajaxData.onprogress
	xhr.open(ajaxData.type, ajaxData.url, ajaxData.async);
	// xhr.setRequestHeader("Content-Type", ajaxData.contentType);
	xhr.send(ajaxData.data);

	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				if(xhr.response.code === '200') {
					ajaxData.success(xhr.response.data)
				} else {
					ajaxData.error(xhr.response)
				}
			} else {
				ajaxData.error(xhr.response)
			}
		}
	}
}

function createxmlHttpRequest () {
	if (window.ActiveXObject) {
		return new ActiveXObject("Microsoft.XMLHTTP");
	} else if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
	}
}

export default ajax
