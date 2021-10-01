class photoCollection {
  constructor(imageElement) {
    this.imageElement = imageElement;
    this.currImageIndex = 0;
    this.imageNames = [];
    this.imageSources = [];
    this.date = document.querySelector('#date-input').value
    
    fetchImageNames(this, this.date);
    document.getElementById('date-input').addEventListener('change', () => fetchImageNames(this, this.date));

    this.scrollImage = this.scrollImage.bind(this);
  }

  setImages(names) {
    this.imageNames = names;
    this.imageSources = names.map(name => `https://epic.gsfc.nasa.gov/archive/natural/${this.date.replaceAll('-', '/')}/png/${name}.png`)
    this.currImageIndex = 0;
    console.log(this.imageSources[this.currImageIndex])
    this.imageElement.src = this.imageSources[this.currImageIndex];
    document.getElementsByClassName('loading-background')[0].classList.add('hidden');
  }

  scrollImage(dir){
    document.getElementsByClassName('loading-background')[0].classList.remove('hidden');
    let numImages = this.imageSources.length;
    if (dir === 'left') this.currImageIndex = (this.currImageIndex - 1 + numImages) % numImages;
    if (dir === 'right') this.currImageIndex = (this.currImageIndex + 1) % numImages;
    this.imageElement.src = this.imageSources[this.currImageIndex];
    // document.getElementsByClassName('loading-background')[0].classList.add('hidden');
  }

}

async function fetchImageNames(photoCollection, dateString){
  document.getElementsByClassName('loading-background')[0].classList.remove('hidden');
  console.log(dateString);
  let response = await fetch(`https://epic.gsfc.nasa.gov/api/natural/date/${dateString}`) 
  response.json()
    .then(data => {
      console.log(data);
      photoCollection.setImages(data.map(datum => datum.image));
    });
}

function dateInputSetup(maxDate, dateInput) {
  dateInput.max = maxDate;
  dateInput.min = "2015-07-04";
  if (!dateInput.value) dateInput.value = maxDate;
  return true;
}


document.addEventListener("DOMContentLoaded", async () => {
  document.getElementsByClassName('loading-background')[0].classList.remove('hidden');
  let response = await fetch('https://epic.gsfc.nasa.gov/api/natural')
  response.json().then(data => {
    date = data[0].date.slice(0,10)
    dateInputSetup(date, document.getElementById('date-input'));
    let collection = new photoCollection(document.getElementById('earth-image'));
    document.querySelector('.left').addEventListener('click', () => collection.scrollImage('left')); 
    document.querySelector('.right').addEventListener('click', () => collection.scrollImage('right')); 
  });

});