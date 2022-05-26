const form = document.querySelector('.form-container');

const movieName = document.getElementById('movieName');
const releasedYear = document.getElementById('releasedYear');

const movieList = document.querySelector('.movie-list');

// submit form to get the list item and append it in ul
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    // console.log('form submitted');

    const movieNameInput = movieName.value;
    const releasedYearInput = releasedYear.value;

    const movieListItem = document.createElement('li');

    movieListItem.innerHTML = `
        <div class="movie-info">
            <input type="text" value="${movieNameInput}" readonly>                
            <input type="number" value="${releasedYearInput}" max="2022" min="1950" readonly>
        </div>

        <button class="update">Update</button>
        <button class="delete">Delete</button>
    `;

    // console.log(movieListItem);
    movieList.append(movieListItem);

    movieName.value = '';
    releasedYear.value = '';
});

// use event delegation to get the specific element if the user clicked anywhere in the ul and perform the specific action
movieList.addEventListener('click', (e)=>{
    // console.log(e.target);

    if(e.target.classList.contains('delete')){
        const deleteMovie = e.target.parentElement;
        // console.log(deleteMovie);
        deleteMovie.remove();
    } else if(e.target.classList.contains('update')){
        const changeName = e.target.previousElementSibling.firstElementChild;
        const changeYear = e.target.previousElementSibling.lastElementChild;
        // console.log(changeName);
        changeName.removeAttribute('readonly');
        changeName.focus();
        changeYear.removeAttribute('readonly');

        document.addEventListener('keypress', (e)=>{
            if(e.key == 'Enter'){
                changeName.setAttribute('readonly', 'readonly');
                changeYear.setAttribute('readonly', 'readonly');
            }
        })
    } 
})