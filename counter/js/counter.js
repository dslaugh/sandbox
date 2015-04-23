(function() {

	var todayCounts = Count();
	var $countBtn = document.querySelector('#CountBtn');
	var $isNew = document.querySelector('#IsNew');
	var $todayCounts = document.querySelector('#TodayCounts');

	todayCounts.on('countsSet', updateTodayList);
	todayCounts.on('countAdded', addCountToDataStore);
	todayCounts.on('countAdded', addCountToTodayList);

	$countBtn.onclick = todayCounts.add;

	populateTodayCounts();



	function populateTodayCounts() {
		var counts = sessionStore.get('todayCounts');
		if (counts) {
			todayCounts.set(counts);
		}
	}

	function addCountToDataStore(count) {
		var tempArray = sessionStore.get('todayCounts') || [];
		tempArray.push(count);
		sessionStore.set('todayCounts', tempArray);
	}

	function updateTodayList() {
		var todayCountList = todayCounts.get().reduce(function(prev, curr, i) {
			return prev += '<li id="'+i+'">'+curr+'</li>';
		}, '');
		$todayCounts.innerHTML = todayCountList;
	}

	function addCountToTodayList(count) {
		var countLi = document.createElement('li');
		countLi.innerHTML = count;
		$todayCounts.appendChild(countLi);
	}
})();
