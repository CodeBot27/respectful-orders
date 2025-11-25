import React from "react";

const ContactMap = () => {
  return (
    <div className="relative w-full h-[200px] rounded-lg overflow-hidden shadow-lg">
      <iframe
        title="MCorp Location"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3317.882595003144!2d18.59806177648598!3d-34.05524057315596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc4321738fb6a3%3A0xaf4b539f1210fc0b!2s22%20Riviera%20Way%2C%20Portlands%2C%20Mitchells%20Plain%2C%207788!5e0!3m2!1sen!2sza!4v1732568000000!5m2!1sen!2sza"
      ></iframe>
    </div>
  );
};

export default ContactMap;
