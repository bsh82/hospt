function btnActive()  {
        const target1 = document.getElementById('geo');
        const target2 = document.getElementById('geo-button');
        target1.disabled = false;
        target2.disabled = false;
};

var mapContainer = document.getElementById('map') // 지도를 표시할 div 

mapOption = {
        center: new kakao.maps.LatLng(37.5666805, 126.9784147), // 지도의 중심좌표
        level: 5, // 지도의 확대 레벨
        mapTypeId: kakao.maps.MapTypeId.ROADMAP // 지도종류
    };

// 지도를 생성한다 
var map = new kakao.maps.Map(mapContainer, mapOption);
map.setMaxLevel(9);

// 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
function makeOverListener(map, marker, infowindow) {
    return function () {
        infowindow.open(map, marker);
    };
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다 
function makeOutListener(infowindow) {
    return function () {
       infowindow.close();
    };
}

// 마커 클러스터러를 생성합니다 
var clusterer = new kakao.maps.MarkerClusterer({
    map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
    averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
    minLevel: 5 // 클러스터 할 최소 지도 레벨 
});

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();

map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);


document.getElementById("info-button").onclick = function () {
        
        // HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
    if (navigator.geolocation) {
        
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function(position) {
            
            var lat = position.coords.latitude, // 위도
                lon = position.coords.longitude; // 경도
            
            var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
            message = "현재위치 불러오기 성공!"
            // 마커와 인포윈도우를 표시합니다
            displayMarker(locPosition, message);
                
        });
        
    } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
        
        var locPosition = new kakao.maps.LatLng(37.5666805, 126.9784147);  
        message = "현재위치를 불러올 수 없어 기본설정된 위치로 이동합니다."
            
        displayMarker(locPosition, message);
    }
    function displayMarker(locPosition, message) {
        alert(message);
        // 지도 중심좌표를 접속위치로 변경합니다
        map.setCenter(locPosition);     
    }
    
    btnActive();			

    var url = "http://apis.data.go.kr/B551182/hospInfoService1/getHospBasisList1"
    url += '?' + encodeURIComponent('serviceKey') + '=' + "Ybc%2BkxYm5B%2BPtqHKQjx2rsJVrn3G5l2uC%2FU43Tdr9%2BWYceDhavnBURnFHZMNQC%2BMWFpoEQEcPG7OyNRi200S8g%3D%3D";
    url += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
    url += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('80000');
    url += '&' + encodeURIComponent('_type') + '=' + encodeURIComponent('json');

    var clCdnum = document.getElementById("clCd");

    if(clCdnum.options[clCdnum.selectedIndex].value == "none"){
        //do nothing
    } else {
        url += '&' + encodeURIComponent('clCd') + '=' + encodeURIComponent(clCdnum.options[clCdnum.selectedIndex].value);
    }

    var dgsbjtCdnum = document.getElementById("dgsbjtCd");

    if(dgsbjtCdnum.options[dgsbjtCdnum.selectedIndex].value == "none"){
        //do nothing
    } else {
        url += '&' + encodeURIComponent('dgsbjtCd') + '=' + encodeURIComponent(dgsbjtCdnum.options[dgsbjtCdnum.selectedIndex].value);
    }
    

        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();

        //주소입력 버튼 클릭 이벤트
        document.getElementById("geo-button").onclick = function () {

            var geo = document.getElementById("geo").value;
                // 주소로 좌표를 검색합니다

                geocoder.addressSearch(geo, function(result, status) {
            
                    if (status === kakao.maps.services.Status.OK) {
                        // 주소에 해당하는 위도 경도 위치를 생성합니다 
                        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                        // 지도 중심을 이동 시킵니다
                        map.setCenter(coords);
                        }
                    else{
                        alert("주소를 찾을 수 없습니다.")
                    }
                    });   
                
            };

        fetch(url)
            .then(res => res.json())
            .then(myJson => {
                var markers = [];
                const data = myJson.response
                const item = data["body"]["items"]["item"]
                
                for (var i in item) {
                    // 지도에 마커를 생성하고 표시한다
                    var marker = new kakao.maps.Marker({
                        position: new kakao.maps.LatLng(
                            item[i]["YPos"],
                            item[i]["XPos"]
                        ), // 마커의 좌표
                        map: map // 마커를 표시할 지도 객체
                        
                    });


                    var navigation = "https://map.kakao.com/link/to/"
                    var hospsite = item[i]["hospUrl"]
            
                    navigation += "선택병원"
                    navigation += ',' + item[i]["YPos"]
                    navigation += ',' + item[i]["XPos"]

                    var iwContent = item[i]["yadmNm"]
                        + "<br/>" + "주소 :" +item[i]["addr"]
                        + "<br/>" + "전화번호 :" +item[i]["telno"]
                        + "<br/>" + "사이트URL :" + hospsite
                        + "<br/>" + `<div style="padding:5px;"><a target="_blank" href = ${hospsite}>해당병원 사이트 연결</a></div>`
                        + `<div style="padding:5px;"><a target="_blank" href = ${navigation}>해당병원 길찾기</a></div>`
                        + `<button id="myhospt-button">내 병원에 추가(업데이트 예정)</button>`,
                    iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다
                    // 마커 위에 표시할 인포윈도우를 생성한다

                    var infowindow = new kakao.maps.InfoWindow({
                        content : `<div style="width:100%; padding:5px;">${iwContent}</div>`,
                        removable : iwRemoveable
                    });

                    kakao.maps.event.addListener(
                        marker,
                        'click',
                        makeOverListener(map, marker, infowindow)
                    );
                    
                    markers.push(marker);


                    document.getElementById("button").onclick = function () {
                        clusterer.clear();
                        document.getElementById("clCd").value = "none";
                        document.getElementById("dgsbjtCd").value = "none";
                    }

                }

                // 클러스터러에 마커들을 추가합니다
                clusterer.addMarkers(markers);



            });
    
};