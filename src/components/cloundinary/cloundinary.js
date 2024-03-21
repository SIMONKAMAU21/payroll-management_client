// cloudinaryUpload.js

export async function uploadImageToCloudinary(file) {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'wdfjbcug'); // Replace 'wdfjbcug' with your upload preset
    data.append('cloud_name', 'diyuy63ue'); // Replace 'diyuy63ue' with your cloud name

    const cloudinaryRes = await fetch("https://api.cloudinary.com/v1_1/diyuy63ue/image/upload", {
        method: 'POST',
        body: data
    });

    if (!cloudinaryRes.ok) {
        const responseJson = await cloudinaryRes.json();
        throw new Error("Cloudinary upload failed: " + JSON.stringify(responseJson));
    }

    const responseJson = await cloudinaryRes.json();
    return responseJson.secure_url; // Return the URL of the uploaded image
}
