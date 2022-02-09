WHERE contains(Publication, "Variety")

WHERE type = "manuscript"

WHERE contains(file.name, "Karlovy Vary") - case sensitive

WHERE contains(author, "Mezzadra")

publication AS "Publication"

TABLE rows.file.name as Title
FROM ...
Where rows.file.name !="Daily Template"
GROUP BY Mood

````
```dataview
list
where contains(this.file.inlinks, file.link) 
      and !contains(this.file.outlinks, file.link)
```
````