export const uploadToCloudinary = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
  
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.error || 'Cloudinary upload failed');
      }
  
      return data.url;
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw error;
    }
  };
  