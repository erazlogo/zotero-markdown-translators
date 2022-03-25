{
	"translatorID":"719d3dbc-6256-11ec-90d6-0242ac120003",
	"translatorType":2,
	"label":"Markdown Item URI Obsidian Dataview",
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
			var type = "type: \"" + item.itemType + "\"\n";
			var isoDate = Zotero.Utilities.strToISO(item.date);
				if (isoDate.length) {
  					switch (isoDate.split("-").length) {
    					case 1:
      						isoDate += "-01-01";
      						break;
    					case 2:
      						isoDate += "-01";
      						break;
  					}

  					date = "date: \"" + isoDate + "\"\n";
				}
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
  				var creators = item.creators.filter(creator => creatorBaseTypes[creator.creatorType] == 'author' || authortest !== 'author' && creator.creatorType == 'editor').map(creator => (creator.firstName ? creator.lastName + ", " + creator.firstName : creator.lastName) || creator.name).join('; ');				
  				var creatorscite = item.creators.filter(creator => creatorBaseTypes[creator.creatorType] == 'author').map(creator => (creator.firstName ? creator.firstName + " " + creator.lastName : creator.lastName) || creator.name).join(', ');
  				var editors = item.creators.filter(creator => authortest !== 'author' && creator.creatorType == 'editor').map(creator => (creator.firstName ? creator.firstName + " " + creator.lastName : creator.lastName) || creator.name).join(', ');
				var ltrto = item.creators.filter(creator => creator.creatorType == 'recipient').map(creator => (creator.firstName ? creator.lastName + ", " + creator.firstName : creator.lastName) || creator.name).join('; ');
				var ltrtocite = item.creators.filter(creator => creator.creatorType == 'recipient').map(creator => (creator.firstName ? creator.firstName + " " + creator.lastName : creator.lastName) || creator.name).join(', ');
				var interviewby = item.creators.filter(creator => creator.creatorType == 'interviewer').map(creator => (creator.firstName ? creator.lastName + ", " + creator.firstName : creator.lastName) || creator.name).join('; ');
				var interviewbycite = item.creators.filter(creator => creator.creatorType == 'interviewer').map(creator => (creator.firstName ? creator.firstName + " " + creator.lastName : creator.lastName) || creator.name).join(', ');
			}
			var authors = creators ? "author: \"" + creators + "\"\n" : "";
			var authorscite = creatorscite ? creatorscite + ", " : "";
			var editorscite = editors ? editors + ", ed., " : "";
			var recipient = item.itemType == "letter" ? "recipient: \"" + ltrto + "\"\n" : "";
			var recipientcite = item.itemType == "letter" ? "to " + ltrtocite + " " : "";
			var interviewer = item.itemType == "interview" ? "interviewer: \"" + interviewby + "\"\n" : "";
			var interviewercite = item.itemType == "interview" ? "interview by " + interviewbycite + " " : "";

			var title = item.title ? "title: \"" + item.title + "\"\n" : "";
			var titlecite = item.title ? getTitle(item) : "";

			var publication = item.publicationTitle ? "publication: \"" + item.publicationTitle + "\"\n" : "";
			var publicationcite = item.publicationTitle ? "_" + item.publicationTitle + "_ " : "";

			var archive = item.archive ? "archive: \"" + item.archive + "\"\n" : "";
			var location = item.archiveLocation ? "archive-location: \"" + item.archiveLocation + "\"\n" : "";
			var url = item.url ? "url: \"[url](" + item.url + ")\"\n" : "";
			var urlcite = item.url ? "[url](" + item.url + ") " : "";
			var doi = item.DOI ? "doi: \"[doi](https://doi.org/" + item.DOI + ")\"\n" : "";
			var doicite = item.DOI ? "[doi](https://doi.org/" + item.DOI + ") " : "";
			var online = item.uri ? "online: \"[online](" + item.uri + ")\"\n" : "";
			var onlinecite = item.uri ? "[online](" + item.uri + ") " : "";
			var local = item.key ? "local: \"[local](zotero://select/items/_" + item.key + ")\"\n" : "";
			var localcite = item.key ? "[local](zotero://select/items/_" + item.key + ")" : "";
			var citekey = item.citationKey ? "citekey: " + item.citationKey : "";
			
	
			Zotero.write(`---\n${type}${authors}${recipient}${interviewer}${title}${publication}${date}${archive}${location}${url}${doi}${online}${local}${citekey}\n---\n${authorscite}${recipientcite}${editorscite}${interviewercite}${titlecite}${publicationcite}${datecite}${urlcite}${doicite}${onlinecite}${localcite}\n`);
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