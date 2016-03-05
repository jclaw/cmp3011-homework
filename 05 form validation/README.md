FAMB97: Intermediate Web Design
05 form validation
Jackson Clawson
3/5/16

Repo: https://github.com/TuftsTusk/dumbo
Website: www.tuskmarketplace.com

For this assignment, I designed and built a form for Tusk Marketplace. Tusk is an online marketplace for students, and allows students to post sublet listings, textbooks, furniture, and other misc items. I decided to focus on the sublet listing process. I hadn't thought through the process yet, so I spent a good amount of time designing the flow of information and what the forms should look like. I arrived at a concept that allows students to list their apartment and add multiple rooms to the same listing. Students can set different rent prices and dates and upload photos for each room individually. 

I designed the whole process but only built out the core part of the room form (not the optional details, and not any other part of the process). 

Since we are using Angular for our front-end, I implemented the form validation with some of Angular's built-in functionality. It was largely an exercise in finding what already exists and trying to understand how to apply it. As a result, almost all of the form validation takes place in javascript embedded html attributes in `userListings.html`.

The line at the bottom of `userListings.html` that is commented out, `<pre>room = {{rForm | json}}</pre>` will display the data model in the browser. Comment it in to view.

Files created or modified: 
	builds/dumbo/views/userListings.html
	builds/dumbo/scripts/controllers/userListings.js
	process/sass/partials/_interface.scss
	process/sass/partials/_userListings.scss

Time spent: 5 hours designing, 5 hours building
