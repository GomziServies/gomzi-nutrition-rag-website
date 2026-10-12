import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { updateProfileApi } from "../../../api/auth.api";
import InfoCard from "../../../component/ui/InfoCard";
import { errorToast, successToast } from "../../../utils/toast";

function ProfileSection() {
  const { user, fetchProfile } = useAuth();

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    mobile: "",
    birth_date: "",

    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    country: "",
    pin_code: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        mobile: user.mobile || "",
        birth_date: user.birth_date || "",

        address_line_1: user.address?.address_line_1 || "",
        address_line_2: user.address?.address_line_2 || "",
        city: user.address?.city || "",
        state: user.address?.state || "",
        country: user.address?.country || "",
        pin_code: user.address?.pin_code || "",
      });
    }
  }, [user]);

  const handleUpdate = async () => {
    try {
      setLoading(true);

      await updateProfileApi({
        first_name: form.first_name,
        last_name: form.last_name,
        mobile: form.mobile,
        birth_date: form.birth_date,
        address_line_1: form.address_line_1,
        address_line_2: form.address_line_2,
        city: form.city,
        state: form.state,
        country: form.country,
        pin_code: form.pin_code,
      });

      setEditing(false);
      fetchProfile();

      successToast("Profile updated successfully");
    } catch (error) {
      errorToast("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!editing) {
    return (
      <>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Profile Information</h1>

          <button
            onClick={() => setEditing(true)}
            className="bg-black text-white px-5 py-3 rounded-xl"
          >
            Update Profile
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <InfoCard title="First Name" value={user?.first_name} />

          <InfoCard title="Last Name" value={user?.last_name} />

          <InfoCard title="Email" value={user?.email} />

          <InfoCard title="Phone Number" value={user?.mobile} />

          <InfoCard title="Birth Date" value={user?.birth_date} />

          <InfoCard title="UID" value={user?.uid} />

          <InfoCard
            title="Address"
            value={`${user?.address?.address_line_1 || ""} ${
              user?.address?.address_line_2 || ""
            }`}
          />

          <InfoCard title="City" value={user?.address?.city} />

          <InfoCard title="State" value={user?.address?.state} />

          <InfoCard title="Country" value={user?.address?.country} />

          <InfoCard title="Pin Code" value={user?.address?.pin_code} />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Update Profile</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <InfoCard
          title="First Name"
          value={form.first_name}
          editable
          onChange={(value) => setForm({ ...form, first_name: value })}
        />

        <InfoCard
          title="Last Name"
          value={form.last_name}
          editable
          onChange={(value) => setForm({ ...form, last_name: value })}
        />

        <InfoCard
          title="Birth Date"
          value={form.birth_date}
          type="date"
          editable
          onChange={(value) => setForm({ ...form, birth_date: value })}
        />
        <InfoCard
          title="Address Line 1"
          value={form.address_line_1}
          editable
          onChange={(value) => setForm({ ...form, address_line_1: value })}
        />

        <InfoCard
          title="Address Line 2"
          value={form.address_line_2}
          editable
          onChange={(value) => setForm({ ...form, address_line_2: value })}
        />

        <InfoCard
          title="City"
          value={form.city}
          editable
          onChange={(value) => setForm({ ...form, city: value })}
        />

        <InfoCard
          title="State"
          value={form.state}
          editable
          onChange={(value) => setForm({ ...form, state: value })}
        />

        <InfoCard
          title="Country"
          value={form.country}
          editable
          onChange={(value) => setForm({ ...form, country: value })}
        />

        <InfoCard
          title="Pin Code"
          value={form.pin_code}
          editable
          onChange={(value) => setForm({ ...form, pin_code: value })}
        />
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded-xl"
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>

        <button
          onClick={() => setEditing(false)}
          className="border px-6 py-3 rounded-xl"
        >
          Cancel
        </button>
      </div>
    </>
  );
}

export default ProfileSection;
