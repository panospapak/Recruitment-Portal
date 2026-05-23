import { useEffect, useState } from "react";
import {
    createMyProfile,
    getMyProfile,
    updateMyProfile
} from "../services/profileService";

function ProfilePage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [linkedinUrl, setLinkedinUrl] = useState("");
    const [cvUrl, setCvUrl] = useState("");
    const [profileCreated, setProfileCreated] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const profile = await getMyProfile();

            setFirstName(profile.firstName || "");
            setLastName(profile.lastName || "");
            setPhoneNumber(profile.phoneNumber || "");
            setLinkedinUrl(profile.linkedinUrl || "");
            setCvUrl(profile.cvUrl || "");

            setProfileCreated(true);
        } catch (error) {
            setProfileCreated(false);
        }
    };

    const profileData = {
        firstName,
        lastName,
        phoneNumber,
        linkedinUrl,
        cvUrl
    };

    const handleSaveProfile = async () => {
        try {
            if (profileCreated) {
                await updateMyProfile(profileData);
                alert("Profile updated successfully!");
            } else {
                await createMyProfile(profileData);
                setProfileCreated(true);
                alert("Profile created successfully!");
            }
        } catch (error) {
            alert(error.response?.data?.message || "Failed to save profile");
        }
    };

    return (
        <div>
            <h1>Candidate Profile</h1>

            {profileCreated ? (
                <p>Your profile exists. You can update it below.</p>
            ) : (
                <p>Create your candidate profile.</p>
            )}

            <input
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />

            <br /><br />

            <input
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />

            <br /><br />

            <input
                placeholder="Phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <br /><br />

            <input
                placeholder="LinkedIn URL"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
            />

            <br /><br />

            <input
                placeholder="CV URL"
                value={cvUrl}
                onChange={(e) => setCvUrl(e.target.value)}
            />

            <br /><br />

            <button onClick={handleSaveProfile}>
                {profileCreated ? "Update Profile" : "Create Profile"}
            </button>
        </div>
    );
}

export default ProfilePage;