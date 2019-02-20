const page = document.querySelector('.page');
const list = document.querySelectorAll('.student-item');
const pageHeader = document.querySelector('.page-header');
const listEmails = document.querySelectorAll('.email');

const pagination = document.createElement('div');
pagination.className = 'pagination';
page.appendChild(pagination);

const ul = document.createElement('ul');
pagination.appendChild(ul);

//Creates search input
const search = document.createElement('div');
search.className = 'student-search';
pageHeader.appendChild(search);
const input = document.createElement('input');
input.placeholder = 'Search for students...';
search.appendChild(input);
const buttonSearch = document.createElement('button');
buttonSearch.textContent = 'Search';
search.appendChild(buttonSearch);

//Search function
function searchStudents(arr) {
   const input = document.querySelector('input');
   let searchValue = input.value.toLowerCase();
   let students = []; 
  
   for(let i = 0; i < arr.length; i++) {
      const h3 = arr[i].querySelector('h3');      
      const nameValue = h3.textContent;
      const email = arr[i].querySelector('.email');
      emailValue = email.textContent;     
      
      if( (nameValue.indexOf(searchValue) > -1) || (emailValue.indexOf(searchValue) > -1) ) {
         arr[i].style.display = '';
         students.push(arr[i]);          
      } else {
         arr[i].style.display = 'none';         
      }   
   }
   return students;
}

//Show pages
function showPage(arr, numBtn) {
   const finalNum = numBtn * 10;
   const startNum = finalNum - 10;
   for(let i = 0; i < arr.length; i++) {         
      if( (i >= startNum) && (i < finalNum) ) {
         arr[i].style.display = '';         
      } else {
         arr[i].style.display = 'none';
      } 
   }
}

//Buttons

function appendPageLinks(students) { 
   //Contains the number of buttons
   let numStudents = students;  
   const numButtons = Math.ceil( numStudents / 10 );    

   //Creates the li and a for every button.
   for(let i = 1; i <= numButtons; i++) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = i;
      li.appendChild(a);
      ul.appendChild(li);      
      if(a.textContent === '1') {
         a.classList.add('active');
      }
   }
}

//Creates buttons.
appendPageLinks(list.length);

//Adding 'active' class

//Displays only the first ten items.
showPage(list, 1);

ul.addEventListener('click', (e) => {      
   if(e.target.tagName === 'A') { 
      const a = e.target;            
      const textBtn = a.textContent;
      const numBtn = parseInt(textBtn);
      showPage(list, numBtn);       
   }
}); 

search.addEventListener('click', (e) => {
   if(e.target.textContent === 'Search') {      
      searchStudents(list);
   }
});

input.addEventListener('keyup', () => {
   let students = searchStudents(list);      
   if(input.value === '') {
      showPage(list, 1);
   } else {
      const li = ul.querySelectorAll('li');
      for(let i = 0; i < li.length; i++) {
         li[i].style.display = 'none';
      }          
      appendPageLinks(students.length);
      ul.addEventListener('click', (e) => {      
         if(e.target.tagName === 'A') { 
            const a = e.target;            
            const textBtn = a.textContent;
            const numBtn = parseInt(textBtn);
            showPage(students, numBtn);       
         }
      });
      showPage(students, 1);         
   }  
}); 