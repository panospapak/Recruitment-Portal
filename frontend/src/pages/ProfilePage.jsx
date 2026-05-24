import { useEffect, useState } from "react";
import {
    createMyProfile,
    deleteMyProfile,
    getMyProfile,
    updateMyProfile,
    uploadProfilePhoto,
    uploadCv
} from "../services/profileService";

function ProfilePage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [linkedinUrl, setLinkedinUrl] = useState("");
    const [cvUrl, setCvUrl] = useState("");
    const [bio, setBio] = useState("");

    const [photoFile, setPhotoFile] = useState(null);
    const [cvFile, setCvFile] = useState(null);

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
            setEmail(profile.email || "");
            setAddress(profile.address || "");
            setPhoneNumber(profile.phoneNumber || "");
            setLinkedinUrl(profile.linkedinUrl || "");
            setCvUrl(profile.cvUrl || "");
            setBio(profile.bio || "");

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
        email,
        address,
        phoneNumber,
        linkedinUrl,
        cvUrl,
        bio
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

    const handleUploadPhoto = async () => {
        if (!photoFile) {
            alert("Please select a photo first");
            return;
        }

        try {
            await uploadProfilePhoto(photoFile);
            alert("Photo uploaded successfully!");
            fetchProfile();
        } catch (error) {
            alert(error.response?.data?.message || "Failed to upload photo");
        }
    };

    const handleUploadCv = async () => {
        if (!cvFile) {
            alert("Please select a CV first");
            return;
        }

        try {
            await uploadCv(cvFile);
            alert("CV uploaded successfully!");
            fetchProfile();
        } catch (error) {
            alert(error.response?.data?.message || "Failed to upload CV");
        }
    };

    const handleDeleteProfile = async () => {
        try {
            await deleteMyProfile();

            setFirstName("");
            setLastName("");
            setEmail("");
            setAddress("");
            setPhoneNumber("");
            setLinkedinUrl("");
            setCvUrl("");
            setBio("");
            setPhotoFile(null);
            setCvFile(null);
            setProfileCreated(false);

            alert("Profile deleted successfully!");
        } catch (error) {
            alert(error.response?.data?.message || "Failed to delete profile");
        }
    };

    if (loading) {
        return <p className="page">Loading profile...</p>;
    }

    return (
        <div className="profile-page">
            <div className="profile-header">
                <p className="hi-label">Candidate area</p>
                <h1>Your profile</h1>
                <p>
                    Keep your candidate information updated so Hi-Tech can
                    evaluate your applications faster.
                </p>
            </div>

            <div className="profile-layout">
                <div className="profile-card">
                    <div className="profile-avatar">
                        {firstName ? firstName.charAt(0).toUpperCase() : "H"}
                    </div>

                    <h2>
                        {firstName || "Candidate"} {lastName}
                    </h2>

                    {profileCreated ? (
                        <span className="profile-status active">
                            Profile active
                        </span>
                    ) : (
                        <span className="profile-status">
                            Profile incomplete
                        </span>
                    )}
                </div>

                <div className="profile-form-card">
                    <h2>Personal information</h2>

                    <div className="form-grid">
                        <input
                            placeholder="First name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />

                        <input
                            placeholder="Last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />

                        <input
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            placeholder="Street address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />

                        <input
                            placeholder="Phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />

                        <input
                            placeholder="LinkedIn URL"
                            value={linkedinUrl}
                            onChange={(e) => setLinkedinUrl(e.target.value)}
                        />
                    </div>

                    <textarea
                        placeholder="About me"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />


                    <button onClick={handleSaveProfile}>
                        {profileCreated ? "Update Profile" : "Create Profile"}
                    </button>
                </div>
            </div>

            {profileCreated && (
                <div className="profile-upload-card">
                    <h2>Documents</h2>

                    <div className="upload-grid">
                        <div>
                            <h3>Profile photo</h3>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setPhotoFile(e.target.files[0])}
                            />
                            <button onClick={handleUploadPhoto}>
                                Upload Photo
                            </button>
                        </div>

                        <div>
                            <h3>CV file</h3>
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => setCvFile(e.target.files[0])}
                            />
                            <button onClick={handleUploadCv}>
                                Upload CV
                            </button>
                        </div>
                    </div>

                    <button className="danger" onClick={handleDeleteProfile}>
                        Delete Profile
                    </button>
                </div>
            )}
        </div>
    );
}

export default ProfilePage;