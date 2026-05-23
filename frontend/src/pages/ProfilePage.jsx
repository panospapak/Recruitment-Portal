import { useEffect, useState } from "react";
import {
    createMyProfile,
    deleteMyProfile,
    getMyProfile,
    updateMyProfile
} from "../services/profileService";

function ProfilePage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [linkedinUrl, setLinkedinUrl] = useState("");
    const [cvUrl, setCvUrl] = useState("");
    const [bio, setBio] = useState("");
    const [skills, setSkills] = useState("");

    const [profileCreated, setProfileCreated] = useState(false);
    const [loading, setLoading] = useState(true);

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
            setBio(profile.bio || "");
            setSkills(profile.skills || "");

            setProfileCreated(true);
        } catch (error) {
            setProfileCreated(false);
        } finally {
            setLoading(false);
        }
    };

    const profileData = {
        firstName,
        lastName,
        phoneNumber,
        linkedinUrl,
        cvUrl,
        bio,
        skills
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

    const handleDeleteProfile = async () => {
        try {
            await deleteMyProfile();

            setFirstName("");
            setLastName("");
            setPhoneNumber("");
            setLinkedinUrl("");
            setCvUrl("");
            setBio("");
            setSkills("");
            setProfileCreated(false);

            alert("Profile deleted successfully!");
        } catch (error) {
            alert(error.response?.data?.message || "Failed to delete profile");
        }
    };

    if (loading) {
        return <p>Loading profile...</p>;
    }

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

            <textarea
                placeholder="About me"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
            />

            <br /><br />

            <input
                placeholder="Skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
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

            {profileCreated && (
                <>
                    <br /><br />
                    <button onClick={handleDeleteProfile}>
                        Delete Profile
                    </button>
                </>
            )}
        </div>
    );
}

export default ProfilePage;