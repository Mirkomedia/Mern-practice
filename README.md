About the Project

Bazaar is a marketplace app built with the MERN (MongoDB, Express, React, Node.js) stack. This application allows users to add products with images, descriptions, and prices, which are then displayed in a catalog. The purpose of this project is to practice and demonstrate skills in full-stack development using MERN technologies.

Features

Product Submission: Users can add new products to the marketplace with details name, price, image and description.

Catalog Display: Products are displayed in a visually appealing catalog layout.

Product Details Page: Each product has its own details page with more information.

Responsive Design: The UI is responsive and adapts to different screen sizes.

Installation

Install dev dependencies (npm install) 
Create cluster for your project in cloud mongodb
Create a .env file in the root of your project folder and add the following:
MONGO_URI=<your_mongodb_connection_string>
PORT=5000(or whatever suits you)

Future Improvements

User Authentication: Add user login and registration for a personalized experience. //partly done, authentication needed and secure password hashing

Search and Filter: Allow users to search for specific products or filter by categories. //name specific search implemented, will add tags and categories later

Image Upload: Implement direct image upload instead of just image URLs.

Reviews and Ratings: Allow users to review and rate products.

Admin Dashboard: Create an admin interface to manage products and users.

Editing existing products: I have put request routed and waiting for me to make the connecting frontend for it //editing is possible now
