import Compressor from "compressorjs";

import Compressor from "compressorjs";

document.getElementById("image").addEventListener("change", (event) => {
  const files = event.target.files;

  if (files.length > 0) {
    Array.from(files).forEach((file) => {
      new Compressor(file, {
        quality: 0.3, // Adjust the quality (0.1 to 1)
        success(result) {
          if (result.size <= 10 * 1024) {
            // Limit to 10 KB
            console.log("File compressed and ready to upload");
            // Append the compressed file to FormData if needed
          } else {
            alert("File is too large after compression!");
          }
        },
        error(err) {
          console.error(err.message);
        },
      });
    });
  }
});
