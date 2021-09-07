class photoCollection {
  constructor(displayedImage) {
    this.displayedImage = displayedImage;
    this.imageNames = [];
    this.imageSources = [];
    this.date = document.querySelector('#date-input').value;
    fetchImageNames(this, this.date);
  }

  setImages(names) {
    this.imageNames = names;
    this.imageSources = names.map(name => `https://epic.gsfc.nasa.gov/archive/natural/${this.date.replaceAll('-', '/')}/png/${name}.png`)
    this.displayedImage.src = this.imageSources[0];
  }

}

async function fetchImageNames(photoCollection, dateString){
  console.log(dateString);
  let response = await fetch(`https://epic.gsfc.nasa.gov/api/natural/date/${dateString}`)
    .then(res => res.json())
    .then(data => photoCollection.setImages(data.map(datum => datum.image)))
  return true;
}


document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('earth-image').src="temp-earth.jpg";
  let collection = new photoCollection(document.getElementById('earth-image'));
  
  window.collection = collection;
})