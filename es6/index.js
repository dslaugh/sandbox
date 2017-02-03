function getCounts({searchCoordinates, distance, typeCode, customDistanceMap} = {}) {
   console.log(searchCoordinates);
   console.log(distance);
   console.log(typeCode);
   console.log(customDistanceMap);
}
const opts = {
	searchCoordinates: {lat: 1, lng: 1},
	distance: 10, 
	typeCode: 'm', 
	customDistanceMap: [{distance: 10, counts: 0}],
}
getCounts(opts);
