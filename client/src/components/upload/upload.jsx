import { ImageKitProvider, upload } from "@imagekit/react";
import { useRef } from "react";

const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;
const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY;

const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/upload");

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();

    const { signature, expire, token } = data;

    return {
      signature,
      expire,
      token,
    };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const Upload = ({setImg}) => {
  const fileInputRef = useRef(null);

  const onError = (err) => {
    console.log("Error", err);
  };

  const onSuccess = (res) => {
    console.log("Success", res);
    setImg((prevState) => ({
      ...prevState,
      isLoading: false,
      dbData: res,
    }));
  };

  const onUploadProgress = (progress) => {
    console.log("Progress", progress);
  };

  const onUploadStart = (evt) => {
    console.log("Upload started", evt);
    setImg((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
  };

  const handleUpload = async (file) => {
    try {
      onUploadStart(file);

      const { signature, expire, token } = await authenticator();

      const response = await upload({
        file,
        fileName: file.name,
        token,
        signature,
        expire,
        publicKey,
        useUniqueFileName: true,
        onProgress: onUploadProgress,
      });

      onSuccess(response);
    } catch (error) {
      onError(error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      handleUpload(file);
    }
  };

  return (
    <ImageKitProvider
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      authenticator={authenticator}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <label onClick={() => fileInputRef.current?.click()}>
        <img src="/attachment.png" alt="Upload" />
      </label>
    </ImageKitProvider>
  );
};

export default Upload;