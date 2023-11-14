import "./About.css";

const About = () => {
  return (
   <div className="about-container">
      <section className="about-section">
        <h2>About Our Coupon System</h2>
        <p>
          Welcome to <span className="company-nameB">Shay Gabay</span>'s innovative coupon system! We're passionate about helping you save money and enjoy the best deals on your favorite products and services. Our coupon platform is designed with your convenience and savings in mind.
        </p>
      </section>

      <section className="what-we-offer">
        <h3>What We Offer</h3>
        <ul>
          <li><strong>Exclusive Discounts:</strong> Discover a wide range of exclusive discounts and special offers from your favorite brands and local businesses. Our team works tirelessly to bring you the best deals available.</li>
          <li><strong>User-Friendly Experience:</strong> Our user-friendly platform makes it easy to browse and find coupons that match your interests. Whether you're shopping for clothing, dining out, or looking for exciting experiences, we've got you covered.</li>
          <li><strong>Personalized Recommendations:</strong> We understand that everyone has unique preferences. That's why we provide personalized coupon recommendations tailored to your interests and shopping habits.</li>
        </ul>
      </section>

      <section className="how-it-works">
        <h3>How It Works</h3>
        <ol>
          <li><strong>Browse Coupons:</strong> Explore a diverse selection of coupons in various categories. From electronics to travel, you'll find deals that suit your needs.</li>
          <li><strong>Redeem Coupons:</strong> Once you find a coupon that interests you, simply click to redeem it. You can use coupons both online and in physical stores, depending on the offer.</li>
          <li><strong>Enjoy Savings:</strong> Start enjoying incredible savings on your purchases. It's that easy! Share the love by telling your friends and family about the fantastic deals you've found.</li>
        </ol>
      </section>

      <section className="our-mission">
        <h3>Our Mission</h3>
        <p>
          At <span className="company-nameB">Shay Gabay</span>, we're on a mission to make saving money effortless and enjoyable. We believe that everyone should have access to great discounts and offers, and we're committed to helping you live your best life without breaking the bank.
        </p>
      </section>
{/* 
      <section className="contact-us">
        <h3>Contact Us</h3>
        <p>
          Got questions, feedback, or suggestions? We'd love to hear from you! Contact our friendly customer support team <a href="/contact">here</a> or follow us on <a href="/social-media">social media</a> to stay updated on the latest deals and promotions.
        </p>
      </section> */}

      <section className="join-us">
        <p>
          Join the thousands of smart shoppers who are already saving with <span className="company-nameB">Shay Gabay</span>'s coupon system. Start exploring today and experience the thrill of discovering incredible deals!
        </p>
        <p>
          Thank you for choosing <span className="company-nameB">Shay Gabay</span> for all your coupon needs.
        </p>
      </section>
    </div>
  );
};

export default About;
