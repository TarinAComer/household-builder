document.addEventListener('DOMContentLoaded', () => {
  let household = [],
    form = document.getElementsByTagName('form')[0],
    debug = document.querySelector('.debug'),
    ageInput = document.getElementsByName('age')[0],
    relationshipInput = document.getElementsByName('rel')[0],
    smokerInput = document.getElementsByName('smoker')[0],
    householdList = document.getElementsByClassName('household')[0];

  //force number > 0 entry on age input
  ageInput.setAttribute('min', 1);
  ageInput.setAttribute('type', 'number');

  form.setAttribute('novalidate', '');

  //set add click event
  document.getElementsByClassName('add')[0].addEventListener(
    'click',
    e => {
      add();
      e.preventDefault();
    });

  householdList.addEventListener('click', function(e) {
    e.preventDefault();
    e.target.classList.contains('remove') ? remove(e.target.id) : '';
  });

  //set submit button event
  document.querySelector('button[type="submit"]').addEventListener(
    'click',
    e => {
      submit();
      e.preventDefault();
    });

  function add() {
    if (!parseInt(ageInput.value) || parseInt(ageInput.value) < 1) {
      alert('Please enter a number greater than 0');
    } else if (relationshipInput.selectedIndex === 0) {
      alert('Please select a relationship');
    } else {
      console.log("smoker", smokerInput.checked);
      household.push({
        relationship: relationshipInput.value,
        age: parseInt(ageInput.value),
        smoker: smokerInput.checked ? 'smoker' : 'non-smoker'
      });
      updateList();
      form.reset();
    }
  }

  function remove(id) {
    household.splice(id, 1);
    updateList();
  }

  function submit() {
    debug.innerHTML = JSON.stringify(household);
    debug.style.display = 'inline-block';
    debug.style.width = '90%';
    debug.style.margin = 'auto 0';
    debug.style['white-space'] = 'normal';
  }

  function updateList() {
    householdList.innerHTML = '';

    household.forEach((value, index) => {
      const member = Object.values(value).join(', ');
      console.log('index', index);
      householdList.innerHTML += `<li>
        ${member}
        <button class="remove" id="${index}">Remove</button>
        </li>`;
    });
  }
});
