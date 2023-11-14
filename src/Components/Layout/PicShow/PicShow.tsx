import Slideshow from "./Slideshow";
const imageUrls = [
  "/src/assets/Images/Food.jpg",
  "/src/assets/Images/Vacation.jpg",
  "/src/assets/Images/Sport.jpg",
  "/src/assets/Images/Clothing.jpg",
  "/src/assets/Images/Computer.jpg",
  "/src/assets/Images/Health.jpg",
];

function PicShow() {
  return (
    <div>
      <Slideshow images={imageUrls} />
    </div>
  );
}

export default PicShow;
