FAMB97: Intermediate Web Design  
05 form validation  
Jackson Clawson  
3/5/16

Repo: https://github.com/TuftsTusk/dumbo  
Website: www.tuskmarketplace.com  
URL of page in dev environment: http://localhost:8080/#/mylistings/listing/1
Branch: userlistings

For this assignment, I designed and built a form for Tusk Marketplace. Tusk is an online marketplace for students, and allows students to post sublet listings, textbooks, furniture, and other misc items. I decided to focus on the sublet listing process. I hadn't thought through the process yet, so I spent a good amount of time designing the flow of information and what the forms should look like. I arrived at a concept that allows students to list their apartment and add multiple rooms to the same listing. Students can set different rent prices and dates and upload photos for each room individually. 

I designed the whole process but only built out the core part of the room form (not the optional details, and not any other part of the process). 

Since we are using Angular for our front-end, I implemented the form validation with some of Angular's built-in functionality. It was largely an exercise in finding what already exists and trying to understand how to apply it. As a result, almost all of the form validation takes place in javascript embedded html attributes in `singleListing.html`. Angular allows you to define constraints for input fields in forms, such as a min and max for a date input. If a constraint is violated, an error is added to the data model. HTML elements, such as the `.errorMsg` class in my file, can be told to watch for these errors and only be visible when a certain one occurs. 

Any attributes that have the prefix `ng` are communicating with Angular. Any content in the html that has double curly braces tells Angular to substitute in content for the variables contained in the curly braces and keep it updated with the data model (one-way data binding). Attributes with the `ng-model` attribute tell Angular to keep the element updated with the data model *and* to update the data model when it is changed (two-way data binding).

Clicking the back button in the header saves the form data to an object and prints to `console.log`.

The line at the bottom of `singleListing.html` that is commented out, `<pre>room = {{rForm | json}}</pre>`, will display the data model in the browser if it is commented in. That is a good way to see what is happening with the data. 

Documentation and examples I found helpful:
* https://docs.angularjs.org/api/ng/input/input%5Bdate%5D
* http://product.moveline.com/angular-validation-part-1-form-basics.html
* https://docs.angularjs.org/guide/forms
* https://docs.angularjs.org/api/ng/directive/ngChange
* https://docs.angularjs.org/api/ng/filter/date


Files created or modified: 
- `builds/dumbo/views/singleListing.html`
- `builds/dumbo/scripts/controllers/singleListing.js`
- `process/sass/partials/_interface.scss`
- `process/sass/partials/_singleListing.scss`

Time spent: 5 hours designing, 8 hours building
