export const fileUpload = async ( file ) => {
    const cloudUrl = `https://api.cloudinary.com/v1_1/cloud-kames/upload`;

    const formData = new FormData();
    formData.append('upload_preset', 'KaMEs-Journal');
    formData.append('file', file);

    try {

        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        if ( resp.ok ) {
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        } else {
            throw await resp.json();
        };

    } catch (err) {

        console.log(err);
        throw err;
    };
};
