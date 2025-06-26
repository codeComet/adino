'use client';

import React, { useState } from 'react'

const ContactForm = () => {
    const [formData, setFormData] = useState({
      name: "",
      phone: "",
      email: "",
      date: "",
      message: "",
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form submitted:", formData);
      // Handle form submission here
    };
  return (
    <div>
      <div className="bg-white p-5 md:px-8.5 md:py-10.5 rounded-2xl shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Phone Row */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-base leading-7 font-sequel-light font-light text-[#424242] mb-2 tracking-[-0.36px]"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Jane smith"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-base leading-7 font-sequel-light font-light text-[#424242] mb-2 tracking-[-0.36px]"
              >
                Phone number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(123) 456 789"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
              />
            </div>
          </div>

          {/* Email and Date Row */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="email"
                className="block text-base leading-7 font-sequel-light font-light text-[#424242] mb-2 tracking-[-0.36px]"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="test@gmail.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="date"
                className="block text-base leading-7 font-sequel-light font-light text-[#424242] mb-2 tracking-[-0.36px]"
              >
                Select date*
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-base leading-7 font-sequel-light font-light text-[#424242] mb-2 tracking-[-0.36px]"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Write your idea"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-[#AD9056] text-white font-lato text-base leading-7 font-medium py-2.5 px-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm