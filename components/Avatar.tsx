import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../types/supabase";

type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export default function Avatar({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string;
  url: Profiles["avatar_url"];
  size: number;
  onUpload: (url: string) => void;
}) {
  const supabase = useSupabaseClient<Database>();
  const [avatar_url, setAvatarUrl] = useState<string | null>(null); // Specify the type explicitly as string | null
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.error("Error downloading image:", error); // Changed console.log to console.error for error logging
    }
  }

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${uid}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert("Error uploading avatar!");
      console.error(error); // Changed console.log to console.error for error logging
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="col-span-full flex items-center gap-x-8">
      <img
        src={avatar_url || "/avatar_placeholder.png"}
        alt=""
        className="h-24 w-24 flex-none rounded-lg bg-gray-200 object-cover"
      />
      <div>
        <label
          htmlFor="single"
          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover-bg-gray-50"
        >
          {uploading ? "Uploading..." : "Change Avatar"}
        </label>
        <input
          className="invisible absolute"
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
        <p className="mt-2 text-xs leading-5 text-gray-600">
          JPG, GIF, or PNG. 1MB max.
        </p>
      </div>
    </div>
  );
}
