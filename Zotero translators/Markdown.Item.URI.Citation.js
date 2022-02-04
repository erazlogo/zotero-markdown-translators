{
	"translatorID":"fe766d46-6259-11ec-90d6-0242ac120003",
	"translatorType":2,
	"label":"Markdown Item URI Citation",
	"creator":"Silent",
	"target":"markdown",
	"minVersion":"2.0",
	"maxVersion":"",
	"priority":200,
	"inRepository":false,
	"lastUpdated":"2021-12-21"
	}
	 
	
	function doExport() {
		var item;
		while(item = Zotero.nextItem()) {
			var datecite = item.date ? "(" + Zotero.Utilities.strToISO(item.date) + ") " : "";
			if (item.creators && item.creators.length) {
				var creatorBaseTypes = {
					author: 'author',
					interviewee: 'author',
					director: 'author',
					artist: 'author',
					sponsor: 'author',
					inventor: 'author',
					cartographer: 'author',
					performer: 'author',
					presenter: 'author',
					podcaster: 'author',
					programmer: 'author'
				};
				var authortest = item.creators[0].creatorType;
  				var creatorscite = item.creators.filter(creator => creatorBaseTypes[creator.creatorType] == 'author').map(creator => (creator.firstName ? creator.firstName + " " + creator.lastName : creator.lastName) || creator.name).join(', ');
  				var editors = item.creators.filter(creator => authortest !== 'author' && creator.creatorType == 'editor').map(creator => (creator.firstName ? creator.firstName + " " + creator.lastName : creator.lastName) || creator.name).join(', ');
				var ltrtocite = item.creators.filter(creator => creator.creatorType == 'recipient').map(creator => (creator.firstName ? creator.firstName + " " + creator.lastName : creator.lastName) || creator.name).join(', ');
				var interviewbycite = item.creators.filter(creator => creator.creatorType == 'interviewer').map(creator => (creator.firstName ? creator.firstName + " " + creator.lastName : creator.lastName) || creator.name).join(', ');
			}
			var authorscite = creatorscite ? creatorscite + ", " : "";
			var editorscite = editors ? editors + ", ed., " : "";
			var recipientcite = item.itemType == "letter" ? "to " + ltrtocite + " " : "";
			var interviewercite = item.itemType == "interview" ? "interview by " + interviewbycite + " " : "";
			var titlecite = item.title ? getTitle(item) : "";
			var publicationcite = item.publicationTitle ? "_" + item.publicationTitle + "_ " : "";
			var urlcite = item.url ? "[url](" + item.url + ") " : "";
			var doicite = item.DOI ? "[doi](https://doi.org/" + item.DOI + ") " : "";
			var onlinecite = item.uri ? "[online](" + item.uri + ") " : "";
			var localcite = item.key ? "[local](zotero://select/items/_" + item.key + ")" : "";
	
			Zotero.write(`${authorscite}${recipientcite}${editorscite}${interviewercite}${titlecite}${publicationcite}${datecite}${urlcite}${doicite}${onlinecite}${localcite}\n`);
		}
	}
	

	function getTitle(item)
		{
		if (item.publicationTitle) {
			return "\"" + item.title + ",\" ";
		}else{
			return "_" + item.title + "_ ";
		}
	}