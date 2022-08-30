const loadPhones = async(text, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${text}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit)
}

const displayPhones = (phones, dataLimit) => {
  const phonesContainer = document.getElementById('phones-container')
  phonesContainer.textContent = '';
  // display 15 phones 
  const showAll = document.getElementById('show-all')
  if(dataLimit && phones.length > 15){
    phones = phones.slice(0, 15);
    showAll.classList.remove('d-none');
  }
  else{
    showAll.classList.add('d-none')
  }
  // display no Phone pound
  const noPhone = document.getElementById('no-phone-msg')
  if(phones.length === 0){
    noPhone.classList.remove('d-none')
  }
  else{
    noPhone.classList.add('d-none')
  }
  // display all Phones
  phones.forEach(phone => {
    const div = document.createElement('div')
    div.classList.add('col');
    div.innerHTML = `
    <div class="card p-4">
      <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
      <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
      </div>
    </div>
    `
    phonesContainer.appendChild(div);
  })

  // stop spinner or loader
  toggleSpinner(false)
}

const processSearch = (dataLimit) => {
  toggleSpinner(true);
  const textField = document.getElementById('text-field');
  const text = textField.value;
  // textField.value = '';
  loadPhones(text, dataLimit);
}

document.getElementById('btn-search').addEventListener('click', function(){
  // start loder
  processSearch(15);
})

document.getElementById('text-field').addEventListener('keydown', function(event){
  // console.log(event.key);
  if(event.key === 'Enter'){
    processSearch(15);
  }
})

const toggleSpinner = isLoading => {
  const loderSection = document.getElementById('loder');
  if(isLoading){
    loderSection.classList.remove('d-none');
  }
  else{
    loderSection.classList.add('d-none')
  }
}

// Not the best way to fixed the show all system 
document.getElementById('btn-show-all').addEventListener('click', function(){
  processSearch();
})

const loadPhoneDetails = async(id) =>{
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
}

const displayPhoneDetails = detail => {
  // console.log(detail)
  const modalTitle = document.getElementById('phoneDetailModalLabel')
  modalTitle.innerHTML = `
      <p>Name: ${detail.name}</p>
  `
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = `
      <img src = "${detail.image}">
      <p class="fw-bold">Release Date: ${detail.releaseDate ? detail.releaseDate : 'No Release Date Found'}</p>
      <p class="fw-bold">Storage: ${detail.mainFeatures ? detail.mainFeatures.memory : 'No Storage Found'}</p>
      <p class="fw-bold">Bluetooth: ${detail.others.Bluetooth}</p>
  `
}

loadPhones('samsung');