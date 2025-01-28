// real one 

// import { hashPassword, comparePassword } from "../helper/authHelper.js";
// import JWT from "jsonwebtoken";
// import User from "../models/User.js";
// import dotenv from "dotenv";
// import { v2 as cloudinary } from "cloudinary";
// import sendStatusUpdateEmail from "../helper/email.js";
// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const registerController = async (req, res) => {
//   try {
//     const {
//       firstName,
//       lastName,
//       email,
//       password,
//       confirmPassword,
//       dateOfBirth,
//       // gender,
//       phone,
//       address,
//       image,
//     } = req.body;
//     console.log(req.body);

    
//     if (!image) {
//       return res.json({ message: "Image Is Required" });
//     }

//     if (!firstName) {
//       return res.json({ message: "First Name Is Required" });
//     }

//     if (!lastName) {
//       return res.json({ message: "Last Name Name Is Required" });
//     }

//     if (!email) {
//       return res.json({ message: "Email Is Required" });
//     }

//     if (!password) {
//       return res.json({ message: "Password Is Required" });
//     }

//     if (!confirmPassword) {
//       return res.json({ message: "Confirm Password Is Required" });
//     }

//     if (!dateOfBirth) {
//       return res.json({ message: "Date Of Birth Is Required" });
//     }

//     // if (!gender) {
//     //   return res.json({ message: "Gender Is Required" });
//     // }

//     if (!phone) {
//       return res.json({ message: "Phone Is Required" });
//     }

//     if (!address) {
//       return res.json({ message: "Address Is Required" });
//     }

     
//      // Check if passwords match
//      if (password !== confirmPassword) {
//       return res.status(400).json({ success: false, message: "Passwords do not match" });
//     }


//     const uploadResult = await cloudinary.uploader.upload(image, {
//       folder: "user_images",
//     });

//     const imageUrl = uploadResult.secure_url;

    
//     // existing user check
//     const existingUser = await User.findOne({ email: email });
//     if (existingUser) {
//       return res.status(200).json({
//         message: "Already a registered User! Please Login",
//         success: true,
//       });
//     }

//     // new user registration
//     const hashingPassword = await hashPassword(password);
//     const user = await new User({
//      ...req.body,
//       password: hashingPassword,
//       confirmPassword: hashingPassword,
//       image:imageUrl,
//       status: 'pending',
//     }).save();
//     res.status(200).json({
//       success: true,
//       message: "User Regsitered Successfully",
//       user,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "error in registration",
//       error,
//     });
//   }
// };

// const loginController = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email) {
//       return res.status(404).json({
//         success: false,
//         message: "Invalid email",
//       });
//     }

//     if (!password) {
//       return res.status(404).json({
//         success: false,
//         message: "Invalid Password",
//       });
//     }

//     const user = await User.findOne({ email: email });

//     if (!user) {
//       return res.status(404).json({
//         message: false,
//         message: "Email is Not Regsitered",
//       });
//     }


//     // checking the status of request
//     if (user.status === 'pending') {
//       return res.json({
//         message: "Your registration request is pending approval by the admin.",
//       });
//     }

//     if (user.status === 'rejected') {
//       return res.json({
//         message: "Your registration has been rejected by the admin.",
//       });
//     }
     

//     const matchPassword = await comparePassword(password, user.password);

//     if (!matchPassword) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid Password",
//       });
//     }

//     // jwt token key:

//     const token = await JWT.sign(
//       { _id: user._id },
//       process.env.JWT_SECRET_KEY,
//       { expiresIn: "7d" }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Login Successfully",
//       user: {
//         firstName:user.firstName,
//         lastName:user.lastName,
//         email:user.email,
//         phone:user.phone,
//         dateOfBirth:user.dateOfBirth,
//         image:user.image,
//         // gender,
//         address:user.address,
//         status:user.status,
//         _id:user._id
//       },
//       token,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: "error in login",
//       success: false,
//       error,
//     });
//   }
// };


// // update stataus by admin
// const changeUserStatus = async (req, res) => {
//   try {
//     const { userId, status } = req.body;

//     if (!userId || !status || !['approved', 'rejected'].includes(status)) {
//       return res.status(400).json({ message: "Invalid status or user ID" });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.status = status; // Change the status to 'approved' or 'rejected'
//     await user.save();

//     sendStatusUpdateEmail(user.email, status);

//     res.status(200).json({
//       success: true,
//       message: `User status updated to ${status}`,
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Error updating status",
//       error,
//     });
//   }
// };


// // get student detail by id
// const getStudentDetails = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({ message: "Student not found" });
//     }
//     res.status(200).json({ success: true, user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Error fetching student details." });
//   }
// };


// // delete student by id
// const deleteStudent = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await User.findByIdAndDelete(id);
//     res.status(200).json({ success: true, message: "Student deleted successfully." });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Error deleting student." });
//   }
// };

// export { getStudentDetails, deleteStudent };




// // test controller
// const testController = (req, res) => {
//   res.status(200).json({
//      message:"routes is required",
//      success:true,
//  })
//  // console.log("routes protected");
//  }



// // get all student 
//  const getAllStudentsController = async (req, res) => {
//   try {
//       const users = await User.find({});
//       res.status(200).json({
//           success: true,
//           users
//       })
//   } catch (error) {
//       console.log(error);
//       res.status(500).json({
//           success: false, error, message: "Error in getting all Students",
//       })
//   }
// }





// // update by id
// const updateProfileController = async (req, res) => {
//   try {
//     const { userId, firstName, lastName, email, phone, address, image } = req.body;

//     if (!userId) {
//       return res.status(400).json({ message: "User ID is required" });
//     }

//     // Find the user by ID
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Handle image upload if there's a new image
//     let newImageUrl = user.image; // Default is current image in database
//     if (image && image !== user.image) {
//       // If the image has changed, delete the old image from Cloudinary
//       if (user.image) {
//         const urlSegments = user.image.split('/');
//         const publicIdWithExtension = urlSegments[urlSegments.length - 1]; // Last part of the URL
//         const publicId = publicIdWithExtension.split('.')[0]; // Remove the file extension
//         await cloudinary.uploader.destroy(`user_images/${publicId}`); // Include folder if applicable
//       }

//       // Upload the new image to Cloudinary
//       const uploadResponse = await cloudinary.uploader.upload(image, {
//         folder: "user_images", // Optional: Save images in a specific folder
//       });
//       newImageUrl = uploadResponse.secure_url; // URL of the uploaded image
//     }

//     // Update the user's profile in the database
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       {
//         firstName,
//         lastName,
//         email,
//         phone,
//         address,
//         image: newImageUrl, // Update image URL
//       },
//       { new: true } // Return updated user
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Return success response with updated user
//     res.status(200).json({
//       success: true,
//       message: "Profile updated successfully",
//       user: updatedUser,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Error updating profile",
//       error,
//     });
//   }
// };

// export { registerController, loginController, changeUserStatus, testController, getAllStudentsController, updateProfileController };
















// joi validation using 
import { hashPassword, comparePassword } from "../helper/authHelper.js";
import JWT from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import {registerSchema, loginSchema, updateProfileSchema, changeStatusSchema, idSchema} from "../helper/validations.js";
import sendStatusUpdateEmail from "../helper/email.js";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Register Controller
const registerController = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.json({ success: false, message: error.details[0].message });
    }

    const { email, password, image } = req.body;

    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(image, {
      folder: "user_images",
    });
    const imageUrl = uploadResult.secure_url;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "Already a registered User! Please Login",
      });
    }

    // Hash password and save new user
    const hashedPassword = await hashPassword(password);
    const user = await new User({
      ...req.body,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      image: imageUrl,
      status: "pending",
    }).save();

    res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

// Login Controller
const loginController = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.json({ success: false, message: error.details[0].message });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "Email is not registered",
      });
    }

    // Check user status
    if (user.status === "pending") {
      return res.json({
        success: false,
        message: "Your registration request is pending approval by the admin.",
      });
    }

    if (user.status === "rejected") {
      return res.json({
        success: false,
        message: "Your registration has been rejected by the admin.",
      });
    }

    // Validate password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.json({
        success: false,
        message: "Invalid Password",
      });
    }

    // Generate JWT Token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

    res.status(200).json({
      success: true,
      message: "Login Successfully",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth,
        image: user.image,
        address: user.address,
        status: user.status,
        _id: user._id,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in login",
      error,
    });
  }
};


const changeUserStatus = async (req, res) => {
  try {
    const { error } = changeStatusSchema.validate(req.body);
    if (error) {
      return res.json({ message: error.details[0].message });
    }

    const { userId, status } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ message: "User not found" });
    }

    user.status = status;
    await user.save();

    // Replace with your email function
    sendStatusUpdateEmail(user.email, status);

    res.status(200).json({
      success: true,
      message: `User status updated to ${status}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating status",
      error,
    });
  }
};

// Get student details by ID
const getStudentDetails = async (req, res) => {
  try {
    const { error } = idSchema.validate(req.params);
    if (error) {
      return res.json({ message: error.details[0].message });
    }

    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.json({ message: "Student not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error fetching student details.",
    });
  }
};

// Delete student by ID
const deleteStudent = async (req, res) => {
  try {
    const { error } = idSchema.validate(req.params);
    if (error) {
      return res.json({ message: error.details[0].message });
    }

    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Student deleted successfully.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error deleting student.",
    });
  }
};

// Update user profile
const updateProfileController = async (req, res) => {
  try {
    const { error } = updateProfileSchema.validate(req.body);
    if (error) {
      return res.json({ message: error.details[0].message });
    }

    const { userId, firstName, lastName, email, phone, address, image } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.json({ message: "User not found" });
    }

    let newImageUrl = user.image;
    if (image && image !== user.image) {
      if (user.image) {
        const urlSegments = user.image.split("/");
        const publicId = urlSegments[urlSegments.length - 1].split(".")[0];
        await cloudinary.uploader.destroy(`user_images/${publicId}`);
      }

      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "user_images",
      });
      newImageUrl = uploadResponse.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, email, phone, address, image: newImageUrl },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating profile",
      error,
    });
  }
};

// Get all students
const getAllStudentsController = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching students",
      error,
    });
  }
};

// Test controller
const testController = (req, res) => {
  res.status(200).json({
    message: "Routes are working correctly",
    success: true,
  });
};

// export { registerController, loginController };

export { registerController, loginController, changeUserStatus, testController, getAllStudentsController, updateProfileController, deleteStudent, getStudentDetails };
