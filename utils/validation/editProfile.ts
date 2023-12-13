import { StaticImageData } from "next/image";
import { ProfileData } from "@/app/components/editProfile/EditProfile";

interface Image {
  src: StaticImageData;
  alt: string;
}


export default function editProfileValidation(
  { username, country, field, birthday, image }: ProfileData
): boolean {
  if (!username || username.trim().length < 8 || username.trim().length > 30) {
    throw new Error("Invalid username.");
  }
  if (!country || country.trim().length < 8 || country.trim().length > 30) {
    throw new Error("Invalid country selection.");
  }
  if (!field || field.trim().length < 8 || field.trim().length > 30) {
    throw new Error("Invalid field selection.");
  }
  if (!birthday || birthday.trim().length < 8 || birthday.trim().length > 80) {
    throw new Error("Invalid birthday.");
  }
  if (!image) {
    throw new Error("Invalid image selection.");
  }

  return true;
}
