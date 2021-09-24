class photoCollection {
  constructor(imageElement) {
    this.imageElement = imageElement;
    this.currImageIndex = 0;
    this.imageNames = [];
    this.imageSources = [];
    this.date = document.querySelector('#date-input').value
    fetchImageNames(this, this.date);

    this.scrollImage = this.scrollImage.bind(this);
  }

  setImages(names) {
    this.imageNames = names;
    this.imageSources = names.map(name => `https://epic.gsfc.nasa.gov/archive/natural/${this.date.replaceAll('-', '/')}/png/${name}.png`)
    this.currImageIndex = 0;
    this.imageElement.src = this.imageSources[this.currImageIndex];
  }

  scrollImage(dir){
    let numImages = this.imageSources.length;
    if (dir === 'left') this.currImageIndex = (this.currImageIndex - 1 + numImages) % numImages;
    if (dir === 'right') this.currImageIndex = (this.currImageIndex + 1) % numImages;
    console.log(this.currImageIndex);
    this.imageElement.src = this.imageSources[this.currImageIndex];
  }

}

async function fetchImageNames(photoCollection, dateString){
  let response = await fetch(`https://epic.gsfc.nasa.gov/api/natural/date/${dateString}`) 
  response.json()
    .then(data => photoCollection.setImages(data.map(datum => datum.image)));
}

function dateInputSetup(dateInput) {
  let d = new Date();
  let maxDate = new Date(d.setDate(d.getDate()-3));
  dateInput.max = maxDate.toISOString().slice(0,10);
  dateInput.min = "2015-07-04";
  if (!dateInput.value) dateInput.value = maxDate.toISOString().slice(0,10);
  return true;
}


document.addEventListener("DOMContentLoaded", () => {
  dateInputSetup(document.getElementById('date-input'));
  document.getElementById('earth-image').src="temp-earth.jpg";
  let collection = new photoCollection(document.getElementById('earth-image'));
  document.querySelector('.left').addEventListener('click', () => collection.scrollImage('left')); 
  document.querySelector('.right').addEventListener('click', () => collection.scrollImage('right')); 

  
  window.collection = collection;
})