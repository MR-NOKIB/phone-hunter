const loadPhone = async(searchText, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit);
}

const displayPhone = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phones-container');
    phoneContainer.innerHTML = '';
    // display 20 phones only
    const showAll = document.getElementById('show-all')
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }
    // display no phone founds
    const noPhone = document.getElementById('no-phone-msz');
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none');
    }

    // display all phone
    phones.forEach(phone =>{
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card h-100 p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
            </div>
      </div>`;
      phoneContainer.appendChild(phoneDiv);
    })
    // stop Loader
    toggleSpinner(false);
}
const processSearch = (dataLimit) =>{
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, dataLimit);
}

document.getElementById('btn-search').addEventListener('click', function(){
    // start Loader
    processSearch(10)
})
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      processSearch(10);
    }
});

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

// Not the best way to load show all;
document.getElementById('btn-show-all').addEventListener('click', () =>{
    processSearch();
});

const loadPhoneDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url)
    const data = await res.json()
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone =>{
    console.log(phone)
    document.getElementById('phoneDetailModalLabel').innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</P>
    <P>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Information Found'}</P>
    <P>Others: ${phone.others ? phone.others.Bluetooth
 : 'No Bluetooth Information'}</P>
    `;
}

loadPhone('apple')