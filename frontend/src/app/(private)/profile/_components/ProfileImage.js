import { updateUserProfileImage } from "@/api/users";
import placeholder from "@/assets/images/placeholder.png";
import Spinner from "@/components/Spinner";
import useAuthStore from "@/stores/authStore";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

const ProfileImage = () => {
  const user = useAuthStore((state) => state.user);
  const inputRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const [profileImage, setProfileImage] = useState();

  const [localImageUrl, setLocalImageUrl] = useState(user?.profileImageUrl);

  const { setUser } = useAuthStore.getState();

  const updateProfileImage = () => {
    if (!profileImage) {
      toast.error("Please select an image first.");
      return;
    }
    setLoading(true);

    const formData = new FormData();

    formData.append("image", profileImage);

    updateUserProfileImage(formData)
      .then((response) => {
        setUser({ user: response.data });
        toast.success("Profile Picture Updated!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to update profile picture.");
      })
      .finally(() => setLoading(false));
  };

  const updateImage = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setProfileImage(file);
    setLocalImageUrl(URL.createObjectURL(file));
  };
  console.log(profileImage);
  console.log("loading:", loading);
  console.log("disabled:", loading || !profileImage);

  return (
    <div>
      {/* Left Card */}
      <div className="bg-card rounded-2xl shadow-lg p-8 h-fit">
        <div className="flex flex-col items-center">
          <div className="relative">
            <Image
              src={localImageUrl ?? placeholder}
              alt="profile"
              width={200}
              height={200}
              loading="eager"
              className="w-44 h-44 rounded-full object-cover border-4 border-primary shadow-lg"
            />

            <button
              onClick={() => inputRef.current.click()}
              className="absolute bottom-2 right-2 bg-primary hover:bg-primary-hover text-white rounded-full p-3 transition"
              type="button"
            >
              <Camera size={20} />
            </button>

            <input
              ref={inputRef}
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              hidden
              onChange={updateImage}
            />
          </div>

          <h2 className="text-2xl font-bold mt-5 text-heading">{user.name}</h2>

          <p className="text-body mt-1">
            {user?.roles[0]?.charAt(0).toUpperCase() +
              user?.roles[0]?.slice(1).toLowerCase()}{" "}
            &nbsp;Account
          </p>

          <div className="mt-6 w-full flex flex-col gap-4">
            <button
              onClick={() => inputRef.current.click()}
              className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-lg font-semibold transition"
              type="button"
            >
              Upload New Picture
            </button>

            <button
              onClick={updateProfileImage}
              type="button"
              className="relative justify-center w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-lg font-semibold transition disabled:opacity-80"
              disabled={loading || !profileImage}
            >
              Update Picture{" "}
              {loading && (
                <span className="absolute top-3 right-6">
                  <Spinner className="w-6! h-6!" />
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;
