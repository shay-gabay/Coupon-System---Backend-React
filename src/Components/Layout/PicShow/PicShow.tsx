import Slideshow from "./Slideshow";
const imageUrls = [
  "/src/assets/Images/Food.jpg",
  "/src/assets/Images/Vacation.jpg",
  "/src/assets/Images/Sport.jpg",
  "/src/assets/Images/Clothing.jpg",
  "/src/assets/Images/Computer.jpg",
  "/src/assets/Images/Health.jpg",

  //   'url1.jpg',
  //   'url2.jpg',
  //   'url3.jpg',
  // Add more image URLs
];

function PicShow() {
  return (
    <div>
      <Slideshow images={imageUrls} />
    </div>
  );
}

export default PicShow;
