const Common= (function(){
	const apiToken='2668586113423997';
	const apiUrl=`https://superheroapi.com/api.php/${apiToken}/`;
	const toastContainer = document.getElementById('toast');
	const FAVOURITES='favourites';
	const loader= document.querySelector('.loader');


	function showLoader(){
		loader.style.display='block';
	}
	function hideLoader(){
		loader.style.display='none';
	}


	/* Notification handler */
	  function showNotification(type, message) {
	    if (type === 'error') {
	      toastContainer.classList.remove('toast-success');
	      toastContainer.classList.add('toast-error');
	    } else if (type === 'success') {
	      toastContainer.classList.remove('toast-error');
	      toastContainer.classList.add('toast-success');
	    }
	    toastContainer.style.display = 'block';
	    toastContainer.innerText = message;

	    setTimeout(() => {
	      toastContainer.style.display = 'none';
	    }, 3000);
	  }

	  /* Send Api request*/

	async function apiRequest(url){
	  	try{
	  		const response=await fetch(url,{mode: 'cors'});
	  		const data= await response.json();
	  		return{
	  			data,
	  			success:true,
	  		};
	  	}catch(error){
	  		console.log('error',error);
	  		return{
	  			error:error.message,
	  			success:false,
	  		};

	  	}
	}

	/* Add hero to localstorage */
  function addHeroToFavourites(hero) {
    if (!hero) return;

    const favouritesFromLocalStorage = getFavSuperheroes();
    favouritesFromLocalStorage.push(hero);

    // Save in localstorage
    localStorage.setItem(
      FAVOURITES,
      JSON.stringify(favouritesFromLocalStorage)
    );

    showNotification('success', 'Added to favourites');
  }

  /* Remove hero from localstorage */
  function removeHeroFromFavourites(heroId) {
    if (!heroId) return;

    let favouritesFromLocalStorage = getFavSuperheroes();

    // Remove hero from localstorage
    favouritesFromLocalStorage = favouritesFromLocalStorage.filter(
      (item) => item.id !== heroId
    );

    // Save in localstorage
    localStorage.setItem(
      FAVOURITES,
      JSON.stringify(favouritesFromLocalStorage)
    );

    showNotification('Removed', 'Removed from favourites');
  }

  /* Get fav superheroes from the local storage */
  function getFavSuperheroes() {
    return localStorage.getItem(FAVOURITES)
      ? JSON.parse(localStorage.getItem(FAVOURITES))
      : [];
  }

  function debounce(func, delay) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;

      clearTimeout(timeout);

      timeout = setTimeout(function () {
        timeout = null;
        func.apply(context, args);
        // handleSearch(args);
      }, delay);
    };
  }
  return {
  	apiRequest,
    apiUrl,
    showNotification,
    addHeroToFavourites,
    removeHeroFromFavourites,
    getFavSuperheroes,
    showLoader,
    hideLoader,
    debounce,
};

})();