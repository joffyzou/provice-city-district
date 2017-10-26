var i, j, k;
var province = document.getElementById('province');
var city = document.getElementById('city');
var districtDiv = document.getElementById('district');
//var url = "http://restapi.amap.com/v3/config/district?key=我的key&subdistrict=3"
var url = "/data.json";
var xhr = new XMLHttpRequest();
xhr.open('GET', url, true);
xhr.onreadystatechange = function () {
	if (xhr.readyState === 4) {
		if (xhr.status === 200) {
			var jsonObj = JSON.parse(xhr.responseText);
			var provinceList = jsonObj.districts[0].districts;
			var flag = document.createDocumentFragment();
			for (i=0; i<provinceList.length; i++) {
				var option = document.createElement('option');
				option.innerHTML = provinceList[i].name;
				flag.appendChild(option);					
			}
			province.appendChild(flag);				
			province.addEventListener('change', function (e) {
				if (this.selectedIndex === 0) {
					city.innerHTML = '<option>地级市</option>';
					districtDiv.innerHTML = '<option>市、县级市</option>';
				} else {
					var cityList = provinceList[e.target.selectedIndex-1].districts;
					city.innerHTML = '<option>地级市</option>';
					for (j=0; j<cityList.length; j++) {
						var option = document.createElement('option');
						option.innerHTML = cityList[j].name;
						flag.appendChild(option);
					}
					city.appendChild(flag);
				}
													
			})
			city.addEventListener('change', function (e) {
				if (this.selectedIndex === 0) {
					districtDiv.innerHTML = '<option>市、县级市</option>';
				} else {
					var district = provinceList[province.selectedIndex-1].districts[e.target.selectedIndex-1].districts;
					districtDiv.innerHTML = '<option>市、县级市</option>';
					for (k=0; k<district.length; k++) {
						var option = document.createElement('option');
						option.innerHTML = district[k].name;
						flag.appendChild(option);
					}
					districtDiv.appendChild(flag);
				}
			})
		}
	}
}
xhr.send();