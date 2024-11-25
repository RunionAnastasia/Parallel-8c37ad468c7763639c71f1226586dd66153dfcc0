// //components/ProfileView.jsx
// import React, { useState, useEffect } from "react";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { auth } from "./firebase";
// import "./styles/ProfileView.css";

// const ProfileView = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });

//     return () => unsubscribe(); // Cleanup listener
//   }, []);

//   const handleSignOut = async () => {
//     try {
//       await signOut(auth);
//       alert("You have successfully signed out.");
//       window.location.href = "/"; // Redirect to the homepage or login page
//     } catch (error) {
//       console.error("Error during sign out:", error.message);
//     }
//   };

//   if (loading) return <div className="profile-loading">Loading...</div>;

//   if (!user) {
//     return (
//       <div className="profile-error">
//         <h2>You are not logged in.</h2>
//         <a href="/login" className="profile-link">Go to Login</a>
//       </div>
//     );
//   }

//   return (
//     <div className="profile-container">
//       <h1>Welcome, {user.displayName || "User"}!</h1>
//       <div className="profile-card">
//         <img
//           src={user.photoURL || "/default-avatar.png"}
//           alt="User Avatar"
//           className="profile-avatar"
//         />
//         <h2>{user.displayName || "Anonymous"}</h2>
//         <p>Email: {user.email || "Not provided"}</p>
//         <button className="profile-logout-button" onClick={handleSignOut}>
//           Log Out
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfileView;


import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { auth } from "./firebase";
import "./styles/ProfileView.css";

const ProfileView = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  // Editable Fields
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [gender, setGender] = useState("");
  const [interests, setInterests] = useState([]);
  const [prompt, setPrompt] = useState("");

  const allInterests = ["Music", "Sports", "Cooking", "Traveling", "Reading", "Gaming"]; // Example interests

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setDisplayName(currentUser.displayName || "");
        setPhotoURL(currentUser.photoURL || "");
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  const handleSave = async () => {
    try {
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });
      setUser({ ...auth.currentUser, displayName, photoURL });
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  const toggleInterest = (interest) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((item) => item !== interest)); // Remove interest
    } else {
      setInterests([...interests, interest]); // Add interest
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("You have successfully signed out.");
      window.location.href = "/"; // Redirect to the homepage or login page
    } catch (error) {
      console.error("Error during sign out:", error.message);
    }
  };

  if (loading) return <div className="profile-loading">Loading...</div>;

  if (!user) {
    return (
      <div className="profile-error">
        <h2>You are not logged in.</h2>
        <a href="/login" className="profile-link">Go to Login</a>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h1>Welcome, {user.displayName || "User"}!</h1>

      <div className="profile-card">
        <img
          src={photoURL || "/default-avatar.png"}
          alt="User Avatar"
          className="profile-avatar"
        />

        {editMode ? (
          <>
            <label>Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />

            <label>Photo URL</label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />

            <label>Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <label>Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Add a dating prompt or bio"
            />

            <label>Interests</label>
            <div className="interests-container">
              {allInterests.map((interest) => (
                <button
                  key={interest}
                  className={`interest-button ${
                    interests.includes(interest) ? "selected" : ""
                  }`}
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                </button>
              ))}
            </div>

            <button className="profile-save-button" onClick={handleSave}>
              Save
            </button>
            <button className="profile-cancel-button" onClick={() => setEditMode(false)}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <h2>{user.displayName || "Anonymous"}</h2>
            <p>Email: {user.email || "Not provided"}</p>
            <p>Gender: {gender || "Not specified"}</p>
            <p>Prompt: {prompt || "No prompt added"}</p>
            <p>Interests: {interests.length > 0 ? interests.join(", ") : "No interests selected"}</p>
            <button className="profile-edit-button" onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
          </>
        )}

        <button className="profile-logout-button" onClick={handleSignOut}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfileView;

//desktop toggle view 
// import React, { useState, useEffect } from "react";
// import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
// import { auth } from "./firebase";
// import "./styles/ProfileView.css";

// const ProfileView = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editMode, setEditMode] = useState(false);
//   const [desktopView, setDesktopView] = useState(false); // State to toggle view mode

//   const [displayName, setDisplayName] = useState("");
//   const [photoURL, setPhotoURL] = useState("");
//   const [gender, setGender] = useState("");
//   const [interests, setInterests] = useState([]);
//   const [prompt, setPrompt] = useState("");

//   const allInterests = ["Music", "Sports", "Cooking", "Traveling", "Reading", "Gaming"];

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       if (currentUser) {
//         setDisplayName(currentUser.displayName || "");
//         setPhotoURL(currentUser.photoURL || "");
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleSignOut = async () => {
//     try {
//       await signOut(auth);
//       alert("You have successfully signed out.");
//       window.location.href = "/"; // Redirect to the homepage or login page
//     } catch (error) {
//       console.error("Error during sign out:", error.message);
//     }
//   };

//   const toggleDesktopView = () => {
//     setDesktopView(!desktopView); // Toggle between desktop and standard view
//   };

//   if (loading) return <div className="profile-loading">Loading...</div>;

//   if (!user) {
//     return (
//       <div className="profile-error">
//         <h2>You are not logged in.</h2>
//         <a href="/login" className="profile-link">Go to Login</a>
//       </div>
//     );
//   }

//   return (
//     <div className={`profile-container ${desktopView ? "desktop-view" : ""}`}>
//       <button className="toggle-view-button" onClick={toggleDesktopView}>
//         {desktopView ? "Switch to Standard View" : "Switch to Desktop View"}
//       </button>

//       <h1>Welcome, {user.displayName || "User"}!</h1>
//       <div className="profile-card">
//         <img
//           src={photoURL || "/default-avatar.png"}
//           alt="User Avatar"
//           className="profile-avatar"
//         />
//         <h2>{user.displayName || "Anonymous"}</h2>
//         <p>Email: {user.email || "Not provided"}</p>
//         <p>Gender: {gender || "Not specified"}</p>
//         <p>Prompt: {prompt || "No prompt added"}</p>
//         <p>Interests: {interests.length > 0 ? interests.join(", ") : "No interests selected"}</p>
//         <button className="profile-logout-button" onClick={handleSignOut}>
//           Log Out
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfileView;






// import React, { useState, useEffect } from "react";
// import { onAuthStateChanged, updateProfile } from "firebase/auth";
// import { auth } from "./firebase"; // Firebase setup
// import "./styles/ProfileView.css";

// const ProfileView = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Form data
//   const [displayName, setDisplayName] = useState("");
//   const [photoURL, setPhotoURL] = useState("");
//   const [gender, setGender] = useState("");
//   const [prompt, setPrompt] = useState("");
//   const [hobbies, setHobbies] = useState([]);

//   const availableHobbies = ["Music", "Sports", "Cooking", "Traveling", "Reading", "Gaming"];

//   // Fetch user data
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       if (currentUser) {
//         setDisplayName(currentUser.displayName || "");
//         setPhotoURL(currentUser.photoURL || "");
//         // Fetch additional data from Firebase if needed
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const toggleHobby = (hobby) => {
//     if (hobbies.includes(hobby)) {
//       setHobbies(hobbies.filter((item) => item !== hobby));
//     } else {
//       setHobbies([...hobbies, hobby]);
//     }
//   };

//   const handleSave = async () => {
//     try {
//       await updateProfile(auth.currentUser, {
//         displayName,
//         photoURL,
//       });
//       // Save additional data (e.g., gender, prompt, hobbies) to Firestore if needed
//       alert("Profile updated successfully!");
//     } catch (error) {
//       console.error("Error updating profile:", error.message);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!user) {
//     return <div>You are not logged in. Please log in to edit your profile.</div>;
//   }

//   return (
//     <div className="profile-edit-page">
//       {/* Profile Info Section */}
//       <div className="profile-section profile-info">
//         <h2>Edit Profile Info</h2>
//         <label>Display Name</label>
//         <input
//           type="text"
//           value={displayName}
//           onChange={(e) => setDisplayName(e.target.value)}
//         />
//         <label>Photo URL</label>
//         <input
//           type="text"
//           value={photoURL}
//           onChange={(e) => setPhotoURL(e.target.value)}
//         />
//         <label>Gender</label>
//         <select value={gender} onChange={(e) => setGender(e.target.value)}>
//           <option value="">Select Gender</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Other">Other</option>
//         </select>
//       </div>

//       {/* Prompts Section */}
//       <div className="profile-section profile-prompts">
//         <h2>Your Prompt</h2>
//         <textarea
//           placeholder="Add a short bio or dating prompt"
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//         />
//       </div>

//       {/* Hobbies Section */}
//       <div className="profile-section profile-hobbies">
//         <h2>Pick Your Hobbies</h2>
//         <div className="hobbies-container">
//           {availableHobbies.map((hobby) => (
//             <button
//               key={hobby}
//               className={`hobby-button ${hobbies.includes(hobby) ? "selected" : ""}`}
//               onClick={() => toggleHobby(hobby)}
//             >
//               {hobby}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Save Button */}
//       <div className="profile-save-container">
//         <button className="save-button" onClick={handleSave}>
//           Save Profile
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfileView;




// import React, { useState, useEffect } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth, db } from "./firebase";
// import { doc, setDoc, getDoc } from "firebase/firestore";
// import "./styles/ProfileView.css";

// const ProfileEditPage = () => {
//   const [user, setUser] = useState(null);
//   const [profileData, setProfileData] = useState({
//     displayName: "",
//     pronouns: "",
//     languages: [],
//     connectedAccounts: {
//       instagram: false,
//       spotify: false,
//     },
//     photos: [],
//     bio: "",
//     interests: {
//       creativity: [],
//       sports: [],
//       myLife: [],
//     },
//   });

//   const categories = {
//     creativity: ["Art", "Crafts", "Dancing", "Photography", "Writing"],
//     sports: ["Basketball", "Hiking", "Yoga", "Swimming", "Football"],
//     myLife: ["Parent", "Pet parent", "Freelancer", "Traveling", "New in town"],
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       setUser(currentUser);
//       if (currentUser) {
//         const userDoc = doc(db, "users", currentUser.uid);
//         const userSnapshot = await getDoc(userDoc);
//         if (userSnapshot.exists()) {
//           setProfileData(userSnapshot.data());
//         }
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   const handleSave = async () => {
//     if (user) {
//       const userDoc = doc(db, "users", user.uid);
//       await setDoc(userDoc, profileData);
//       alert("Profile updated successfully!");
//     }
//   };

//   const toggleInterest = (category, interest) => {
//     const updatedCategory = profileData.interests[category] || [];
//     const updatedInterests = updatedCategory.includes(interest)
//       ? updatedCategory.filter((i) => i !== interest)
//       : [...updatedCategory, interest];
//     setProfileData({
//       ...profileData,
//       interests: { ...profileData.interests, [category]: updatedInterests },
//     });
//   };

//   const handlePhotoUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const uploadedPhotos = files.map((file) => URL.createObjectURL(file));
//     setProfileData((prev) => ({
//       ...prev,
//       photos: [...prev.photos, ...uploadedPhotos].slice(0, 6),
//     }));
//   };

//   return (
//     <div className="profile-edit-container">
//       <h1>Edit Your Profile</h1>

//       {/* Profile Details Section */}
//       <section className="profile-section">
//         <label>Display Name</label>
//         <input
//           type="text"
//           value={profileData.displayName}
//           onChange={(e) =>
//             setProfileData({ ...profileData, displayName: e.target.value })
//           }
//         />

//         <label>Pronouns</label>
//         <select
//           value={profileData.pronouns}
//           onChange={(e) =>
//             setProfileData({ ...profileData, pronouns: e.target.value })
//           }
//         >
//           <option value="">Select Pronouns</option>
//           <option value="she/her">She/Her</option>
//           <option value="he/him">He/Him</option>
//           <option value="they/them">They/Them</option>
//           <option value="other">Other</option>
//         </select>

//         <label>Languages</label>
//         <input
//           type="text"
//           placeholder="Add languages (comma-separated)"
//           value={profileData.languages.join(", ")}
//           onChange={(e) =>
//             setProfileData({
//               ...profileData,
//               languages: e.target.value.split(",").map((lang) => lang.trim()),
//             })
//           }
//         />
//       </section>

//       {/* Photos Section */}
//       <section className="profile-section">
//         <h2>Photos</h2>
//         <div className="photo-grid">
//           {profileData.photos.map((photo, index) => (
//             <img key={index} src={photo} alt={`Profile ${index}`} />
//           ))}
//         </div>
//         <input
//           type="file"
//           accept="image/*"
//           multiple
//           onChange={handlePhotoUpload}
//         />
//       </section>

//       {/* Interests Section */}
//       <section className="profile-section">
//         <h2>Interests</h2>
//         {Object.keys(categories).map((category) => (
//           <div key={category} className="interest-category">
//             <h3>{category}</h3>
//             <div className="interest-options">
//               {categories[category].map((interest) => (
//                 <button
//                   key={interest}
//                   className={`interest-button ${
//                     profileData.interests[category]?.includes(interest)
//                       ? "selected"
//                       : ""
//                   }`}
//                   onClick={() => toggleInterest(category, interest)}
//                 >
//                   {interest}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ))}
//       </section>

//       {/* Save Button */}
//       <button className="save-button" onClick={handleSave}>
//         Save Profile
//       </button>
//     </div>
//   );
// };

// export default ProfileEditPage;


// import React, { useState, useEffect } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth, db } from "./firebase";
// import { doc, setDoc, getDoc } from "firebase/firestore";
// import "./styles/ProfileView.css";

// const ProfileEditPage = () => {
//   const [user, setUser] = useState(null);
//   const [profileData, setProfileData] = useState({
//     displayName: "",
//     pronouns: "",
//     languages: [],
//     connectedAccounts: {
//       instagram: false,
//       spotify: false,
//     },
//     photos: [],
//     bio: "",
//     interests: {
//       creativity: [],
//       sports: [],
//       myLife: [],
//       wellness: [],
//       travel: [],
//       pets: [],
//       movies: [],
//       music: [],
//       spirituality: [],
//       foodAndDrink: [],
//     },
//   });

//   const categories = {
//     creativity: ["Art", "Crafts", "Dancing", "Photography", "Writing"],
//     sports: [
//       "Basketball",
//       "Hiking",
//       "Yoga",
//       "Swimming",
//       "Football",
//       "Gymnastics",
//       "Tennis",
//     ],
//     myLife: [
//       "Parent",
//       "Pet parent",
//       "Freelancer",
//       "Traveling",
//       "New in town",
//       "Wedding planning",
//     ],
//     wellness: [
//       "Meditation",
//       "Self-care",
//       "Aromatherapy",
//       "ASMR",
//       "Therapy",
//       "Fresh start",
//     ],
//     travel: ["Living abroad", "New country", "Traveling", "New in town"],
//     pets: ["Dogs", "Cats", "Birds", "Horses", "Rabbits", "Hamsters"],
//     movies: ["Action", "Comedy", "Horror", "Rom-Com", "K-Drama", "Sci-Fi"],
//     music: [
//       "Pop",
//       "Rock",
//       "Jazz",
//       "Hip-Hop",
//       "Country",
//       "Classical",
//       "Electronic",
//     ],
//     spirituality: ["Astrology", "Witchy things", "Law of Attraction"],
//     foodAndDrink: [
//       "Sushi",
//       "Pizza",
//       "Brunch",
//       "Cooking",
//       "Wine time",
//       "Vegan",
//     ],
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       setUser(currentUser);
//       if (currentUser) {
//         const userDoc = doc(db, "users", currentUser.uid);
//         const userSnapshot = await getDoc(userDoc);
//         if (userSnapshot.exists()) {
//           setProfileData(userSnapshot.data());
//         }
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   const handleSave = async () => {
//     if (user) {
//       const userDoc = doc(db, "users", user.uid);
//       await setDoc(userDoc, profileData);
//       alert("Profile updated successfully!");
//     }
//   };

//   const toggleInterest = (category, interest) => {
//     const updatedCategory = profileData.interests[category] || [];
//     const updatedInterests = updatedCategory.includes(interest)
//       ? updatedCategory.filter((i) => i !== interest)
//       : [...updatedCategory, interest];
//     setProfileData({
//       ...profileData,
//       interests: { ...profileData.interests, [category]: updatedInterests },
//     });
//   };

//   const handlePhotoUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const uploadedPhotos = files.map((file) => URL.createObjectURL(file));
//     setProfileData((prev) => ({
//       ...prev,
//       photos: [...prev.photos, ...uploadedPhotos].slice(0, 6),
//     }));
//   };

//   return (
//     <div className="profile-edit-container">
//       <h1>Edit Your Profile</h1>

//       {/* Profile Details Section */}
//       <section className="profile-section">
//         <label>Display Name</label>
//         <input
//           type="text"
//           value={profileData.displayName}
//           onChange={(e) =>
//             setProfileData({ ...profileData, displayName: e.target.value })
//           }
//         />

//         <label>Pronouns</label>
//         <select
//           value={profileData.pronouns}
//           onChange={(e) =>
//             setProfileData({ ...profileData, pronouns: e.target.value })
//           }
//         >
//           <option value="">Select Pronouns</option>
//           <option value="she/her">She/Her</option>
//           <option value="he/him">He/Him</option>
//           <option value="they/them">They/Them</option>
//           <option value="other">Other</option>
//         </select>

//         <label>Languages</label>
//         <input
//           type="text"
//           placeholder="Add languages (comma-separated)"
//           value={profileData.languages.join(", ")}
//           onChange={(e) =>
//             setProfileData({
//               ...profileData,
//               languages: e.target.value.split(",").map((lang) => lang.trim()),
//             })
//           }
//         />
//       </section>

//       {/* Photos Section */}
//       <section className="profile-section">
//         <h2>Photos</h2>
//         <div className="photo-grid">
//           {profileData.photos.map((photo, index) => (
//             <img key={index} src={photo} alt={`Profile ${index}`} />
//           ))}
//         </div>
//         <input
//           type="file"
//           accept="image/*"
//           multiple
//           onChange={handlePhotoUpload}
//         />
//       </section>

//       {/* Interests Section */}
//       <section className="profile-section">
//         <h2>Interests</h2>
//         {Object.keys(categories).map((category) => (
//           <div key={category} className="interest-category">
//             <h3>{category}</h3>
//             <div className="interest-options">
//               {categories[category].map((interest) => (
//                 <button
//                   key={interest}
//                   className={`interest-button ${
//                     profileData.interests[category]?.includes(interest)
//                       ? "selected"
//                       : ""
//                   }`}
//                   onClick={() => toggleInterest(category, interest)}
//                 >
//                   {interest}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ))}
//       </section>

//       {/* Save Button */}
//       <button className="save-button" onClick={handleSave}>
//         Save Profile
//       </button>
//     </div>
//   );
// };

// export default ProfileEditPage;


// import React, { useState, useEffect } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth, db } from "./firebase";
// import { doc, setDoc, getDoc } from "firebase/firestore";
// import "./styles/ProfileView.css";

// const ProfileView = () => {
//   const [user, setUser] = useState(null);
//   const [showEditPage, setShowEditPage] = useState(false);
//   const [profileData, setProfileData] = useState({
//     displayName: "",
//     pronouns: "",
//     languages: [],
//     connectedAccounts: {
//       instagram: false,
//       spotify: false,
//     },
//     photos: [],
//     bio: "",
//     interests: {
//       creativity: [],
//       sports: [],
//       myLife: [],
//       wellness: [],
//       travel: [],
//       pets: [],
//       movies: [],
//       music: [],
//       spirituality: [],
//       foodAndDrink: [],
//     },
//   });

//   const categories = {
//     creativity: ["Art", "Crafts", "Dancing", "Photography", "Writing"],
//     sports: [
//       "Basketball",
//       "Hiking",
//       "Yoga",
//       "Swimming",
//       "Football",
//       "Gymnastics",
//       "Tennis",
//     ],
//     myLife: [
//       "Parent",
//       "Pet parent",
//       "Freelancer",
//       "Traveling",
//       "New in town",
//       "Wedding planning",
//     ],
//     wellness: [
//       "Meditation",
//       "Self-care",
//       "Aromatherapy",
//       "ASMR",
//       "Therapy",
//       "Fresh start",
//     ],
//     travel: ["Living abroad", "New country", "Traveling", "New in town"],
//     pets: ["Dogs", "Cats", "Birds", "Horses", "Rabbits", "Hamsters"],
//     movies: ["Action", "Comedy", "Horror", "Rom-Com", "K-Drama", "Sci-Fi"],
//     music: [
//       "Pop",
//       "Rock",
//       "Jazz",
//       "Hip-Hop",
//       "Country",
//       "Classical",
//       "Electronic",
//     ],
//     spirituality: ["Astrology", "Witchy things", "Law of Attraction"],
//     foodAndDrink: [
//       "Sushi",
//       "Pizza",
//       "Brunch",
//       "Cooking",
//       "Wine time",
//       "Vegan",
//     ],
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       setUser(currentUser);
//       if (currentUser) {
//         const userDoc = doc(db, "users", currentUser.uid);
//         const userSnapshot = await getDoc(userDoc);
//         if (userSnapshot.exists()) {
//           setProfileData(userSnapshot.data());
//         }
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   const handleSave = async () => {
//     if (user) {
//       const userDoc = doc(db, "users", user.uid);
//       await setDoc(userDoc, profileData);
//       alert("Profile updated successfully!");
//       setShowEditPage(false);
//     }
//   };

//   const toggleInterest = (category, interest) => {
//     const updatedCategory = profileData.interests[category] || [];
//     const updatedInterests = updatedCategory.includes(interest)
//       ? updatedCategory.filter((i) => i !== interest)
//       : [...updatedCategory, interest];
//     setProfileData({
//       ...profileData,
//       interests: { ...profileData.interests, [category]: updatedInterests },
//     });
//   };

//   const handlePhotoUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const uploadedPhotos = files.map((file) => URL.createObjectURL(file));
//     setProfileData((prev) => ({
//       ...prev,
//       photos: [...prev.photos, ...uploadedPhotos].slice(0, 6),
//     }));
//   };

//   if (showEditPage) {
//     return (
//       <div className="profile-edit-container">
//         <h1>Edit Your Profile</h1>

//         {/* Profile Details Section */}
//         <section className="profile-section">
//           <label>Display Name</label>
//           <input
//             type="text"
//             value={profileData.displayName}
//             onChange={(e) =>
//               setProfileData({ ...profileData, displayName: e.target.value })
//             }
//           />

//           <label>Pronouns</label>
//           <select
//             value={profileData.pronouns}
//             onChange={(e) =>
//               setProfileData({ ...profileData, pronouns: e.target.value })
//             }
//           >
//             <option value="">Select Pronouns</option>
//             <option value="she/her">She/Her</option>
//             <option value="he/him">He/Him</option>
//             <option value="they/them">They/Them</option>
//             <option value="other">Other</option>
//           </select>

//           <label>Languages</label>
//           <input
//             type="text"
//             placeholder="Add languages (comma-separated)"
//             value={profileData.languages.join(", ")}
//             onChange={(e) =>
//               setProfileData({
//                 ...profileData,
//                 languages: e.target.value.split(",").map((lang) => lang.trim()),
//               })
//             }
//           />
//         </section>

//         {/* Photos Section */}
//         <section className="profile-section">
//           <h2>Photos</h2>
//           <div className="photo-grid">
//             {profileData.photos.map((photo, index) => (
//               <img key={index} src={photo} alt={`Profile ${index}`} />
//             ))}
//           </div>
//           <input
//             type="file"
//             accept="image/*"
//             multiple
//             onChange={handlePhotoUpload}
//           />
//         </section>

//         {/* Interests Section */}
//         <section className="profile-section">
//           <h2>Interests</h2>
//           {Object.keys(categories).map((category) => (
//             <div key={category} className="interest-category">
//               <h3>{category}</h3>
//               <div className="interest-options">
//                 {categories[category].map((interest) => (
//                   <button
//                     key={interest}
//                     className={`interest-button ${
//                       profileData.interests[category]?.includes(interest)
//                         ? "selected"
//                         : ""
//                     }`}
//                     onClick={() => toggleInterest(category, interest)}
//                   >
//                     {interest}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </section>

//         {/* Save Button */}
//         <button className="save-button" onClick={handleSave}>
//           Save Profile
//         </button>
//         <button
//           className="cancel-button"
//           onClick={() => setShowEditPage(false)}
//         >
//           Cancel
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="profile-view-container">
//       <h1>Welcome to Your Profile</h1>
//       <p>Display Name: {profileData.displayName}</p>
//       <p>Pronouns: {profileData.pronouns}</p>
//       <p>Languages: {profileData.languages.join(", ")}</p>
//       <h2>Interests:</h2>
//       <ul>
//         {Object.keys(profileData.interests).map((category) => (
//           <li key={category}>
//             <strong>{category}:</strong> {profileData.interests[category].join(", ")}
//           </li>
//         ))}
//       </ul>
//       <button className="edit-profile-button" onClick={() => setShowEditPage(true)}>
//         Edit Profile
//       </button>
//     </div>
//   );
// };

// export default ProfileView;



// import React, { useState, useEffect } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth, db } from "./firebase";
// import { doc, setDoc, getDoc } from "firebase/firestore";
// import "./styles/ProfileView.css";

// const ProfileView = () => {
//   const [user, setUser] = useState(null);
//   const [showEditPage, setShowEditPage] = useState(false);
//   const [profileData, setProfileData] = useState({
//     displayName: "",
//     pronouns: "",
//     languages: [],
//     photos: [],
//     bio: "",
//     interests: {
//       creativity: [],
//       sports: [],
//       myLife: [],
//       wellness: [],
//       travel: [],
//       pets: [],
//       movies: [],
//       music: [],
//       spirituality: [],
//       foodAndDrink: [],
//     },
//   });

//   const categories = {
//     creativity: ["Art", "Crafts", "Dancing", "Photography", "Writing"],
//     sports: ["Basketball", "Hiking", "Yoga", "Swimming", "Football"],
//     myLife: ["Parent", "Pet parent", "Freelancer", "Traveling", "New in town"],
//     wellness: ["Meditation", "Self-care", "Aromatherapy", "ASMR"],
//     travel: ["Living abroad", "New country", "Traveling", "New in town"],
//     pets: ["Dogs", "Cats", "Birds", "Horses"],
//     movies: ["Action", "Comedy", "Horror", "Rom-Com"],
//     music: ["Pop", "Rock", "Jazz", "Hip-Hop"],
//     spirituality: ["Astrology", "Law of Attraction"],
//     foodAndDrink: ["Sushi", "Pizza", "Cooking", "Wine time"],
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       setUser(currentUser);
//       if (currentUser) {
//         const userDoc = doc(db, "users", currentUser.uid);
//         const userSnapshot = await getDoc(userDoc);
//         if (userSnapshot.exists()) {
//           setProfileData(userSnapshot.data());
//         }
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   const handleSave = async () => {
//     if (user) {
//       const userDoc = doc(db, "users", user.uid);
//       await setDoc(userDoc, profileData);
//       alert("Profile updated successfully!");
//       setShowEditPage(false);
//     }
//   };

//   const toggleInterest = (category, interest) => {
//     const updatedCategory = profileData.interests[category] || [];
//     const updatedInterests = updatedCategory.includes(interest)
//       ? updatedCategory.filter((i) => i !== interest)
//       : [...updatedCategory, interest];
//     setProfileData({
//       ...profileData,
//       interests: { ...profileData.interests, [category]: updatedInterests },
//     });
//   };

//   const handlePhotoUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const uploadedPhotos = files.map((file) => URL.createObjectURL(file));
//     setProfileData((prev) => ({
//       ...prev,
//       photos: [...prev.photos, ...uploadedPhotos].slice(0, 6),
//     }));
//   };

//   if (showEditPage) {
//     return (
//       <div className="profile-edit-container">
//         <h1>Edit Your Profile</h1>

//         {/* Profile Details Section */}
//         <section className="profile-section">
//           <label>Display Name</label>
//           <input
//             type="text"
//             value={profileData.displayName}
//             onChange={(e) =>
//               setProfileData({ ...profileData, displayName: e.target.value })
//             }
//           />

//           <label>Pronouns</label>
//           <select
//             value={profileData.pronouns}
//             onChange={(e) =>
//               setProfileData({ ...profileData, pronouns: e.target.value })
//             }
//           >
//             <option value="">Select Pronouns</option>
//             <option value="she/her">She/Her</option>
//             <option value="he/him">He/Him</option>
//             <option value="they/them">They/Them</option>
//             <option value="other">Other</option>
//           </select>

//           <label>Languages</label>
//           <input
//             type="text"
//             placeholder="Add languages (comma-separated)"
//             value={profileData.languages.join(", ")}
//             onChange={(e) =>
//               setProfileData({
//                 ...profileData,
//                 languages: e.target.value.split(",").map((lang) => lang.trim()),
//               })
//             }
//           />
//         </section>

//         {/* Photos Section */}
//         <section className="profile-section">
//           <h2>Photos</h2>
//           <div className="photo-grid">
//             {profileData.photos.map((photo, index) => (
//               <img key={index} src={photo} alt={`Profile ${index}`} />
//             ))}
//           </div>
//           <input
//             type="file"
//             accept="image/*"
//             multiple
//             onChange={handlePhotoUpload}
//           />
//         </section>

//         {/* Interests Section */}
//         <section className="profile-section">
//           <h2>Interests</h2>
//           {Object.keys(categories).map((category) => (
//             <div key={category} className="interest-category">
//               <h3>{category}</h3>
//               <div className="interest-options">
//                 {categories[category].map((interest) => (
//                   <button
//                     key={interest}
//                     className={`interest-button ${
//                       profileData.interests[category]?.includes(interest)
//                         ? "selected"
//                         : ""
//                     }`}
//                     onClick={() => toggleInterest(category, interest)}
//                   >
//                     {interest}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </section>

//         {/* Save Button */}
//         <button className="save-button" onClick={handleSave}>
//           Save Profile
//         </button>
//         <button
//           className="cancel-button"
//           onClick={() => setShowEditPage(false)}
//         >
//           Cancel
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="profile-view-container">
//       <h1>Welcome to Your Profile</h1>
//       <div className="profile-card">
//         <img
//           src={profileData.photos[0] || "/default-avatar.png"}
//           alt="User Avatar"
//           className="profile-avatar"
//         />
//         <h2>{profileData.displayName || "Anonymous"}</h2>
//         <p>Pronouns: {profileData.pronouns || "Not specified"}</p>
//         <p>Languages: {profileData.languages.join(", ") || "None"}</p>
//         <h2>Interests:</h2>
//         <ul>
//           {Object.keys(profileData.interests).map((category) => (
//             <li key={category}>
//               <strong>{category}:</strong> {profileData.interests[category].join(", ")}
//             </li>
//           ))}
//         </ul>
//         <button className="edit-profile-button" onClick={() => setShowEditPage(true)}>
//           Edit Profile
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfileView;
