import { useEffect, useState } from "react";
import {
    createMyProfile,
    deleteMyProfile,
    getMyProfile,
    updateMyProfile,
    uploadProfilePhoto,
    uploadCv
} from "../services/profileService";
import PageNavbar from "../components/PageNavbar";

function ProfilePage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [linkedinUrl, setLinkedinUrl] = useState("");
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
            setBio("");
            setPhotoFile(null);
            setCvFile(null);
            setProfileCreated(false);

            alert("Profile deleted successfully!");
        } catch (error) {
            alert(error.response?.data?.message || "Failed to delete profile");
        }
    };

    return (
        <>
            <PageNavbar />

            {loading ? (
                <p className="page">Loading profile...</p>
            ) : (
                <div className="profile-page">
                    <div className="profile-header">
                        <p className="hi-label">Candidate area</p>
                        <h1>Your profile</h1>
                        <p>
                            Keep your candidate information updated so Hi-Tech can
                            evaluate your applications faster.
                        </p>
                    </div>

                    <div className="profile-panel">
                        <div className="profile-panel-top">
                            <div className="profile-identity">
                                <div className="profile-avatar">
                                    {firstName
                                        ? firstName.charAt(0).toUpperCase()
                                        : "H"}
                                </div>

                                <div>
                                    <h2>
                                        {firstName || "Candidate"} {lastName}
                                    </h2>

                                    <span
                                        className={
                                            profileCreated
                                                ? "profile-status active"
                                                : "profile-status"
                                        }
                                    >
                                        {profileCreated
                                            ? "Profile active"
                                            : "Profile incomplete"}
                                    </span>
                                </div>
                            </div>

                            <button onClick={handleSaveProfile}>
                                {profileCreated
                                    ? "Update Profile"
                                    : "Create Profile"}
                            </button>
                        </div>

                        <div className="profile-section">
                            <h3>Personal information</h3>

                            <div className="form-grid">
                                <input
                                    placeholder="First name"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />

                                <input
                                    placeholder="Last name"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />

                                <input
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                />

                                <input
                                    placeholder="Street address"
                                    value={address}
                                    onChange={(e) =>
                                        setAddress(e.target.value)
                                    }
                                />

                                <input
                                    placeholder="Phone number"
                                    value={phoneNumber}
                                    onChange={(e) =>
                                        setPhoneNumber(e.target.value)
                                    }
                                />

                                <input
                                    placeholder="LinkedIn URL"
                                    value={linkedinUrl}
                                    onChange={(e) =>
                                        setLinkedinUrl(e.target.value)
                                    }
                                />
                            </div>

                            <textarea
                                placeholder="About me"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            />
                        </div>

                        {profileCreated && (
                            <div className="profile-section">
                                <h3>Documents</h3>

                                <div className="upload-grid">
                                    <div className="upload-box">
                                        <div>
                                            <h4>Profile photo</h4>
                                            <p>
                                                Upload a professional profile image.
                                            </p>
                                        </div>

                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                setPhotoFile(e.target.files[0])
                                            }
                                        />

                                        <button onClick={handleUploadPhoto}>
                                            Upload Photo
                                        </button>
                                    </div>

                                    <div className="upload-box">
                                        <div>
                                            <h4>CV file</h4>
                                            <p>
                                                Upload your latest CV in PDF or
                                                DOC format.
                                            </p>
                                        </div>

                                        <input
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={(e) =>
                                                setCvFile(e.target.files[0])
                                            }
                                        />

                                        <button onClick={handleUploadCv}>
                                            Upload CV
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {profileCreated && (
                            <div className="profile-danger-zone">
                                <div>
                                    <h3>Delete profile</h3>
                                    <p>
                                        This will remove your candidate profile
                                        information.
                                    </p>
                                </div>

                                <button
                                    className="danger"
                                    onClick={handleDeleteProfile}
                                >
                                    Delete Profile
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default ProfilePage;