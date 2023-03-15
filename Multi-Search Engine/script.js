document.getElementById("search-btn").addEventListener("click", function() {
	// Get the search term from the input field
	var searchTerm = document.getElementById("search-bar").value;

	// Create URLs for Google, DuckDuckGo, Bing, Yahoo, Dogpile, and The Internet Archive Search
	var googleUrl = "https://www.google.com/search?q=" + searchTerm;
	var ddgUrl = "https://duckduckgo.com/?q=" + searchTerm;
	var bingUrl = "https://www.bing.com/search?q=" + searchTerm;
	var yahooUrl = "https://search.yahoo.com/search?p=" + searchTerm;
	var dogpileUrl = "https://www.dogpile.com/serp?q=" + searchTerm;
	var iaUrl = "https://archive.org/search.php?query=" + searchTerm;

	// Open the URLs in new tabs
	window.open(googleUrl, "_blank");
	window.open(ddgUrl, "_blank");
	window.open(bingUrl, "_blank");
	window.open(yahooUrl, "_blank");
	window.open(dogpileUrl, "_blank");
	window.open(iaUrl, "_blank");
});
