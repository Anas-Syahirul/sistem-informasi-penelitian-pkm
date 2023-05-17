import cloudinary from 'cloudinary';

export const uploadToCloudinary = async (path, folder) => {
  return cloudinary.v2.uploader
    .upload(path, {
      folder,
    })
    .then((data) => {
      return { url: data.url, public_id: data.public_id };
    })
    .catch((err) => {
      console.log(err);
    });
};

export const removeFromCloudinary = async (public_id) => {
  await cloudinary.v2.uploader.destroy(public_id, function (err, result) {
    console.log(result, err);
  });
};
