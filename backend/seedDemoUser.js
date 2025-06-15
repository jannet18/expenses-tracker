require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const seedDemoUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const existingDemo = await User.findOne({ email: "demo@example.com" });
    if (existingDemo) {
      console.log("Demo user already exists!");
    } else {
      const demoUser = new User({
        fullName: "Demo User",
        email: "demo@example.com",
        password: "demopassword",
        profileImageUrl:
          "https://cdna.artstation.com/p/assets/images/images/023/576/078/original/ying-chen-me-optimize.gif?1579652163",
      });

      await demoUser.save();
      console.log("Demo user created successfully!");
    }
    mongoose.disconnect();
  } catch (error) {
    console.error("Error creating demo user:", error);
    mongoose.disconnect();
  }
};

seedDemoUser();
