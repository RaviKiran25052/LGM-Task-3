document.addEventListener('DOMContentLoaded', function() {
	const registerBox = document.querySelector('.register_box');
	const nameInput = document.getElementById('name');
	const emailInput = document.getElementById('email');
	const webInput = document.getElementById('web');
	const imageInput = document.getElementById('image');
	const enrollBtn = document.getElementById('enrollBtn');
	const clearBtn = document.getElementById('clearBtn');
	const userList = document.getElementById('userList');
	
	const cardScroll = document.createElement('div');
	cardScroll.classList.add('card-scroll');

	const countDisplay = document.createElement('p');
	countDisplay.classList.add('user-count');
	cardScroll.insertBefore(countDisplay, cardScroll.firstChild);
		
	userList.appendChild(countDisplay);
	userList.appendChild(cardScroll);
	
	function updateCountDisplay() {
		const userCount = document.querySelectorAll('.user-card').length;
		if (userCount > 0) {
			registerBox.style.marginRight = '40px'
			countDisplay.textContent = `Number of enrolled users: ${userCount}`;
			countDisplay.style.display = 'block';
		} else {
			countDisplay.style.display = 'none';
		}
	}

	nameInput.addEventListener('input', validateForm);
	emailInput.addEventListener('input', validateForm);
	webInput.addEventListener('input', validateForm);
	imageInput.addEventListener('input', validateForm);

	function validateForm() {
		const nameValue = nameInput.value.trim();
		const emailValue = emailInput.value.trim();
		const webValue = webInput.value.trim();
		const imageValue = imageInput.value.trim();

		const isValid = nameValue !== '' && webValue !== '' && imageValue !== '' && /\S+@\S+\.\S+/.test(emailValue);
		enrollBtn.disabled = !isValid;
	}

	document.getElementById('registrationForm').addEventListener('submit', function(event) {
		event.preventDefault();

		const gender = document.querySelector('input[name="gender"]:checked').value;
		const skills = Array.from(document.querySelectorAll('input[name="skills"]:checked')).map(skill => skill.value);

		const userCard = document.createElement('div');
		userCard.classList.add('user-card');
		userCard.innerHTML = `
			<label>Name</label>: &nbsp;&nbsp;<p>${nameInput.value.trim()}</p><br>
			<label>Email</label>: &nbsp;&nbsp;<p>${emailInput.value.trim()}</p><br>
			<label>Website</label>: &nbsp;&nbsp;<p>${webInput.value.trim()}</p><br>
			<label>Image Link</label>: &nbsp;&nbsp;<p>${imageInput.value.trim()}</p><br>
			<label>Gender</label>: &nbsp;&nbsp;<p>${gender}</p><br>
			<label>Skills</label>: &nbsp;&nbsp;<p>${skills.join(', ')}</p>
			<button class="delete-btn"><i class='bx bx-trash'></i></button>
		`;
		cardScroll.appendChild(userCard);

		updateCountDisplay();

		const registerBoxHeight = registerBox.offsetHeight;
		cardScroll.style.height = registerBoxHeight-25 + 'px';
		cardScroll.style.overflowY = 'scroll';
		
		clearForm();
	});
		
	function deleteUserCard(event) {
		const deleteButton = event.target.closest('.delete-btn');
			if (deleteButton) {
			const card = deleteButton.closest('.user-card');
			if (card) {
				card.classList.add('remove-animation');
				setTimeout(() => {
					card.remove();
					updateCountDisplay();
				}, 500);
			}
		}
	}
	
	userList.addEventListener('click', deleteUserCard);

	clearBtn.addEventListener('click', clearForm);

	function clearForm() {
		document.getElementById('registrationForm').reset();
		enrollBtn.disabled = true;
	}
}); 
